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
      // Log the error in terminal but don't expose it to frontend
      console.log(`Error fetching data for ${username}:`, error);
      
      // Return 200 (not 404) with userNotFound flag
      // This is the key change - return 200 status with userNotFound flag
      return res.status(200).json({ 
        user: username,
        bottles: [],
        userNotFound: true,
        message: `No bar data found for username: ${username}`
      });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    // Also return 200 here to prevent frontend errors
    return res.status(200).json({ 
      user: req.query.username as string || 'unknown',
      bottles: [],
      userNotFound: true,
      error: 'Failed to fetch bar data. Please try again later.'
    });
  }
}