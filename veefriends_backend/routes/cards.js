const express = require('express');
const router = express.Router();
const Card = require('../models/Card'); // Add this import

// Get all cards from MongoDB (not static JSON)
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find({}).select('character tier score aura skill stamina quote image');
    res.json(cards);
  } catch (err) {
    console.error('Error fetching cards from database:', err);
    res.status(500).json({ error: 'Failed to load card data' });
  }
});

module.exports = router;
