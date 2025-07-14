const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Fixed route to match the frontend call
router.post('/:gameId/respond-turn', async (req, res) => {
  console.log('📩 Incoming respond-turn:', JSON.stringify(req.body));
  try {
    const { decision, useTTT, counterAttribute } = req.body;
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);

    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Check if game is already over
    if (game.winner) {
      return res.status(400).json({ error: 'Game is already over' });
    }

    // Ensure initial attacker is set
    if (!game.attacker) {
      game.attacker = 'P1';
    }

    // Fix: Use consistent round indexing (currentRound - 1)
    const roundIndex = game.currentRound - 1;
    const round = game.rounds[roundIndex];
    if (!round) return res.status(400).json({ error: 'No current round found' });

    // Determine current challenger and defender
    const currentChallenger = round.counterChallenger || round.attacker;
    const currentDefender = currentChallenger === 'P1' ? 'P2' : 'P1';
    
    console.log('🎯 BEFORE PROCESSING:');
    console.log('round.attacker:', round.attacker);
    console.log('round.counterChallenger:', round.counterChallenger);
    console.log('currentChallenger:', currentChallenger);
    console.log('currentDefender:', currentDefender);
    console.log('decision:', decision);
    console.log('counterAttribute:', counterAttribute);
    console.log('useTTT:', useTTT);
    console.log('game.usedTTT:', game.usedTTT);
    
    // Fix: Use consistent C1/C2 notation
    const challengerCard = currentChallenger === 'P1' ? round.C1 : round.C2;
    const defenderCard = currentChallenger === 'P1' ? round.C2 : round.C1;

    console.log('🎮 Current Round:', JSON.stringify(round));
    console.log(`🤺 Current Challenger: ${currentChallenger}`, challengerCard);
    console.log(`🛡️ Current Defender: ${currentDefender}`, defenderCard);

    // Initialize pendingPoints if not already done
    if (!game.pendingPoints) {
      game.pendingPoints = { aura: 0, skill: 0, stamina: 0 };
    }

    // Initialize usedTTT tracking
    if (!game.usedTTT) {
      game.usedTTT = { P1: false, P2: false };
    }

    if (useTTT) {
      console.log('🪙 TTT requested by:', currentDefender);
      
      // Check if this player has already used TTT
      if (game.usedTTT[currentDefender]) {
        return res.status(400).json({ error: 'You have already used TTT this game' });
      }

      console.log('🪙 TTT used by player:', currentDefender);
      round.attribute = 'Total Score';

      const challengerScore = Math.round(challengerCard.Score);
      const defenderScore = Math.round(defenderCard.Score);

      console.log('🪙 TTT Scores - Challenger:', challengerScore, 'Defender:', defenderScore);

      if (challengerScore > defenderScore) {
        round.winner = currentChallenger;
        round.result = null;
      } else if (challengerScore < defenderScore) {
        round.winner = currentDefender;
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
        console.log('🏆 TTT Winner:', round.winner, 'New scores:', winnerScore);
      } else {
        // Push: accumulate 1 point for each attribute
        game.pendingPoints.aura += 1;
        game.pendingPoints.skill += 1;
        game.pendingPoints.stamina += 1;
        console.log('🤝 TTT Push - Pending points:', game.pendingPoints);
      }

      // Mark TTT as used for this player
      game.usedTTT[currentDefender] = true;
      console.log('🪙 TTT marked as used for:', currentDefender);

    } else if (decision === 'accept') {
      const attr = round.attribute;
      console.log(`✅ Accepted attribute: ${attr}`);
      const valC = challengerCard[attr];
      const valD = defenderCard[attr];

      console.log(`⚖️ Comparison - Challenger ${attr}: ${valC}, Defender ${attr}: ${valD}`);

      if (valC > valD) {
        round.winner = currentChallenger;
        round.result = null;
      } else if (valC < valD) {
        round.winner = currentDefender;
        round.result = null;
      } else {
        round.winner = null;
        round.result = 'push';
      }

      if (round.winner) {
        const winnerScore = game[round.winner === 'P1' ? 'player1' : 'player2'].score;
        const rejectionCount = Object.values(round.rejections || {}).filter(Boolean).length;
        const challengeCount = rejectionCount + 1;
        
        console.log(`🏆 Winner: ${round.winner}, Challenge count: ${challengeCount}`);
        
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
        console.log('🏆 New scores after win:', winnerScore);
      } else {
        // Push: accumulate points that would have been won
        const rejectionCount = Object.values(round.rejections || {}).filter(Boolean).length;
        const challengeCount = rejectionCount + 1;
        if (attr === 'Aura') game.pendingPoints.aura += challengeCount;
        if (attr === 'Skill') game.pendingPoints.skill += challengeCount;
        if (attr === 'Stamina') game.pendingPoints.stamina += challengeCount;
        console.log('🤝 Push - Pending points:', game.pendingPoints);
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
      
      console.log('🚫 REJECTING:', rejectedAttr);
      console.log('Before rejection:', JSON.stringify(round.rejections));
      
      // Update only the current attribute
      round.rejections[rejectedAttr] = true;
      
      console.log('After rejection:', JSON.stringify(round.rejections));

      const rejectedCount = Object.values(round.rejections).filter(Boolean).length;
      console.log('Total rejected count:', rejectedCount);

      if (rejectedCount >= 3) {
        console.log('🏁 All three attributes rejected, resolving with Total Score');
        // All three attributes rejected, resolve with Total Score
        round.attribute = 'Total Score';
        const scoreC = Math.round(challengerCard.Score);
        const scoreD = Math.round(defenderCard.Score);
        if (scoreC > scoreD) {
          round.winner = currentChallenger;
          round.result = null;
        } else if (scoreC < scoreD) {
          round.winner = currentDefender;
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
          console.log('🏆 All rejected winner:', round.winner, 'New scores:', winnerScore);
        } else {
          // Push: accumulate 1 point for each attribute
          game.pendingPoints.aura += 1;
          game.pendingPoints.skill += 1;
          game.pendingPoints.stamina += 1;
          console.log('🤝 All rejected push - Pending points:', game.pendingPoints);
        }
      } else {
        // If not all rejected, defender can counter with a different attribute
        if (counterAttribute) {
          console.log(`🔄 Defender countering with: ${counterAttribute}`);
          console.log('🔄 Setting counterChallenger to:', currentDefender);
          
          round.attribute = counterAttribute;
          // CRITICAL FIX: Switch roles - current defender becomes challenger for this counter
          round.counterChallenger = currentDefender;
          
          // Add to challenged attributes
          if (!round.challengedAttributes) round.challengedAttributes = [];
          if (!round.challengedAttributes.includes(counterAttribute)) {
            round.challengedAttributes.push(counterAttribute);
          }
          
          console.log('🔄 AFTER COUNTER SETUP:');
          console.log('round.attribute:', round.attribute);
          console.log('round.counterChallenger:', round.counterChallenger);
          console.log('round.challengedAttributes:', round.challengedAttributes);
          
        } else {
          console.log('❌ Simple rejection without counter');
          // Clear the attribute to allow new challenge
          round.attribute = null;
          round.winner = null;
          round.result = null;
        }
      }
      
      // Ensure Mongoose tracks the changes
      game.markModified(`rounds.${roundIndex}.rejections`);
      game.markModified(`rounds.${roundIndex}.counterChallenger`);
      game.markModified(`rounds.${roundIndex}.challengedAttributes`);
    }

    // FIXED: Check win condition AFTER updating scores
    const p1 = game.player1.score;
    const p2 = game.player2.score;
    console.log('🏁 Checking win condition - P1 scores:', p1, 'P2 scores:', p2);
    
    let gameWinner = null;
    if (p1.aura >= 7 || p1.skill >= 7 || p1.stamina >= 7) {
      gameWinner = 'P1';
      console.log('🏆 P1 WINS! Final scores:', p1);
    } else if (p2.aura >= 7 || p2.skill >= 7 || p2.stamina >= 7) {
      gameWinner = 'P2';
      console.log('🏆 P2 WINS! Final scores:', p2);
    }
    
    if (gameWinner) {
      game.winner = gameWinner;
      console.log('🏆 GAME OVER! Winner:', gameWinner);
    }

    // FIXED: Attacker alternation logic - more explicit
    if (round.winner || round.result === 'push') {
      console.log('🔄 ATTACKER ALTERNATION:');
      console.log('Round result:', round.result);
      console.log('Round winner:', round.winner);
      console.log('Current game.attacker:', game.attacker);
      
      if (round.result === 'push') {
        // Push: attacker stays the same for next round
        console.log('🤝 Push - Attacker remains:', game.attacker);
      } else if (round.winner) {
        // Winner: attacker alternates for next round
        const oldAttacker = game.attacker;
        game.attacker = game.attacker === 'P1' ? 'P2' : 'P1';
        console.log('🔄 Winner found - Attacker changed from', oldAttacker, 'to', game.attacker);
      }
    }

    console.log('💾 BEFORE SAVE:');
    console.log('Final round.counterChallenger:', round.counterChallenger);
    console.log('Final round.attribute:', round.attribute);
    console.log('Final round.rejections:', round.rejections);
    console.log('Final game.winner:', game.winner);
    console.log('Final game.usedTTT:', game.usedTTT);
    console.log('Final game.attacker:', game.attacker); // Add this line

    await game.save();
    
    // Debug: print the round state after saving
    const savedGame = await Game.findById(game._id);
    const savedRound = savedGame.rounds[game.currentRound - 1];
    console.log('📝 AFTER SAVE:');
    console.log('Persisted round.counterChallenger:', savedRound.counterChallenger);
    console.log('Persisted round.attribute:', savedRound.attribute);
    console.log('Persisted round.rejections:', savedRound.rejections);
    console.log('Persisted game.winner:', savedGame.winner);
    console.log('Persisted game.usedTTT:', savedGame.usedTTT);
    console.log('Persisted game.attacker:', savedGame.attacker); // Add this line

    // Return whether the round is resolved
    const isResolved = !!(round.winner || round.result === 'push');
    res.json({ 
      success: true, 
      canContinue: !isResolved,
      isResolved: isResolved,
      round: round,
      gameWinner: gameWinner
    });
  } catch (err) {
    console.error('🔥 Respond-turn crash:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;