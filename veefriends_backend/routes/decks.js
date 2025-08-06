const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Deck = require('../models/Deck');
const Player = require('../models/Player');

// POST /api/decks - create a new deck or update existing
router.post('/', async (req, res) => {
  const { firstName, lastName, handle, platform, email, name, cards, overwrite } = req.body;
  
  // Validate required fields
  if (!firstName || !handle || !email || !name || !cards || cards.length === 0) {
    return res.status(400).json({ error: 'Missing required fields: firstName, handle, email, name, and cards' });
  }
  
  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();
  
  try {
    // Find or create player
    let player = await Player.findOne({ email: normalizedEmail });
    
    if (!player) {
      player = new Player({
        firstName: firstName.trim(),
        lastName: lastName ? lastName.trim() : '',
        handle: handle.trim(),
        platform: platform || 'Whatnot',
        email: normalizedEmail
      });
      await player.save();
      console.log(`Created new player: ${normalizedEmail}`);
    } else {
      // Update player info if it has changed
      let updated = false;
      if (player.firstName !== firstName.trim()) {
        player.firstName = firstName.trim();
        updated = true;
      }
      if (player.lastName !== (lastName ? lastName.trim() : '')) {
        player.lastName = lastName ? lastName.trim() : '';
        updated = true;
      }
      if (player.handle !== handle.trim()) {
        player.handle = handle.trim();
        updated = true;
      }
      if (player.platform !== (platform || 'Whatnot')) {
        player.platform = platform || 'Whatnot';
        updated = true;
      }
      
      if (updated) {
        await player.save();
        console.log(`Updated player info: ${normalizedEmail}`);
      }
    }

    // Check if a deck with the same name already exists for this player
    const existingDeck = await Deck.findOne({ 
      playerId: player._id, 
      name: name.trim() 
    });

    if (existingDeck && !overwrite) {
      // Deck exists and user hasn't confirmed overwrite
      return res.status(409).json({ 
        error: 'DECK_EXISTS',
        message: `A deck named "${name.trim()}" already exists. Do you want to overwrite it?`,
        existingDeck: {
          name: existingDeck.name,
          cardCount: existingDeck.cards.length,
          isComplete: existingDeck.isComplete,
          createdAt: existingDeck.createdAt
        }
      });
    }

    let savedDeck;
    let action = 'created';

    if (existingDeck && overwrite) {
      // Update existing deck
      existingDeck.cards = cards;
      existingDeck.isComplete = cards.length === 20;
      existingDeck.updatedAt = new Date();
      savedDeck = await existingDeck.save();
      action = 'updated';
      console.log(`Updated existing deck: ${name.trim()}`);
    } else {
      // Create new deck
      savedDeck = new Deck({ 
        name: name.trim(),
        playerId: player._id,
        cards 
      });
      await savedDeck.save();
      console.log(`Created new deck: ${name.trim()}`);
    }
    
    // Populate player data for response
    await savedDeck.populate('playerId');
    
    res.status(existingDeck && overwrite ? 200 : 201).json({ 
      message: `Deck ${action} with ${cards.length} cards${cards.length < 20 ? ' (incomplete)' : ''}`, 
      deck: savedDeck,
      action: action
    });
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
    // Find player first
    const player = await Player.findOne({ email: normalizedEmail });
    if (!player) {
      console.log('No player found for email:', normalizedEmail);
      return res.json([]); // No player found, return empty array
    }

    console.log('Found player:', player.firstName, player.lastName, player.handle);

    // Find all decks for this player and populate player data
    const decks = await Deck.find({ playerId: player._id }).populate('playerId');
    
    console.log(`Found ${decks.length} decks for player ${player.email}`);
    
    // Transform the response to match the old format for compatibility
    const transformedDecks = decks.map(deck => {
      const deckData = {
        _id: deck._id,
        name: deck.name,
        firstName: deck.playerId.firstName,
        lastName: deck.playerId.lastName,
        handle: deck.playerId.handle,
        platform: deck.playerId.platform,
        email: deck.playerId.email,
        cards: deck.cards,
        isComplete: deck.isComplete,
        createdAt: deck.createdAt,
        updatedAt: deck.updatedAt
      };
      
      console.log('Transformed deck:', deckData.name, 'cards:', deckData.cards.length);
      return deckData;
    });
    
    console.log('Returning transformed decks:', transformedDecks.length);
    res.json(transformedDecks);
  } catch (err) {
    console.error('Error fetching decks:', err);
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
});

module.exports = router;