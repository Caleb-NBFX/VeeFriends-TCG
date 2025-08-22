// Utility to extract and send game data to Captivate from ProducerDashboard
import { sendVariablesToCaptivate } from './useCaptivate';

// Helper to format character names for filenames
function toSlug(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getCardImageUrls(card) {
  const characterSlug = toSlug(card.character);
  const raritySlug = (card.rarity || '').toLowerCase();
  return {
    card_imageUrl: characterSlug && raritySlug ? `${characterSlug}-${raritySlug}.png` : '',
    card_socialImageUrl: characterSlug ? `${characterSlug}.png` : '',
    card_characterUrl: characterSlug ? `${characterSlug}-classic-shrinkwrapped.png` : '',
  };
}

const RARITY_COLORS = {
  'core': '#E4CE13',
  'rare': '#783F22',
  'very rare': '#C05316',
  'epic': '#2DAD7C',
  'spectacular': '#B1A5D0',
};

export function getColorForRarity(rarity) {
  if (!rarity) return '';
  return RARITY_COLORS[rarity.toLowerCase()] || '';
}

// Generate next round data by "peeking" at the deck without modifying game state
async function generateNextRoundDataByPeeking(gameState) {
  console.log('👀 Generating next round data by peeking...');
  console.log('👀 Full gameState received:', JSON.stringify(gameState, null, 2));
  
  try {
    const currentRoundNumber = gameState.currentRound;
    const player1 = gameState.player1;
    const player2 = gameState.player2;
    
    console.log('👀 Current round:', currentRoundNumber);
    console.log('👀 Player1 object keys:', Object.keys(player1 || {}));
    console.log('👀 Player2 object keys:', Object.keys(player2 || {}));
    
    const player1Deck = player1?.deck || [];
    const player2Deck = player2?.deck || [];
    
    console.log('👀 P1 deck length:', player1Deck.length);
    console.log('👀 P2 deck length:', player2Deck.length);
    console.log('👀 P1 deck first 3 cards:', player1Deck.slice(0, 3));
    console.log('👀 P2 deck first 3 cards:', player2Deck.slice(0, 3));
    
    // Check if there are cards left for the next round
    if (player1Deck.length === 0 || player2Deck.length === 0) {
      console.log('👀 No cards left for next round - P1:', player1Deck.length, 'P2:', player2Deck.length);
      return null;
    }
    
    // Peek at the next cards (first cards in the remaining deck)
    const nextP1Card = player1Deck[0];
    const nextP2Card = player2Deck[0];
    
    console.log('👀 Next P1 card reference (full):', JSON.stringify(nextP1Card, null, 2));
    console.log('👀 Next P2 card reference (full):', JSON.stringify(nextP2Card, null, 2));
    
    if (!nextP1Card || !nextP2Card) {
      console.log('👀 Missing card references - P1:', !!nextP1Card, 'P2:', !!nextP2Card);
      return null;
    }
    
    // Create next round data using the card references
    const nextRoundData = {
      round: currentRoundNumber + 1,
      C1: nextP1Card,
      C2: nextP2Card,
      winner: null,
      result: null,
      attribute: null,
      attacker: gameState.attacker,
      status: 'peeked'
    };
    
    console.log('👀 Generated next round data (full):', JSON.stringify(nextRoundData, null, 2));
    return nextRoundData;
    
  } catch (error) {
    console.error('👀 Error generating next round data:', error);
    return null;
  }
}

// Send card1/card2 data (for new round)
export async function sendRoundDataToCaptivate(roundData) {
  console.log('🟡 sendRoundDataToCaptivate called with:', roundData);
  
  const card1 = roundData.C1 || {};
  const card2 = roundData.C2 || {};

  const card1Urls = getCardImageUrls(card1);
  const card2Urls = getCardImageUrls(card2);

  const variables = {
    // Card 1
    card1_aura: card1.Aura ?? 0,
    card1_skill: card1.Skill ?? 0,
    card1_stamina: card1.Stamina ?? 0,
    card1_character: card1.character ?? '',
    card1_rarity: card1.rarity ?? '',
    card1_score: card1.Score !== undefined ? Math.round(card1.Score) : 0,
    card1_color: getColorForRarity(card1.rarity),
    card1_imageUrl: card1Urls.card_imageUrl,
    card1_socialImageUrl: card1Urls.card_socialImageUrl,
    card1_characterUrl: card1Urls.card_characterUrl,
    card1_rarityImageUrl: card1.rarityImage ?? '',
    card1_tier: card1.tier ?? '',
    card1_quote: card1.quote ?? '',
    card1_vfc: card1.vfc ?? '',
    // Card 2
    card2_aura: card2.Aura ?? 0,
    card2_skill: card2.Skill ?? 0,
    card2_stamina: card2.Stamina ?? 0,
    card2_character: card2.character ?? '',
    card2_rarity: card2.rarity ?? '',
    card2_score: card2.Score !== undefined ? Math.round(card2.Score) : 0,
    card2_color: getColorForRarity(card2.rarity),
    card2_imageUrl: card2Urls.card_imageUrl,
    card2_socialImageUrl: card2Urls.card_socialImageUrl,
    card2_characterUrl: card2Urls.card_characterUrl,
    card2_rarityImageUrl: card2.rarityImage ?? '',
    card2_tier: card2.tier ?? '',
    card2_quote: card2.quote ?? '',
    card2_vfc: card2.vfc ?? '',
  };

  console.log('🟡 About to send round variables to Captivate:', variables);
  const result = await sendVariablesToCaptivate(variables);
  console.log('🟡 sendVariablesToCaptivate result:', result);
  return result;
}

// Send player and winner data (after round winner is decided)
export async function sendPlayerAndWinnerDataToCaptivate(gameState, roundData) {
  console.log('🏆 sendPlayerAndWinnerDataToCaptivate called with:', { gameState: !!gameState, roundData: !!roundData });
  
  const player1 = gameState.player1 || {};
  const player2 = gameState.player2 || {};
  
  // Extract player data using the function we just defined
  const playerData = extractPlayerDataForCaptivate(player1, player2);
  console.log('🏆 Player data extracted:', playerData);

  // Get winner card data if available
  const winnerCard = roundData?.winner === 'P1' ? roundData?.C1 : roundData?.winner === 'P2' ? roundData?.C2 : null;
  const winnerUrls = winnerCard ? getCardImageUrls(winnerCard) : { card_imageUrl: '', card_socialImageUrl: '', card_characterUrl: '' };

  // Use the exact same variables structure as before
  const variables = {
    // Player data (keep exact same structure)
    ...playerData,
    // Winner card data (keep exact same structure)
    winner_character: winnerCard?.character ?? '',
    winner_imageUrl: winnerUrls.card_imageUrl,
    winner_socialImageUrl: winnerUrls.card_socialImageUrl,
    winner_characterUrl: winnerUrls.card_characterUrl,
    winner_rarity: winnerCard?.rarity ?? '',
    winner_rarityImageUrl: winnerCard?.rarityImage ?? '',
    winner_color: getColorForRarity(winnerCard?.rarity),
    winner_score: winnerCard?.Score !== undefined ? Math.round(winnerCard.Score) : 0,
    winner_aura: winnerCard?.Aura ?? 0,
    winner_skill: winnerCard?.Skill ?? 0,
    winner_stamina: winnerCard?.Stamina ?? 0,
    winner_tier: winnerCard?.tier ?? '',
    winner_quote: winnerCard?.quote ?? '',
    winner_vfc: winnerCard?.vfc ?? '',
  };

  console.log('🏆 About to send winner variables to Captivate:', variables);
  
  // Revert to the original working method for now
  try {
    const result = await sendVariablesToCaptivate(variables);
    console.log('🏆 Winner data sent successfully:', result);
    return result;
  } catch (error) {
    console.error('🔴 Failed to send winner data:', error);
    throw error;
  }
}

// Send current round data with 'update' action
export async function sendCurrentRoundDataToCaptivate(roundData) {
  console.log(`[TIMING ${new Date().toISOString()}] 🟡 sendCurrentRoundDataToCaptivate ENTRY`);
  
  const card1 = roundData.C1 || {};
  const card2 = roundData.C2 || {};

  const card1Urls = getCardImageUrls(card1);
  const card2Urls = getCardImageUrls(card2);

  const variables = {
    // Card 1
    card1_aura: card1.Aura ?? 0,
    card1_skill: card1.Skill ?? 0,
    card1_stamina: card1.Stamina ?? 0,
    card1_character: card1.character ?? '',
    card1_rarity: card1.rarity ?? '',
    card1_score: card1.Score !== undefined ? Math.round(card1.Score) : 0,
    card1_color: getColorForRarity(card1.rarity),
    card1_imageUrl: card1Urls.card_imageUrl,
    card1_socialImageUrl: card1Urls.card_socialImageUrl,
    card1_characterUrl: card1Urls.card_characterUrl,
    card1_rarityImageUrl: card1.rarityImage ?? '',
    card1_tier: card1.tier ?? '',
    card1_quote: card1.quote ?? '',
    card1_vfc: card1.vfc ?? '',
    // Card 2
    card2_aura: card2.Aura ?? 0,
    card2_skill: card2.Skill ?? 0,
    card2_stamina: card2.Stamina ?? 0,
    card2_character: card2.character ?? '',
    card2_rarity: card2.rarity ?? '',
    card2_score: card2.Score !== undefined ? Math.round(card2.Score) : 0,
    card2_color: getColorForRarity(card2.rarity),
    card2_imageUrl: card2Urls.card_imageUrl,
    card2_socialImageUrl: card2Urls.card_socialImageUrl,
    card2_characterUrl: card2Urls.card_characterUrl,
    card2_rarityImageUrl: card2.rarityImage ?? '',
    card2_tier: card2.tier ?? '',
    card2_quote: card2.quote ?? '',
    card2_vfc: card2.vfc ?? '',
  };

  console.log(`[TIMING ${new Date().toISOString()}] 🟡 About to send UPDATE commands using scheduleAction...`);
  
  try {
    const { ServiceHandler } = await import('./servicehandler.mjs');
    
    if (!ServiceHandler.scheduler) {
      console.warn('ServiceHandler scheduler not available for updates');
      return null;
    }

    const templateNames = ['Card L', 'Card R', 'Character L', 'Character R'];
    
    const updateResults = [];
    
    for (const templateName of templateNames) {
      try {
        console.log(`[TIMING ${new Date().toISOString()}] 🟡 Sending UPDATE command to template: ${templateName}`);
        
        const result = await ServiceHandler.scheduler.scheduleAction('update', ServiceHandler.inputName, templateName, variables);
        updateResults.push({ template: templateName, result });
        
        console.log(`[TIMING ${new Date().toISOString()}] ✅ UPDATE command sent to ${templateName}:`, result);
      } catch (error) {
        console.error(`[TIMING ${new Date().toISOString()}] ❌ Failed to send UPDATE to ${templateName}:`, error);
        updateResults.push({ template: templateName, error: error.message });
      }
    }

    console.log(`[TIMING ${new Date().toISOString()}] 🟡 All UPDATE results:`, updateResults);
    return updateResults;

  } catch (error) {
    console.error(`[TIMING ${new Date().toISOString()}] 🔴 Failed to send UPDATE commands:`, error);
    throw error;
  }
}

// Send next round data with 'render' action to specific templates
export async function sendNextRoundDataToCaptivate(roundData) {
  console.log('🔮 sendNextRoundDataToCaptivate called with:', roundData);
  
  // Use the same data mapping as regular round data
  const card1 = roundData.C1 || {};
  const card2 = roundData.C2 || {};

  const card1Urls = getCardImageUrls(card1);
  const card2Urls = getCardImageUrls(card2);

  const variables = {
    card1_aura: card1.Aura ?? 0,
    card1_skill: card1.Skill ?? 0,
    card1_stamina: card1.Stamina ?? 0,
    card1_character: card1.character ?? '',
    card1_rarity: card1.rarity ?? '',
    card1_score: card1.Score !== undefined ? Math.round(card1.Score) : 0,
    card1_color: getColorForRarity(card1.rarity),
    card1_imageUrl: card1Urls.card_imageUrl,
    card1_socialImageUrl: card1Urls.card_socialImageUrl,
    card1_characterUrl: card1Urls.card_characterUrl,
    card1_rarityImageUrl: card1.rarityImage ?? '',
    card1_tier: card1.tier ?? '',
    card1_quote: card1.quote ?? '',
    card1_vfc: card1.vfc ?? '',
    // Card 2
    card2_aura: card2.Aura ?? 0,
    card2_skill: card2.Skill ?? 0,
    card2_stamina: card2.Stamina ?? 0,
    card2_character: card2.character ?? '',
    card2_rarity: card2.rarity ?? '',
    card2_score: card2.Score !== undefined ? Math.round(card2.Score) : 0,
    card2_color: getColorForRarity(card2.rarity),
    card2_imageUrl: card2Urls.card_imageUrl,
    card2_socialImageUrl: card2Urls.card_socialImageUrl,
    card2_characterUrl: card2Urls.card_characterUrl,
    card2_rarityImageUrl: card2.rarityImage ?? '',
    card2_tier: card2.tier ?? '',
    card2_quote: card2.quote ?? '',
    card2_vfc: card2.vfc ?? '',
  };

  console.log('🔮 About to send next round variables to Captivate for pre-rendering:', variables);
  
  try {
    const { ServiceHandler } = await import('./servicehandler.mjs');
    
    if (!ServiceHandler.scheduler) {
      console.warn('ServiceHandler scheduler not available for pre-rendering');
      return null;
    }

    // Try to discover available titles/templates using command API
    console.log('🔍 Attempting to discover available titles...');
    try {
      const projectInfo = await ServiceHandler.command('getProjectInfo');
      console.log('🔍 Project info:', projectInfo);
      
      const titleList = await ServiceHandler.command('getTitles');
      console.log('🔍 Available titles:', titleList);
    } catch (error) {
      console.log('🔍 Template discovery not available:', error);
    }

    // For now, use the hardcoded template names
    const templateNames = ['Card L', 'Card R', 'Character L', 'Character R'];
    
    console.log('🎴 Templates to send render commands to:', templateNames);

    // Send render command to each template
    const renderResults = [];
    for (const templateName of templateNames) {
      try {
        console.log(`🔮 Sending render command to template: ${templateName}`);
        
        const result = await ServiceHandler.scheduler.scheduleAction('render', ServiceHandler.inputName, templateName, variables);
        renderResults.push({ template: templateName, result });
        
        console.log(`✅ Render command sent to ${templateName}:`, result);
      } catch (error) {
        console.error(`❌ Failed to send render to ${templateName}:`, error);
        renderResults.push({ template: templateName, error: error.message });
      }
    }

    console.log('🔮 All render results:', renderResults);
    return renderResults;

  } catch (error) {
    console.error('🔴 Failed to send render commands:', error);
    return null;
  }
}

// Combined function to send both current and next round data
export async function sendBothRoundsDataToCaptivate(currentRound, nextRound, gameState = null) {
  const startTime = Date.now();
  console.log(`[TIMING ${new Date().toISOString()}] 🔄 sendBothRoundsDataToCaptivate ENTRY`);
  
  const results = {};
  
  // Send UPDATE and RENDER commands simultaneously (no delay)
  const promises = [];
  
  // UPDATE commands (current round)
  if (currentRound) {
    console.log(`[TIMING ${new Date().toISOString()}] 📤 Starting UPDATE commands...`);
    promises.push(
      sendCurrentRoundDataToCaptivate(currentRound)
        .then(result => {
          console.log(`[TIMING ${new Date().toISOString()}] ✅ UPDATE commands completed`);
          results.current = result;
        })
        .catch(error => {
          console.log(`[TIMING ${new Date().toISOString()}] ❌ UPDATE commands failed:`, error);
        })
    );
  }
  
  // RENDER commands (next round) - start immediately
  let nextRoundToSend = nextRound;
  if (!nextRoundToSend && gameState) {
    console.log(`[TIMING ${new Date().toISOString()}] 👀 Peeking for next round...`);
    nextRoundToSend = await generateNextRoundDataByPeeking(gameState);
  }
  
  if (nextRoundToSend) {
    console.log(`[TIMING ${new Date().toISOString()}] 📤 Starting RENDER commands...`);
    promises.push(
      sendNextRoundDataToCaptivate(nextRoundToSend)
        .then(result => {
          console.log(`[TIMING ${new Date().toISOString()}] ✅ RENDER commands completed`);
          results.next = result;
        })
        .catch(error => {
          console.log(`[TIMING ${new Date().toISOString()}] ❌ RENDER commands failed:`, error);
        })
    );
  }
  
  // Wait for all commands to complete
  await Promise.all(promises);
  
  const totalTime = Date.now() - startTime;
  console.log(`[TIMING ${new Date().toISOString()}] 🔄 sendBothRoundsDataToCaptivate COMPLETED in ${totalTime}ms`);
  return results;
}

// Add this function to sendRoundDataToCaptivate.js (it was missing):

function extractPlayerDataForCaptivate(player1, player2) {
  return {
    // Player 1
    player1_name: player1.name ?? '',
    player1_handle: player1.handle ?? '',
    player1_avatarUrl: player1.avatarUrl ?? '',
    player1_aura: player1.score?.aura ?? 0,
    player1_skill: player1.score?.skill ?? 0,
    player1_stamina: player1.score?.stamina ?? 0,
    // Player 2
    player2_name: player2.name ?? '',
    player2_handle: player2.handle ?? '',
    player2_avatarUrl: player2.avatarUrl ?? '',
    player2_aura: player2.score?.aura ?? 0,
    player2_skill: player2.score?.skill ?? 0,
    player2_stamina: player2.score?.stamina ?? 0,
  };
}
