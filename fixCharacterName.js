// fixCharacterName.js
const mongoose = require('mongoose');

// Update this connection string to match your database
const DB_CONNECTION = process.env.MONGODB_URI || 'mongodb://localhost:27017/veefriends';

async function fixCharacterName() {
  try {
    await mongoose.connect(DB_CONNECTION);
    console.log('📊 Connected to database');

    // Assuming your cards are in a collection called 'cards' or similar
    // You'll need to adjust the collection name based on your schema
    const db = mongoose.connection.db;
    
    // Find documents with the typo
    const typoResults = await db.collection('cards').find({
      character: 'FAITHFUL PHESANT'
    }).toArray();
    
    console.log(`🔍 Found ${typoResults.length} cards with typo "FAITHFUL PHESANT"`);
    
    if (typoResults.length > 0) {
      // Update the character name
      const updateResult = await db.collection('cards').updateMany(
        { character: 'FAITHFUL PHESANT' },
        { $set: { character: 'FAITHFUL PHEASANT' } }
      );
      
      console.log(`✅ Updated ${updateResult.modifiedCount} documents`);
      console.log('✅ Character name fixed: FAITHFUL PHESANT → FAITHFUL PHEASANT');
    } else {
      console.log('ℹ️  No documents found with the typo');
    }

    // Also check for any other potential typos
    console.log('\n🔍 Checking for other potential PHESANT typos...');
    const allPhesant = await db.collection('cards').find({
      character: { $regex: /phesant/i }
    }).toArray();
    
    if (allPhesant.length > 0) {
      console.log(`⚠️  Found ${allPhesant.length} more cards with "phesant":`);
      allPhesant.forEach(card => {
        console.log(`   - ${card.character} (${card.rarity || 'unknown rarity'})`);
      });
    }

  } catch (error) {
    console.error('💥 Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📊 Disconnected from database');
  }
}

fixCharacterName();