const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Deck = require('../models/Deck');

// ✅ Only keep this POST /api/decks handler
router.post('/', async (req, res) => {
  const { email, name, cards } = req.body;
  try {
    const newDeck = new Deck({ email, name, cards });
    await newDeck.save();
    res.status(201).json({ message: 'Deck saved', deck: newDeck });
  } catch (err) {
    console.error('Failed to save deck:', err);
    res.status(500).json({ error: 'Failed to save deck' });
  }
});

// GET /api/decks?email=... - get all decks for a user
router.get('/', async (req, res) => {
  const { email } = req.query;
  console.log('GET /api/decks called with email:', email);
  try {
    const decks = await Deck.find({ email });
    console.log('Decks found:', decks);
    res.json(decks);
  } catch (err) {
    console.error('Failed to get decks:', err);
    res.status(500).json({ error: 'Failed to get decks' });
  }
});

module.exports = router;