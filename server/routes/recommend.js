/**
 * Recommendation Route
 * 
 * POST /recommend
 * Receives user preferences and product list,
 * sends them to Gemini for intelligent matching,
 * and returns structured recommendations.
 */

const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const router = express.Router();

// Initialize Gemini client with API key from environment
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * POST /recommend
 * 
 * Request body:
 *   - preference (string): Natural language user preference
 *   - products (array): List of available products
 * 
 * Response:
 *   - recommendedProducts (array): Matching products with confidence scores
 *   - reason (string): AI explanation for recommendations
 */
router.post('/', async (req, res) => {
  try {
    const { preference, products } = req.body;

    // Validate required fields
    if (!preference || !preference.trim()) {
      return res.status(400).json({
        error: 'Please provide a shopping preference.',
      });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: 'Product list is required.',
      });
    }

    // Build the prompt for Gemini
    const systemPrompt = `You are an expert product recommendation assistant for an electronics store. 
Your job is to analyze customer preferences and match them with the best products from the available catalog.

RULES:
1. Analyze the user's preference carefully — consider price range, category, features, and use case.
2. Recommend 1-5 products that best match, ranked by relevance.
3. Assign a confidence score (0-100) to each recommendation.
4. Explain WHY each product matches the user's needs.
5. If no products match well, still suggest the closest options with lower confidence scores.

You MUST respond with ONLY valid JSON in this exact format, with no other text:
{
  "recommendedProducts": [
    {
      "id": <product_id>,
      "confidence": <0-100>,
      "matchReason": "<brief reason why this product matches>"
    }
  ],
  "reason": "<overall summary of your recommendation logic>"
}`;

    const userPrompt = `User Preference: "${preference}"

Available Products:
${JSON.stringify(products.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  rating: p.rating,
  description: p.description,
  specs: p.specs,
})), null, 2)}

Analyze the preference and recommend the best matching products.`;

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    // Parse the AI response
    const aiResponse = response.text;
    
    // Try to extract JSON from the response
    let parsed;
    try {
      // Handle cases where AI wraps JSON in markdown code blocks
      const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : aiResponse.trim();
      parsed = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      return res.status(500).json({
        error: 'Failed to parse AI recommendations. Please try again.',
      });
    }

    // Enrich recommended products with full product data
    const enrichedRecommendations = parsed.recommendedProducts.map(rec => {
      const fullProduct = products.find(p => p.id === rec.id);
      return {
        ...fullProduct,
        confidence: rec.confidence,
        matchReason: rec.matchReason,
      };
    }).filter(rec => rec.name); // Filter out any products that weren't found

    // Send the final response
    res.json({
      recommendedProducts: enrichedRecommendations,
      reason: parsed.reason,
    });

  } catch (error) {
    console.error('Recommendation error:', error);

    res.status(500).json({
      error: 'Failed to generate recommendations. Please try again.',
    });
  }
});

module.exports = router;
