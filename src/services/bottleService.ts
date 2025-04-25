// src/services/bottleService.ts
import { supabase } from './supabase';
import { Bottle } from '../types/Bottle';

// Map Supabase bottle data to your application's Bottle interface
export const mapSupabaseBottle = (bottle: any): Bottle => {
  return {
    id: bottle.id.toString(),
    name: bottle.name || 'Unknown',
    distiller: bottle.brand_id || 'Unknown Distillery',
    region: determineRegionFromSpirit(bottle.spirit_type),
    country: determineCountryFromSpirit(bottle.spirit_type),
    type: bottle.spirit_type || 'Unknown',
    subType: '', 
    age: undefined,
    abv: bottle.abv || bottle.proof ? bottle.proof / 2 : undefined,
    price: bottle.avg_msrp || bottle.fair_price || bottle.shelf_price || 0,
    rating: bottle.popularity ? (Math.min(bottle.popularity / 20000, 5)) : undefined,
    tasting_notes: [], 
    image_url: bottle.image_url || '/images/bottle-placeholder.jpg',
    // Additional fields
    spirit_type: bottle.spirit_type,
    brand_id: bottle.brand_id,
    popularity: bottle.popularity,
    proof: bottle.proof,
    total_score: bottle.total_score,
    wishlist_count: bottle.wishlist_count,
    vote_count: bottle.vote_count,
    bar_count: bottle.bar_count,
    ranking: bottle.ranking
  };
};

// Helper functions
export function determineRegionFromSpirit(spirit: string): string {
  if (!spirit) return 'Unknown';
  if (spirit.includes('Bourbon')) return 'Kentucky';
  if (spirit.includes('Scotch')) return 'Scotland';
  if (spirit.includes('Irish')) return 'Ireland';
  if (spirit.includes('Japanese')) return 'Japan';
  return 'Unknown';
}

export function determineCountryFromSpirit(spirit: string): string {
  if (!spirit) return 'Unknown';
  if (spirit.includes('Bourbon')) return 'USA';
  if (spirit.includes('Scotch')) return 'Scotland';
  if (spirit.includes('Irish')) return 'Ireland';
  if (spirit.includes('Japanese')) return 'Japan';
  return 'Unknown';
}

// Fetch user's collection from Supabase
export const fetchUserCollection = async (username: string): Promise<Bottle[]> => {
  try {
    console.log(`Fetching collection for username: ${username} from Supabase`);
    
    // First, get the user's collection
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('bottle_ids')
      .eq('username', username)
      .single();
    
    if (userError || !userData || !userData.bottle_ids || userData.bottle_ids.length === 0) {
      console.log('No collection found for user:', username);
      return [];
    }
    
    console.log(`Found collection with ${userData.bottle_ids.length} bottles`);
    
    // Then, fetch the bottles in that collection
    const { data: bottleData, error: bottleError } = await supabase
      .from('bottles')
      .select('*')
      .in('id', userData.bottle_ids);
    
    if (bottleError || !bottleData) {
      console.error('Error fetching bottle data:', bottleError);
      return [];
    }
    
    // Map to your Bottle interface
    return bottleData.map(mapSupabaseBottle);
  } catch (error) {
    console.error('Error fetching user collection:', error);
    return [];
  }
};

// Fetch top candidate bottles from Supabase
export const fetchCandidateBottles = async (
  userBottles: Bottle[],
  limit: number = 10
): Promise<Bottle[]> => {
  try {
    console.log(`Fetching ${limit} candidate bottles from Supabase`);
    
    // Extract user preferences from current collection
    const spiritTypes = userBottles
      .map(bottle => bottle.type)
      .filter((value, index, self) => self.indexOf(value) === index);
    
    const avgPrice = userBottles.reduce((sum, bottle) => 
      sum + (bottle.price || 0), 0) / userBottles.length || 100;
    
    const priceRange = {
      min: Math.max(avgPrice * 0.7, 20),  // Set minimum price floor
      max: avgPrice * 1.3
    };
    
    // Query Supabase for candidate bottles
    const { data, error } = await supabase
      .from('bottles')
      .select('*')
      .in('spirit_type', spiritTypes.length > 0 ? spiritTypes : [])
      .gte('avg_msrp', priceRange.min)
      .lte('avg_msrp', priceRange.max)
      .order('popularity', { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.error('Error fetching candidate bottles:', error);
      return [];
    }
    
    // Filter out bottles already in the user's collection
    const userBottleIds = userBottles.map(b => b.id);
    const filteredCandidates = data.filter(bottle => 
      !userBottleIds.includes(bottle.id.toString()));
    
    return filteredCandidates.map(mapSupabaseBottle);
  } catch (error) {
    console.error('Error fetching candidate bottles:', error);
    return [];
  }
};