// debugCloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

async function debugCloudinary() {
  try {
    console.log('🔍 Checking what\'s actually in Cloudinary...');
    
    // First, let's see if there are ANY images at all
    console.log('\n1️⃣ Getting all resources (first 20)...');
    const allResources = await cloudinary.api.resources({
      type: 'upload',
      max_results: 20
    });
    
    console.log(`Total found: ${allResources.resources.length}`);
    console.log('First 20 resources:');
    allResources.resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.public_id} (${resource.format})`);
    });
    
    // Check if there are any folders
    console.log('\n2️⃣ Checking for folders...');
    try {
      const folders = await cloudinary.api.root_folders();
      console.log('Root folders found:');
      folders.folders.forEach(folder => {
        console.log(`   - ${folder.name} (${folder.path})`);
      });
    } catch (folderError) {
      console.log('No folders found or error checking folders');
    }
    
    // Check if images are in a different path
    console.log('\n3️⃣ Checking for veefriends folder...');
    try {
      const veeFriendsResources = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'veefriends',
        max_results: 10
      });
      console.log(`VeeFriends resources found: ${veeFriendsResources.resources.length}`);
      veeFriendsResources.resources.forEach((resource, index) => {
        console.log(`${index + 1}. ${resource.public_id}`);
      });
    } catch (vfError) {
      console.log('No veefriends resources found');
    }
    
    // Check if they were uploaded without folder structure
    console.log('\n4️⃣ Searching for any prudent images...');
    try {
      const prudentResources = await cloudinary.api.resources({
        type: 'upload',
        max_results: 100
      });
      
      const prudentFound = prudentResources.resources.filter(r => 
        r.public_id.toLowerCase().includes('prudent')
      );
      
      console.log(`Found ${prudentFound.length} prudent images:`);
      prudentFound.forEach(resource => {
        console.log(`   - ${resource.public_id}`);
        console.log(`     URL: ${resource.secure_url}`);
      });
    } catch (searchError) {
      console.log('Error searching for prudent images');
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message || error);
  }
}

debugCloudinary();