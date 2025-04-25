// File: src/pages/api/recommendations-gpt.ts
// Replace the entire file with this updated code

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { Bottle, BottleRecommendation } from '../../types/Bottle';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Map BAXUS API data to Bottle format
const mapBaxusBottle = (item: any): Bottle => ({
  id: item.product.id.toString(),
  name: item.product.name,
  distiller: item.product.brand,
  region: determineRegionFromSpirit(item.product.spirit),
  country: determineCountryFromSpirit(item.product.spirit),
  type: item.product.spirit,
  subType: '', 
  age: undefined,
  abv: item.product.proof / 2,
  price: item.product.average_msrp || item.product.fair_price || item.product.shelf_price,
  rating: item.product.popularity ? (Math.min(item.product.popularity / 20000, 5)) : undefined,
  tasting_notes: [],
  image_url: item.product.image_url,
});

// Map Supabase bottle to Bottle format
const mapSupabaseBottle = (bottle: any): Bottle => ({
  id: bottle.id.toString(),
  name: bottle.name || 'Unknown',
  distiller: bottle.brand_id || 'Unknown Distillery',
  region: determineRegionFromSpirit(bottle.spirit_type),
  country: determineCountryFromSpirit(bottle.spirit_type),
  type: bottle.spirit_type || 'Unknown',
  subType: '', 
  age: undefined,
  abv: bottle.abv || (bottle.proof ? parseFloat(bottle.proof) / 2 : null),
  price: parseFloat(bottle.avg_msrp) || bottle.fair_price || bottle.shelf_price || 0,
  rating: bottle.popularity ? (Math.min(parseFloat(bottle.popularity) / 20000, 5)) : undefined,
  tasting_notes: [], 
  image_url: bottle.image_url || '/images/bottle-placeholder.jpg',
});

// Helper functions
function determineRegionFromSpirit(spirit: string): string {
  if (!spirit) return 'Unknown';
  if (spirit && spirit.includes('Bourbon')) return 'Kentucky';
  if (spirit && spirit.includes('Scotch')) return 'Scotland';
  if (spirit && spirit.includes('Irish')) return 'Ireland';
  if (spirit && spirit.includes('Japanese')) return 'Japan';
  return 'Unknown';
}

function determineCountryFromSpirit(spirit: string): string {
  if (!spirit) return 'Unknown';
  if (spirit && spirit.includes('Bourbon')) return 'USA';
  if (spirit && spirit.includes('Scotch')) return 'Scotland';
  if (spirit && spirit.includes('Irish')) return 'Ireland';
  if (spirit && spirit.includes('Japanese')) return 'Japan';
  return 'Unknown';
}

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
    // Step 1: Get user's bottles from BAXUS API
    let userBottles: Bottle[] = [];
    
    try {
      console.log(`Fetching BAXUS data for username: ${username}`);
      const response = await axios.get(`https://services.baxus.co/api/bar/user/${encodeURIComponent(username)}`);
      userBottles = response.data.map(mapBaxusBottle);
      console.log(`Found ${userBottles.length} bottles for user ${username}`);
    } catch (error) {
      console.error('Error fetching from BAXUS API:', error);
      return res.status(404).json({ 
        message: 'User not found or empty collection',
        userNotFound: true
      });
    }
    
    if (!userBottles || userBottles.length === 0) {
      return res.status(404).json({ 
        message: 'Empty collection',
        userNotFound: false,
        emptyCollection: true
      });
    }
    
    // Step 2: Fetch candidate bottles from Supabase
    let candidateBottles: Bottle[] = [];
    
    try {
      console.log('Fetching candidate bottles from Supabase');
      
      // Extract user preferences for better recommendations
      const spiritTypes = userBottles
        .map(bottle => bottle.type)
        .filter((value, index, self) => self.indexOf(value) === index);
      
      console.log('User spirit types:', spiritTypes);
      
      // Query all bottles from Supabase - fetching up to 20 bottles
      // We're fetching based on the table structure you provided
      const { data, error } = await supabase
        .from('bottles')
        .select('*')
        .limit(10);
      
      if (error) {
        console.error('Error querying bottles:', error);
        throw error;
      }
      
      console.log(`Retrieved ${data?.length || 0} bottles from Supabase`);
      
      if (!data || data.length === 0) {
        throw new Error('No bottles found in database');
      }
      
      // Map and filter out bottles already in user's collection
      const userBottleIds = userBottles.map(b => b.id);
      candidateBottles = data
        .filter(bottle => !userBottleIds.includes(bottle.id.toString()))
        .map(mapSupabaseBottle);
      
      console.log(`After filtering, have ${candidateBottles.length} candidate bottles`);
      console.log('Candidate bottles:', candidateBottles);
      
      if (candidateBottles.length === 0) {
        throw new Error('No candidate bottles available after filtering out user bottles');
      }
    } catch (error) {
      console.error('Error with Supabase bottles:', error);
      return res.status(500).json({ 
        message: 'Failed to get candidate bottles from database',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    // Step 3: Get recommendations using OpenAI API
    try {
      console.log('Sending data to OpenAI for analysis');
      
      // Create prompt
      const prompt = `
I need you to analyze a user's whisky collection and recommend the best bottles from a candidate list.

USER'S COLLECTION:
${JSON.stringify(userBottles, null, 2)}

CANDIDATE BOTTLES:
${JSON.stringify(candidateBottles, null, 2)}

Based on the user's collection, select ${Math.min(candidateBottles.length, 5)} bottles from the candidate list that would best complement their collection. 
For each recommended bottle, provide:
1. A match score between 0.0 and 1.0
2. 2-3 specific reasons for the recommendation, considering:
   - Flavor profile similarity or complementary nature
   - Price value relative to the user's spending habits
   - Collection diversity (regions, distillers, types)
   - Popularity and ratings

Format your response as a JSON object with this structure:
{
  "recommendations": [
    {
      "bottleId": "id of the bottle",
      "matchScore": 0.85,
      "reasons": [
        {
          "type": "similar",
          "description": "Reason text here"
        },
        {
          "type": "value",
          "description": "Reason text here"
        }
      ]
    }
  ]
}

The "type" for each reason should be one of: "similar", "complementary", "value", or "trending".
`;
      
      // Call OpenAI API
  // Fix for src/pages/api/recommendations-gpt.ts
// Replace lines 206-219 with this corrected code:

const openaiResponse = await axios.post(
  'https://api.openai.com/v1/chat/completions',
  {
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are Bob, an AI whisky butler expert. Your task is to analyze a user\'s whisky collection and recommend bottles from a candidate list. Provide detailed reasoning for each recommendation.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: { type: 'json_object' }
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  }
);
      
      console.log('Received response from OpenAI');
      
      // Parse and transform GPT response
      const gptResponse = JSON.parse(openaiResponse.data.choices[0].message.content);
      
      if (!gptResponse.recommendations || !Array.isArray(gptResponse.recommendations)) {
        throw new Error('Invalid response format from OpenAI');
      }
      
      const recommendations = gptResponse.recommendations
        .map((rec: any) => {
          const bottle = candidateBottles.find(b => b.id === rec.bottleId);
          if (!bottle) return null;
          
          return {
            bottle,
            reasons: rec.reasons || [],
            matchScore: rec.matchScore || 0.5
          };
        })
        .filter(Boolean);
      
      console.log(`Generated ${recommendations.length} recommendations`);
      
      // Return the recommendations
      return res.status(200).json(recommendations);
      
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      return res.status(500).json({ 
        message: 'Failed to generate recommendations with GPT',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Unexpected error in recommendations API:', error);
    return res.status(500).json({ 
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}