export type ArtisanLanguage = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn';

export interface Artisan {
  id: string;
  name: string;
  craftType: string;
  state: string;
  city: string;
  location: string;
  preferredLanguage: string; // language code or name
  languageCode?: ArtisanLanguage;
  phone: string;
  whatsapp: string;
  email: string;
  bio: string;
  yearsOfExperience: number;
  preparationDays?: number; // Days required to prepare product
  avatar: string;
  verifiedArtisan: boolean;
  specialties: string[];
  benchmarkRole?: 'Artisan A' | 'Artisan B' | 'Artisan C';
}

export interface Product {
  id: string;
  artisanId: string;
  name: string;
  category: string;
  craftType: string;
  description: string;
  price: number; // Artisan-set price in INR ₹
  availableQuantity: number;
  bulkOrderAvailable: boolean;
  bulkMinQuantity?: number;
  bulkLeadTimeDays?: number;
  location: string;
  images: string[];
  materials: string[];
  dimensions?: string;
  createdAt: string;
  isBenchmarkProduct?: boolean;
}

export interface BuyerRequest {
  id: string;
  requiredProduct: string;
  description: string;
  quantity: number;
  locationPreference?: string;
  specialRequirements?: string;
  createdAt: string;
}

export type MatchQuality = 'STRONG_MATCH' | 'PARTIAL_MATCH' | 'POTENTIAL_MATCH' | 'POOR_MATCH';

export interface MatchResult {
  product: Product;
  artisan: Artisan;
  matchScore: number; // 0 - 100
  matchQuality: MatchQuality;
  isSufficientStock: boolean;
  reasons: string[];
  stockStatus: {
    requested: number;
    available: number;
    deficit: number;
    statusText: string;
  };
  scoreBreakdown: {
    semanticMatch: number; // 0 - 45
    stockMatch: number;    // 0 - 35
    bulkMatch: number;     // 0 - 10
    locationMatch: number; // 0 - 10
  };
}

export type EnquiryStatus = 
  | 'New enquiry'
  | 'Accepted'
  | 'Discussion in progress'
  | 'Order confirmed'
  | 'In progress'
  | 'Completed'
  | 'Declined';

export interface TimelineEvent {
  status: EnquiryStatus;
  timestamp: string;
  note: string;
}

export interface Enquiry {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerOrganization?: string;
  artisanId: string;
  productId: string;
  productName: string;
  requestedQuantity: number;
  message: string;
  specialRequirements?: string;
  status: EnquiryStatus;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
  agreedPricePerUnit?: number;
  artisanNotes?: string;
}

export type UserRole = 'welcome' | 'artisan' | 'buyer';
