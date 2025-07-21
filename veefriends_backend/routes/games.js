const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Card = require('../models/Card');
const shuffle = require('../utils/shuffle');

// POST /api/games — create new game
router.post('/', async (req, res) => {
  try {
    const { player1, player2 } = req.body;

    if (!player1 || !player2) {
      return res.status(400).json({ error: 'Both players are required' });
    }

    const shuffledP1 = shuffle(player1.deck);
    const shuffledP2 = shuffle(player2.deck);

    const newGame = new Game({
      player1: {
        name: player1.name,
        firstName: player1.firstName,
        lastName: player1.lastName,
        handle: player1.handle,
        platform: player1.platform,
        email: player1.email,
        deck: shuffledP1,
        score: { aura: 0, skill: 0, stamina: 0 }
      },
      player2: {
        name: player2.name,
        firstName: player2.firstName,
        lastName: player2.lastName,
        handle: player2.handle,
        platform: player2.platform,
        email: player2.email,
        deck: shuffledP2,
        score: { aura: 0, skill: 0, stamina: 0 }
      },
      rounds: [],
      currentRound: 0,
      attacker: 'P1', // Set initial attacker
      pendingPoints: { aura: 0, skill: 0, stamina: 0 },
      usedTTT: { P1: false, P2: false },
      createdAt: new Date()
    });

    const savedGame = await newGame.save();
    
    // Auto-start first round
    await startRoundForGame(savedGame._id);
    
    // Return the fresh game data
    const finalGame = await Game.findById(savedGame._id);
    res.status(201).json(finalGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to start a round
async function startRoundForGame(gameId) {
  console.log(`⚡ Starting round for game ${gameId}`);
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');

  const getRarityMultiplier = (rarity) => {
    switch (rarity) {
      case 'Rare': return 1.25;
      case 'Very Rare': return 1.5;
      case 'Epic': return 2;
      case 'Spectacular': return 3;
      default: return 1;
    }
  };

  console.log("🧪 ROUND START: currentRound =", game.currentRound);
  console.log("🔁 game.attacker BEFORE:", game.attacker);

  const drawCard = async (deck) => {
    if (!deck || deck.length === 0) {
      throw new Error('No cards available to draw');
    }
    
    const [next, ...rest] = deck;
    const cardMeta = await Card.findOne({
      character: new RegExp(`^${next.character.trim()}$`, 'i')
    });
    
    if (!cardMeta) throw new Error(`Card not found in metadata: ${next.character}`);

    const rarity = next.rarity;
    const multiplier = getRarityMultiplier(rarity);
    const baseScore = parseFloat((cardMeta.score * multiplier).toFixed(2));
    const characterSlug = cardMeta.character.toLowerCase().replace(/\s+/g, '-');
    const raritySlug = rarity.toLowerCase().replace(/\s+/g, '');

    const rarityMeta = {
      Core:        { color: '#E4CE13', icon: 'core.png' },
      Rare:        { color: '#783F22', icon: 'rare.png' },
      'Very Rare': { color: '#C05316', icon: 'veryrare.png' },
      Epic:        { color: '#2DAD7C', icon: 'epic.png' },
      Spectacular: { color: '#B1A5D0', icon: 'spectacular.png' }
    };

    // Return properly structured card data
    return {
      card: {
        character: cardMeta.character,
        Aura: cardMeta.aura,
        Skill: cardMeta.skill,
        Stamina: cardMeta.stamina,
        Score: baseScore,
        rarity,
        card: `${characterSlug}-${raritySlug}.png`,
        rarityImage: rarityMeta[rarity]?.icon || 'core.png',
        color: rarityMeta[rarity]?.color || '#d3d3d3',
        tier: cardMeta.tier || '',
        quote: cardMeta.quote || '',
        image: cardMeta.image || '',
        vfc: `https://veefriends.com/${characterSlug}`,
      },
      remaining: rest
    };
  };

  // Check if both players have cards
  if (game.player1.deck.length === 0 || game.player2.deck.length === 0) {
    // Handle deck reshuffling if needed
    if (game.player1.deck.length === 0 && game.player2.deck.length === 0) {
      const p1Score = game.player1.score.aura + game.player1.score.skill + game.player1.score.stamina;
      const p2Score = game.player2.score.aura + game.player2.score.skill + game.player2.score.stamina;
      if (p1Score > p2Score) game.winner = 'P1';
      else if (p2Score > p1Score) game.winner = 'P2';
      else game.winner = 'Tie';
      await game.save();
      return game;
    }
  }

  const p1 = await drawCard(game.player1.deck);
  const p2 = await drawCard(game.player2.deck);

  // Update game state
  game.player1.deck = p1.remaining;
  game.player2.deck = p2.remaining;
  game.currentRound += 1;

  // Set attacker if not already set
  if (!game.attacker) {
    game.attacker = 'P1';
  }

  // Create new round with proper structure
  const newRound = {
    round: game.currentRound,
    C1: p1.card,
    C2: p2.card,
    attacker: game.attacker,
    attribute: null,
    winner: null,
    result: null,
    challengedAttributes: [],
    rejections: { Aura: false, Skill: false, Stamina: false }
  };

  game.rounds.push(newRound);
  await game.save();
  
  console.log('✅ Round', game.currentRound, 'saved with drawn cards.');
  return game;
}

// POST /api/games/:id/start-round
router.post('/:id/start-round', async (req, res) => {
  try {
    const gameId = req.params.id;
    console.log('⚡ Starting round for game', gameId);
    
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Check if game is over
    if (game.winner) {
      return res.status(400).json({ error: 'Game is already over' });
    }

    // Start the round
    const updatedGame = await startRoundForGame(gameId);
    
    // Return the updated game
    res.json(updatedGame);

  } catch (error) {
    console.error('Error starting round:', error);
    res.status(500).json({ error: 'Failed to start round' });
  }
});

// GET /api/games/:id
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    console.error('❌ Error fetching game:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;