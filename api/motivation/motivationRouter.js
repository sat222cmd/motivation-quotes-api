const express = require('express');
const router = express.Router();

const Quote = require('../../models/Quotes'); // Make sure path matches your Quote model
const apiKeyAuth = require('../../middleware/auth/apiKeyAuth');

// Optional registration endpoint (just generates a key)
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

// Random quote endpoint (unlimited access)
router.get('/random', apiKeyAuth, async (req, res) => {
  try {
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
