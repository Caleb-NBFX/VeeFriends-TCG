const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: './veefriends_backend/.env' });

async function checkVeeFriendsImages(variant = 'base') {
    const client = new MongoClient(process.env.MONGO_URI);
    const texturesPath = '/Users/caleb/Desktop/social';
    
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        
        // Get the database and collection
        const db = client.db('test');
        const collection = db.collection('cards');
        
        // Fetch all characters
        const characters = await collection.find({}).toArray();
        console.log(`Found ${characters.length} characters in database`);
        
        // Helper function to convert character name to filename
        function nameToFilename(characterName, imageVariant = 'base') {
            const baseName = characterName
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/&/g, '') // Remove & symbol
                .replace(/'/g, '') // Remove apostrophes (for "aren't")
                .replace(/[^a-z0-9-]/g, '') // Remove any other special characters
                .replace(/-+/g, '-') // Replace multiple dashes with single dash
                .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
            
            if (imageVariant === 'base') {
                return `${baseName}.png`;
            }
            
            return `${baseName}-${imageVariant}.png`;
        }
        
        // Check for image files
        const results = {
            matches: [],
            missing: [],
            totalCharacters: characters.length,
            variant: variant
        };
        
        for (const character of characters) {
            const characterName = character.character;
            const expectedFilename = nameToFilename(characterName, variant);
            const fullPath = path.join(texturesPath, expectedFilename);
            
            try {
                await fs.access(fullPath);
                results.matches.push({
                    character: characterName,
                    filename: expectedFilename,
                    found: true
                });
            } catch (error) {
                results.missing.push({
                    character: characterName,
                    expectedFilename: expectedFilename,
                    found: false
                });
            }
        }
        
        // Display results
        console.log(`\n=== IMAGE CHECK RESULTS (${variant.toUpperCase()}) ===`);
        console.log(`Total Characters: ${results.totalCharacters}`);
        console.log(`Images Found: ${results.matches.length}`);
        console.log(`Images Missing: ${results.missing.length}`);
        
        if (results.missing.length > 0) {
            console.log('\n=== MISSING IMAGES ===');
            results.missing.forEach(item => {
                console.log(`❌ ${item.character} -> ${item.expectedFilename}`);
            });
        }
        
        if (results.matches.length > 0) {
            console.log('\n=== FOUND IMAGES (first 10) ===');
            results.matches.slice(0, 10).forEach(item => {
                console.log(`✅ ${item.character} -> ${item.filename}`);
            });
            if (results.matches.length > 10) {
                console.log(`... and ${results.matches.length - 10} more matches`);
            }
        }
        
        return results;
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

// Export the nameToFilename function for use in other parts of your app
function nameToFilename(characterName, imageVariant = 'base') {
    const baseName = characterName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, '') // Remove & symbol
        .replace(/'/g, '') // Remove apostrophes (for "aren't")
        .replace(/[^a-z0-9-]/g, '') // Remove any other special characters
        .replace(/-+/g, '-') // Replace multiple dashes with single dash
        .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
    
    if (imageVariant === 'base') {
        return `${baseName}.png`;
    }
    
    return `${baseName}-${imageVariant}.png`;
}

// Run the check with command line arguments
if (require.main === module) {
    // Get variant from command line arguments
    const variant = process.argv[2] || 'base';
    
    console.log(`🔍 Checking for ${variant} variant images...`);
    
    checkVeeFriendsImages(variant)
        .then(results => {
            console.log(`\n${variant} check completed!`);
        })
        .catch(console.error);
}

module.exports = { checkVeeFriendsImages, nameToFilename };