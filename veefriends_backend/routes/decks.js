const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Deck = require('../models/Deck');

// POST /api/decks - create a new deck
router.post('/', async (req, res) => {
  const { firstName, lastName, handle, platform, email, name, cards } = req.body;
  
  // Validate required fields
  if (!firstName || !handle || !email || !name || !cards || cards.length === 0) {
    return res.status(400).json({ error: 'Missing required fields: firstName, handle, email, name, and cards' });
  }
  
  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();
  
  try {
    const newDeck = new Deck({ 
      firstName: firstName.trim(),
      lastName: lastName ? lastName.trim() : '',
      handle: handle.trim(),
      platform,
      email: normalizedEmail,
      name: name.trim(),
      cards 
    });
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
  
  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required' });
  }
  
  // Normalize email for lookup
  const normalizedEmail = email.trim().toLowerCase();
  
  console.log('GET /api/decks called with email:', normalizedEmail);
  try {
    const decks = await Deck.find({ email: normalizedEmail });
    console.log('Decks found:', decks);
    res.json(decks);
  } catch (err) {
    console.error('Error fetching decks:', err);
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
});

module.exports = router;