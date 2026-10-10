import { Artisan, BuyerRequest, MatchResult, Product } from '../types';

/**
 * Transparent JavaScript Smart Matching Engine for Artisan Connect.
 * 
 * Architecture Note:
 * This client-side heuristic engine models the semantic & capacity logic
 * that can subsequently be mounted into a Python FastAPI microservice
 * using Pandas, Scikit-learn (TfidfVectorizer & cosine_similarity), and linear programming.
 */

// Tokenizer & normalizer
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOP_WORDS.has(token));
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'this', 'that', 'our', 'are', 'any',
  'all', 'have', 'been', 'which', 'will', 'want', 'need', 'looking', 'please'
]);

// Craft & material synonyms dictionary for traditional Indian crafts
const SYNONYMS: Record<string, string[]> = {
  'bag': ['bags', 'tote', 'totes', 'shopper', 'pouch', 'pouches', 'carrier', 'handbag'],
  'cotton': ['cotton', 'khadi', 'handloom', 'canvas', 'cambric', 'organic'],
  'toy': ['toys', 'games', 'wooden', 'channapatna', 'play', 'figurine'],
  'pottery': ['pottery', 'ceramic', 'clay', 'terracotta', 'vase', 'glazed', 'jug'],
  'silk': ['silk', 'katan', 'brocade', 'saree', 'dupatta', 'banarasi', 'tussar'],
  'brass': ['brass', 'metal', 'dhokra', 'dokra', 'bell', 'alloy', 'bronze', 'inlay', 'bidri'],
  'wood': ['wood', 'wooden', 'sheesham', 'teak', 'carved', 'jali', 'lacquer'],
  'bamboo': ['bamboo', 'cane', 'wicker', 'reed', 'basket', 'weaving'],
  'leather': ['leather', 'hide', 'kolhapuri', 'chappal', 'tanned'],
  'painting': ['painting', 'art', 'madhubani', 'mithila', 'tanjore', 'rogan', 'canvas', 'folk']
};

function getTermSynonyms(term: string): string[] {
  const normalized = term.toLowerCase();
  const set = new Set<string>([normalized]);
  
  for (const [key, list] of Object.entries(SYNONYMS)) {
    if (key === normalized || list.includes(normalized)) {
      list.forEach(w => set.add(w));
      set.add(key);
    }
  }
  return Array.from(set);
}

export function executeSmartMatching(
  request: BuyerRequest,
  products: Product[],
  artisans: Artisan[]
): MatchResult[] {
  const artisanMap = new Map<string, Artisan>(artisans.map(a => [a.id, a]));
  const reqTokens = tokenize(`${request.requiredProduct} ${request.description} ${request.specialRequirements || ''}`);
  
  // Expanded query terms including synonyms
  const queryTerms = new Set<string>();
  reqTokens.forEach(token => {
    getTermSynonyms(token).forEach(syn => queryTerms.add(syn));
  });

  const requestedQty = Math.max(1, request.quantity);
  const locationPref = (request.locationPreference || '').trim().toLowerCase();
  const hasLocationPref = locationPref.length > 0 && locationPref !== 'any';

  const results: MatchResult[] = products.map(product => {
    const artisan = artisanMap.get(product.artisanId) || {
      id: product.artisanId,
      name: 'Artisan',
      craftType: product.craftType,
      state: '',
      city: '',
      location: product.location,
      preferredLanguage: 'Hindi',
      phone: '',
      whatsapp: '',
      email: '',
      bio: '',
      yearsOfExperience: 5,
      avatar: '',
      verifiedArtisan: true,
      specialties: []
    };

    const reasons: string[] = [];

    // 1. Semantic Match (0 - 45 points)
    const nameTokens = tokenize(product.name);
    const craftTokens = tokenize(product.craftType);
    const catTokens = tokenize(product.category);
    const descTokens = tokenize(product.description + ' ' + (product.materials || []).join(' '));

    let semanticScore = 0;
    let matchedKeywords: string[] = [];

    // Direct exact phrase bonus
    const reqProductLower = request.requiredProduct.toLowerCase().trim();
    const prodNameLower = product.name.toLowerCase();
    const craftLower = product.craftType.toLowerCase();

    if (reqProductLower.length > 2 && (prodNameLower.includes(reqProductLower) || craftLower.includes(reqProductLower))) {
      semanticScore += 25;
      reasons.push(`Matches requested craft: ${product.name}`);
      matchedKeywords.push(request.requiredProduct);
    } else {
      // Token overlap scoring
      let nameMatches = 0;
      queryTerms.forEach(term => {
        if (nameTokens.some(t => t.includes(term) || term.includes(t))) {
          nameMatches++;
          matchedKeywords.push(term);
        }
      });
      semanticScore += Math.min(22, nameMatches * 7);

      let craftMatches = 0;
      queryTerms.forEach(term => {
        if (craftTokens.some(t => t.includes(term) || term.includes(t))) {
          craftMatches++;
          matchedKeywords.push(term);
        }
      });
      semanticScore += Math.min(12, craftMatches * 4);

      let descMatches = 0;
      queryTerms.forEach(term => {
        if (descTokens.some(t => t.includes(term) || term.includes(t))) {
          descMatches++;
        }
      });
      semanticScore += Math.min(11, descMatches * 2);
    }

    semanticScore = Math.min(45, Math.max(0, semanticScore));

    if (semanticScore >= 20 && matchedKeywords.length > 0) {
      if (!reasons.some(r => r.includes('Matches requested craft'))) {
        reasons.push(`Related craft keywords match`);
      }
    } else if (semanticScore < 12) {
      reasons.push(`Unrelated craft category`);
    }

    // 2. Stock Availability Match (0 - 35 points)
    let stockScore = 0;
    const isSufficientStock = product.availableQuantity >= requestedQty;
    const deficit = Math.max(0, requestedQty - product.availableQuantity);

    if (isSufficientStock) {
      stockScore = 35;
      reasons.push(`Sufficient stock: ${product.availableQuantity} available (Requested: ${requestedQty})`);
    } else {
      // Partial stock calculation: proportional up to 14 points
      const ratio = product.availableQuantity / requestedQty;
      stockScore = Math.round(ratio * 14);
      reasons.push(`Insufficient stock: ${product.availableQuantity} available (Need ${requestedQty}, Short by ${deficit})`);
    }

    // 3. Bulk Order Capability (0 - 10 points)
    let bulkScore = 0;
    if (requestedQty >= 25) {
      if (product.bulkOrderAvailable) {
        bulkScore = 10;
        reasons.push('Bulk orders accepted');
      } else {
        bulkScore = 1;
        reasons.push('Small batch only');
      }
    } else {
      bulkScore = 10;
    }

    // 4. Location Match (0 - 10 points)
    let locationScore = 0;
    if (hasLocationPref) {
      const prodLoc = (product.location + ' ' + artisan.state + ' ' + artisan.city).toLowerCase();
      if (prodLoc.includes(locationPref)) {
        locationScore = 10;
        reasons.push(`Location matched: ${artisan.city || artisan.state}`);
      }
    } else {
      locationScore = 8;
    }

    // Total Score (0 - 100)
    let totalScore = semanticScore + stockScore + bulkScore + locationScore;
    totalScore = Math.min(100, Math.max(5, totalScore));

    // Determine Match Quality strictly following Hackathon Rules:
    // Rule:
    // 1. Strong match requires high semantic relevance AND sufficient stock.
    // 2. Insufficient stock MUST be clearly labeled as a PARTIAL MATCH.
    // 3. Unrelated products MUST NOT be strong matches.
    let matchQuality: MatchResult['matchQuality'] = 'POOR_MATCH';

    if (semanticScore < 14) {
      // Unrelated craft - regardless of quantity
      matchQuality = 'POOR_MATCH';
      totalScore = Math.min(25, totalScore); // Cap unrelated score
    } else if (!isSufficientStock) {
      // Has relevant craft keywords, but insufficient stock
      matchQuality = 'PARTIAL_MATCH';
      // Cap score to indicate partial fulfilment
      totalScore = Math.min(68, totalScore);
    } else if (semanticScore >= 25 && isSufficientStock && totalScore >= 75) {
      // High relevance and full quantity
      matchQuality = 'STRONG_MATCH';
    } else {
      matchQuality = 'POTENTIAL_MATCH';
    }

    const stockStatus = {
      requested: requestedQty,
      available: product.availableQuantity,
      deficit,
      statusText: isSufficientStock
        ? `In Stock (${product.availableQuantity} available)`
        : `Stock Shortfall (${product.availableQuantity} / ${requestedQty})`
    };

    return {
      product,
      artisan,
      matchScore: totalScore,
      matchQuality,
      isSufficientStock,
      reasons,
      stockStatus,
      scoreBreakdown: {
        semanticMatch: semanticScore,
        stockMatch: stockScore,
        bulkMatch: bulkScore,
        locationMatch: locationScore
      }
    };
  });

  // Rank by matchScore descending, with STRONG_MATCH first, then PARTIAL_MATCH, then POTENTIAL_MATCH, then POOR_MATCH
  const qualityWeight: Record<MatchResult['matchQuality'], number> = {
    STRONG_MATCH: 400,
    PARTIAL_MATCH: 200,
    POTENTIAL_MATCH: 100,
    POOR_MATCH: 0
  };

  results.sort((a, b) => {
    const weightDiff = qualityWeight[b.matchQuality] - qualityWeight[a.matchQuality];
    if (weightDiff !== 0) return weightDiff;
    return b.matchScore - a.matchScore;
  });

  return results;
}
