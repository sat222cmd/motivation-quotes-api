// api/motivation/motivationRouter.js
const express = require('express');
const router = express.Router();

const Quote = require('../models/Quotes');

// Optional registration endpoint
const { nanoid } = require('nanoid');
router.post('/register', (req, res) => {
  const key = nanoid(32);
  res.status(201).json({
    message: 'User registered successfully',
    apiKey: key,
    tier: 'unlimited',
    dailyLimit: 'unlimited',
  });
});

// Random quote endpoint - works with or without API key
router.get('/random', async (req, res) => {
  try {
    const key = req.header('x-api-key');
    
    // Optional: log or validate key if you want
    if (key) {
      console.log('API Key provided:', key);
    }

    const count = await Quote.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const quoteDoc = await Quote.findOne().skip(randomIndex);
    
    res.json({ quote: quoteDoc.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

module.exports = router;