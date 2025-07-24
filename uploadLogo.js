// uploadLogo.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

async function uploadLogo() {
  try {
    const logoPath = '/Users/caleb/Downloads/veefriendsLogo.webp';
    
    // Check if file exists
    if (!fs.existsSync(logoPath)) {
      console.log('❌ File not found at:', logoPath);
      return;
    }
    
    console.log('📤 Uploading VeeFriends logo to Cloudinary...');
    
    const result = await cloudinary.uploader.upload(logoPath, {
      public_id: 'veefriends-logo',
      folder: 'VeeFriends/assets',
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      resource_type: 'image',
      format: 'webp' // Keep as WebP for optimal performance
    });
    
    console.log('✅ Upload successful!');
    console.log('\n📋 Logo Details:');
    console.log(`Public ID: ${result.public_id}`);
    console.log(`Format: ${result.format}`);
    console.log(`Size: ${result.bytes} bytes`);
    console.log(`Dimensions: ${result.width}x${result.height}`);
    
    console.log('\n🔗 API Links for your UI:');
    
    // Original size
    console.log('\n📸 Original:');
    console.log(`${result.secure_url}`);
    
    // Common sizes for UI
    const commonSizes = [
      { name: 'Small (150px wide)', transform: 'w_150,h_auto,q_auto,f_auto' },
      { name: 'Medium (300px wide)', transform: 'w_300,h_auto,q_auto,f_auto' },
      { name: 'Large (500px wide)', transform: 'w_500,h_auto,q_auto,f_auto' },
      { name: 'Header size (200px wide)', transform: 'w_200,h_60,c_fit,q_auto,f_auto' },
      { name: 'Mobile optimized', transform: 'w_250,h_auto,q_auto,f_webp,dpr_auto' }
    ];
    
    commonSizes.forEach(size => {
      const transformedUrl = cloudinary.url(result.public_id, {
        transformation: size.transform
      });
      console.log(`\n${size.name}:`);
      console.log(transformedUrl);
    });
    
    // Helper function for your code
    console.log('\n💻 Helper function for your React components:');
    console.log(`
export function getVeeFriendsLogo(options = {}) {
  const cloudName = 'dfecvzwvg';
  const publicId = '${result.public_id}';
  
  const transformations = [];
  if (options.width) transformations.push(\`w_\${options.width}\`);
  if (options.height) transformations.push(\`h_\${options.height}\`);
  if (options.fit) transformations.push(\`c_\${options.fit}\`);
  
  // Default optimizations
  transformations.push('q_auto', 'f_auto');
  
  const transformString = transformations.length > 0 ? \`\${transformations.join(',')}/\` : '';
  
  return \`https://res.cloudinary.com/\${cloudName}/image/upload/\${transformString}\${publicId}\`;
}

// Usage examples:
// getVeeFriendsLogo({ width: 200 })
// getVeeFriendsLogo({ width: 300, height: 100, fit: 'fit' })
    `);
    
  } catch (error) {
    console.error('💥 Upload failed:', error.message || error);
  }
}

uploadLogo();