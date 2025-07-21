// Updated seed.js
const mongoose = require('mongoose');
const Card = require('./models/Card');
const cardsData = require('./veefriends_cards_metadata.json');
require('dotenv').config(); // Add this to load .env file

const seedDatabase = async () => {
  try {
    // Use the actual connection string from your .env file
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing cards
    await Card.deleteMany({});
    console.log('🧹 Cleared existing cards');

    // Insert corrected card data
    const insertedCards = await Card.insertMany(cardsData);
    console.log(`✅ Inserted ${insertedCards.length} cards`);

    // Verify the Faithful Pheasant card
    const faithfulPheasant = await Card.findOne({ character: 'FAITHFUL PHEASANT' });
    if (faithfulPheasant) {
      console.log('🐦 Verified Faithful Pheasant in database:');
      console.log(`   Character: ${faithfulPheasant.character}`);
      console.log(`   Rarity: ${faithfulPheasant.rarity || 'Not set'}`);
    } else {
      console.log('❌ Faithful Pheasant not found in database');
    }

    // Also check for the typo version
    const typoCard = await Card.findOne({ character: 'FAITHFUL PHESANT' });
    if (typoCard) {
      console.log('⚠️  Found typo version still in database');
    } else {
      console.log('✅ No typo version found - good!');
    }

    console.log('🎉 Database seeding completed successfully');
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('💥 Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDatabase();
