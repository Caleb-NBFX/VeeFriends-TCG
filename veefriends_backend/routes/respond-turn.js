const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Fixed route to match the frontend call
router.post('/:gameId/respond-turn', async (req, res) => {
  console.log('📩 Incoming respond-turn:', JSON.stringify(req.body));
  try {
    const { decision, useTTT } = req.body;
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);

    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Ensure initial attacker is set
    if (!game.attacker) {
      game.attacker = 'P1'; // or use coin flip logic if you have it
    }

    // Fix: Use consistent round indexing (currentRound - 1)
    const roundIndex = game.currentRound - 1;
    const round = game.rounds[roundIndex];
    if (!round) return res.status(400).json({ error: 'No current round found' });

    const attacker = game.attacker;
    const defender = attacker === 'P1' ? 'P2' : 'P1';
    // Fix: Use consistent C1/C2 notation
    const attackerCard = attacker === 'P1' ? round.C1 : round.C2;
    const defenderCard = attacker === 'P1' ? round.C2 : round.C1;

    console.log('🎮 Current Round:', JSON.stringify(round));
    console.log(`🤺 Attacker: ${attacker}`, attackerCard);
    console.log(`🛡️ Defender: ${defender}`, defenderCard);

    // Initialize pendingPoints if not already done
    if (!game.pendingPoints) {
      game.pendingPoints = { aura: 0, skill: 0, stamina: 0 };
    }

    if (useTTT) {
      console.log('🪙 TTT used by player');
      round.attribute = 'Total Score';

      const attackerScore = Math.round(attackerCard.Score);
      const defenderScore = Math.round(defenderCard.Score);

      if (attackerScore > defenderScore) {
        round.winner = attacker;
        round.result = null;
      } else if (attackerScore < defenderScore) {
        round.winner = defender;
        round.result = null;
      } else {
        round.winner = null;
        round.result = 'push';
      }
      if (round.winner) {
        const winnerScore = game[round.winner === 'P1' ? 'player1' : 'player2'].score;
        // Award all pending points if any, then reset
        winnerScore.aura += game.pendingPoints.aura + 1;
        winnerScore.skill += game.pendingPoints.skill + 1;
        winnerScore.stamina += game.pendingPoints.stamina + 1;
        game.pendingPoints = { aura: 0, skill: 0, stamina: 0 };
      } else {
        // Push: accumulate 1 point for each attribute
        game.pendingPoints.aura += 1;
        game.pendingPoints.skill += 1;
        game.pendingPoints.stamina += 1;
      }

      // Mark TTT as used for this player
      if (!game.usedTTT) game.usedTTT = {};
      game.usedTTT[attacker] = true;

    } else if (decision === 'accept') {
      const attr = round.attribute;
      console.log(`✅ Accepted attribute: ${attr}`);
      const valA = attackerCard[attr];
      const valD = defenderCard[attr];

      if (valA > valD) {
        round.winner = attacker;
        round.result = null;
      } else if (valA < valD) {
        round.winner = defender;
        round.result = null;
      } else {
        round.winner = null;
        round.result = 'push';
      }

      if (round.winner) {
        const winnerScore = game[round.winner === 'P1' ? 'player1' : 'player2'].score;
        const rejectionCount = Object.values(round.rejections || {}).filter(Boolean).length;
        const challengeCount = rejectionCount + 1;
        // Award all pending points if any, then reset
        if (attr === 'Aura') {
          winnerScore.aura += game.pendingPoints.aura + challengeCount;
          winnerScore.skill += game.pendingPoints.skill;
          winnerScore.stamina += game.pendingPoints.stamina;
        } else if (attr === 'Skill') {
          winnerScore.skill += game.pendingPoints.skill + challengeCount;
          winnerScore.aura += game.pendingPoints.aura;
          winnerScore.stamina += game.pendingPoints.stamina;
        } else if (attr === 'Stamina') {
          winnerScore.stamina += game.pendingPoints.stamina + challengeCount;
          winnerScore.aura += game.pendingPoints.aura;
          winnerScore.skill += game.pendingPoints.skill;
        }
        game.pendingPoints = { aura: 0, skill: 0, stamina: 0 };
      } else {
        // Push: accumulate points that would have been won
        const rejectionCount = Object.values(round.rejections || {}).filter(Boolean).length;
        const challengeCount = rejectionCount + 1;
        if (attr === 'Aura') game.pendingPoints.aura += challengeCount;
        if (attr === 'Skill') game.pendingPoints.skill += challengeCount;
        if (attr === 'Stamina') game.pendingPoints.stamina += challengeCount;
      }

      // Prevent duplicate attribute challenges per round (enforced by frontend, but double-check here)
      if (!round.challengedAttributes) round.challengedAttributes = [];
      if (!round.challengedAttributes.includes(attr)) {
        round.challengedAttributes.push(attr);
      }

    } else if (decision === 'reject') {
      // Only initialize if undefined or null
      if (typeof round.rejections !== 'object' || round.rejections === null) {
        round.rejections = { Aura: false, Skill: false, Stamina: false };
      }
      // Store the attribute being rejected before clearing
      const rejectedAttr = round.attribute;
      if (!rejectedAttr) {
        return res.status(400).json({ error: 'No attribute to reject.' });
      }
      // Prevent duplicate rejections
      if (round.rejections[rejectedAttr]) {
        return res.status(400).json({ error: 'Attribute already rejected this round.' });
      }
      // Debug log before
      console.log('Before rejection:', JSON.stringify(round.rejections));
      // Update only the current attribute
      round.rejections[rejectedAttr] = true;
      // Ensure Mongoose tracks the change
      game.markModified(`rounds.${roundIndex}.rejections`);
      // Debug log after
      console.log('After rejection:', JSON.stringify(round.rejections));

      const rejectedCount = Object.values(round.rejections).filter(Boolean).length;
      if (rejectedCount >= 3) {
        // All three attributes rejected, resolve with Total Score
        round.attribute = 'Total Score';
        const scoreA = Math.round(attackerCard.Score);
        const scoreD = Math.round(defenderCard.Score);
        if (scoreA > scoreD) {
          round.winner = attacker;
          round.result = null;
        } else if (scoreA < scoreD) {
          round.winner = defender;
          round.result = null;
        } else {
          round.winner = null;
          round.result = 'push';
        }
        if (round.winner) {
          const winnerScore = game[round.winner === 'P1' ? 'player1' : 'player2'].score;
          // Award all pending points if any, then reset
          winnerScore.aura += game.pendingPoints.aura + 1;
          winnerScore.skill += game.pendingPoints.skill + 1;
          winnerScore.stamina += game.pendingPoints.stamina + 1;
          game.pendingPoints = { aura: 0, skill: 0, stamina: 0 };
        } else {
          // Push: accumulate 1 point for each attribute
          game.pendingPoints.aura += 1;
          game.pendingPoints.skill += 1;
          game.pendingPoints.stamina += 1;
        }
      } else {
        // Clear the attribute to allow new challenge
        round.attribute = null;
        round.winner = null;
        round.result = null;
      }
    }

    // Check win condition
    const p1 = game.player1.score;
    const p2 = game.player2.score;
    let winner = null;
    if (p1.aura >= 7 || p1.skill >= 7 || p1.stamina >= 7) winner = 'P1';
    if (p2.aura >= 7 || p2.skill >= 7 || p2.stamina >= 7) winner = 'P2';
    if (winner) game.winner = winner;

    // Attacker alternation: after a resolved round, alternate unless result is exactly 'push'
    // This sets the attacker for the NEXT round
    if (round.winner || round.result === 'push') {
      if (round.result === 'push') {
        // Attacker stays the same
      } else {
        game.attacker = game.attacker === 'P1' ? 'P2' : 'P1';
      }
    }

    await game.save();
    // Debug: print the round state after saving
    const savedGame = await Game.findById(game._id);
    const savedRound = savedGame.rounds[game.currentRound - 1];
    console.log('📝 Persisted round after save:', JSON.stringify(savedRound));
    console.log('💾 Game saved');
    
    // Return whether the round is resolved
    const isResolved = !!(round.winner || round.result === 'push');
    res.json({ 
      success: true, 
      canContinue: !isResolved,
      isResolved: isResolved,
      round: round
    });
  } catch (err) {
    console.error('🔥 Respond-turn crash:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;