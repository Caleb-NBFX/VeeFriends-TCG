import os
import requests
from PIL import Image
import io

def download_and_convert_missing_images():
    base_url = "https://storage.googleapis.com/cardeio-images/veefriends/cards/small/"
    dest_dir = "/Users/caleb/Downloads/Streaming/veeFriends/textures"
    target_size = (851, 1251)
    
    # Missing images with their rarity
    missing_images = [
        ("GIFT GOAT", "core"),
        ("GLOWING GLOW WORM", "core"),
        ("ZESTFUL ZEBRA", "core"),
        ("BOSS BOBCAT", "rare"),
        ("BULLISH BULL", "rare"),
        ("DOPE DODO", "rare"),
        ("GIFT GOAT", "rare"),
        ("GLOWING GLOW WORM", "rare"),
        ("GRITTY GHOST", "rare"),
        ("HEART-TROOPER", "rare"),
        ("ZESTFUL ZEBRA", "rare"),
        ("AMPED AYE AYE", "veryrare"),
        ("AWESOME AFRICAN CIVET", "veryrare"),
        ("CANDID CLOWNFISH", "veryrare"),
        ("DARING DRAGONFLY", "veryrare"),
        ("GIFT GOAT", "veryrare"),
        ("ACCOUNTABLE ANTEATER", "epic"),
        ("BE THE BIGGER PERSON", "epic"),
        ("GIFT GOAT", "epic"),
        ("ZESTFUL ZEBRA", "epic")
    ]
    
    def character_name_to_url_format(character_name):
        """Convert character name to URL format (rarity-character-name.webp)"""
        return character_name.lower().replace(' ', '-').replace('&', '').replace("'", "").replace('--', '-')
    
    def character_name_to_filename(character_name, rarity):
        """Convert character name to final filename (character-name-rarity.png)"""
        base_name = character_name.lower().replace(' ', '-').replace('&', '').replace("'", "").replace('--', '-')
        return f"{base_name}-{rarity}.png"
    
    print(f"🚀 Starting download and conversion of {len(missing_images)} missing images...")
    print(f"📁 Target directory: {dest_dir}")
    print(f"📏 Target size: {target_size[0]}x{target_size[1]}")
    
    successful_downloads = 0
    failed_downloads = 0
    
    for character_name, rarity in missing_images:
        try:
            # Create URL format filename
            url_character = character_name_to_url_format(character_name)
            source_filename = f"{rarity}-{url_character}.webp"
            download_url = base_url + source_filename
            
            # Create final filename
            final_filename = character_name_to_filename(character_name, rarity)
            output_path = os.path.join(dest_dir, final_filename)
            
            print(f"\n📥 Downloading: {character_name} ({rarity})")
            print(f"   URL: {download_url}")
            print(f"   Output: {final_filename}")
            
            # Download the image
            response = requests.get(download_url, timeout=30)
            response.raise_for_status()
            
            # Open the image from downloaded bytes
            with Image.open(io.BytesIO(response.content)) as img:
                print(f"   📄 Original size: {img.size[0]}x{img.size[1]}, mode: {img.mode}")
                
                # Convert to RGB (remove alpha channel)
                if img.mode in ('RGBA', 'LA', 'P'):
                    # Create white background
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    if img.mode in ('RGBA', 'LA'):
                        background.paste(img, mask=img.split()[-1])
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Resize to target size
                img_resized = img.resize(target_size, Image.Resampling.LANCZOS)
                
                # Save as PNG
                img_resized.save(output_path, 'PNG', optimize=False)
                
                # Verify the saved image
                with Image.open(output_path) as verify_img:
                    print(f"   ✅ Saved: {verify_img.size[0]}x{verify_img.size[1]}, mode: {verify_img.mode}")
                
                successful_downloads += 1
                
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Download failed: {str(e)}")
            failed_downloads += 1
        except Exception as e:
            print(f"   ❌ Processing failed: {str(e)}")
            failed_downloads += 1
    
    print(f"\n🎉 Download and conversion completed!")
    print(f"✅ Successful: {successful_downloads}")
    print(f"❌ Failed: {failed_downloads}")
    print(f"📁 Images saved to: {dest_dir}")

if __name__ == "__main__":
    # Create destination directory if it doesn't exist
    dest_dir = "/Users/caleb/Downloads/Streaming/veeFriends/textures"
    os.makedirs(dest_dir, exist_ok=True)
    
    download_and_convert_missing_images()