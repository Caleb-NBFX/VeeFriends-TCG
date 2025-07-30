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

    const savedGame = await newGame.save();
    
    // Auto-start first round
    const gameWithFirstRound = await startRoundForGame(savedGame._id);
    
    res.status(201).json(gameWithFirstRound);
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
      case 'Hologram':
      case 'Lava':
      case 'Gold':
      case 'Emerald':
      case 'Diamond':
      case 'Bubblegum':
        return 3;
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
      Very Rare:   { color: '#C05316', icon: 'veryrare.png' },
      Epic:        { color: '#2DAD7C', icon: 'epic.png' },
      Hologram:    { color: '#B1A5D0', icon: 'hologram.png' },
      Lava:        { color: '#FF4500', icon: 'lava.png' },
      Gold:        { color: '#FFD700', icon: 'gold.png' },
      Emerald:     { color: '#50C878', icon: 'emerald.png' },
      Diamond:     { color: '#B9F2FF', icon: 'diamond.png' },
      Bubblegum:   { color: '#FF69B4', icon: 'bubblegum.png' }
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

  // Check if game should end due to no more cards
  if (game.player1.deck.length === 0 && game.player2.deck.length === 0) {
    const p1Score = game.player1.score.aura + game.player1.score.skill + game.player1.score.stamina;
    const p2Score = game.player2.score.aura + game.player2.score.skill + game.player2.score.stamina;
    if (p1Score > p2Score) game.winner = 'P1';
    else if (p2Score > p1Score) game.winner = 'P2';
    else game.winner = 'Tie';
  }

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

    // Increment round counter
    game.currentRound += 1;
    console.log('🧪 ROUND START: currentRound =', game.currentRound);

    // FIXED: Use the game's attacker (which should have been set correctly in respond-turn)
    const roundAttacker = game.attacker || 'P1';
    console.log('🔁 game.attacker BEFORE:', game.attacker);
    console.log('DEBUG: Using attacker for new round:', roundAttacker);

    // Draw cards for both players
    const p1Card = drawRandomCard();
    const p2Card = drawRandomCard();

    // Create new round
    const newRound = {
      round: game.currentRound,
      C1: p1Card,
      C2: p2Card,
      attacker: roundAttacker,
      attribute: null,
      winner: null,
      result: null,
      challengedAttributes: [],
      rejections: { Aura: false, Skill: false, Stamina: false }
    };

    console.log('DEBUG: Round created with attacker', roundAttacker);
    game.rounds.push(newRound);

    await game.save();
    console.log('✅ Round', game.currentRound, 'saved with drawn cards.');

    res.json({ 
      success: true, 
      round: newRound,
      attacker: roundAttacker,
      gameAttacker: game.attacker 
    });

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

// PUT /api/games/:id/edit - Update game data (ADMIN ONLY)
router.put('/:id/edit', async (req, res) => {
  try {
    const gameId = req.params.id;
    const { field, value, roundIndex, cardPlayer } = req.body;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Handle different types of updates
    switch (field) {
      case 'player1_handle':
        game.player1.handle = value;
        break;
      case 'player2_handle':
        game.player2.handle = value;
        break;
      case 'player1_score_aura':
        game.player1.score.aura = parseInt(value);
        break;
      case 'player1_score_skill':
        game.player1.score.skill = parseInt(value);
        break;
      case 'player1_score_stamina':
        game.player1.score.stamina = parseInt(value);
        break;
      case 'player2_score_aura':
        game.player2.score.aura = parseInt(value);
        break;
      case 'player2_score_skill':
        game.player2.score.skill = parseInt(value);
        break;
      case 'player2_score_stamina':
        game.player2.score.stamina = parseInt(value);
        break;
      case 'round_card_character':
        if (roundIndex !== undefined && cardPlayer) {
          const cardKey = cardPlayer === 'C1' ? 'C1' : 'C2';
          if (game.rounds[roundIndex] && game.rounds[roundIndex][cardKey]) {
            game.rounds[roundIndex][cardKey].character = value;
          }
        }
        break;
      case 'round_card_rarity':
        if (roundIndex !== undefined && cardPlayer) {
          const cardKey = cardPlayer === 'C1' ? 'C1' : 'C2';
          if (game.rounds[roundIndex] && game.rounds[roundIndex][cardKey]) {
            game.rounds[roundIndex][cardKey].rarity = value;
          }
        }
        break;
      case 'round_card_aura':
        if (roundIndex !== undefined && cardPlayer) {
          const cardKey = cardPlayer === 'C1' ? 'C1' : 'C2';
          if (game.rounds[roundIndex] && game.rounds[roundIndex][cardKey]) {
            game.rounds[roundIndex][cardKey].Aura = parseInt(value);
          }
        }
        break;
      case 'round_card_skill':
        if (roundIndex !== undefined && cardPlayer) {
          const cardKey = cardPlayer === 'C1' ? 'C1' : 'C2';
          if (game.rounds[roundIndex] && game.rounds[roundIndex][cardKey]) {
            game.rounds[roundIndex][cardKey].Skill = parseInt(value);
          }
        }
        break;
      case 'round_card_stamina':
        if (roundIndex !== undefined && cardPlayer) {
          const cardKey = cardPlayer === 'C1' ? 'C1' : 'C2';
          if (game.rounds[roundIndex] && game.rounds[roundIndex][cardKey]) {
            game.rounds[roundIndex][cardKey].Stamina = parseInt(value);
          }
        }
        break;
      case 'round_card_score':
        if (roundIndex !== undefined && cardPlayer) {
          const cardKey = cardPlayer === 'C1' ? 'C1' : 'C2';
          if (game.rounds[roundIndex] && game.rounds[roundIndex][cardKey]) {
            game.rounds[roundIndex][cardKey].Score = parseFloat(value);
          }
        }
        break;
      default:
        return res.status(400).json({ error: 'Invalid field' });
    }

    await game.save();
    console.log(`✅ Updated game ${gameId} - ${field}: ${value}`);
    res.json({ success: true, game });

  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ error: 'Failed to update game' });
  }
});

module.exports = router;