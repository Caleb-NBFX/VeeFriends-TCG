// findFailedMove.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

async function findFailedMove() {
  try {
    console.log('🔍 Looking for the image that failed to move...');
    
    // Check if any images still have the duplicate path structure
    console.log('\n1️⃣ Checking for remaining duplicate paths...');
    const duplicatePathImages = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'veefriends/cards/veefriends/cards/',
      max_results: 50,
      resource_type: 'image'
    });
    
    console.log(`Found ${duplicatePathImages.resources.length} images still with duplicate paths:`);
    duplicatePathImages.resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.public_id}`);
      console.log(`   Created: ${resource.created_at}`);
      console.log(`   Size: ${resource.bytes} bytes`);
      console.log(`   URL: ${resource.secure_url}`);
      console.log('');
    });
    
    // Also check the total count in the clean path
    console.log('\n2️⃣ Checking images in clean path...');
    let cleanPathCount = 0;
    let nextCursor = null;
    
    do {
      const options = {
        type: 'upload',
        prefix: 'veefriends/cards/',
        max_results: 500,
        resource_type: 'image'
      };
      
      if (nextCursor) {
        options.next_cursor = nextCursor;
      }
      
      const result = await cloudinary.api.resources(options);
      
      // Filter out any that still have duplicate paths
      const cleanImages = result.resources.filter(r => 
        !r.public_id.includes('veefriends/cards/veefriends/cards/')
      );
      
      cleanPathCount += cleanImages.length;
      nextCursor = result.next_cursor;
      
    } while (nextCursor);
    
    console.log(`📊 Total images in clean path: ${cleanPathCount}`);
    console.log(`📊 Expected total: 2399`);
    console.log(`📊 Difference: ${2399 - cleanPathCount}`);
    
    // If there's a duplicate path image, let's try to move it manually
    if (duplicatePathImages.resources.length > 0) {
      const failedImage = duplicatePathImages.resources[0];
      console.log(`\n🔧 Attempting to manually move: ${failedImage.public_id}`);
      
      const oldPublicId = failedImage.public_id;
      const newPublicId = oldPublicId.replace('veefriends/cards/veefriends/cards/', 'veefriends/cards/');
      
      try {
        await cloudinary.uploader.rename(oldPublicId, newPublicId);
        console.log(`✅ Successfully moved: ${oldPublicId} → ${newPublicId}`);
      } catch (error) {
        console.error(`❌ Manual move failed: ${error.message}`);
        
        // Check if the target already exists
        try {
          const existingResource = await cloudinary.api.resource(newPublicId);
          console.log(`ℹ️  Target already exists: ${newPublicId}`);
          console.log(`   Created: ${existingResource.created_at}`);
          console.log(`   We can safely delete the duplicate`);
          
          // Ask if we should delete the duplicate
          console.log(`\n🗑️  Deleting duplicate: ${oldPublicId}`);
          await cloudinary.uploader.destroy(oldPublicId);
          console.log(`✅ Duplicate deleted successfully`);
          
        } catch (checkError) {
          console.error(`❌ Error checking target: ${checkError.message}`);
        }
      }
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message || error);
  }
}

findFailedMove();