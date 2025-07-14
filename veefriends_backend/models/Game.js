const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  character: String,
  rarity: String
});

const PlayerSchema = new mongoose.Schema({
  name: String,
  email: String,
  deck: [CardSchema],
  score: {
    aura: { type: Number, default: 0 },
    skill: { type: Number, default: 0 },
    stamina: { type: Number, default: 0 }
  },
  drawnCard: { type: Object } // optional, used during active round
});

const RoundSchema = new mongoose.Schema({
  C1: { type: Object },
  C2: { type: Object },
  attribute: String,
  winner: String,
  result: String,
  round: Number,
  attacker: String,
  counterChallenger: String,
  challengedAttributes: { type: [String], default: [] },
  rejections: {
    type: Object,
    default: { Aura: false, Skill: false, Stamina: false }
  }
});

const GameSchema = new mongoose.Schema({
  player1: PlayerSchema,
  player2: PlayerSchema,
  currentRound: { type: Number, default: 0 },
  attacker: { type: String, enum: ['P1', 'P2'] },
  coinFlipWinner: { type: String, enum: ['P1', 'P2'] },
  coinFlipDecision: { type: String, enum: ['attack', 'defend'] },
  rounds: [RoundSchema],
  pendingPoints: {
    aura: { type: Number, default: 0 },
    skill: { type: Number, default: 0 },
    stamina: { type: Number, default: 0 }
  },
  usedTTT: {
    P1: { type: Boolean, default: false },
    P2: { type: Boolean, default: false }
  },
  winner: String, // Add this field to track game winner
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);