import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BarData } from '../../types/Bottle';

// Endpoint to proxy requests to the BAXUS API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username } = req.query;

  // Validate username parameter
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // Make request to BAXUS API
    const response = await axios.get(
      `http://services.baxus.co/api/bar/user/${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the response data
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching bar data:', error);
    
    // If this is a development environment, return mock data
    if (process.env.NODE_ENV === 'development') {
      const mockData: BarData = {
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
      
      return res.status(200).json(mockData);
    }
    
    // Handle different error scenarios
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        message: `Error from BAXUS API: ${error.response.statusText}`,
      });
    }
    
    return res.status(500).json({ message: 'Failed to fetch bar data' });
  }
}