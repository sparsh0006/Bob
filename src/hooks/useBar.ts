import { useState } from 'react';
import { BarData } from '../types/Bottle';
import { fetchBarData } from '../services/api';

export const useBar = () => {
  const [barData, setBarData] = useState<BarData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBar = async (username: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchBarData(username);
      setBarData(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    barData,
    isLoading,
    error,
    fetchBar,
  };
};