const shuffle = require('./shuffle');

/**
 * Reshuffles both player decks from played cards when both decks are empty
 * @param {Object} game - The game object
 * @returns {Object} - Updated game object with reshuffled decks
 */
function reshuffleDecks(game) {
  console.log('🔄 RESHUFFLING: Both decks empty, reshuffling from played cards...');
  
  // Collect all played cards from completed rounds
  const playedCards1 = [];
  const playedCards2 = [];
  
  game.rounds.forEach(round => {
    if (round.C1) {
      // Convert back to deck format (character + rarity only)
      playedCards1.push({
        character: round.C1.character,
        rarity: round.C1.rarity
      });
    }
    if (round.C2) {
      playedCards2.push({
        character: round.C2.character,
        rarity: round.C2.rarity
      });
    }
  });
  
  console.log(`🔄 Collected ${playedCards1.length} cards for P1, ${playedCards2.length} cards for P2`);
  
  // Shuffle and reassign
  game.player1.deck = shuffle(playedCards1);
  game.player2.deck = shuffle(playedCards2);
  
  // Clear drawn cards since we're reshuffling
  game.player1.drawnCard = null;
  game.player2.drawnCard = null;
  
  console.log(`🔄 RESHUFFLED: P1 deck: ${game.player1.deck.length} cards, P2 deck: ${game.player2.deck.length} cards`);
  
  return game;
}

module.exports = reshuffleDecks;