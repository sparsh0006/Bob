// src/pages/api/bar.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const username = req.query.username as string;
    
    console.log(`API Route received username query parameter: ${username}`);
    
    if (!username || username.trim() === '') {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    try {
      // Call the BAXUS API endpoint directly
      const response = await axios.get(`https://services.baxus.co/api/bar/user/${encodeURIComponent(username)}`);
      return res.status(200).json(response.data);
    } catch (error) {
      console.log(`Error fetching data for ${username}:`, error);
      // Return a structured user not found response
      return res.status(404).json({ 
        error: 'User not found',
        message: `No bar data found for username: ${username}`
      });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to fetch bar data. Please try again later.'
    });
  }
}