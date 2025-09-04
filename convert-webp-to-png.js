const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function convertWebpToPng() {
    const sourceDir = '/Users/caleb/Downloads';
    const destDir = '/Users/caleb/Downloads/Streaming/veeFriends/textures';
    
    // Correct target dimensions based on your existing files
    const targetSize = { width: 2880, height: 1080 };
    
    console.log(`🎯 Target size: ${targetSize.width}x${targetSize.height}`);
    
    // Find WEBP files in Downloads
    const webpFiles = await new Promise((resolve, reject) => {
        glob(path.join(sourceDir, '*.webp'), (err, files) => {
            if (err) reject(err);
            else resolve(files);
        });
    });
    
    console.log(`Found ${webpFiles.length} WEBP files in Downloads folder`);
    console.log('Converting WEBP files to PNG with correct dimensions...');
    
    let convertedCount = 0;
    
    for (const webpFile of webpFiles) {
        try {
            const filename = path.basename(webpFile);
            const pngFilename = filename.replace('.webp', '.png');
            const outputPath = path.join(destDir, pngFilename);
            
            // Get original image info
            const metadata = await sharp(webpFile).metadata();
            console.log(`📄 Processing ${filename}: ${metadata.width}x${metadata.height}`);
            
            await sharp(webpFile)
                .resize(targetSize.width, targetSize.height, {
                    fit: 'fill', // Stretch to exact dimensions
                    background: { r: 255, g: 255, b: 255, alpha: 1 } // White background
                })
                .png({
                    quality: 100,
                    compressionLevel: 0, // No compression for best quality
                    progressive: false
                })
                .withColorSpace('srgb') // Ensure sRGB color space
                .removeAlpha() // Remove alpha channel
                .toFile(outputPath);
            
            // Verify the output
            const outputMetadata = await sharp(outputPath).metadata();
            console.log(`✅ Converted: ${filename} -> ${pngFilename} (${outputMetadata.width}x${outputMetadata.height})`);
            convertedCount++;
            
        } catch (error) {
            console.log(`❌ Error converting ${path.basename(webpFile)}: ${error.message}`);
        }
    }
    
    console.log(`\n🎉 Successfully converted ${convertedCount} images to PNG format`);
    console.log(`📁 Saved to: ${destDir}`);
    console.log(`📏 All images resized to: ${targetSize.width}x${targetSize.height}`);
    console.log(`🎨 Color space: sRGB, No alpha channel`);
}

// Run the conversion
convertWebpToPng().catch(console.error);