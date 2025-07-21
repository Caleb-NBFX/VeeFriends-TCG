// fixDuplicatePaths.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

async function fixDuplicatePaths() {
  try {
    console.log('🔧 Fixing duplicate folder paths...');
    
    // Get all cards with duplicate paths
    let allResources = [];
    let nextCursor = null;
    
    do {
      const options = {
        type: 'upload',
        prefix: 'veefriends/cards/veefriends/cards/',
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

    console.log(`📊 Found ${allResources.length} images with duplicate paths`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < allResources.length; i++) {
      const resource = allResources[i];
      const oldPublicId = resource.public_id;
      
      // Remove the duplicate path: veefriends/cards/veefriends/cards/ -> veefriends/cards/
      const newPublicId = oldPublicId.replace('veefriends/cards/veefriends/cards/', 'veefriends/cards/');
      
      try {
        console.log(`🔄 Moving ${i + 1}/${allResources.length}: ${oldPublicId} → ${newPublicId}`);
        
        await cloudinary.uploader.rename(oldPublicId, newPublicId);
        successCount++;
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Failed to move ${oldPublicId}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n🎉 Migration Summary:');
    console.log(`✅ Successfully moved: ${successCount} images`);
    console.log(`❌ Failed to move: ${errorCount} images`);

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

// Run the fix
fixDuplicatePaths();