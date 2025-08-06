const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Import models
const Player = require('./models/Player');

// Define the old deck schema (before migration)
const OldDeckSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  handle: String,
  platform: String,
  email: String,
  name: String,
  cards: [
    {
      character: String,
      rarity: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

// Create a temporary model for the old deck structure
const OldDeck = mongoose.model('OldDeck', OldDeckSchema, 'decks');

// Import the new deck model
const NewDeck = require('./models/Deck');

async function migrateDecksToPayers() {
  try {
    // Use the same environment variable as your main server
    const connectionString = process.env.MONGO_URI;
    
    if (!connectionString) {
      console.error('❌ MONGO_URI not found in environment variables.');
      console.error('Please check your .env file contains MONGO_URI');
      process.exit(1);
    }
    
    console.log('🔗 Connecting to MongoDB...');
    
    // Use the same connection as your main server
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Connected to MongoDB successfully!');
    console.log('🚀 Starting migration...');
    
    // Get all existing decks using the old structure
    const oldDecks = await OldDeck.find({});
    console.log(`📦 Found ${oldDecks.length} decks to migrate`);
    
    if (oldDecks.length === 0) {
      console.log('ℹ️  No decks found to migrate.');
      await mongoose.disconnect();
      process.exit(0);
    }
    
    let playersCreated = 0;
    let decksUpdated = 0;
    
    for (const deck of oldDecks) {
      console.log(`\n🔄 Processing deck: "${deck.name}" for ${deck.email}`);
      
      // Skip if this deck doesn't have required fields
      if (!deck.email || !deck.firstName || !deck.handle) {
        console.log(`⚠️  Skipping deck "${deck.name}" - missing required fields`);
        continue;
      }
      
      const normalizedEmail = deck.email.toLowerCase().trim();
      
      // Find or create player
      let player = await Player.findOne({ email: normalizedEmail });
      
      if (!player) {
        player = new Player({
          firstName: deck.firstName,
          lastName: deck.lastName || '',
          handle: deck.handle,
          platform: deck.platform || 'Whatnot',
          email: normalizedEmail
        });
        await player.save();
        playersCreated++;
        console.log(`   ✅ Created new player: ${player.email}`);
      } else {
        console.log(`   👤 Player already exists: ${player.email}`);
      }
      
      // Check if this deck already has a playerId (already migrated)
      if (!deck.playerId) {
        // Update the existing deck document to include playerId
        await OldDeck.updateOne(
          { _id: deck._id },
          { 
            $set: { 
              playerId: player._id,
              isComplete: deck.cards.length === 20
            },
            $unset: { 
              firstName: "", 
              lastName: "", 
              handle: "", 
              platform: "", 
              email: "" 
            }
          }
        );
        decksUpdated++;
        console.log(`   ✅ Updated deck: "${deck.name}" with playerId (${deck.cards.length}/20 cards)`);
      } else {
        console.log(`   🔄 Deck "${deck.name}" already migrated`);
      }
    }
    
    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Players created: ${playersCreated}`);
    console.log(`   - Decks updated: ${decksUpdated}`);
    console.log(`   - Total decks processed: ${oldDecks.length}`);
    
    // Verify the migration worked
    const players = await Player.find({});
    const updatedDecks = await OldDeck.find({ playerId: { $exists: true } });
    
    console.log(`\n🔍 Verification:`);
    console.log(`   - Total players in database: ${players.length}`);
    console.log(`   - Total decks with playerId: ${updatedDecks.length}`);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('💥 Migration failed:', error);
    try {
      await mongoose.disconnect();
    } catch (disconnectError) {
      console.error('Failed to disconnect:', disconnectError);
    }
    process.exit(1);
  }
}

// Check if this script is being run directly
if (require.main === module) {
  console.log('🚀 Starting deck-to-player migration...');
  migrateDecksToPayers();
}

module.exports = migrateDecksToPayers;