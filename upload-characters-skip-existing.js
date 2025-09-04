const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

const CHARACTERS_FOLDER = '/Users/caleb/Desktop/characters';

async function uploadCharactersSkipExisting() {
  try {
    console.log('🚀 Uploading characters from Desktop, skipping existing...');
    
    // Check if source folder exists
    if (!fs.existsSync(CHARACTERS_FOLDER)) {
      console.log(`❌ Source folder not found: ${CHARACTERS_FOLDER}`);
      return;
    }
    
    // Get all existing characters from Cloudinary
    console.log('📋 Getting existing characters from Cloudinary...');
    const existingCharacters = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'veefriends/characters/',
      max_results: 500
    });
    
    const existingNames = existingCharacters.resources.map(r => path.basename(r.public_id));
    console.log(`Found ${existingNames.length} existing characters in Cloudinary`);
    
    // Get all images from Desktop characters folder
    const files = fs.readdirSync(CHARACTERS_FOLDER);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg|gif|webp)$/i.test(file)
    );
    
    console.log(`📂 Found ${imageFiles.length} images in Desktop/characters`);
    
    // Filter out images that already exist
    const newImages = imageFiles.filter(filename => {
      const fileNameWithoutExt = path.parse(filename).name;
      const exists = existingNames.includes(fileNameWithoutExt);
      if (exists) {
        console.log(`⏭️  Skipping ${filename} (already exists)`);
      }
      return !exists;
    });
    
    console.log(`📤 Need to upload ${newImages.length} new images`);
    
    if (newImages.length === 0) {
      console.log('🎉 All character images already exist in Cloudinary!');
      return;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    // Upload new images
    for (let i = 0; i < newImages.length; i++) {
      const filename = newImages[i];
      const filePath = path.join(CHARACTERS_FOLDER, filename);
      const fileNameWithoutExt = path.parse(filename).name;
      const publicId = `veefriends/characters/${fileNameWithoutExt}`;
      
      try {
        console.log(`📤 Uploading ${i + 1}/${newImages.length}: ${filename}`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          use_filename: false,
          unique_filename: false,
          overwrite: false, // Don't overwrite existing
          resource_type: 'image'
        });
        
        console.log(`✅ Success: ${result.public_id}`);
        successCount++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error(`❌ Failed: ${filename} - ${error.message}`);
        errorCount++;
      }
    }
    
    console.log(`\n🎉 Upload Complete!`);
    console.log(`✅ Successfully uploaded: ${successCount} new images`);
    console.log(`❌ Errors: ${errorCount} images`);
    console.log(`⏭️  Skipped: ${imageFiles.length - newImages.length} existing images`);
    
    // Final verification
    const finalCheck = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'veefriends/characters/',
      max_results: 500
    });
    
    console.log(`📊 Final count in veefriends/characters/: ${finalCheck.resources.length} images`);
    
  } catch (error) {
    console.error('💥 Error:', error);
  }
}

uploadCharactersSkipExisting();