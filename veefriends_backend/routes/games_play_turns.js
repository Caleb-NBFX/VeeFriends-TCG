const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Start a new round: draw one card per player
router.post('/:id/start-round', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const roundIndex = game.currentRound;
    const p1Card = game.player1.deck.shift();
    const p2Card = game.player2.deck.shift();

    if (!p1Card || !p2Card) {
      return res.status(400).json({ error: 'No more cards to draw.' });
    }

    const round = {
      attackerCard: game.attacker === 'P1' ? p1Card : p2Card,
      defenderCard: game.attacker === 'P1' ? p2Card : p1Card,
      attribute: null,
      winner: null,
      result: null
    };

    game.rounds.push(round);
    game.currentRound = roundIndex + 1;
    await game.save();

    console.log(`ROUND START: currentRound = ${game.currentRound}`);
    console.log(`game.attacker BEFORE: ${game.attacker}`);

    res.json({
      message: 'Round started',
      roundIndex: roundIndex,
      attackerCard: round.attackerCard
    });
  } catch (error) {
    console.error('Error starting round:', error);
    res.status(500).json({ error: 'Failed to start round' });
  }
});

// Submit turn decision (attribute and resolution)
router.post('/:id/submit-turn', async (req, res) => {
  try {
    const { attribute } = req.body;
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const round = game.rounds[game.currentRound - 1];
    if (!round || round.attribute) {
      return res.status(400).json({ error: 'Invalid round state.' });
    }

    round.attribute = attribute;

    const attVal = round.attackerCard[attribute.toLowerCase()];
    const defVal = round.defenderCard[attribute.toLowerCase()];

    if (attVal > defVal) {
      round.winner = game.attacker;
      round.result = 'win';
      const score = game[game.attacker === 'P1' ? 'player1' : 'player2'].score;
      score[attribute.toLowerCase()] += 1;
    } else if (attVal < defVal) {
      round.winner = game.attacker === 'P1' ? 'P2' : 'P1';
      round.result = 'loss';
      const loserScore = game[game.attacker === 'P1' ? 'player2' : 'player1'].score;
      loserScore[attribute.toLowerCase()] += 1;
    } else {
      round.winner = null;
      round.result = 'push';
    }

    await game.save();
    res.json({ message: 'Turn resolved', round });
  } catch (error) {
    console.error('Error resolving turn:', error);
    res.status(500).json({ error: 'Failed to resolve turn' });
  }
});

module.exports = router;
