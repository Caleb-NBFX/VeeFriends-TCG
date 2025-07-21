// fixedTestCloudinaryUrl.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

async function testSpecificImage() {
  try {
    console.log('🔍 Testing Cloudinary connection...');
    
    // Let's try listing resources with the prefix instead of search
    console.log('📋 Listing resources with prudent prefix...');
    const listResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'veefriends/cards/prudent',
      max_results: 20
    });
    
    console.log(`Found: ${listResult.resources.length} images with prudent prefix`);
    
    if (listResult.resources && listResult.resources.length > 0) {
      console.log('\n📋 Found Prudent images:');
      listResult.resources.forEach((resource, index) => {
        console.log(`${index + 1}. Public ID: ${resource.public_id}`);
        console.log(`   Secure URL: ${resource.secure_url}`);
        console.log(`   Format: ${resource.format}`);
        console.log('');
      });
      
      // Test the core version specifically
      const coreImage = listResult.resources.find(r => r.public_id.includes('core'));
      if (coreImage) {
        console.log(`🎯 Found core image: ${coreImage.public_id}`);
        console.log(`🔗 Direct URL: ${coreImage.secure_url}`);
        
        // Generate transformation URL using the exact public_id
        const transformedUrl = cloudinary.url(coreImage.public_id, {
          width: 200,
          height: 280,
          quality: 'auto',
          format: 'auto'
        });
        
        console.log('🎯 Transformed URL for your app:', transformedUrl);
      }
      
    } else {
      console.log('❌ No prudent images found');
    }
    
    // Also test a known image from the list we saw earlier
    console.log('\n🧪 Testing accountable ant (known to exist)...');
    const testResult = await cloudinary.api.resource('veefriends/cards/accountable-ant-core');
    console.log('✅ Accountable ant URL:', testResult.secure_url);
    
  } catch (error) {
    console.error('💥 Error:', error.message || error);
    if (error.http_code) {
      console.error('HTTP Code:', error.http_code);
    }
  }
}

testSpecificImage();