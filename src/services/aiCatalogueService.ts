export interface AiCatalogueSuggestion {
  suggestedName: string;
  category: string;
  description: string;
  materials: string[];
  suggestedPriceRange: { min: number; max: number };
  craftStory: string;
  bulkRecommendation: string;
  isAiDemo: boolean;
}

export const DEMO_VOICE_PROMPTS = [
  {
    label: 'Cotton Tote Bags (Artisan A style)',
    spokenText: 'Pure cotton hand block printed tote bag with natural indigo dye, double reinforced handle, 150 pieces ready in our Sanganer workshop.',
    craftType: 'Handloom & Block Print Textiles',
    roughNotes: 'Cotton tote bag, natural indigo, floral Sanganeri block print, 150 pieces'
  },
  {
    label: 'Channapatna Wooden Toys (Artisan B style)',
    spokenText: 'Traditional lathe turned wooden toys made with Wrightia tinctoria ivory wood and vegetable lacquer dyes, fifty sets ready in Channapatna.',
    craftType: 'Wooden Toys & Lacquerware',
    roughNotes: 'Channapatna wooden animal cart toys, vegetable lacquer, toddler safe'
  },
  {
    label: 'Bastar Dhokra Brass (Tribal art)',
    spokenText: 'Lost wax cast brass musician figurine with tribal bell metal filigree, handcrafted in Bastar Kondagaon village, 30 pieces ready.',
    craftType: 'Dhokra Brass Metalcraft',
    roughNotes: 'Dhokra tribal musician brass sculpture, lost wax cast, 30 units'
  },
  {
    label: 'Terracotta Cooling Jugs',
    spokenText: 'Unglazed earthenware water carafe naturally keeping water cool, handmade on potter wheel in Bishnupur Bengal.',
    craftType: 'Terracotta Pottery & Sculptures',
    roughNotes: 'Terracotta water jug with lid, unglazed red clay, 1.5 litre capacity'
  }
];

export async function generateAiCatalogueSuggestion(params: {
  craftType?: string;
  roughNotes?: string;
  category?: string;
  artisanName?: string;
  artisanLocation?: string;
}): Promise<AiCatalogueSuggestion> {
  // Simulate intelligent AI synthesis with realistic network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const notes = (params.roughNotes || '').toLowerCase();
  const craft = (params.craftType || '').toLowerCase();

  // Smart Heuristic Synthesizer based on Indian craft taxonomy
  if (notes.includes('bag') || notes.includes('tote') || craft.includes('block print') || craft.includes('handloom')) {
    return {
      suggestedName: 'Handcrafted Heritage Block-Printed Cotton Tote Bag (Reinforced Gusset)',
      category: 'Bags & Accessories',
      description: 'Handcrafted by generational artisans using sustainably sourced 280 GSM pure unbleached cotton and authentic wooden block prints with natural botanical dyes. Features reinforced x-box shoulder straps, a roomy bottom gusset, and interior stash pocket for books, groceries, or laptops. Completely biodegradable and tailored for conscious everyday living or custom corporate gifting.',
      materials: ['100% Organic Cotton Canvas', 'Natural Botanical Dyes', 'Handwoven Webbing Straps'],
      suggestedPriceRange: { min: 220, max: 320 },
      craftStory: 'Rooted in 500-year-old Rajasthani block-printing heritage where teakwood blocks are hand-carved by master artisans and stamped with natural tamarind-and-iron mordants.',
      bulkRecommendation: 'Bulk batch production possible with custom logo block-carving (lead time: 10-14 days for 100+ units).',
      isAiDemo: true
    };
  }

  if (notes.includes('toy') || notes.includes('wood') || craft.includes('wooden') || craft.includes('lacquer')) {
    return {
      suggestedName: 'Channapatna Handcrafted Non-Toxic Wooden Toy Set (Natural Lacquer)',
      category: 'Toys & Games',
      description: 'Sustainably turned on traditional manual lathes using seasoned Wrightia tinctoria (Aale Mara / Ivory wood). Coated with 100% child-safe lacquer colored with organic turmeric, indigo, and katha tree bark. Smooth, splinter-free rounded edges promote sensory tactile learning and fine motor development.',
      materials: ['Wrightia Tinctoria Ivory Wood', 'Organic Natural Shellac Resin', 'Vegetable Dyes'],
      suggestedPriceRange: { min: 380, max: 550 },
      craftStory: 'Preserves the 200-year-old GI-protected craft patronized by Tipu Sultan, known worldwide as the "Toy Town of India".',
      bulkRecommendation: 'Ideal for montessori schools, souvenir stores, and return-gift packages. Minimum bulk run: 25 pieces.',
      isAiDemo: true
    };
  }

  if (notes.includes('brass') || notes.includes('dhokra') || notes.includes('bell') || craft.includes('dhokra')) {
    return {
      suggestedName: 'Bastar Lost-Wax Cast Dhokra Brass Tribal Art Sculpture',
      category: 'Home Decor',
      description: 'Cast individually using the prehistoric lost-wax (cire perdue) metallurgical process practiced by indigenous Bastar artisans for over four millennia. Distinctive beeswax thread filigree produces non-repeating textured patterns with a rich antique brass patina.',
      materials: ['Recycled Bell Metal / Brass Alloy', 'Beeswax Thread Mold', 'River Alluvial Soil Core'],
      suggestedPriceRange: { min: 1200, max: 1800 },
      craftStory: 'An unbroken living Bronze Age craft where each mould is destroyed to extract the sculpture, guaranteeing that every single creation is an authentic one-of-a-kind original.',
      bulkRecommendation: 'Handmade one by one; allow 3 weeks for bulk consignments of 20+ pieces.',
      isAiDemo: true
    };
  }

  if (notes.includes('pottery') || notes.includes('clay') || notes.includes('terracotta') || craft.includes('terracotta') || craft.includes('pottery')) {
    return {
      suggestedName: 'Artisanal Unglazed Terracotta Self-Cooling Water Jug & Cup',
      category: 'Kitchen & Dining',
      description: 'Wheel-thrown from alluvial river clay without artificial glazes or chemicals. Naturally purifies and chills water through microscopic surface evaporation, balancing pH and infusing water with essential earth minerals. Comes with a matching snug clay lid and tumbler.',
      materials: ['Natural Alluvial Red Clay', 'Wood Fired in Kiln'],
      suggestedPriceRange: { min: 380, max: 520 },
      craftStory: 'Earthen pottery honors the five natural elements (Pancha Bhoota), transforming raw river earth into everyday functional wellness vessels.',
      bulkRecommendation: 'Requires safe straw & recycled corrugated packaging for freight. Batch runs of 50-100 units ready in 8 days.',
      isAiDemo: true
    };
  }

  // General artisan handicraft template
  const formattedCraft = params.craftType || 'Traditional Craft';
  return {
    suggestedName: `Handcrafted ${formattedCraft} Heritage Creation`,
    category: params.category || 'Home Decor',
    description: `Authentic handcrafted product created with traditional techniques by skilled regional artisans. Made with sustainable natural materials and hand-finished for unmatched durability, cultural warmth, and conscious living.`,
    materials: ['Natural Indigenous Fibers / Minerals', 'Eco-friendly Finishes'],
    suggestedPriceRange: { min: 450, max: 1200 },
    craftStory: `Supporting rural artisan livelihoods and preserving centuries of indigenous handicraft traditions across India.`,
    bulkRecommendation: 'Custom bulk quantities and personalization available directly through the artisan.',
    isAiDemo: true
  };
}
