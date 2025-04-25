// src/hooks/useBar.ts
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
      console.log(`useBar: Fetching bar data for ${username}`);
      const data = await fetchBarData(username);
      console.log('useBar: Received bar data:', data);
      setBarData(data);
      return data;
    } catch (err) {
      console.error('useBar: Error fetching bar data:', err);
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