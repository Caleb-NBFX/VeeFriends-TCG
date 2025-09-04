const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

// Path to your local images folder
const IMAGES_FOLDER = '/Users/caleb/Downloads/Streaming/veeFriends/textures';

// Define which images go to which Cloudinary directories
const uploadMappings = {
  'veefriends/social': [
    'adventurous-astronaut.png',
    'aspiring-alpaca.png',
    'befuddled-burglar.png',
    'faithful-pheasant.png',
    'kindred-kangaroo.png',
    'level-headed-lizard.png', // Updated name
    'perfect-persian-cat.png',
    'sufficient-shrimp.png', // Updated name
    'the-world-has-plenty-of-love-start-listening-to-it.png', // Updated name
    'toronto-st-louis.png', // Updated name
    'when-you-live-for-their-validation-you-arent-living.png', // Updated name
    'your-poor-relationship-with-time-is-your-biggest-vulnerability.png' // Updated name
  ],
  'veefriends/characters': [
    'perfect-persian-cat-classic-shrinkwrapped.png',
    'the-oak-monster-classic-shrinkwrapped.png'
  ],
  'veefriends/cards': [
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
  ]
};

async function uploadMissingImages() {
  try {
    console.log('🔍 Starting upload of missing images to Cloudinary...');
    console.log(`📁 Source directory: ${IMAGES_FOLDER}`);
    
    let totalSuccess = 0;
    let totalErrors = 0;
    const errors = [];
    
    // Process each directory mapping
    for (const [cloudinaryFolder, filenames] of Object.entries(uploadMappings)) {
      console.log(`\n📂 Processing folder: ${cloudinaryFolder}`);
      console.log(`📊 Files to upload: ${filenames.length}`);
      
      let folderSuccess = 0;
      let folderErrors = 0;
      
      for (let i = 0; i < filenames.length; i++) {
        const filename = filenames[i];
        const filePath = path.join(IMAGES_FOLDER, filename);
        
        // Check if file exists locally
        if (!fs.existsSync(filePath)) {
          console.log(`❌ File not found locally: ${filename}`);
          errors.push({ file: filename, folder: cloudinaryFolder, error: 'File not found locally' });
          folderErrors++;
          continue;
        }
        
        try {
          // Create public_id without file extension
          const fileNameWithoutExt = path.parse(filename).name;
          const publicId = `${cloudinaryFolder}/${fileNameWithoutExt}`;
          
          console.log(`📤 Uploading ${i + 1}/${filenames.length}: ${filename}`);
          console.log(`   Target: ${publicId}`);
          
          const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            folder: cloudinaryFolder,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: 'image'
          });
          
          console.log(`✅ Success: ${filename} → ${result.public_id}`);
          folderSuccess++;
          
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 300));
          
        } catch (error) {
          console.error(`❌ Failed: ${filename} - ${error.message}`);
          errors.push({ file: filename, folder: cloudinaryFolder, error: error.message });
          folderErrors++;
        }
      }
      
      console.log(`📊 Folder ${cloudinaryFolder}: ${folderSuccess} success, ${folderErrors} errors`);
      totalSuccess += folderSuccess;
      totalErrors += folderErrors;
    }
    
    // Summary
    console.log('\n🎉 Upload Summary:');
    console.log(`✅ Total successful uploads: ${totalSuccess}`);
    console.log(`❌ Total failed uploads: ${totalErrors}`);
    
    console.log('\n📊 By folder:');
    console.log(`   veefriends/social: ${uploadMappings['veefriends/social'].length} files`);
    console.log(`   veefriends/characters: ${uploadMappings['veefriends/characters'].length} files`);
    console.log(`   veefriends/cards: ${uploadMappings['veefriends/cards'].length} files`);
    
    if (errors.length > 0) {
      console.log('\n❌ Failed uploads:');
      errors.forEach(({ file, folder, error }) => {
        console.log(`   ${folder}/${file}: ${error}`);
      });
    } else {
      console.log('\n🎊 All images uploaded successfully!');
    }
    
  } catch (error) {
    console.error('💥 Error during upload:', error);
  }
}

// Function to verify uploads in each folder
async function verifyUploads() {
  try {
    console.log('\n🔍 Verifying uploads in Cloudinary...');
    
    for (const [cloudinaryFolder, expectedFiles] of Object.entries(uploadMappings)) {
      console.log(`\n📂 Checking ${cloudinaryFolder}...`);
      
      try {
        const result = await cloudinary.api.resources({
          type: 'upload',
          prefix: `${cloudinaryFolder}/`,
          max_results: 500,
          resource_type: 'image'
        });
        
        const foundFiles = result.resources.map(r => path.basename(r.public_id));
        const expectedFileNames = expectedFiles.map(f => path.parse(f).name);
        
        console.log(`   Expected: ${expectedFiles.length} files`);
        console.log(`   Found: ${result.resources.length} files`);
        
        // Check for missing files
        const missing = expectedFileNames.filter(expected => 
          !foundFiles.some(found => found === expected)
        );
        
        if (missing.length === 0) {
          console.log(`   ✅ All files present in ${cloudinaryFolder}`);
        } else {
          console.log(`   ❌ Missing ${missing.length} files:`, missing);
        }
        
      } catch (error) {
        console.error(`   ❌ Error checking ${cloudinaryFolder}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error during verification:', error.message);
  }
}

// Run the upload
console.log('🚀 Starting missing images upload to Cloudinary...');
console.log('📂 Target folders:');
console.log('   - veefriends/social (social media images)');
console.log('   - veefriends/characters (character images)');
console.log('   - veefriends/cards (card images)');
console.log('');

uploadMissingImages().then(() => {
  console.log('\n🔍 Running verification...');
  return verifyUploads();
}).then(() => {
  console.log('\n🎉 Upload and verification complete!');
}).catch(console.error);