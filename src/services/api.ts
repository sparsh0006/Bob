import axios from 'axios';
import { BarData, BottleRecommendation } from '../types/Bottle';
import { analyzeTasteProfile, generateRecommendations } from './recommendationEngine';

// Base URL for the BAXUS API
const API_BASE_URL = 'https://services.baxus.co/api';

// API endpoints
// Update your ENDPOINTS object in api.ts
const ENDPOINTS = {
  BAR: (username: string) => `/api/bar?username=${encodeURIComponent(username)}`,
  BOTTLES: `/api/bottles`,
};

// Fetch user's bar data
// In src/services/api.ts
// In your fetchBarData function in src/services/api.ts
export const fetchBarData = async (username: string): Promise<BarData> => {
  try {
    console.log(`Fetching data for username: ${username}`);
    
    try {
      // Try to use our proxy API route
      const response = await axios.get(ENDPOINTS.BAR(username));
      
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
      console.log('User not found or API error, using mock data');
      
      // For any error, return a user not found response
      return {
        user: username,
        bottles: [],
        userNotFound: true
      };
    }
  } catch (error) {
    console.error('Unexpected error in fetchBarData:', error);
    
    // Even in case of unexpected errors, return a graceful response
    return {
      user: username,
      bottles: [],
      userNotFound: true
    };
  }
};

// Helper functions
function determineRegionFromSpirit(spirit: string): string {
  if (spirit.includes('Bourbon')) return 'Kentucky';
  if (spirit.includes('Scotch')) return 'Scotland';
  return 'Unknown';
}

function determineCountryFromSpirit(spirit: string): string {
  if (spirit.includes('Bourbon')) return 'USA';
  if (spirit.includes('Scotch')) return 'Scotland';
  return 'Unknown';
}

// Get recommendations for a user
export const getRecommendationsForUser = async (username: string): Promise<BottleRecommendation[]> => {
  try {
    // First, get the user's bar data
    const barData = await fetchBarData(username);
    
    // In a real implementation, we would fetch the full bottle database from the API
    // For demo purposes, we'll generate some dummy recommendations
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get user's taste profile
      const userProfile = analyzeTasteProfile(barData.bottles);
      
      // Generate recommendations
      return generateRecommendations(barData.bottles, userProfile);
    }
    
    // Real API call for recommendations would go here
    // const response = await axios.get(`${API_BASE_URL}/recommendations/${username}`);
    // return response.data;
    
    // For now, return empty array for production until API is ready
    return [];
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw new Error('Failed to get recommendations. Please try again later.');
  }
};