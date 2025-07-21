// debugSpecificCard.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

async function debugSpecificCard() {
  try {
    console.log('🔍 Debugging faithful-pheasant cards...');
    
    // Search for all faithful-pheasant variations
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'veefriends/cards/faithful-pheasant',
      max_results: 20
    });
    
    console.log(`Found ${result.resources.length} faithful-pheasant images:`);
    result.resources.forEach((resource, index) => {
      const cardName = resource.public_id.replace('veefriends/cards/', '');
      console.log(`${index + 1}. ${cardName}`);
      console.log(`   Full path: ${resource.public_id}`);
      console.log(`   URL: ${resource.secure_url}`);
      console.log('');
    });
    
    // Also check if there are any with duplicate paths still
    console.log('🔍 Checking for duplicate paths...');
    const duplicates = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'veefriends/cards/veefriends/cards/faithful-pheasant',
      max_results: 20
    });
    
    if (duplicates.resources.length > 0) {
      console.log(`❌ Found ${duplicates.resources.length} images still with duplicate paths:`);
      duplicates.resources.forEach(resource => {
        console.log(`   - ${resource.public_id}`);
      });
    } else {
      console.log('✅ No duplicate paths found for faithful-pheasant');
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message || error);
  }
}

debugSpecificCard();