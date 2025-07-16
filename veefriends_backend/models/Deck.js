const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  handle: { type: String, required: true },
  platform: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  cards: [
    {
      character: { type: String, required: true },
      rarity: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deck', DeckSchema);