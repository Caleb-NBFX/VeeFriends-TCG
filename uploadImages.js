// uploadImages.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

// Path to your local images folder
const IMAGES_FOLDER = './veefriends_frontend/public/textures/social'; // Adjust this path to your actual images folder

async function uploadAllImages() {
  try {
    console.log('🔍 Scanning local images folder...');
    
    // Read all files from the textures directory
    const files = fs.readdirSync(IMAGES_FOLDER);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg|gif|webp)$/i.test(file)
    );
    
    console.log(`📊 Found ${imageFiles.length} image files to upload`);
    
    if (imageFiles.length === 0) {
      console.log('❌ No image files found. Please check the IMAGES_FOLDER path.');
      return;
    }

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const filePath = path.join(IMAGES_FOLDER, file);
      
      // Create public_id without file extension
      const fileName = path.parse(file).name;
      const publicId = `veefriends/social/${fileName}`;
      
      try {
        console.log(`📤 Uploading ${i + 1}/${imageFiles.length}: ${file}`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          folder: 'veefriends/social',
          use_filename: true,
          unique_filename: false, // This prevents random strings
          overwrite: true, // Replace if exists
          resource_type: 'image'
        });
        
        console.log(`✅ Success: ${file} → ${result.public_id}`);
        successCount++;
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error(`❌ Failed: ${file} - ${error.message}`);
        errors.push({ file, error: error.message });
        errorCount++;
      }
    }

    console.log('\n🎉 Upload Summary:');
    console.log(`✅ Successfully uploaded: ${successCount} images`);
    console.log(`❌ Failed to upload: ${errorCount} images`);
    console.log(`📊 Expected: ${imageFiles.length} images`);
    
    if (errors.length > 0) {
      console.log('\n❌ Failed uploads:');
      errors.forEach(({ file, error }) => {
        console.log(`   ${file}: ${error}`);
      });
    }

    // Verify upload count
    await verifyUploads();

  } catch (error) {
    console.error('💥 Error during upload:', error);
  }
}

async function verifyUploads() {
  try {
    console.log('\n🔍 Verifying uploads in Cloudinary...');
    
    let allResources = [];
    let nextCursor = null;
    
    do {
      const options = {
        type: 'upload',
        prefix: 'veefriends/social/',
        max_results: 500,
        resource_type: 'image'
      };
      
      if (nextCursor) {
        options.next_cursor = nextCursor;
      }
      
      const result = await cloudinary.api.resources(options);
      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`📊 Retrieved ${allResources.length} images so far...`);
      
    } while (nextCursor);

    console.log(`🎯 Total images found in veefriends/social/ folder: ${allResources.length}`);
    
    if (allResources.length === 239) {
      console.log('✅ Perfect! All 239 images uploaded successfully.');
    } else {
      console.log(`⚠️  Expected 239 images, found ${allResources.length}.`);
      console.log(`📝 Difference: ${239 - allResources.length} images`);
    }

  } catch (error) {
    console.error('❌ Error verifying uploads:', error.message);
  }
}

// Function to clean up any existing uploads if you want to start fresh
async function cleanupExistingUploads() {
  try {
    console.log('🧹 Cleaning up existing uploads...');
    
    let allResources = [];
    let nextCursor = null;
    
    // Get all resources first
    do {
      const options = {
        type: 'upload',
        prefix: 'veefriends/social/',
        max_results: 500,
        resource_type: 'image'
      };
      
      if (nextCursor) {
        options.next_cursor = nextCursor;
      }
      
      const result = await cloudinary.api.resources(options);
      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;
      
    } while (nextCursor);

    console.log(`🗑️  Found ${allResources.length} images to delete`);

    // Delete in batches
    for (let i = 0; i < allResources.length; i++) {
      const resource = allResources[i];
      await cloudinary.uploader.destroy(resource.public_id);
      console.log(`🗑️  Deleted ${i + 1}/${allResources.length}: ${resource.public_id}`);
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('✅ Cleanup complete');
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

// Run the upload
console.log('🚀 Starting image upload to Cloudinary...');
console.log('📁 Target folder: veefriends/social/');
console.log('🔧 Unique filenames: DISABLED (no random strings)');
console.log('');

// Uncomment the next line if you want to clean up existing uploads first
// await cleanupExistingUploads();

uploadAllImages();