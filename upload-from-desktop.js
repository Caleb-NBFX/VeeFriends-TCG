const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

// Source folders
const SOCIAL_FOLDER = '/Users/caleb/Desktop/social';
const CHARACTERS_FOLDER = '/Users/caleb/Desktop/characters';
const TEXTURES_FOLDER = '/Users/caleb/Downloads/Streaming/veeFriends/textures';

// Missing card images to check/upload
const MISSING_CARD_IMAGES = [
  'glowing-glow-worm-core.png',
  'zestful-zebra-core.png',
  'boss-bobcat-rare.png',
  'bullish-bull-rare.png',
  'dope-dodo-rare.png',
  'glowing-glow-worm-rare.png',
  'gritty-ghost-rare.png',
  'heart-trooper-rare.png',
  'zestful-zebra-rare.png',
  'amped-aye-aye-veryrare.png',
  'awesome-african-civet-veryrare.png',
  'candid-clownfish-veryrare.png',
  'daring-dragonfly-veryrare.png',
  'accountable-anteater-epic.png',
  'be-the-bigger-person-epic.png',
  'zestful-zebra-epic.png'
];

async function uploadFromFolder(sourceFolder, targetCloudinaryFolder) {
  try {
    console.log(`\n📂 Processing ${sourceFolder} → ${targetCloudinaryFolder}`);
    
    if (!fs.existsSync(sourceFolder)) {
      console.log(`❌ Source folder not found: ${sourceFolder}`);
      return { success: 0, errors: 0 };
    }
    
    const files = fs.readdirSync(sourceFolder);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg|gif|webp)$/i.test(file)
    );
    
    console.log(`📊 Found ${imageFiles.length} images to upload`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i];
      const filePath = path.join(sourceFolder, filename);
      const fileNameWithoutExt = path.parse(filename).name;
      const publicId = `${targetCloudinaryFolder}/${fileNameWithoutExt}`;
      
      try {
        console.log(`📤 Uploading ${i + 1}/${imageFiles.length}: ${filename}`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          use_filename: false,
          unique_filename: false,
          overwrite: true,
          resource_type: 'image'
        });
        
        console.log(`✅ Success: ${result.public_id}`);
        successCount++;
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error(`❌ Failed: ${filename} - ${error.message}`);
        errorCount++;
      }
    }
    
    console.log(`📊 ${targetCloudinaryFolder}: ${successCount} success, ${errorCount} errors`);
    return { success: successCount, errors: errorCount };
    
  } catch (error) {
    console.error(`💥 Error processing ${sourceFolder}:`, error);
    return { success: 0, errors: 1 };
  }
}

async function checkAndUploadMissingCards() {
  try {
    console.log(`\n🃏 Checking for missing card images...`);
    
    // Get existing cards
    const existingCards = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'veefriends/cards/',
      max_results: 500
    });
    
    const existingCardNames = existingCards.resources.map(r => path.basename(r.public_id));
    
    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < MISSING_CARD_IMAGES.length; i++) {
      const filename = MISSING_CARD_IMAGES[i];
      const fileNameWithoutExt = path.parse(filename).name;
      
      // Check if already exists
      if (existingCardNames.includes(fileNameWithoutExt)) {
        console.log(`⏭️  Skipping ${filename} (already exists)`);
        skippedCount++;
        continue;
      }
      
      const filePath = path.join(TEXTURES_FOLDER, filename);
      
      if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filename}`);
        errorCount++;
        continue;
      }
      
      try {
        const publicId = `veefriends/cards/${fileNameWithoutExt}`;
        
        console.log(`📤 Uploading missing card ${i + 1}/${MISSING_CARD_IMAGES.length}: ${filename}`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          use_filename: false,
          unique_filename: false,
          overwrite: false, // Don't overwrite existing
          resource_type: 'image'
        });
        
        console.log(`✅ Success: ${result.public_id}`);
        successCount++;
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error(`❌ Failed: ${filename} - ${error.message}`);
        errorCount++;
      }
    }
    
    console.log(`📊 Cards: ${successCount} uploaded, ${skippedCount} skipped, ${errorCount} errors`);
    return { success: successCount, skipped: skippedCount, errors: errorCount };
    
  } catch (error) {
    console.error('💥 Error checking cards:', error);
    return { success: 0, skipped: 0, errors: 1 };
  }
}

async function main() {
  try {
    console.log('🚀 Starting Desktop → Cloudinary upload...');
    
    let totalSuccess = 0;
    let totalErrors = 0;
    
    // Upload social images
    const socialResult = await uploadFromFolder(SOCIAL_FOLDER, 'veefriends/social');
    totalSuccess += socialResult.success;
    totalErrors += socialResult.errors;
    
    // Upload character images  
    const charactersResult = await uploadFromFolder(CHARACTERS_FOLDER, 'veefriends/characters');
    totalSuccess += charactersResult.success;
    totalErrors += charactersResult.errors;
    
    // Check and upload missing card images
    const cardsResult = await checkAndUploadMissingCards();
    totalSuccess += cardsResult.success;
    totalErrors += cardsResult.errors;
    
    // Final summary
    console.log('\n🎉 Upload Complete!');
    console.log(`✅ Total successful uploads: ${totalSuccess}`);
    console.log(`❌ Total errors: ${totalErrors}`);
    if (cardsResult.skipped > 0) {
      console.log(`⏭️  Cards skipped (already exist): ${cardsResult.skipped}`);
    }
    
    console.log('\n📊 Final folder structure:');
    console.log('   veefriends/social/ ← Desktop/social');
    console.log('   veefriends/characters/ ← Desktop/characters');
    console.log('   veefriends/cards/ ← missing cards from textures');
    
  } catch (error) {
    console.error('💥 Main error:', error);
  }
}

main();