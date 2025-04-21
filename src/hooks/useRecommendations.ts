import { useState } from 'react';
import { BottleRecommendation } from '../types/Bottle';
import { getRecommendationsForUser } from '../services/api';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<BottleRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (username: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getRecommendationsForUser(username);
      setRecommendations(data);
      return data;
    } catch (err) {
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