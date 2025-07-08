const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// POST /api/games/:id/challenge
router.post('/:id/challenge', async (req, res) => {
  try {
    const { attribute } = req.body;
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const round = game.rounds[game.currentRound - 1];
    if (!round || round.attribute) {
      return res.status(400).json({ error: 'Round already challenged or missing.' });
    }

    // Ensure per-round tracking
    if (!round.challengedAttributes) round.challengedAttributes = [];
    if (!round.rejections) round.rejections = { Aura: false, Skill: false, Stamina: false };

    // Prevent duplicate attribute challenges per round
    if (round.challengedAttributes.includes(attribute) || round.rejections[attribute]) {
      return res.status(400).json({ error: 'This attribute has already been challenged or rejected this round.' });
    }
    round.challengedAttributes.push(attribute);

    const attacker = game.attacker;
    const attackerCard = attacker === 'P1' ? round.C1 : round.C2;
    const defenderCard = attacker === 'P1' ? round.C2 : round.C1;

    console.log('🎯 Selected attribute to challenge:', attribute);
    round.attribute = attribute;
    round.attackerCard = attackerCard;
    round.defenderCard = defenderCard;
    round.tttUsed = false;
    round.result = null;
    round.winner = null;

    await game.save();
    res.json({ message: `Challenged on ${attribute}`, round });
  } catch (error) {
    console.error('Error submitting challenge:', error);
    res.status(500).json({ error: 'Failed to submit challenge.' });
  }
});

module.exports = router;