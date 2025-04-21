import { Bottle, FlavorProfile } from '../types/Bottle';

// Helper functions for deeper bottle analysis

// Group bottles by region
export const groupByRegion = (bottles: Bottle[]): Record<string, Bottle[]> => {
  const grouped: Record<string, Bottle[]> = {};
  
  bottles.forEach(bottle => {
    if (bottle.region) {
      if (!grouped[bottle.region]) {
        grouped[bottle.region] = [];
      }
      grouped[bottle.region].push(bottle);
    }
  });
  
  return grouped;
};

// Group bottles by distiller
export const groupByDistiller = (bottles: Bottle[]): Record<string, Bottle[]> => {
  const grouped: Record<string, Bottle[]> = {};
  
  bottles.forEach(bottle => {
    if (bottle.distiller) {
      if (!grouped[bottle.distiller]) {
        grouped[bottle.distiller] = [];
      }
      grouped[bottle.distiller].push(bottle);
    }
  });
  
  return grouped;
};

// Group bottles by type/subtype
export const groupByType = (bottles: Bottle[]): Record<string, Bottle[]> => {
  const grouped: Record<string, Bottle[]> = {};
  
  bottles.forEach(bottle => {
    if (bottle.type) {
      const typeKey = bottle.subType ? `${bottle.type} - ${bottle.subType}` : bottle.type;
      if (!grouped[typeKey]) {
        grouped[typeKey] = [];
      }
      grouped[typeKey].push(bottle);
    }
  });
  
  return grouped;
};

// Group bottles by age range
export const groupByAgeRange = (bottles: Bottle[]): Record<string, Bottle[]> => {
  const ageRanges = {
    'No Age Statement': [] as Bottle[],
    '0-10 years': [] as Bottle[],
    '11-15 years': [] as Bottle[],
    '16-20 years': [] as Bottle[],
    '21+ years': [] as Bottle[]
  };
  
  bottles.forEach(bottle => {
    if (!bottle.age) {
      ageRanges['No Age Statement'].push(bottle);
    } else if (bottle.age <= 10) {
      ageRanges['0-10 years'].push(bottle);
    } else if (bottle.age <= 15) {
      ageRanges['11-15 years'].push(bottle);
    } else if (bottle.age <= 20) {
      ageRanges['16-20 years'].push(bottle);
    } else {
      ageRanges['21+ years'].push(bottle);
    }
  });
  
  return ageRanges;
};

// Group bottles by price range
export const groupByPriceRange = (bottles: Bottle[]): Record<string, Bottle[]> => {
  const priceRanges = {
    'Budget (< $50)': [] as Bottle[],
    'Value ($50-$100)': [] as Bottle[],
    'Premium ($100-$200)': [] as Bottle[],
    'Luxury (> $200)': [] as Bottle[],
    'Unknown': [] as Bottle[]
  };
  
  bottles.forEach(bottle => {
    if (!bottle.price) {
      priceRanges['Unknown'].push(bottle);
    } else if (bottle.price < 50) {
      priceRanges['Budget (< $50)'].push(bottle);
    } else if (bottle.price < 100) {
      priceRanges['Value ($50-$100)'].push(bottle);
    } else if (bottle.price < 200) {
      priceRanges['Premium ($100-$200)'].push(bottle);
    } else {
      priceRanges['Luxury (> $200)'].push(bottle);
    }
  });
  
  return priceRanges;
};

// Parse tasting notes to get flavor profile
export const parseFlavorProfile = (bottles: Bottle[]): FlavorProfile => {
  const combinedProfile: FlavorProfile = {
    sweet: 0,
    fruity: 0,
    floral: 0,
    spicy: 0,
    woody: 0,
    smoky: 0,
    peaty: 0
  };
  
  const flavorKeywords: Record<keyof FlavorProfile, string[]> = {
    sweet: ['sweet', 'honey', 'vanilla', 'caramel', 'toffee', 'chocolate', 'sugar', 'maple'],
    fruity: ['fruit', 'apple', 'pear', 'citrus', 'orange', 'lemon', 'banana', 'berry', 'cherry', 'raisin'],
    floral: ['floral', 'flower', 'blossom', 'rose', 'violet', 'lavender', 'heather'],
    spicy: ['spice', 'spicy', 'pepper', 'cinnamon', 'clove', 'nutmeg', 'ginger'],
    woody: ['wood', 'oak', 'cedar', 'pine', 'barrel', 'sherry', 'bourbon', 'rum'],
    smoky: ['smoke', 'smoky', 'ash', 'char', 'tobacco', 'leather', 'burnt'],
    peaty: ['peat', 'peaty', 'earth', 'moss', 'soil', 'medicinal', 'iodine', 'seaweed']
  };
  
  let totalBottlesWithNotes = 0;
  
  bottles.forEach(bottle => {
    if (bottle.tasting_notes && bottle.tasting_notes.length) {
      totalBottlesWithNotes++;
      
      // Analyze each tasting note for flavor cues
      bottle.tasting_notes.forEach(note => {
        const lowerNote = note.toLowerCase();
        
        // Check each flavor category for matching keywords
        Object.entries(flavorKeywords).forEach(([flavor, keywords]) => {
          if (keywords.some(keyword => lowerNote.includes(keyword))) {
            combinedProfile[flavor as keyof FlavorProfile]++;
          }
        });
      });
    }
  });
  
  // Normalize values if we have any bottles with notes
  if (totalBottlesWithNotes > 0) {
    Object.keys(combinedProfile).forEach(key => {
      combinedProfile[key as keyof FlavorProfile] /= totalBottlesWithNotes;
    });
  }
  
  return combinedProfile;
};

// Find the most common region in the collection
export const getMostCommonRegion = (bottles: Bottle[]): string | null => {
  const regions = bottles
    .filter(bottle => bottle.region)
    .map(bottle => bottle.region as string);
  
  if (regions.length === 0) return null;
  
  const regionCounts: Record<string, number> = {};
  let maxCount = 0;
  let mostCommonRegion: string | null = null;
  
  regions.forEach(region => {
    regionCounts[region] = (regionCounts[region] || 0) + 1;
    if (regionCounts[region] > maxCount) {
      maxCount = regionCounts[region];
      mostCommonRegion = region;
    }
  });
  
  return mostCommonRegion;
};

// Calculate average price of the collection
export const getAveragePrice = (bottles: Bottle[]): number => {
  const bottlesWithPrice = bottles.filter(bottle => bottle.price);
  if (bottlesWithPrice.length === 0) return 0;
  
  const sum = bottlesWithPrice.reduce((acc, bottle) => acc + (bottle.price || 0), 0);
  return sum / bottlesWithPrice.length;
};

// Calculate average age of the collection
export const getAverageAge = (bottles: Bottle[]): number => {
  const bottlesWithAge = bottles.filter(bottle => bottle.age);
  if (bottlesWithAge.length === 0) return 0;
  
  const sum = bottlesWithAge.reduce((acc, bottle) => acc + (bottle.age || 0), 0);
  return sum / bottlesWithAge.length;
};