const mongoose = require('mongoose');
require('dotenv').config();

const Player = require('./models/Player');

async function cleanupMigration() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('🔗 Connected to MongoDB');
    
    // Step 1: Create missing players
    console.log('\n🔧 Creating missing players...');
    
    const missingPlayers = [
      {
        email: 'sniff.89@gmail.com',
        firstName: 'User',
        lastName: '',
        handle: 'sniff89',
        platform: 'Whatnot'
      },
      {
        email: 'danochacon.biz@gmail.com', 
        firstName: 'Dano',
        lastName: 'Chacon',
        handle: 'danochacon',
        platform: 'Whatnot'
      }
    ];
    
    for (const playerData of missingPlayers) {
      const existingPlayer = await Player.findOne({ email: playerData.email });
      if (!existingPlayer) {
        const newPlayer = new Player(playerData);
        await newPlayer.save();
        console.log(`✅ Created player: ${playerData.email}`);
      } else {
        console.log(`👤 Player already exists: ${playerData.email}`);
      }
    }
    
    // Step 2: Get all current players for mapping
    const allPlayers = await Player.find({});
    const playerMap = new Map();
    allPlayers.forEach(player => {
      playerMap.set(player.email, player);
    });
    
    // Step 3: Manual deck assignments
    console.log('\n🔧 Assigning orphaned decks to correct owners...');
    
    const deckAssignments = [
      {
        deckName: 'The Chest',
        ownerEmail: 'oteybuckwheat@yahoo.com'
      },
      {
        deckName: 'Watts1',
        ownerEmail: 'ownwatts@gmail.com'
      },
      {
        deckName: 'Kims deck',
        ownerEmail: 'kim@thekimsutton.con'
      },
      {
        deckName: 'danodeck',
        ownerEmail: 'danochacon.biz@gmail.com'
      },
      {
        deckName: 'Testy Test Deck', // Additional deck belonging to Caleb
        ownerEmail: 'calebc@newblueinc.com'
      },
      {
        deckName: 'Real', // Incomplete deck belonging to Caleb
        ownerEmail: 'calebc@newblueinc.com'
      }
    ];
    
    // Get all decks without playerId
    const orphanedDecks = await mongoose.connection.db.collection('decks').find({ 
      playerId: { $exists: false } 
    }).toArray();
    
    console.log(`Found ${orphanedDecks.length} orphaned decks to process`);
    
    for (const assignment of deckAssignments) {
      const player = playerMap.get(assignment.ownerEmail);
      if (!player) {
        console.log(`❌ Player not found for email: ${assignment.ownerEmail}`);
        continue;
      }
      
      // Find decks matching this name that don't have playerId
      const matchingDecks = orphanedDecks.filter(deck => 
        deck.name === assignment.deckName && !deck.playerId
      );
      
      if (matchingDecks.length === 0) {
        console.log(`⚠️  No orphaned deck found with name: ${assignment.deckName}`);
        continue;
      }
      
      // Process all matching decks (in case of duplicates)
      for (const deckToAssign of matchingDecks) {
        await mongoose.connection.db.collection('decks').updateOne(
          { _id: deckToAssign._id },
          { 
            $set: { 
              playerId: player._id,
              isComplete: deckToAssign.cards ? deckToAssign.cards.length === 20 : false,
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
        
        console.log(`✅ Assigned "${assignment.deckName}" to ${assignment.ownerEmail} (${deckToAssign.cards ? deckToAssign.cards.length : 0} cards)`);
        
        // Mark this deck as processed
        deckToAssign.playerId = player._id;
      }
    }
    
    // Step 4: Handle any remaining orphaned decks
    console.log('\n🔧 Checking for any remaining orphaned decks...');
    
    const stillOrphaned = await mongoose.connection.db.collection('decks').find({ 
      playerId: { $exists: false } 
    }).toArray();
    
    if (stillOrphaned.length > 0) {
      console.log(`\n⚠️  ${stillOrphaned.length} decks still remain orphaned:`);
      
      for (const deck of stillOrphaned) {
        console.log(`   - "${deck.name}" (${deck.cards ? deck.cards.length : 0} cards) - ID: ${deck._id}`);
        console.log(`     Will need manual assignment or deletion`);
      }
    } else {
      console.log('✅ All decks have been successfully assigned to players!');
    }
    
    // Step 5: Final verification
    console.log('\n📊 Final Verification:');
    
    const finalPlayers = await Player.find({});
    const finalDecks = await mongoose.connection.db.collection('decks').find({}).toArray();
    const decksWithPlayerId = finalDecks.filter(deck => deck.playerId);
    const decksWithoutPlayerId = finalDecks.filter(deck => !deck.playerId);
    
    console.log(`   - Total players: ${finalPlayers.length}`);
    console.log(`   - Total decks: ${finalDecks.length}`);
    console.log(`   - Decks with playerId: ${decksWithPlayerId.length}`);
    console.log(`   - Decks without playerId: ${decksWithoutPlayerId.length}`);
    
    if (decksWithoutPlayerId.length > 0) {
      console.log('\n⚠️  Remaining orphaned decks:');
      decksWithoutPlayerId.forEach(deck => {
        console.log(`   - "${deck.name}" (${deck.cards ? deck.cards.length : 0} cards) - ID: ${deck._id}`);
      });
    }
    
    // Show detailed player summary with their decks
    console.log('\n👥 All Players and Their Decks:');
    for (const player of finalPlayers) {
      const playerDecks = decksWithPlayerId.filter(deck => 
        deck.playerId.toString() === player._id.toString()
      );
      
      console.log(`\n   📧 ${player.firstName} ${player.lastName} (${player.email})`);
      console.log(`      Handle: ${player.handle} | Platform: ${player.platform}`);
      console.log(`      Decks (${playerDecks.length}):`);
      
      if (playerDecks.length === 0) {
        console.log(`         (No decks assigned)`);
      } else {
        playerDecks.forEach((deck, index) => {
          const status = deck.isComplete ? '✅ Complete' : '⚠️ Incomplete';
          console.log(`         ${index + 1}. "${deck.name}" - ${deck.cards ? deck.cards.length : 0}/20 cards ${status}`);
        });
      }
    }
    
    console.log('\n🎉 Migration cleanup completed!');
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    
  } catch (error) {
    console.error('💥 Error during cleanup:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

cleanupMigration();