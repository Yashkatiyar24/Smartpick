/**
 * Express Server — AI Product Recommendation System
 * 
 * This server handles:
 * 1. Serving the product catalog
 * 2. Proxying requests to OpenAI for recommendations
 * 3. CORS configuration for frontend communication
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

// Enable CORS for frontend requests (Vite runs on port 5173)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
}));

// Parse JSON request bodies
app.use(express.json());

// ==================== ROUTES ====================

// Import recommendation route
const recommendRoute = require('./routes/recommend');

const fs = require('fs');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Product catalog endpoint — serves the sample product data
app.get('/api/products', (req, res) => {
  try {
    const productsPath = path.join(__dirname, 'data', 'products.json');
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    res.json(products);
  } catch (error) {
    console.error('Error loading products:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// AI recommendation endpoint
app.use('/api/recommend', recommendRoute);

// ==================== START SERVER / EXPORT ====================

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
    console.log(`🤖 Recommend API: http://localhost:${PORT}/api/recommend`);
    console.log(`❤️  Health Check:  http://localhost:${PORT}/api/health\n`);

    // Warn if Gemini API key is not set
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  WARNING: Gemini API key is not configured!');
      console.warn('   Set GEMINI_API_KEY in server/.env to enable AI recommendations.\n');
    }
  });
}

// Export for Vercel serverless functions
module.exports = app;
