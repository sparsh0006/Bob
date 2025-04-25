// src/services/api.ts
import axios from 'axios';
import { BarData, BottleRecommendation } from '../types/Bottle';

// Fetch user's bar data from BAXUS API
export const fetchBarData = async (username: string): Promise<BarData> => {
  try {
    console.log(`Fetching data for username: ${username}`);
    
    try {
      // Fetch from BAXUS API endpoint
      const response = await axios.get(`/api/bar?username=${encodeURIComponent(username)}`);
      console.log('API response:', response.data);
      
      // If successful, transform the data
      return {
        user: username,
        bottles: response.data.map((item: any) => ({
          id: item.product.id.toString(),
          name: item.product.name,
          distiller: item.product.brand,
          region: determineRegionFromSpirit(item.product.spirit),
          country: determineCountryFromSpirit(item.product.spirit),
          type: item.product.spirit,
          subType: '', 
          age: null,
          abv: item.product.proof / 2,
          price: item.product.average_msrp || item.product.fair_price || item.product.shelf_price,
          rating: item.product.popularity ? (Math.min(item.product.popularity / 20000, 5)) : null,
          tasting_notes: [],
          image_url: item.product.image_url,
        }))
      };
    } catch (proxyError) {
      console.error('Error fetching from BAXUS API:', proxyError);
      
      // Return a user not found response
      return {
        user: username,
        bottles: [],
        userNotFound: true
      };
    }
  } catch (error) {
    console.error('Unexpected error in fetchBarData:', error);
    
    return {
      user: username,
      bottles: [],
      userNotFound: true
    };
  }
};

// Helper functions
function determineRegionFromSpirit(spirit: string): string {
  if (!spirit) return 'Unknown';
  if (spirit.includes('Bourbon')) return 'Kentucky';
  if (spirit.includes('Scotch')) return 'Scotland';
  return 'Unknown';
}

function determineCountryFromSpirit(spirit: string): string {
  if (!spirit) return 'Unknown';
  if (spirit.includes('Bourbon')) return 'USA';
  if (spirit.includes('Scotch')) return 'Scotland';
  return 'Unknown';
}

// Get recommendations for a user
export const getRecommendationsForUser = async (username: string): Promise<BottleRecommendation[]> => {
  try {
    console.log(`Getting recommendations for user: ${username}`);
    
    // Call the recommendations API
    const response = await axios.get(`/api/recommendations-gpt?username=${encodeURIComponent(username)}`);
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw new Error('Failed to get recommendations. Please try again later.');
  }
};