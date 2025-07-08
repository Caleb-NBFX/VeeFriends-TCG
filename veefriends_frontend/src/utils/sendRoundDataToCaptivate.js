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

// Send card1/card2 data (for new round)
export async function sendRoundDataToCaptivate(roundData) {
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

  return sendVariablesToCaptivate(variables);
}

// Send player and winner data (after round winner is decided)
export async function sendPlayerAndWinnerDataToCaptivate(gameState, roundObj) {
  // Player 1 and 2
  const player1 = gameState.player1 || {};
  const player2 = gameState.player2 || {};

  // Winner card
  let winnerCard = null;
  if (roundObj?.winner === 'P1') winnerCard = roundObj.C1;
  if (roundObj?.winner === 'P2') winnerCard = roundObj.C2;

  const winnerUrls = getCardImageUrls(winnerCard || {});

  const variables = {
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
    // Winner card
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

  return sendVariablesToCaptivate(variables);
}
