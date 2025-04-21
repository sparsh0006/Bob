export interface Bottle {
    id: string;
    name: string;
    distiller: string;
    region?: string;
    country?: string;
    type: string;
    subType?: string;
    age?: number;
    abv?: number;
    price?: number;
    rating?: number;
    tasting_notes?: string[];
    image_url?: string;
  }
  
  export interface BarData {
    user: string;
    bottles: Bottle[];
  }
  
  export interface RecommendationReason {
    type: 'similar' | 'complementary' | 'trending' | 'value';
    description: string;
    score: number;
  }
  
  export interface BottleRecommendation {
    bottle: Bottle;
    reasons: RecommendationReason[];
    matchScore: number;
  }
  
  // For flavor profiles analysis
  export interface FlavorProfile {
    sweet: number;
    fruity: number;
    floral: number;
    spicy: number;
    woody: number;
    smoky: number;
    peaty: number;
  }
  
  // For collection analysis
  export interface CollectionAnalysis {
    regions: { [key: string]: number };
    distillers: { [key: string]: number };
    types: { [key: string]: number };
    ageGroups: { [key: string]: number };
    priceRanges: { [key: string]: number };
    flavorProfile: FlavorProfile;
    averagePrice: number;
    averageAge: number;
    favoriteRegion?: string;
    favoriteDistiller?: string;
  }