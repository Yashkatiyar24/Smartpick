const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'AIzaSyAhA85B3Q2UGqs6gA-8b3QwxdUZowsYDag'
});

async function run() {
  const models = ['gemini-3.1-flash-lite', 'gemini-2.5-flash-lite', 'gemini-flash-latest'];
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: 'hi'
      });
      console.log(`Success with ${model}:`, response.text);
      return;
    } catch (err) {
      console.error(`Error with ${model}:`, err.message);
    }
  }
}
run();
