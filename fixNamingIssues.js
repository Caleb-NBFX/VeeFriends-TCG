const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dfecvzwvg',
  api_key: '911888427374839',
  api_secret: 'psk5w4hwB-e6VWuEh_R2Qba4yek'
});

// Load the analysis results to get the naming issues
function loadAnalysisResults() {
  try {
    const data = fs.readFileSync('./cardsAnalysisResults.json', 'utf8');
    const results = JSON.parse(data);
    return results.categories.namingIssues;
  } catch (error) {
    console.error('❌ Error loading analysis results:', error.message);
    console.log('💡 Make sure you ran analyzeImageNaming.js first to generate cardsAnalysisResults.json');
    return null;
  }
}

// Fix the naming pattern: move rarity from wrong position to the end
function fixNamingPattern(filename) {
  const rarityValues = ['legendary', 'veryrare', 'rare', 'common'];
  const parts = filename.split('-');
  
  // Find and remove the rarity from its current position
  let foundRarity = null;
  const partsWithoutRarity = [];
  
  for (const part of parts) {
    if (rarityValues.includes(part)) {
      foundRarity = part;
    } else {
      partsWithoutRarity.push(part);
    }
  }
  
  // If we found a rarity, put it at the end
  if (foundRarity) {
    return `${partsWithoutRarity.join('-')}-${foundRarity}`;
  }
  
  // If no rarity found, return original
  return filename;
}

// Create rename operations for the naming issues
function createRenameOperations(namingIssues) {
  const renameOps = [];
  
  namingIssues.forEach(issue => {
    const oldFilename = issue.filename;
    const newFilename = fixNamingPattern(oldFilename);
    
    if (oldFilename !== newFilename) {
      renameOps.push({
        oldPublicId: issue.publicId,
        newPublicId: `veefriends/cards/${newFilename}`,
        oldFilename,
        newFilename,
        issue: issue.issue
      });
    }
  });
  
  return renameOps;
}

// Execute the renames
async function executeRenames(renameOps) {
  console.log(`🚀 Starting rename of ${renameOps.length} images with naming issues...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < renameOps.length; i++) {
    const rename = renameOps[i];
    
    try {
      console.log(`📝 Renaming ${i + 1}/${renameOps.length}:`);
      console.log(`   ${rename.oldFilename}`);
      console.log(`   → ${rename.newFilename}`);
      
      await cloudinary.uploader.rename(rename.oldPublicId, rename.newPublicId);
      console.log(`   ✅ Success\n`);
      successCount++;
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}\n`);
      errorCount++;
    }
  }
  
  console.log('🏁 Rename Summary:');
  console.log(`✅ Successfully renamed: ${successCount} images`);
  console.log(`❌ Failed to rename: ${errorCount} images`);
  
  return { successCount, errorCount };
}

// Preview what changes will be made
function previewChanges(renameOps) {
  console.log('👀 PREVIEW OF CHANGES TO BE MADE:');
  console.log('='.repeat(80));
  
  renameOps.forEach((rename, index) => {
    console.log(`\n${index + 1}. RENAME:`);
    console.log(`   Current:  ${rename.oldFilename}`);
    console.log(`   New:      ${rename.newFilename}`);
    console.log(`   Issue:    ${rename.issue}`);
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(`Total images to rename: ${renameOps.length}`);
}

// Main function
async function main() {
  console.log('🔧 Starting VeeFriends card naming issues fix...\n');
  
  // Load the naming issues from analysis results
  const namingIssues = loadAnalysisResults();
  if (!namingIssues || namingIssues.length === 0) {
    console.log('✅ No naming issues found or analysis results not available');
    return;
  }
  
  console.log(`📊 Found ${namingIssues.length} images with naming issues\n`);
  
  // Create rename operations
  const renameOps = createRenameOperations(namingIssues);
  
  if (renameOps.length === 0) {
    console.log('✅ No rename operations needed');
    return;
  }
  
  // Preview the changes
  previewChanges(renameOps);
  
  // Ask for confirmation
  console.log('\n❓ Do you want to proceed with these renames?');
  console.log('   Type "yes" to continue, or anything else to cancel:');
  
  // For automated execution, you can comment out the confirmation and uncomment the line below
  const confirmation = await new Promise(resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('> ', (answer) => {
      readline.close();
      resolve(answer.toLowerCase().trim());
    });
  });
  
  if (confirmation === 'yes' || confirmation === 'y') {
    // Execute the renames
    const results = await executeRenames(renameOps);
    
    // Save a log of what was done
    const logData = {
      timestamp: new Date().toISOString(),
      totalAttempted: renameOps.length,
      successful: results.successCount,
      failed: results.errorCount,
      operations: renameOps
    };
    
    fs.writeFileSync('./namingFixLog.json', JSON.stringify(logData, null, 2));
    console.log('\n💾 Operation log saved to: namingFixLog.json');
    
  } else {
    console.log('❌ Operation cancelled');
  }
  
  console.log('\n✅ Script complete!');
}

// For automated execution without confirmation, uncomment this:
// async function mainAuto() {
//   const namingIssues = loadAnalysisResults();
//   if (!namingIssues || namingIssues.length === 0) return;
//   
//   const renameOps = createRenameOperations(namingIssues);
//   if (renameOps.length === 0) return;
//   
//   console.log(`🚀 Auto-fixing ${renameOps.length} naming issues...`);
//   await executeRenames(renameOps);
// }

main().catch(console.error);