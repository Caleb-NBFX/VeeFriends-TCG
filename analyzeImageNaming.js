const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

// Load metadata
function loadMetadata() {
  const possiblePaths = [
    './veefriends_cards_metadata.json',
    './veefriends_backend/veefriends_cards_metadata.json',
    './backend/veefriends_cards_metadata.json',
    './data/veefriends_cards_metadata.json'
  ];

  for (const filePath of possiblePaths) {
    try {
      console.log(`🔍 Trying to load metadata from: ${filePath}`);
      const data = fs.readFileSync(filePath, 'utf8');
      console.log(`✅ Successfully loaded metadata from: ${filePath}`);
      return JSON.parse(data);
    } catch (error) {
      console.log(`   ❌ Not found at: ${filePath}`);
    }
  }

  console.error('❌ Could not find veefriends_cards_metadata.json');
  return null;
}

// Convert character name to expected filename format
function normalizeCharacterName(characterName) {
  return characterName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple consecutive hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Extract rarity from tier
function extractRarityFromTier(tier) {
  const tierLower = tier.toLowerCase();
  if (tierLower.includes('tier 1')) return 'legendary';
  if (tierLower.includes('tier 2')) return 'veryrare'; 
  if (tierLower.includes('tier 3')) return 'rare';
  if (tierLower.includes('tier 4')) return 'common';
  return 'unknown';
}

// Generate expected card filename: [character-name]-[rarity]
function generateExpectedCardFilename(character, tier) {
  const normalizedName = normalizeCharacterName(character);
  const rarity = extractRarityFromTier(tier);
  return `${normalizedName}-${rarity}`;
}

// Analyze VeeFriends/cards folder
async function analyzeCardsFolder() {
  console.log('🔍 Analyzing VeeFriends/cards folder...');
  
  let allCardImages = [];
  let nextCursor = null;
  
  try {
    do {
      const options = {
        type: 'upload',
        prefix: 'veefriends/cards/',
        max_results: 500,
        resource_type: 'image'
      };
      
      if (nextCursor) {
        options.next_cursor = nextCursor;
      }
      
      const result = await cloudinary.api.resources(options);
      
      // Filter to only include images directly in veefriends/cards/ (not subfolders)
      const cardImages = result.resources.filter(resource => {
        const publicId = resource.public_id;
        const pathParts = publicId.split('/');
        return pathParts.length === 3 && 
               pathParts[0] === 'veefriends' &&
               pathParts[1] === 'cards';
      });
      
      allCardImages = allCardImages.concat(cardImages);
      nextCursor = result.next_cursor;
      
    } while (nextCursor);

    console.log(`📊 Found ${allCardImages.length} images in veefriends/cards/`);
    return allCardImages;

  } catch (error) {
    console.error('❌ Error analyzing cards folder:', error.message);
    return [];
  }
}

// Categorize images based on naming patterns
function categorizeCardImages(cardImages) {
  const categories = {
    correctCards: [],           // [character-name]-[rarity]
    misplacedSocial: [],       // just [character-name] (should be in social)
    misplacedCharacters: [],   // contains 'classic-shrinkwrapped' (should be in characters)
    namingIssues: [],          // doesn't match expected pattern
    unknownFormat: []          // can't determine what it should be
  };

  const rarityValues = ['legendary', 'veryrare', 'rare', 'common'];

  cardImages.forEach(resource => {
    const filename = resource.public_id.split('/').pop();
    const parts = filename.split('-');

    // Check for misplaced characters folder images
    if (filename.includes('classic-shrinkwrapped')) {
      categories.misplacedCharacters.push({
        filename,
        publicId: resource.public_id,
        issue: 'Contains classic-shrinkwrapped - should be in characters folder'
      });
      return;
    }

    // Check if it ends with a rarity value (correct card format)
    const lastPart = parts[parts.length - 1];
    if (rarityValues.includes(lastPart)) {
      categories.correctCards.push({
        filename,
        publicId: resource.public_id,
        rarity: lastPart,
        characterParts: parts.slice(0, -1).join('-')
      });
      return;
    }

    // Check if it has no rarity (might be social image)
    if (parts.length >= 2 && !rarityValues.some(rarity => filename.includes(rarity))) {
      categories.misplacedSocial.push({
        filename,
        publicId: resource.public_id,
        issue: 'No rarity suffix - might belong in social folder'
      });
      return;
    }

    // Check for naming issues (has rarity but in wrong position)
    const hasRarity = rarityValues.some(rarity => filename.includes(rarity));
    if (hasRarity) {
      categories.namingIssues.push({
        filename,
        publicId: resource.public_id,
        issue: 'Has rarity but not at the end'
      });
      return;
    }

    // Unknown format
    categories.unknownFormat.push({
      filename,
      publicId: resource.public_id,
      issue: 'Unknown naming format'
    });
  });

  return categories;
}

// Compare correct cards with metadata expectations
function compareWithMetadata(correctCards, metadata) {
  console.log('\n🔍 Comparing correct cards with metadata expectations...');
  
  // Create character-to-tier mapping from metadata
  const expectedCards = new Map();
  metadata.forEach(item => {
    if (item.character && item.tier) {
      const expectedFilename = generateExpectedCardFilename(item.character, item.tier);
      expectedCards.set(expectedFilename, {
        character: item.character,
        tier: item.tier,
        metadataImage: item.image || 'N/A'
      });
    }
  });

  const comparison = {
    perfectMatches: [],
    namingDiscrepancies: [],
    metadataOnly: [],
    cloudinaryOnly: []
  };

  // Check each correct card against metadata
  const cloudinaryCardNames = new Set();
  correctCards.forEach(card => {
    cloudinaryCardNames.add(card.filename);
    
    if (expectedCards.has(card.filename)) {
      const metadata = expectedCards.get(card.filename);
      comparison.perfectMatches.push({
        filename: card.filename,
        character: metadata.character,
        tier: metadata.tier,
        publicId: card.publicId
      });
    } else {
      // Look for similar character names in metadata
      const characterPart = card.characterParts;
      const possibleMatches = [];
      
      expectedCards.forEach((data, expectedFilename) => {
        const expectedCharacterPart = normalizeCharacterName(data.character);
        if (expectedCharacterPart === characterPart) {
          possibleMatches.push({
            expectedFilename,
            character: data.character,
            tier: data.tier
          });
        }
      });

      comparison.cloudinaryOnly.push({
        filename: card.filename,
        characterParts: characterPart,
        rarity: card.rarity,
        possibleMatches
      });
    }
  });

  // Find metadata entries that don't have corresponding Cloudinary images
  expectedCards.forEach((data, expectedFilename) => {
    if (!cloudinaryCardNames.has(expectedFilename)) {
      comparison.metadataOnly.push({
        expectedFilename,
        character: data.character,
        tier: data.tier,
        metadataImage: data.metadataImage
      });
    }
  });

  return comparison;
}

// Print comprehensive report
function printAnalysisReport(categories, comparison, totalImages) {
  console.log('\n' + '='.repeat(80));
  console.log('VEEFRIENDS/CARDS FOLDER ANALYSIS REPORT');
  console.log('='.repeat(80));

  console.log('\n📊 FOLDER CONTENTS SUMMARY:');
  console.log(`Total images analyzed: ${totalImages}`);
  console.log(`Correctly formatted cards: ${categories.correctCards.length}`);
  console.log(`Misplaced social images: ${categories.misplacedSocial.length}`);
  console.log(`Misplaced character images: ${categories.misplacedCharacters.length}`);
  console.log(`Naming issues: ${categories.namingIssues.length}`);
  console.log(`Unknown format: ${categories.unknownFormat.length}`);

  console.log('\n📊 METADATA COMPARISON:');
  console.log(`Perfect matches: ${comparison.perfectMatches.length}`);
  console.log(`In Cloudinary only: ${comparison.cloudinaryOnly.length}`);
  console.log(`In metadata only: ${comparison.metadataOnly.length}`);

  // Show misplaced images
  if (categories.misplacedCharacters.length > 0) {
    console.log('\n🚨 MISPLACED CHARACTER IMAGES (should be in characters folder):');
    categories.misplacedCharacters.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.filename}`);
    });
    if (categories.misplacedCharacters.length > 10) {
      console.log(`   ... and ${categories.misplacedCharacters.length - 10} more`);
    }
  }

  if (categories.misplacedSocial.length > 0) {
    console.log('\n🚨 POTENTIAL MISPLACED SOCIAL IMAGES:');
    categories.misplacedSocial.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.filename}`);
    });
    if (categories.misplacedSocial.length > 10) {
      console.log(`   ... and ${categories.misplacedSocial.length - 10} more`);
    }
  }

  // Show naming issues
  if (categories.namingIssues.length > 0) {
    console.log('\n🚨 NAMING ISSUES (rarity in wrong position):');
    categories.namingIssues.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.filename}`);
    });
    if (categories.namingIssues.length > 10) {
      console.log(`   ... and ${categories.namingIssues.length - 10} more`);
    }
  }

  // Show metadata mismatches
  if (comparison.cloudinaryOnly.length > 0) {
    console.log('\n🤔 IMAGES IN CLOUDINARY BUT NOT IN METADATA:');
    comparison.cloudinaryOnly.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.filename}`);
      if (item.possibleMatches.length > 0) {
        console.log(`   Possible matches: ${item.possibleMatches.map(m => `${m.character} (${m.tier})`).join(', ')}`);
      }
    });
    if (comparison.cloudinaryOnly.length > 10) {
      console.log(`   ... and ${comparison.cloudinaryOnly.length - 10} more`);
    }
  }

  if (comparison.metadataOnly.length > 0) {
    console.log('\n❌ EXPECTED CARDS MISSING FROM CLOUDINARY:');
    comparison.metadataOnly.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. ${item.character} (${item.tier})`);
      console.log(`   Expected: ${item.expectedFilename}`);
    });
    if (comparison.metadataOnly.length > 10) {
      console.log(`   ... and ${comparison.metadataOnly.length - 10} more`);
    }
  }

  console.log('\n' + '='.repeat(80));
}

// Generate cleanup scripts
function generateCleanupScripts(categories) {
  // Script to move misplaced images
  if (categories.misplacedCharacters.length > 0 || categories.misplacedSocial.length > 0) {
    const moveScript = `// moveImages.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

async function moveImages() {
  const moves = [
${categories.misplacedCharacters.map(item => `    {
      from: '${item.publicId}',
      to: 'veefriends/characters/${item.filename}',
      reason: 'Contains classic-shrinkwrapped'
    }`).join(',\n')}${categories.misplacedCharacters.length > 0 && categories.misplacedSocial.length > 0 ? ',' : ''}
${categories.misplacedSocial.map(item => `    {
      from: '${item.publicId}',
      to: 'veefriends/social/${item.filename}',
      reason: 'No rarity suffix'
    }`).join(',\n')}
  ];

  console.log(\`🚀 Moving \${moves.length} misplaced images...\`);
  
  for (const move of moves) {
    try {
      console.log(\`📁 Moving: \${move.from} → \${move.to}\`);
      await cloudinary.uploader.rename(move.from, move.to);
      console.log(\`   ✅ Success\`);
    } catch (error) {
      console.error(\`   ❌ Failed: \${error.message}\`);
    }
  }
}

moveImages();`;

    fs.writeFileSync('./moveImages.js', moveScript);
    console.log('\n💾 Generated move script: moveImages.js');
  }
}

// Main function
async function main() {
  console.log('🚀 Starting VeeFriends/cards folder analysis...\n');

  // Load metadata
  const metadata = loadMetadata();
  if (!metadata) return;

  console.log(`📊 Loaded ${metadata.length} items from metadata`);

  // Analyze cards folder
  const cardImages = await analyzeCardsFolder();
  if (cardImages.length === 0) return;

  // Categorize images
  const categories = categorizeCardImages(cardImages);

  // Compare with metadata
  const comparison = compareWithMetadata(categories.correctCards, metadata);

  // Print report
  printAnalysisReport(categories, comparison, cardImages.length);

  // Save detailed results
  fs.writeFileSync('./cardsAnalysisResults.json', JSON.stringify({
    categories,
    comparison
  }, null, 2));

  console.log('\n💾 Detailed results saved to: cardsAnalysisResults.json');

  // Generate cleanup scripts
  generateCleanupScripts(categories);

  console.log('\n✅ Analysis complete!');
}

main().catch(console.error);