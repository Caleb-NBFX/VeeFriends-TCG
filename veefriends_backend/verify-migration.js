const mongoose = require('mongoose');
require('dotenv').config();

const Player = require('./models/Player');
const Deck = require('./models/Deck');

async function verifyAndFixMigration() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('🔗 Connected to MongoDB');
    
    // Check current state
    const players = await Player.find({});
    const allDecks = await mongoose.connection.db.collection('decks').find({}).toArray();
    const decksWithPlayerId = allDecks.filter(deck => deck.playerId);
    const decksWithoutPlayerId = allDecks.filter(deck => !deck.playerId);
    
    console.log('\n📊 Current Database State:');
    console.log(`   - Total players: ${players.length}`);
    console.log(`   - Total decks: ${allDecks.length}`);
    console.log(`   - Decks with playerId: ${decksWithPlayerId.length}`);
    console.log(`   - Decks without playerId: ${decksWithoutPlayerId.length}`);
    
    if (decksWithoutPlayerId.length > 0) {
      console.log('\n🔧 Fixing decks without playerId...');
      
      for (const deck of decksWithoutPlayerId) {
        if (deck.email) {
          const normalizedEmail = deck.email.toLowerCase().trim();
          const player = await Player.findOne({ email: normalizedEmail });
          
          if (player) {
            // Update the deck directly in the collection
            await mongoose.connection.db.collection('decks').updateOne(
              { _id: deck._id },
              { 
                $set: { 
                  playerId: player._id,
                  isComplete: deck.cards ? deck.cards.length === 20 : false
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
            console.log(`   ✅ Fixed deck "${deck.name}" for ${player.email}`);
          } else {
            console.log(`   ❌ No player found for deck "${deck.name}" with email ${deck.email}`);
          }
        } else {
          console.log(`   ⚠️  Deck "${deck.name}" has no email field`);
        }
      }
      
      // Verify the fix
      const updatedDecks = await mongoose.connection.db.collection('decks').find({ playerId: { $exists: true } }).toArray();
      console.log(`\n✅ After fix: ${updatedDecks.length} decks now have playerId`);
    }
    
    // Show sample data
    console.log('\n🔍 Sample Data:');
    console.log('Players:');
    players.slice(0, 3).forEach((player, i) => {
      console.log(`   ${i + 1}. ${player.firstName} ${player.lastName} (${player.email}) - ${player.handle}`);
    });
    
    const finalDecks = await mongoose.connection.db.collection('decks').find({}).limit(3).toArray();
    console.log('\nDecks:');
    finalDecks.forEach((deck, i) => {
      console.log(`   ${i + 1}. "${deck.name}" - ${deck.cards ? deck.cards.length : 0} cards - PlayerId: ${deck.playerId ? '✅' : '❌'}`);
    });
    
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    
  } catch (error) {
    console.error('💥 Error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

verifyAndFixMigration();