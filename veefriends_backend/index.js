require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cardsRouter = require('./routes/cards');
const decksRouter = require('./routes/decks');
const gamesRouter = require('./routes/games');
const challengeRoutes = require('./routes/challenge');
const respondTurnRoutes = require('./routes/respond-turn');

const app = express();

// CORS configuration
const allowedOrigins = [
  'https://veefriends-tgc.onrender.com',
  'http://localhost:3000'
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Mount all API routes
app.use('/api/games', gamesRouter);
app.use('/api/games', challengeRoutes);
app.use('/api/decks', decksRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/games', respondTurnRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Start the server
app.listen(5001, '0.0.0.0', () => {
  console.log('Backend server running on port 5001');
});