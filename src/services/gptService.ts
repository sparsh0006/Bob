// src/services/gptService.ts
import { Bottle, BottleRecommendation, RecommendationReason } from '../types/Bottle';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Function to send bottles to GPT for analysis
export const analyzeBottlesWithGPT = async (
  userBottles: Bottle[],
  candidateBottles: Bottle[],
  limit: number = 5
): Promise<BottleRecommendation[]> => {
  try {
    console.log('Analyzing bottles with GPT');
    
    // Create prompt with user collection and candidate bottles
    const prompt = createAnalysisPrompt(userBottles, candidateBottles);
    
    // Make API call to OpenAI
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
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
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const recommendations = JSON.parse(data.choices[0].message.content);
    
    // Map GPT response to BottleRecommendation format
    return mapGPTResponseToRecommendations(recommendations, candidateBottles);
  } catch (error) {
    console.error('Error analyzing bottles with GPT:', error);
    
    // In case of error, generate recommendations without GPT
    return generateFallbackRecommendations(userBottles, candidateBottles, limit);
  }
};

// Create a structured prompt for GPT analysis
const createAnalysisPrompt = (userBottles: Bottle[], candidateBottles: Bottle[]): string => {
  return `
I need you to analyze a user's whisky collection and recommend the best bottles from a candidate list.

USER'S COLLECTION:
${JSON.stringify(userBottles, null, 2)}

CANDIDATE BOTTLES:
${JSON.stringify(candidateBottles, null, 2)}

Based on the user's collection, select 5 bottles from the candidate list that would best complement their collection. 
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
};

// Map GPT response to BottleRecommendation format
const mapGPTResponseToRecommendations = (
  gptResponse: any,
  candidateBottles: Bottle[]
): BottleRecommendation[] => {
  if (!gptResponse?.recommendations) {
    return [];
  }

  return gptResponse.recommendations
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
};

// Generate fallback recommendations if GPT fails
const generateFallbackRecommendations = (
  userBottles: Bottle[],
  candidateBottles: Bottle[],
  limit: number = 5
): BottleRecommendation[] => {
  console.log('Generating fallback recommendations');
  
  return candidateBottles.slice(0, limit).map((bottle, index) => {
    const matchScore = 0.95 - (index * 0.05);
    
    // Create custom reasons based on the bottle and user collection
    const reasons: RecommendationReason[] = [
      {
        type: 'similar',
        description: `Similar to ${userBottles[0]?.name || 'your collection'} with complementary flavor characteristics.`
      }
    ];
    
    // Add a value reason if the price is good
    if (bottle.price && bottle.price < 70) {
      reasons.push({
        type: 'value',
        description: `Excellent value at $${bottle.price}, offering quality comparable to more expensive bottles.`
      });
    } else {
      reasons.push({
        type: 'complementary',
        description: `Adds diversity to your collection with its unique ${bottle.type} character.`
      });
    }
    
    // Add a trending reason for higher-rated bottles
    if (bottle.rating && bottle.rating > 4.6) {
      reasons.push({
        type: 'trending',
        description: `Highly rated among whisky enthusiasts with a ${bottle.rating}/5 score.`
      });
    }
    
    return {
      bottle,
      reasons,
      matchScore
    };
  });
};