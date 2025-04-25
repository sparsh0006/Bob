// src/pages/api/recommendations-gpt.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUserCollection, fetchCandidateBottles } from '../../services/bottleService';
import { analyzeBottlesWithGPT } from '../../services/gptService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username } = req.query;
  console.log(`API received request for username: ${username}`);

  // Validate username parameter
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // Step 1: Get user's collection
    const userBottles = await fetchUserCollection(username);
    
    // Check if the user has any bottles
    if (userBottles.length === 0) {
      return res.status(404).json({ 
        message: 'User not found or empty collection',
        userNotFound: true
      });
    }
    
    // Step 2: Fetch candidate bottles from Supabase
    const candidateBottles = await fetchCandidateBottles(userBottles, 10);
    
    if (candidateBottles.length === 0) {
      return res.status(200).json([]);
    }
    
    // Step 3: Generate recommendations using GPT
    const recommendations = await analyzeBottlesWithGPT(
      userBottles,
      candidateBottles,
      5
    );
    
    // Return the recommendations
    return res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return res.status(500).json({ 
      message: 'Failed to generate recommendations',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}