const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true }, // Allows multiple decks per email
  cards: [
    {
      character: { type: String, required: true },
      rarity: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deck', DeckSchema);