const mongoose = require('mongoose');
require('dotenv').config();

const Player = require('./models/Player');

async function fixMigrationIssues() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('🔗 Connected to MongoDB');
    
    // Get all decks and players
    const allDecks = await mongoose.connection.db.collection('decks').find({}).toArray();
    const players = await Player.find({});
    
    console.log('\n📊 Analysis:');
    console.log(`   - Total decks: ${allDecks.length}`);
    console.log(`   - Total players: ${players.length}`);
    
    // Create missing players for valid emails
    const missingEmails = [
      'sniff.89@gmail.com',
      'danochacon.biz@gmail.com'
    ];
    
    for (const email of missingEmails) {
      const existingPlayer = await Player.findOne({ email });
      if (!existingPlayer) {
        // Find a deck with this email to get player info
        const deckWithEmail = allDecks.find(deck => deck.email === email);
        if (deckWithEmail && deckWithEmail.firstName && deckWithEmail.handle) {
          const newPlayer = new Player({
            firstName: deckWithEmail.firstName,
            lastName: deckWithEmail.lastName || '',
            handle: deckWithEmail.handle,
            platform: deckWithEmail.platform || 'Whatnot',
            email: email
          });
          await newPlayer.save();
          console.log(`✅ Created missing player: ${email}`);
        }
      }
    }
    
    // Handle decks without email fields - we'll need to match them manually
    const decksWithoutEmail = allDecks.filter(deck => !deck.email);
    const playersMap = new Map();
    players.forEach(player => {
      playersMap.set(player.handle.toLowerCase(), player);
      playersMap.set(player.firstName.toLowerCase(), player);
    });
    
    // Manual mapping for decks without emails based on the data we can see
    const manualMappings = {
      'My Second Deck': 'calebc@newblueinc.com', // Caleb's second deck
      '#SamSoSick': 'sam@sosick.com', // Samantha's deck (handle matches EnderSlayer8614)
      "Kelov's Deck": 'calebchristofer@gmail.com', // Agent Kelov's deck
      'Deck 2': 'calebc@newblueinc.com', // Likely another Caleb deck
      'The Chest': null, // Unknown
      'Watts1': null, // Unknown
      'Kims deck': null, // Unknown
      'Real': null // Unknown (2 decks with same name)
    };
    
    console.log('\n🔧 Fixing all deck issues...');
    
    for (const deck of allDecks) {
      if (deck.playerId) {
        console.log(`   ✅ Deck "${deck.name}" already has playerId`);
        continue;
      }
      
      let targetPlayer = null;
      
      // Try to find player by email first
      if (deck.email) {
        targetPlayer = await Player.findOne({ email: deck.email });
        if (!targetPlayer) {
          console.log(`   ❌ No player found for email: ${deck.email}`);
          continue;
        }
      } else {
        // Try manual mapping
        const mappedEmail = manualMappings[deck.name];
        if (mappedEmail) {
          targetPlayer = await Player.findOne({ email: mappedEmail });
          console.log(`   🔧 Using manual mapping for "${deck.name}" -> ${mappedEmail}`);
        } else {
          console.log(`   ⚠️  Cannot determine owner for deck "${deck.name}" - skipping`);
          continue;
        }
      }
      
      if (targetPlayer) {
        // Update the deck
        await mongoose.connection.db.collection('decks').updateOne(
          { _id: deck._id },
          { 
            $set: { 
              playerId: targetPlayer._id,
              isComplete: deck.cards ? deck.cards.length === 20 : false,
              updatedAt: new Date()
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
        console.log(`   ✅ Fixed deck "${deck.name}" for ${targetPlayer.email} (${deck.cards ? deck.cards.length : 0} cards)`);
      }
    }
    
    // Final verification
    const finalDecks = await mongoose.connection.db.collection('decks').find({}).toArray();
    const decksWithPlayerId = finalDecks.filter(deck => deck.playerId);
    const decksWithoutPlayerId = finalDecks.filter(deck => !deck.playerId);
    
    console.log('\n📊 Final Results:');
    console.log(`   - Total decks: ${finalDecks.length}`);
    console.log(`   - Decks with playerId: ${decksWithPlayerId.length}`);
    console.log(`   - Decks without playerId: ${decksWithoutPlayerId.length}`);
    
    if (decksWithoutPlayerId.length > 0) {
      console.log('\n⚠️  Remaining orphaned decks:');
      decksWithoutPlayerId.forEach(deck => {
        console.log(`   - "${deck.name}" (${deck.cards ? deck.cards.length : 0} cards)`);
      });
      console.log('\n💡 These decks will need manual intervention or can be deleted if not needed.');
    }
    
    // Show updated players
    const updatedPlayers = await Player.find({});
    console.log('\n👥 All Players:');
    updatedPlayers.forEach(player => {
      console.log(`   - ${player.firstName} ${player.lastName} (${player.email}) - ${player.handle}`);
    });
    
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    console.log('\n🎉 Migration fix completed!');
    
  } catch (error) {
    console.error('💥 Error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

fixMigrationIssues();