import { Bottle, BottleRecommendation, FlavorProfile, CollectionAnalysis, RecommendationReason } from '../types/Bottle';

// Mock database of bottles for recommendations
const MOCK_BOTTLE_DATABASE: Bottle[] = [
  {
    id: 'rec-1',
    name: 'Glenfarclas 25 Year Old',
    distiller: 'Glenfarclas',
    region: 'Speyside',
    country: 'Scotland',
    type: 'Whisky',
    subType: 'Single Malt',
    age: 25,
    abv: 43,
    price: 195,
    rating: 4.8,
    tasting_notes: ['Sherry', 'Dark Chocolate', 'Fruit Cake', 'Spice'],
    image_url: '/images/bottle-placeholder.jpg'
  },
  {
    id: 'rec-2',
    name: 'Lagavulin 16 Year Old',
    distiller: 'Lagavulin',
    region: 'Islay',
    country: 'Scotland',
    type: 'Whisky',
    subType: 'Single Malt',
    age: 16,
    abv: 43,
    price: 89,
    rating: 4.7,
    tasting_notes: ['Smoke', 'Seaweed', 'Iodine', 'Sweet Spice'],
    image_url: '/images/bottle-placeholder.jpg'
  },
  {
    id: 'rec-3',
    name: 'Yamazaki 12 Year Old',
    distiller: 'Suntory',
    region: 'Japan',
    country: 'Japan',
    type: 'Whisky',
    subType: 'Single Malt',
    age: 12,
    abv: 43,
    price: 160,
    rating: 4.6,
    tasting_notes: ['Peach', 'Ginger', 'Cinnamon', 'Vanilla'],
    image_url: '/images/bottle-placeholder.jpg'
  },
  {
    id: 'rec-4',
    name: 'Redbreast 12 Year Old',
    distiller: 'Midleton',
    region: 'Ireland',
    country: 'Ireland',
    type: 'Whiskey',
    subType: 'Single Pot Still',
    age: 12,
    abv: 40,
    price: 65,
    rating: 4.5,
    tasting_notes: ['Nutty', 'Sherry', 'Spice', 'Vanilla'],
    image_url: '/images/bottle-placeholder.jpg'
  },
  {
    id: 'rec-5',
    name: 'Blanton\'s Original',
    distiller: 'Buffalo Trace',
    region: 'Kentucky',
    country: 'USA',
    type: 'Bourbon',
    subType: 'Single Barrel',
    age: undefined,
    abv: 46.5,
    price: 75,
    rating: 4.6,
    tasting_notes: ['Vanilla', 'Caramel', 'Citrus', 'Oak'],
    image_url: '/images/bottle-placeholder.jpg'
  },
  {
    id: 'rec-6',
    name: 'Balvenie 14 Caribbean Cask',
    distiller: 'Balvenie',
    region: 'Speyside',
    country: 'Scotland',
    type: 'Whisky',
    subType: 'Single Malt',
    age: 14,
    abv: 43,
    price: 85,
    rating: 4.5,
    tasting_notes: ['Vanilla', 'Fruit', 'Toffee', 'Rum'],
    image_url: '/images/bottle-placeholder.jpg'
  },
  {
    id: 'rec-7',
    name: 'Nikka From The Barrel',
    distiller: 'Nikka',
    region: 'Japan',
    country: 'Japan',
    type: 'Whisky',
    subType: 'Blended',
    age: undefined,
    abv: 51.4,
    price: 70,
    rating: 4.6,
    tasting_notes: ['Spice', 'Winter Fruits', 'Caramel', 'Vanilla'],
    image_url: '/images/bottle-placeholder.jpg'
  },
  {
    id: 'rec-8',
    name: 'Ardbeg Uigeadail',
    distiller: 'Ardbeg',
    region: 'Islay',
    country: 'Scotland',
    type: 'Whisky',
    subType: 'Single Malt',
    age: undefined,
    abv: 54.2,
    price: 85,
    rating: 4.7,
    tasting_notes: ['Smoke', 'Raisins', 'Dark Chocolate', 'Espresso'],
    image_url: '/images/bottle-placeholder.jpg'
  }
];

// Map tasting notes to flavor profiles
const FLAVOR_MAP: Record<string, Partial<FlavorProfile>> = {
  // Sweet notes
  'Vanilla': { sweet: 0.8 },
  'Caramel': { sweet: 0.9 },
  'Honey': { sweet: 0.7, fruity: 0.3 },
  'Toffee': { sweet: 0.9 },
  'Chocolate': { sweet: 0.6 },
  'Dark Chocolate': { sweet: 0.4 },
  
  // Fruity notes
  'Apple': { fruity: 0.7, sweet: 0.3 },
  'Pear': { fruity: 0.7, sweet: 0.3 },
  'Citrus': { fruity: 0.8 },
  'Orange': { fruity: 0.8, sweet: 0.4 },
  'Dried fruit': { fruity: 0.6, sweet: 0.5 },
  'Fruit': { fruity: 0.8, sweet: 0.3 },
  'Fruit Cake': { fruity: 0.6, sweet: 0.6, spicy: 0.3 },
  'Peach': { fruity: 0.8, sweet: 0.5 },
  'Raisins': { fruity: 0.7, sweet: 0.6 },
  'Winter Fruits': { fruity: 0.7, spicy: 0.3 },
  
  // Floral notes
  'Floral': { floral: 0.9 },
  'Heather': { floral: 0.8 },
  'Rose': { floral: 0.9 },
  
  // Spicy notes
  'Spice': { spicy: 0.8 },
  'Cinnamon': { spicy: 0.8 },
  'Ginger': { spicy: 0.7 },
  'Pepper': { spicy: 0.9 },
  'Sweet Spice': { spicy: 0.7, sweet: 0.4 },
  'Nutty': { spicy: 0.5, woody: 0.3 },
  
  // Woody notes
  'Oak': { woody: 0.9 },
  'Cedar': { woody: 0.8 },
  'Light oak': { woody: 0.6 },
  'Sherry': { woody: 0.5, fruity: 0.4, sweet: 0.3 },
  'Rum': { sweet: 0.7, woody: 0.3 },
  
  // Smoky notes
  'Smoke': { smoky: 0.9 },
  'Ash': { smoky: 0.8 },
  'Espresso': { smoky: 0.5, woody: 0.3 },
  
  // Peaty notes
  'Peat': { peaty: 0.9 },
  'Medicinal': { peaty: 0.7 },
  'Iodine': { peaty: 0.8 },
  'Seaweed': { peaty: 0.7 }
};

// Analyze a bottle's taste profile from its tasting notes
export const getBottleFlavorProfile = (bottle: Bottle): FlavorProfile => {
  // Default flavor profile (neutral)
  const profile: FlavorProfile = {
    sweet: 0,
    fruity: 0,
    floral: 0,
    spicy: 0,
    woody: 0,
    smoky: 0,
    peaty: 0
  };
  
  // If no tasting notes, return default profile
  if (!bottle.tasting_notes || bottle.tasting_notes.length === 0) {
    return profile;
  }
  
  // Process each tasting note
  bottle.tasting_notes.forEach(note => {
    const mappedNote = FLAVOR_MAP[note];
    if (mappedNote) {
      Object.entries(mappedNote).forEach(([flavor, value]) => {
        profile[flavor as keyof FlavorProfile] += value;
      });
    }
  });
  
  // Normalize values to be between 0 and 1
  const sum = Object.values(profile).reduce((a, b) => a + b, 0);
  if (sum > 0) {
    Object.keys(profile).forEach(key => {
      profile[key as keyof FlavorProfile] = profile[key as keyof FlavorProfile] / sum;
    });
  }
  
  return profile;
};

// Analyze user's taste profile from their bottle collection
export const analyzeTasteProfile = (bottles: Bottle[]): CollectionAnalysis => {
  // Initialize collection analysis object
  const analysis: CollectionAnalysis = {
    regions: {},
    distillers: {},
    types: {},
    ageGroups: {
      'No Age Statement': 0,
      '0-10 years': 0,
      '11-15 years': 0,
      '16-20 years': 0,
      '21+ years': 0
    },
    priceRanges: {
      'Budget (< $50)': 0,
      'Value ($50-$100)': 0,
      'Premium ($100-$200)': 0,
      'Luxury (> $200)': 0
    },
    flavorProfile: {
      sweet: 0,
      fruity: 0,
      floral: 0,
      spicy: 0,
      woody: 0,
      smoky: 0,
      peaty: 0
    },
    averagePrice: 0,
    averageAge: 0
  };
  
  if (!bottles || bottles.length === 0) {
    return analysis;
  }
  
  // Calculate totals and counts
  let totalPrice = 0;
  let totalAge = 0;
  let ageCount = 0;
  
  bottles.forEach(bottle => {
    // Analyze regions
    if (bottle.region) {
      analysis.regions[bottle.region] = (analysis.regions[bottle.region] || 0) + 1;
    }
    
    // Analyze distillers
    if (bottle.distiller) {
      analysis.distillers[bottle.distiller] = (analysis.distillers[bottle.distiller] || 0) + 1;
    }
    
    // Analyze types
    if (bottle.type) {
      const type = bottle.subType ? `${bottle.type} - ${bottle.subType}` : bottle.type;
      analysis.types[type] = (analysis.types[type] || 0) + 1;
    }
    
    // Analyze age groups
    if (bottle.age) {
      if (bottle.age <= 10) {
        analysis.ageGroups['0-10 years']++;
      } else if (bottle.age <= 15) {
        analysis.ageGroups['11-15 years']++;
      } else if (bottle.age <= 20) {
        analysis.ageGroups['16-20 years']++;
      } else {
        analysis.ageGroups['21+ years']++;
      }
      totalAge += bottle.age;
      ageCount++;
    } else {
      analysis.ageGroups['No Age Statement']++;
    }
    
    // Analyze price ranges
    if (bottle.price) {
      if (bottle.price < 50) {
        analysis.priceRanges['Budget (< $50)']++;
      } else if (bottle.price < 100) {
        analysis.priceRanges['Value ($50-$100)']++;
      } else if (bottle.price < 200) {
        analysis.priceRanges['Premium ($100-$200)']++;
      } else {
        analysis.priceRanges['Luxury (> $200)']++;
      }
      totalPrice += bottle.price;
    }
    
    // Analyze flavor profile
    const bottleProfile = getBottleFlavorProfile(bottle);
    Object.keys(bottleProfile).forEach(key => {
      analysis.flavorProfile[key as keyof FlavorProfile] += bottleProfile[key as keyof FlavorProfile];
    });
  });
  
  // Calculate averages
  analysis.averagePrice = totalPrice / bottles.length;
  analysis.averageAge = ageCount > 0 ? totalAge / ageCount : 0;
  
  // Normalize flavor profile
  Object.keys(analysis.flavorProfile).forEach(key => {
    analysis.flavorProfile[key as keyof FlavorProfile] /= bottles.length;
  });
  
  // Determine favorites
  let maxRegionCount = 0;
  let maxDistillerCount = 0;
  
  Object.entries(analysis.regions).forEach(([region, count]) => {
    if (count > maxRegionCount) {
      maxRegionCount = count;
      analysis.favoriteRegion = region;
    }
  });
  
  Object.entries(analysis.distillers).forEach(([distiller, count]) => {
    if (count > maxDistillerCount) {
      maxDistillerCount = count;
      analysis.favoriteDistiller = distiller;
    }
  });
  
  return analysis;
};

// Calculate similarity between two flavor profiles
const calculateFlavorSimilarity = (profile1: FlavorProfile, profile2: FlavorProfile): number => {
  let similarity = 0;
  let total = 0;
  
  Object.keys(profile1).forEach(key => {
    const flavorKey = key as keyof FlavorProfile;
    const diff = Math.abs(profile1[flavorKey] - profile2[flavorKey]);
    similarity += (1 - diff);
    total++;
  });
  
  return total > 0 ? similarity / total : 0;
};

// Calculate similarity between two bottles
const calculateBottleSimilarity = (bottle1: Bottle, bottle2: Bottle): number => {
  let score = 0;
  let factors = 0;
  
  // Region similarity
  if (bottle1.region && bottle2.region) {
    score += bottle1.region === bottle2.region ? 1 : 0;
    factors++;
  }
  
  // Distiller similarity
  if (bottle1.distiller && bottle2.distiller) {
    score += bottle1.distiller === bottle2.distiller ? 1 : 0;
    factors++;
  }
  
  // Type similarity
  if (bottle1.type && bottle2.type) {
    score += bottle1.type === bottle2.type ? 1 : 0;
    factors++;
    
    // Subtype similarity (only if types match)
    if (bottle1.type === bottle2.type && bottle1.subType && bottle2.subType) {
      score += bottle1.subType === bottle2.subType ? 1 : 0;
      factors++;
    }
  }
  
  // Age similarity (within 5 years)
  if (bottle1.age && bottle2.age) {
    score += Math.abs(bottle1.age - bottle2.age) <= 5 ? 1 : 0;
    factors++;
  }
  
  // Price similarity (within 25% range)
  if (bottle1.price && bottle2.price) {
    const priceDiff = Math.abs(bottle1.price - bottle2.price) / Math.max(bottle1.price, bottle2.price);
    score += priceDiff <= 0.25 ? 1 : 0;
    factors++;
  }
  
  // Flavor profile similarity
  const profile1 = getBottleFlavorProfile(bottle1);
  const profile2 = getBottleFlavorProfile(bottle2);
  const flavorSimilarity = calculateFlavorSimilarity(profile1, profile2);
  score += flavorSimilarity;
  factors++;
  
  return factors > 0 ? score / factors : 0;
};

// Check if a bottle is already in the user's collection
const isBottleInCollection = (bottle: Bottle, collection: Bottle[]): boolean => {
  return collection.some(b => b.id === bottle.id);
};

// Generate personalized bottle recommendations
export const generateRecommendations = (
  userBottles: Bottle[],
  userProfile: CollectionAnalysis,
  limit: number = 5
): BottleRecommendation[] => {
  if (!userBottles || userBottles.length === 0 || !MOCK_BOTTLE_DATABASE) {
    return [];
  }
  
  // Calculate scores for each potential recommendation
  const scoredRecommendations: BottleRecommendation[] = MOCK_BOTTLE_DATABASE
    .filter(bottle => !isBottleInCollection(bottle, userBottles)) // Exclude bottles already in collection
    .map(bottle => {
      // Calculate match score based on multiple factors
      let totalScore = 0;
      const bottleProfile = getBottleFlavorProfile(bottle);
      const reasons: RecommendationReason[] = [];
      
      // 1. Flavor profile similarity
      const flavorSimilarity = calculateFlavorSimilarity(bottleProfile, userProfile.flavorProfile);
      if (flavorSimilarity > 0.7) {
        reasons.push({
          type: 'similar',
          description: `Matches your preferred flavor profile with similar ${getTopFlavors(bottleProfile)} characteristics.`,
          score: flavorSimilarity
        });
        totalScore += flavorSimilarity;
      }
      
      // 2. Similar bottles in collection
      const mostSimilarBottle = userBottles.reduce(
        (best, userBottle) => {
          const similarity = calculateBottleSimilarity(bottle, userBottle);
          return similarity > best.similarity ? { bottle: userBottle, similarity } : best;
        },
        { bottle: null as Bottle | null, similarity: 0 }
      );
      
      if (mostSimilarBottle.similarity > 0.7 && mostSimilarBottle.bottle) {
        reasons.push({
          type: 'similar',
          description: `Similar to ${mostSimilarBottle.bottle.name} in your collection.`,
          score: mostSimilarBottle.similarity
        });
        totalScore += mostSimilarBottle.similarity;
      }
      
      // 3. Complementary to collection
      if (
        (isFromFavoriteRegion(bottle, userProfile) && hasComplement(bottle, userBottles)) ||
        isFromFavoriteDistiller(bottle, userProfile)
      ) {
        const complementScore = 0.85;
        reasons.push({
          type: 'complementary',
          description: `Complements your collection with its ${bottle.region || bottle.distiller} character.`,
          score: complementScore
        });
        totalScore += complementScore;
      }
      
      // 4. Value factor (appropriate price range)
      const valueScore = calculateValueScore(bottle, userProfile.averagePrice);
      if (valueScore > 0.7) {
        reasons.push({
          type: 'value',
          description: `Good value within your typical price range.`,
          score: valueScore
        });
        totalScore += valueScore;
      }
      
      // If we have valid reasons, calculate overall match score
      const matchScore = reasons.length > 0 ? totalScore / reasons.length : 0;
      
      return {
        bottle,
        reasons,
        matchScore
      };
    })
    .filter(rec => rec.reasons.length > 0) // Only keep bottles with at least one good reason
    .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score (highest first)
  
  // Return top recommendations (limited to requested amount)
  return scoredRecommendations.slice(0, limit);
};

// Helper functions for recommendation logic
const getTopFlavors = (profile: FlavorProfile): string => {
  const sortedFlavors = Object.entries(profile)
    .sort(([, a], [, b]) => b - a)
    .filter(([, value]) => value > 0.3)
    .map(([key]) => key);
  
  return sortedFlavors.slice(0, 2).join(' and ');
};

const isFromFavoriteRegion = (bottle: Bottle, userProfile: CollectionAnalysis): boolean => {
  return !!bottle.region && bottle.region === userProfile.favoriteRegion;
};

const isFromFavoriteDistiller = (bottle: Bottle, userProfile: CollectionAnalysis): boolean => {
  return !!bottle.distiller && bottle.distiller === userProfile.favoriteDistiller;
};

const hasComplement = (bottle: Bottle, collection: Bottle[]): boolean => {
  // Check if this bottle would add diversity
  // Example: If user has mostly Speyside, an Islay would be complementary
  if (!bottle.region) return false;
  
  const regionCounts: Record<string, number> = {};
  collection.forEach(b => {
    if (b.region) {
      regionCounts[b.region] = (regionCounts[b.region] || 0) + 1;
    }
  });
  
  // If this region is underrepresented in collection
  return !regionCounts[bottle.region] || regionCounts[bottle.region] < 2;
};

const calculateValueScore = (bottle: Bottle, averagePrice: number): number => {
  if (!bottle.price || averagePrice === 0) return 0;
  
  // Calculate how close the bottle price is to user's average
  const priceDiff = Math.abs(bottle.price - averagePrice) / averagePrice;
  
  // Score is higher when price is within 30% of average
  return priceDiff <= 0.3 ? 1 - priceDiff : 0;
};