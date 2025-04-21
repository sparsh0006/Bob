import axios from 'axios';
import { BarData, BottleRecommendation } from '../types/Bottle';
import { analyzeTasteProfile, generateRecommendations } from './recommendationEngine';

// Base URL for the BAXUS API
const API_BASE_URL = 'http://services.baxus.co/api';

// API endpoints
const ENDPOINTS = {
  BAR: (username: string) => `${API_BASE_URL}/bar/user/${username}`,
  BOTTLES: `${API_BASE_URL}/bottles`,
};

// Fetch user's bar data
export const fetchBarData = async (username: string): Promise<BarData> => {
  try {
    // For demo/development, use local mock data
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock data
      return {
        user: username,
        bottles: Array(5).fill(null).map((_, index) => ({
          id: `mock-${index}`,
          name: `Sample Whisky ${index + 1}`,
          distiller: ['Macallan', 'Glenlivet', 'Laphroaig', 'Hibiki', 'Buffalo Trace'][index],
          region: ['Speyside', 'Highlands', 'Islay', 'Japan', 'Kentucky'][index],
          country: ['Scotland', 'Scotland', 'Scotland', 'Japan', 'USA'][index],
          type: 'Whisky',
          subType: ['Single Malt', 'Single Malt', 'Single Malt', 'Blended', 'Bourbon'][index],
          age: [18, 12, 10, undefined, 8][index],
          abv: [43, 40, 46, 43, 45][index],
          price: [280, 60, 75, 120, 40][index],
          rating: [4.7, 4.2, 4.5, 4.6, 4.3][index],
          tasting_notes: [
            ['Dried fruit', 'Sherry', 'Oak'],
            ['Apple', 'Vanilla', 'Floral'],
            ['Smoke', 'Seaweed', 'Medicinal'],
            ['Honey', 'Orange', 'Light oak'],
            ['Caramel', 'Vanilla', 'Cinnamon']
          ][index],
          image_url: `/images/bottle-placeholder.jpg`
        }))
      };
    }
    
    // Real API call
    const response = await axios.get(ENDPOINTS.BAR(username));
    return response.data;
  } catch (error) {
    console.error('Error fetching bar data:', error);
    throw new Error('Failed to fetch bar data. Please try again later.');
  }
};

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