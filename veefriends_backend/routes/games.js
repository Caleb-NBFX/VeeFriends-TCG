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
        ...player1,
        deck: shuffledP1,
        score: { aura: 0, skill: 0, stamina: 0 }
      },
      player2: {
        ...player2,
        deck: shuffledP2,
        score: { aura: 0, skill: 0, stamina: 0 }
      },
      rounds: [],
      currentRound: 0,
      createdAt: new Date()
    });

    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/games/:id/start-round
router.post('/:id/start-round', async (req, res) => {
  try {
    console.log(`⚡ Starting round for game ${req.params.id}`);
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });

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

      // Add all extra fields for Captivate
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
          // Add more fields as needed, e.g. socialImage, etc.
        },
        remaining: rest
      };
    };

    const p1 = await drawCard(game.player1.deck);
    const p2 = await drawCard(game.player2.deck);

    game.player1.drawnCard = p1.card;
    game.player2.drawnCard = p2.card;
    game.player1.deck = p1.remaining;
    game.player2.deck = p2.remaining;
    game.currentRound += 1;
    game.turn = [];

    // Only set attacker if not set (first round)
    if (!game.attacker) {
      game.attacker = Math.random() < 0.5 ? 'P1' : 'P2';
    }
    console.log('DEBUG: Setting round.attacker to', game.attacker);

    game.rounds.push({
      round: game.currentRound,
      C1: p1.card,
      C2: p2.card,
      winner: null,
      result: null,
      attribute: null,
      attacker: game.attacker // Store attacker for this round
    });
    console.log('DEBUG: Round created with attacker', game.rounds[game.rounds.length - 1].attacker);

    // If both decks are empty and no win, reshuffle and continue
    if (game.player1.deck.length === 0 && game.player2.deck.length === 0 && !game.winner) {
      const shuffle = require('../utils/shuffle');
      game.player1.deck = shuffle(game.player1.deck.concat(game.rounds.map(r => r.C1)));
      game.player2.deck = shuffle(game.player2.deck.concat(game.rounds.map(r => r.C2)));
      game.rounds = [];
      game.currentRound = 0;
      game.player1.drawnCard = null;
      game.player2.drawnCard = null;
      console.log('🔄 Decks reshuffled for both players.');
    }

    await game.save();
    console.log(`✅ Round ${game.currentRound} saved with drawn cards.`);
    res.json(game);
  } catch (err) {
    console.error('❌ Error starting round:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/games/:id
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

module.exports = router;