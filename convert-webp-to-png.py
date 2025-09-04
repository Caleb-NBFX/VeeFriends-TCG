import os
from PIL import Image, ImageCms
import glob

def convert_webp_to_png():
    source_dir = "/Users/caleb/Downloads"
    dest_dir = "/Users/caleb/Downloads/Streaming/veeFriends/textures"
    
    # Specific files to convert
    target_files = [
        "the-oak-monster-classic-shrinkwrapped.webp",
        "perfect-persian-cat-classic-shrinkwrapped.webp"
    ]
    
    print("🔍 Looking for specific WEBP files...")
    
    converted_count = 0
    
    for target_file in target_files:
        webp_path = os.path.join(source_dir, target_file)
        
        if os.path.exists(webp_path):
            try:
                # Open and process image
                with Image.open(webp_path) as img:
                    print(f"📄 Processing {target_file}: {img.size[0]}x{img.size[1]}")
                    print(f"   Original mode: {img.mode}")
                    
                    # Convert to RGBA to preserve alpha channel
                    if img.mode != 'RGBA':
                        if img.mode == 'RGB':
                            # Add alpha channel to RGB images
                            img = img.convert('RGBA')
                        elif img.mode in ('LA', 'P'):
                            img = img.convert('RGBA')
                        else:
                            img = img.convert('RGBA')
                    
                    # Keep original dimensions (no resizing)
                    original_size = img.size
                    
                    # Ensure sRGB color profile (optional, may skip if causes issues)
                    try:
                        srgb_profile = ImageCms.createProfile('sRGB')
                        img = ImageCms.profileToProfile(img, 
                                                      ImageCms.createProfile('sRGB'), 
                                                      srgb_profile)
                    except:
                        print(f"   ⚠️ Color profile conversion skipped for {target_file}")
                    
                    # Save as PNG with alpha channel
                    png_filename = target_file.replace('.webp', '.png')
                    output_path = os.path.join(dest_dir, png_filename)
                    
                    img.save(output_path, 'PNG', optimize=False)
                    
                    # Verify output
                    with Image.open(output_path) as verify_img:
                        alpha_status = "with alpha" if verify_img.mode in ('RGBA', 'LA') else "no alpha"
                        print(f"✅ Converted: {target_file} -> {png_filename}")
                        print(f"   📏 Size: {verify_img.size[0]}x{verify_img.size[1]} ({alpha_status})")
                    
                    converted_count += 1
                    
            except Exception as e:
                print(f"❌ Error converting {target_file}: {str(e)}")
        else:
            print(f"❌ File not found: {target_file}")
    
    print(f"\n🎉 Successfully converted {converted_count} images to PNG format")
    print(f"📁 Saved to: {dest_dir}")
    print(f"🎨 Settings: Original dimensions, RGB color space, Alpha channel preserved")

if __name__ == "__main__":
    convert_webp_to_png()