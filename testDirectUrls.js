// testDirectUrls.js
const https = require('https');

const urlsToTest = [
  // Test based on what we know exists
  'https://res.cloudinary.com/dfecvzwvg/image/upload/veefriends/cards/accountable-ant-core',
  'https://res.cloudinary.com/dfecvzwvg/image/upload/veefriends/cards/prudent-polar-bear-core',
  'https://res.cloudinary.com/dfecvzwvg/image/upload/v1/veefriends/cards/prudent-polar-bear-core',
  'https://res.cloudinary.com/dfecvzwvg/image/upload/q_auto,f_auto/veefriends/cards/prudent-polar-bear-core',
];

async function testUrl(url) {
  return new Promise((resolve) => {
    console.log(`🧪 Testing: ${url}`);
    
    const request = https.get(url, (response) => {
      console.log(`   ✅ Status: ${response.statusCode}`);
      console.log(`   📄 Content-Type: ${response.headers['content-type']}`);
      if (response.statusCode === 200) {
        console.log('   🎉 SUCCESS! This URL works!');
      }
      console.log('');
      resolve(response.statusCode);
    });
    
    request.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}`);
      console.log('');
      resolve(null);
    });
    
    // Set timeout
    request.setTimeout(5000, () => {
      console.log('   ⏱️ Timeout');
      console.log('');
      request.destroy();
      resolve(null);
    });
  });
}

async function testAllUrls() {
  console.log('🚀 Testing various URL formats...\n');
  
  for (const url of urlsToTest) {
    await testUrl(url);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🏁 Done testing URLs!');
}

testAllUrls();