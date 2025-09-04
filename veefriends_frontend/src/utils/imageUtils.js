// Helper function to generate card image URLs from Cloudinary
export function getCardImageUrl(card) {
  if (!card || !card.character) return null;
  
  const characterSlug = card.character
    .toLowerCase()
    .replace(/'/g, '')  // Remove apostrophes first
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Fix rarity mapping to match Cloudinary filenames
  const raritySlug = (card.rarity || 'core')
    .toLowerCase()
    .replace(/\s+/g, '') // Remove spaces: "Very Rare" -> "veryrare"
    .replace(/[^a-z0-9]/g, ''); // Remove any special characters
  
  // Clean path structure (after fixing duplicates)
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dfecvzwvg';
  return `https://res.cloudinary.com/${cloudName}/image/upload/veefriends/cards/${characterSlug}-${raritySlug}`;
}

// Fallback for when image fails to load
export function getCardFallbackImage(card) {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dfecvzwvg';
  
  if (!card || !card.character) {
    // Use a known working card as fallback
    return `https://res.cloudinary.com/${cloudName}/image/upload/veefriends/cards/5555-fan-core`;
  }
  
  // Try the image field from metadata as fallback
  if (card.image) {
    // Remove any file extension from the metadata
    const imageName = card.image.replace(/\.(png|jpg|jpeg)$/i, '');
    return `https://res.cloudinary.com/${cloudName}/image/upload/veefriends/cards/${imageName}`;
  }
  
  // Default fallback to a known working card
  return `https://res.cloudinary.com/${cloudName}/image/upload/veefriends/cards/5555-fan-core`;
}

// Helper to get optimized image with transformations
export function getOptimizedCardImageUrl(card, options = {}) {
  if (!card || !card.character) return null;
  
  const characterSlug = card.character
    .toLowerCase()
    .replace(/'/g, '')  // Remove apostrophes first
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Fix rarity mapping to match Cloudinary filenames
  const raritySlug = (card.rarity || 'core')
    .toLowerCase()
    .replace(/\s+/g, '') // Remove spaces: "Very Rare" -> "veryrare"
    .replace(/[^a-z0-9]/g, ''); // Remove any special characters
  
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dfecvzwvg';
  
  // Build transformation parameters
  const transformations = [];
  
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  
  // Default optimizations
  if (transformations.length === 0) {
    transformations.push('q_auto', 'f_auto');
  }
  
  const transformString = transformations.length > 0 ? `${transformations.join(',')}/` : '';
  
  // Clean path structure - NO .png extension needed
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}veefriends/cards/${characterSlug}-${raritySlug}`;
}

// Helper function to get VeeFriends logo with various sizes and optimizations
export function getVeeFriendsLogo(options = {}) {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dfecvzwvg';
  const publicId = 'VeeFriends/assets/veefriends-logo';
  
  const transformations = [];
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.fit) transformations.push(`c_${options.fit}`);
  
  // Default optimizations
  transformations.push('q_auto', 'f_auto');
  
  const transformString = transformations.length > 0 ? `${transformations.join(',')}/` : '';
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${publicId}`;
}

// Predefined logo sizes for common use cases
export const LOGO_SIZES = {
  small: { width: 150 },
  medium: { width: 300 },
  large: { width: 500 },
  header: { width: 200, height: 60, fit: 'fit' },
  mobile: { width: 250 }
};

// Convenience functions for common logo sizes
export function getVeeFriendsLogoSmall() {
  return getVeeFriendsLogo(LOGO_SIZES.small);
}

export function getVeeFriendsLogoMedium() {
  return getVeeFriendsLogo(LOGO_SIZES.medium);
}

export function getVeeFriendsLogoLarge() {
  return getVeeFriendsLogo(LOGO_SIZES.large);
}

export function getVeeFriendsLogoHeader() {
  return getVeeFriendsLogo(LOGO_SIZES.header);
}

export function getVeeFriendsLogoMobile() {
  return getVeeFriendsLogo(LOGO_SIZES.mobile);
}

// Debug function to test URL generation
export function debugCardImageUrl(card) {
  console.log('Card:', card);
  const url = getOptimizedCardImageUrl(card, { width: 200, height: 280 });
  console.log('Generated URL:', url);
  return url;
}

// Debug function to test logo URL generation
export function debugLogoUrl(options) {
  console.log('Logo options:', options);
  const url = getVeeFriendsLogo(options);
  console.log('Generated logo URL:', url);
  return url;
}