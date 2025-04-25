// src/services/api.ts
import axios from 'axios';
import { BarData, BottleRecommendation } from '../types/Bottle';
import { fetchUserCollection } from './bottleService';

// Fetch user's bar data
export const fetchBarData = async (username: string): Promise<BarData> => {
  try {
    console.log(`Fetching data for username: ${username}`);
    
    // Fetch the user's collection from Supabase
    const bottles = await fetchUserCollection(username);
    
    if (bottles.length === 0) {
      console.log(`No bottles found for username: ${username}`);
      return {
        user: username,
        bottles: [],
        userNotFound: true
      };
    }
    
    console.log(`Found ${bottles.length} bottles for username: ${username}`);
    return {
      user: username,
      bottles
    };
  } catch (error) {
    console.error('Unexpected error in fetchBarData:', error);
    
    return {
      user: username,
      bottles: [],
      userNotFound: true
    };
  }
};

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