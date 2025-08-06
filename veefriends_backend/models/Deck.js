const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  cards: [
    {
      character: { type: String, required: true },
      rarity: { type: String, required: true }
    }
  ],
  isComplete: { type: Boolean, default: false }, // Track if deck has 20 cards
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field and isComplete status before saving
DeckSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  this.isComplete = this.cards.length === 20;
  next();
});

module.exports = mongoose.model('Deck', DeckSchema);