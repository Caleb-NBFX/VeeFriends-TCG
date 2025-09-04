const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './veefriends_backend/.env' });

async function updateCharacterNames() {
    const client = new MongoClient(process.env.MONGO_URI);
    
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        
        const db = client.db('test');
        const collection = db.collection('cards');
        
        // Define the character name updates
        const updates = [
            {
                old: "LEVELHEADED LIZARD",
                new: "LEVEL HEADED LIZARD"
            },
            {
                old: "THE WORLD HAS PLENTY OF LOVE",
                new: "THE WORLD HAS PLENTY OF LOVE START LISTENING TO IT"
            },
            {
                old: "WHEN YOU LIVE FOR THEIR VALIDATION",
                new: "WHEN YOU LIVE FOR THEIR VALIDATION YOU AREN'T LIVING"
            },
            {
                old: "YOUR POOR RELATIONSHIP WITH TIME",
                new: "YOUR POOR RELATIONSHIP WITH TIME IS YOUR BIGGEST VULNERABILITY"
            },
            {
                old: "SUFFICENT SHRIMP",
                new: "SUFFICIENT SHRIMP"
            }
        ];
        
        console.log('\n=== UPDATING CHARACTER NAMES ===');
        
        for (const update of updates) {
            // Check if the old name exists
            const existingCard = await collection.findOne({ character: update.old });
            
            if (existingCard) {
                // Update the character name
                const result = await collection.updateOne(
                    { character: update.old },
                    { $set: { character: update.new } }
                );
                
                if (result.modifiedCount > 0) {
                    console.log(`✅ Updated: "${update.old}" → "${update.new}"`);
                } else {
                    console.log(`⚠️  No changes made for: "${update.old}"`);
                }
            } else {
                console.log(`❌ Character not found: "${update.old}"`);
            }
        }
        
        // Verify the updates
        console.log('\n=== VERIFICATION ===');
        for (const update of updates) {
            const updatedCard = await collection.findOne({ character: update.new });
            if (updatedCard) {
                console.log(`✅ Verified: "${update.new}" exists in database`);
            } else {
                console.log(`❌ Not found: "${update.new}"`);
            }
        }
        
    } catch (error) {
        console.error('Error updating character names:', error);
    } finally {
        await client.close();
    }
}

// Run the updates
updateCharacterNames().catch(console.error);