const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  character: String,
  tier: String,
  score: Number,
  aura: Number,
  skill: Number,
  stamina: Number,
  quote: String,
  image: String
});

module.exports = mongoose.model('Card', cardSchema);
