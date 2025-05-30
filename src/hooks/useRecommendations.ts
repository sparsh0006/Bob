// src/hooks/useRecommendations.ts
import { useState } from 'react';
import { BottleRecommendation } from '../types/Bottle';
import axios from 'axios';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<BottleRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (username: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`useRecommendations: Fetching recommendations for ${username}`);
      
      const response = await axios.get(`/api/recommendations-gpt?username=${encodeURIComponent(username)}`);
      console.log('useRecommendations: Received recommendations:', response.data);
      
      setRecommendations(response.data);
      return response.data;
    } catch (err) {
      console.error('useRecommendations: Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    recommendations,
    isLoading,
    error,
    getRecommendations,
  };
};