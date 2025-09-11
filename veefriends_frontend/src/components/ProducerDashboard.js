import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config';
import { sendRoundDataToCaptivate, sendPlayerAndWinnerDataToCaptivate, getColorForRarity, sendCurrentRoundDataToCaptivate, sendNextRoundDataToCaptivate, sendBothRoundsDataToCaptivate } from '../utils/sendRoundDataToCaptivate';
import { getVeeFriendsLogoHeader } from '../utils/imageUtils';
import { useVeeFriendsTheme, createFlexContainer } from '../theme/VeeFriendsTheme';

function ProducerDashboard() {
  console.log('ProducerDashboard mounted');

  // Set page title and favicon
  useEffect(() => {
    document.title = 'VeeFriends Producer Dashboard';
    
    // Add favicon dynamically
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'https://res.cloudinary.com/dfecvzwvg/image/upload/c_scale,w_32,h_32/VeeFriends/assets/logo-cat-purple.png';
    document.head.appendChild(favicon);
  }, []);

  const [player1Email, setPlayer1Email] = useState('');
  const [player2Email, setPlayer2Email] = useState('');
  const [player1Decks, setPlayer1Decks] = useState([]);
  const [player2Decks, setPlayer2Decks] = useState([]);
  const [selectedDeck1, setSelectedDeck1] = useState(null);
  const [selectedDeck2, setSelectedDeck2] = useState(null);
  const [gameId, setGameId] = useState('');
  const [gameState, setGameState] = useState(null);
  const [loadGameId, setLoadGameId] = useState('');
  const [lastCaptivateData, setLastCaptivateData] = useState(null);
  const [lastPlayerData, setLastPlayerData] = useState(null);
  const [showAdminEdit, setShowAdminEdit] = useState(false);
  const [showDeckManifest, setShowDeckManifest] = useState(false); // Add this line

  const lastRoundIdRef = useRef(null);
  const sentWinnersRef = useRef(new Set());
  const navigate = useNavigate();

  // Use the centralized theme
  const { theme, baseStyles } = useVeeFriendsTheme();

  // Component-specific styles that extend the base styles
  const styles = {
    ...baseStyles,
    container: {
      ...baseStyles.container,
      padding: '2rem',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    header: {
      ...baseStyles.header,
      textAlign: 'center',
      marginBottom: '2rem'
    },
    headerLine1: {
      fontSize: '2.5rem',
      color: theme.colors.gold,
      fontWeight: 'bold',
      marginBottom: '0.25rem'
    },
    headerLine2: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: theme.colors.gold,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    },
    logo: {
      height: '60px',
      width: 'auto'
    },
    playerSection: {
      ...baseStyles.section,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '2rem',
      padding: '1.5rem',
      border: `2px solid ${theme.colors.subtleBorder}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple
    },
    playerHeader: {
      ...baseStyles.sectionTitle,
      fontSize: '1.3rem',
      marginBottom: '1rem',
      color: theme.colors.gold,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    inputRow: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-end',
      flexWrap: 'wrap'
    },
    gameControlSection: {
      ...baseStyles.section,
      textAlign: 'center',
      padding: '2rem',
      border: `2px solid ${theme.colors.green}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkGreen,
      marginBottom: '2rem'
    },
    gameStatusSection: {
      ...baseStyles.section,
      padding: '1.5rem',
      border: `2px solid ${theme.colors.subtleBorder}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple,
      marginBottom: '2rem'
    },
    loadGameSection: {
      ...baseStyles.section,
      padding: '1.5rem',
      border: `2px solid ${theme.colors.subtleBorder}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple,
      marginBottom: '2rem'
    },
    adminEditSection: {
      ...baseStyles.section,
      padding: '1.5rem',
      border: `2px solid ${theme.colors.red}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkRed,
      marginBottom: '2rem'
    },
    captivateSection: {
      ...baseStyles.section,
      padding: '1.5rem',
      border: `2px solid ${theme.colors.subtleBorder}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple
    },
    startGameButton: {
      ...baseStyles.submitButton,
      fontSize: '1.2rem',
      padding: '1rem 2rem',
      margin: '1rem'
    },
    gameIdDisplay: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: theme.colors.gold,
      margin: '1rem 0',
      textTransform: 'none'
    },
    gameStatusText: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: theme.colors.white,
      textTransform: 'none'
    },
    captivateData: {
      backgroundColor: theme.colors.black,
      padding: '1rem',
      borderRadius: theme.borderRadius.sm,
      border: `1px solid ${theme.colors.subtleBorder}`,
      fontSize: '12px',
      maxHeight: '200px',
      overflow: 'auto',
      color: theme.colors.lightGray,
      fontFamily: 'monospace'
    },
    deckSelect: {
      ...baseStyles.select,
      minWidth: '200px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      flex: '1',
      minWidth: '200px'
    },
    label: {
      color: theme.colors.white,
      fontSize: '0.9rem',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    portalLinkSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: theme.colors.black,
      borderRadius: theme.borderRadius.sm,
      border: `1px solid ${theme.colors.subtleBorder}`
    },
    portalLinkRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    portalLink: {
      color: theme.colors.lightBlue,
      fontSize: '0.9rem',
      fontFamily: 'monospace',
      wordBreak: 'break-all',
      flex: 1
    },
    copyButton: {
      background: 'none',
      border: `1px solid ${theme.colors.subtleBorder}`,
      color: theme.colors.white,
      padding: '0.25rem 0.5rem',
      borderRadius: theme.borderRadius.sm,
      cursor: 'pointer',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      transition: 'all 0.2s ease'
    },
    adminToggleButton: {
      ...baseStyles.button,
      backgroundColor: theme.colors.red,
      borderColor: theme.colors.red,
      fontSize: '0.9rem',
      padding: '0.5rem 1rem'
    },
    editRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
      gap: '1rem'
    },
    editLabel: {
      color: theme.colors.white,
      fontSize: '0.9rem',
      minWidth: '80px',
      textAlign: 'right'
    },
    editInput: {
      ...baseStyles.input,
      flex: 1,
      minWidth: '150px'
    },
    deckManifestSection: {
      ...baseStyles.section,
      padding: '1.5rem',
      border: `2px solid ${theme.colors.subtleBorder}`, // Changed from lightBlue to subtleBorder
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple, // Changed from darkBlue to darkPurple
      marginBottom: '2rem'
    },
    deckManifestButton: {
      ...baseStyles.button,
      backgroundColor: theme.colors.lightBlue,
      borderColor: theme.colors.lightBlue,
      fontSize: '0.9rem',
      padding: '0.5rem 1rem'
    },
    deckList: {
      backgroundColor: theme.colors.black,
      padding: '1rem',
      borderRadius: theme.borderRadius.sm,
      border: `1px solid ${theme.colors.subtleBorder}`,
      marginBottom: '1rem'
    },
    deckHeader: {
      color: theme.colors.gold,
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    cardList: {
      color: theme.colors.white,
      fontSize: '0.9rem',
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    cardItem: {
      padding: '0.25rem 0',
      borderBottom: `1px solid ${theme.colors.subtleBorder}`,
      display: 'flex',
      justifyContent: 'space-between'
    },
    cardName: {
      color: theme.colors.white
    },
    cardRarity: {
      color: theme.colors.lightGray,
      fontSize: '0.8rem'
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async (text, playerNumber) => {
    try {
      await navigator.clipboard.writeText(text);
      if (playerNumber === 'Producer') {
        alert(`Producer dashboard link copied to clipboard!`);
      } else {
        alert(`Player ${playerNumber} portal link copied to clipboard!`);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy link to clipboard');
    }
  };

  const fetchDecks = async (email, setDecks) => {
    try {
      const res = await axios.get(`${API_BASE}/api/decks?email=${email}`);
      setDecks(res.data);
    } catch (err) {
      console.error('Error fetching decks:', err);
      alert('Failed to fetch decks');
    }
  };

  // Admin function to update game data
  const updateGameData = async (field, value, roundIndex, card) => {
    try {
      console.log('Updating game data:', { field, value, roundIndex, card });
      
      let updateData = {};
      
      if (field.startsWith('player') && field.includes('handle')) {
        // Player handle updates
        const playerNum = field.includes('player1') ? 1 : 2;
        updateData = {
          [`player${playerNum}_handle`]: value
        };
      } else if (field.startsWith('player')) {
        // Player score updates
        const playerNum = field.includes('player1') ? 1 : 2;
        const statType = field.split('_')[2]; // aura, skill, or stamina
        
        updateData = {
          [`player${playerNum}_${statType}`]: parseFloat(value) || 0
        };
      } else if (field.startsWith('round_card')) {
        // Round card updates
        const statType = field.split('_')[2]; // character, rarity, aura, skill, stamina, or score
        
        updateData = {
          roundIndex,
          card, // 'C1' or 'C2'
          [`card_${statType}`]: statType === 'character' || statType === 'rarity' ? value : (parseFloat(value) || 0)
        };
      }
      
      console.log('Sending update data:', updateData);
      
      const res = await axios.put(`${API_BASE}/api/games/${gameId}/edit`, updateData);
      
      // Update local game state
      setGameState(res.data);
      
      console.log('Game data updated successfully');
    } catch (err) {
      console.error('Error updating game data:', err);
      alert('Failed to update game data');
    }
  };

  // Helper to map round data for UI display (matches sendRoundDataToCaptivate)
  function mapRoundDataForCaptivate(roundData) {
    const card1 = roundData.C1 || {};
    const card2 = roundData.C2 || {};
    
    // Get image URLs using the same function as sendRoundDataToCaptivate
    const getCardImageUrls = (card) => {
      const toSlug = (str) => {
        return (str || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      };
      
      const characterSlug = toSlug(card.character);
      const raritySlug = (card.rarity || '').toLowerCase().replace(/\s+/g, '');
      return {
        card_imageUrl: characterSlug && raritySlug ? `${characterSlug}-${raritySlug}.png` : '',
        card_socialImageUrl: characterSlug ? `${characterSlug}.png` : '',
        card_characterUrl: characterSlug ? `${characterSlug}-classic-shrinkwrapped.png` : '',
      };
    };

    const card1Urls = getCardImageUrls(card1);
    const card2Urls = getCardImageUrls(card2);
    
    return {
      // Card 1 data
      card1_aura: card1.Aura ?? 0,
      card1_skill: card1.Skill ?? 0,
      card1_stamina: card1.Stamina ?? 0,
      card1_character: card1.character ?? "",
      card1_rarity: card1.rarity ?? "",
      card1_score: card1.Score !== undefined ? Math.round(card1.Score) : 0,
      card1_color: getColorForRarity(card1.rarity),
      card1_imageUrl: card1Urls.card_imageUrl,
      card1_socialImageUrl: card1Urls.card_socialImageUrl,
      card1_characterUrl: card1Urls.card_characterUrl,
      card1_rarityImageUrl: card1.rarityImage ?? '',
      card1_tier: card1.tier ?? '',
      card1_quote: card1.quote ?? '',
      card1_vfc: card1.vfc ?? '',
      // Card 2 data
      card2_aura: card2.Aura ?? 0,
      card2_skill: card2.Skill ?? 0,
      card2_stamina: card2.Stamina ?? 0,
      card2_character: card2.character ?? "",
      card2_rarity: card2.rarity ?? "",
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
  }

  // Helper to map player data for UI display (matches sendPlayerAndWinnerDataToCaptivate)
  function mapPlayerDataForCaptivate(gameState, roundObj) {
    const player1 = gameState.player1 || {};
    const player2 = gameState.player2 || {};

    // Winner card - only if there's a round with a winner
    let winnerCard = null;
    if (roundObj?.winner === 'P1') winnerCard = roundObj.C1;
    if (roundObj?.winner === 'P2') winnerCard = roundObj.C2;

    // Get winner image URLs using the same function as sendPlayerAndWinnerDataToCaptivate
    const getCardImageUrls = (card) => {
      const toSlug = (str) => {
        return (str || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      };
      
      const characterSlug = toSlug(card?.character);
      const raritySlug = (card?.rarity || '').toLowerCase();
      return {
        card_imageUrl: characterSlug && raritySlug ? `${characterSlug}-${raritySlug}.png` : '',
        card_socialImageUrl: characterSlug ? `${characterSlug}.png` : '',
        card_characterUrl: characterSlug ? `${characterSlug}-classic-shrinkwrapped.png` : '',
      };
    };

    const winnerUrls = winnerCard ? getCardImageUrls(winnerCard) : { card_imageUrl: '', card_socialImageUrl: '', card_characterUrl: '' };

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
      // Winner card data with image URLs
      winner_character: winnerCard?.character ?? '',
      winner_rarity: winnerCard?.rarity ?? '',
      winner_score: winnerCard?.Score !== undefined ? Math.round(winnerCard.Score) : 0,
      winner_aura: winnerCard?.Aura ?? 0,
      winner_skill: winnerCard?.Skill ?? 0,
      winner_stamina: winnerCard?.Stamina ?? 0,
      winner_color: getColorForRarity(winnerCard?.rarity),
      winner_imageUrl: winnerUrls.card_imageUrl,
      winner_socialImageUrl: winnerUrls.card_socialImageUrl,
      winner_characterUrl: winnerUrls.card_characterUrl,
      winner_rarityImageUrl: winnerCard?.rarityImage ?? '',
      winner_tier: winnerCard?.tier ?? '',
      winner_quote: winnerCard?.quote ?? '',
      winner_vfc: winnerCard?.vfc ?? '',
    };
  }

  const handleStartGame = async () => {
    if (!selectedDeck1 || !selectedDeck2) {
      alert('Select a deck for both players');
      return;
    }

    // Check if both decks have 20 cards
    if (selectedDeck1.cards.length < 20) {
      alert(`Cannot start game: Player 1's deck "${selectedDeck1.name}" only has ${selectedDeck1.cards.length} cards. A complete deck with 20 cards is required. Try another deck.`);
      return;
    }

    if (selectedDeck2.cards.length < 20) {
      alert(`Cannot start game: Player 2's deck "${selectedDeck2.name}" only has ${selectedDeck2.cards.length} cards. A complete deck with 20 cards is required. Try another deck.`);
      return;
    }

    const player1Data = { 
      name: `${selectedDeck1.firstName} ${selectedDeck1.lastName}`.trim(),
      firstName: selectedDeck1.firstName,
      lastName: selectedDeck1.lastName,
      handle: selectedDeck1.handle,
      platform: selectedDeck1.platform,
      email: selectedDeck1.email || player1Email,
      deck: selectedDeck1.cards 
    };

    const player2Data = { 
      name: `${selectedDeck2.firstName} ${selectedDeck2.lastName}`.trim(),
      firstName: selectedDeck2.firstName,
      lastName: selectedDeck2.lastName,
      handle: selectedDeck2.handle,
      platform: selectedDeck2.platform,
      email: selectedDeck2.email || player2Email,
      deck: selectedDeck2.cards 
    };

    try {
      // Step 1: Create the game
      const createRes = await axios.post(`${API_BASE}/api/games`, {
        player1: player1Data,
        player2: player2Data
      });
      
      const newGameId = createRes.data._id;
      setGameId(newGameId);
      
      console.log('Game created, ID:', newGameId);
      
      // Step 2: Wait for backend to complete game setup (including first round)
      console.log('Waiting for backend to complete game setup...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 3: Fetch the complete game state
      const gameRes = await axios.get(`${API_BASE}/api/games/${newGameId}`);
      const completeGame = gameRes.data;
      setGameState(completeGame);
      
      console.log('Complete game state fetched');
      
      // Navigate to producer URL with gameId
      navigate(`/producer?gameId=${newGameId}`);
      
      alert(`Game started! Game ID: ${newGameId}`);
      
      // Step 4: Send initial data to Captivate
      console.log('Sending initial data to Captivate...');
      
      // Send player scores (all zeros initially)
      await sendPlayerAndWinnerDataToCaptivate(completeGame, null);
      const playerDebugData = mapPlayerDataForCaptivate(completeGame, null);
      setLastPlayerData(playerDebugData);
      console.log('✅ Player data sent to Captivate successfully');

      // Send round data
      const currentRound = completeGame.currentRound;
      const rounds = completeGame.rounds || [];
      const roundObj = rounds[currentRound - 1];
      
      if (roundObj) {
        lastRoundIdRef.current = roundObj._id;
        await sendRoundDataToCaptivate(roundObj);
        const roundDebugData = mapRoundDataForCaptivate(roundObj);
        setLastCaptivateData(roundDebugData);
        console.log('✅ Round data sent to Captivate successfully');
      }
      
    } catch (err) {
      console.error('Error starting game:', err);
      alert('Failed to start game');
    }
  };

  const handleStartRound = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/games/${gameId}/start-round`);
      alert('Round started!');
      // Send round data to Captivate immediately
      const game = res.data;
      const currentRound = game.currentRound;
      const rounds = game.rounds || [];
      const roundObj = rounds[currentRound - 1];
      if (roundObj) {
        sendRoundDataToCaptivate(roundObj);
        setLastCaptivateData(mapRoundDataForCaptivate(roundObj));
      }
    } catch (err) {
      console.error('Error starting round:', err);
      alert('Failed to start round');
    }
  };

  const handleLoadGame = async () => {
    if (!loadGameId) {
      alert('Please enter a Game ID to load.');
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/api/games/${loadGameId}`);
      setGameId(loadGameId);
      setGameState(res.data);
      
      // Auto-fill player data from loaded game
      const game = res.data;
      if (game.player1) {
        setPlayer1Email(game.player1.email || '');
        const player1Deck = {
          _id: `loaded-p1-${loadGameId}`,
          firstName: game.player1.firstName || '',
          lastName: game.player1.lastName || '',
          handle: game.player1.handle || '',
          platform: game.player1.platform || '',
          email: game.player1.email || '',
          cards: game.player1.deck || []
        };
        setSelectedDeck1(player1Deck);
        setPlayer1Decks([player1Deck]);
      }
      
      if (game.player2) {
        setPlayer2Email(game.player2.email || '');
        const player2Deck = {
          _id: `loaded-p2-${loadGameId}`,
          firstName: game.player2.firstName || '',
          lastName: game.player2.lastName || '',
          handle: game.player2.handle || '',
          platform: game.player2.platform || '',
          email: game.player2.email || '',
          cards: game.player2.deck || []
        };
        setSelectedDeck2(player2Deck);
        setPlayer2Decks([player2Deck]);
      }
      
      // Navigate to producer URL with gameId
      navigate(`/producer?gameId=${loadGameId}`);
      
      alert(`Game loaded! Game ID: ${loadGameId}`);
      
      if (game.player1 && game.player2) {
        // Send current player scores to Captivate
        await sendPlayerAndWinnerDataToCaptivate(game, null);
        console.log('Current player scores sent to Captivate');
        
        // Store the player data for debugging
        const playerDebugData = mapPlayerDataForCaptivate(game, null);
        setLastPlayerData(playerDebugData);
        
        // Send current round data to Captivate
        const currentRound = game.currentRound;
        const rounds = game.rounds || [];
        const roundObj = rounds[currentRound - 1];
        if (roundObj) {
          lastRoundIdRef.current = roundObj._id;
          await sendRoundDataToCaptivate(roundObj);
          setLastCaptivateData(mapRoundDataForCaptivate(roundObj));
        }
      }
    } catch (err) {
      console.error('Error loading game:', err);
      alert('Failed to load game. Please check the Game ID.');
    }
  };

  // Handle loading game from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameIdFromUrl = urlParams.get('gameId');
    
    if (gameIdFromUrl && !gameId) {
      const handleLoadGameFromUrl = async (gameIdToLoad) => {
        try {
          const res = await axios.get(`${API_BASE}/api/games/${gameIdToLoad}`);
          setGameId(gameIdToLoad);
          setGameState(res.data);
          
          const game = res.data;
          if (game.player1) {
            setPlayer1Email(game.player1.email || '');
            const player1Deck = {
              _id: `loaded-p1-${gameIdToLoad}`,
              firstName: game.player1.firstName || '',
              lastName: game.player1.lastName || '',
              handle: game.player1.handle || '',
              platform: game.player1.platform || '',
              email: game.player1.email || '',
              cards: game.player1.deck || []
            };
            setSelectedDeck1(player1Deck);
            setPlayer1Decks([player1Deck]);
          }
          
          if (game.player2) {
            setPlayer2Email(game.player2.email || '');
            const player2Deck = {
              _id: `loaded-p2-${gameIdToLoad}`,
              firstName: game.player2.firstName || '',
              lastName: game.player2.lastName || '',
              handle: game.player2.handle || '',
              platform: game.player2.platform || '',
              email: game.player2.email || '',
              cards: game.player2.deck || []
            };
            setSelectedDeck2(player2Deck);
            setPlayer2Decks([player2Deck]);
          }
          
          if (game.player1 && game.player2) {
            // Send current player scores to Captivate
            await sendPlayerAndWinnerDataToCaptivate(game, null);
            console.log('Current player scores sent to Captivate');
            
            // Store the player data for debugging
            setLastPlayerData(mapPlayerDataForCaptivate(game, null));
            
            // Send current round data to Captivate
            const currentRound = game.currentRound;
            const rounds = game.rounds || [];
            const roundObj = rounds[currentRound - 1];
            if (roundObj) {
              lastRoundIdRef.current = roundObj._id;
              await sendRoundDataToCaptivate(roundObj);
              setLastCaptivateData(mapRoundDataForCaptivate(roundObj));
            }
          }
        } catch (err) {
          console.error('Error loading game from URL:', err);
          alert('Failed to load game from URL. Please check the Game ID.');
        }
      };

      handleLoadGameFromUrl(gameIdFromUrl);
    }
  }, [gameId]);

  // Poll for game state changes and send data to Captivate on round change
  useEffect(() => {
    if (!gameId) return;

    const fetchGameState = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/games/${gameId}`);
        setGameState(res.data);

        const currentRound = res.data.currentRound;
        const rounds = res.data.rounds || [];
        const roundObj = rounds[currentRound - 1];
        const roundId = roundObj?._id;

        // Detect round change (send current + next round data)
        if (roundId && lastRoundIdRef.current !== roundId) {
          lastRoundIdRef.current = roundId;
          
          console.log('🔄 Round changed, sending current and next round data...');
          
          // Get next round data
          const nextRoundIndex = currentRound; // Next round (0-based indexing)
          const nextRound = rounds[nextRoundIndex];
          
          console.log('Current round data:', roundObj);
          console.log('Next round data:', nextRound);
          
          // Send both current and next round data
          try {
            console.log('🔄 About to call sendBothRoundsDataToCaptivate with:', { currentRound: roundObj, nextRound, gameState: res.data });
            const results = await sendBothRoundsDataToCaptivate(roundObj, nextRound, res.data); // Pass the full game state
            console.log('🟢 Successfully sent round data to Captivate:', results);
            
            // Update UI display
            setLastCaptivateData(mapRoundDataForCaptivate(roundObj));
            
          } catch (error) {
            console.error('🔴 Failed to send round data to Captivate:', error);
          }
        }

        // Winner detection - send winner data for any round with a winner that hasn't been sent yet
        // This includes the final round when game.winner is set
        if (roundObj?.winner && !sentWinnersRef.current.has(roundObj._id)) {
          console.log('🏆 Polling: NEW winner detected, sending winner data...', roundObj.winner);
          
          // Check if this is the final round (game has ended)
          if (res.data.winner) {
            console.log('🏆 Game has ended, this is the final round winner');
          }
          
          try {
            await sendPlayerAndWinnerDataToCaptivate(res.data, roundObj);
            setLastPlayerData(mapPlayerDataForCaptivate(res.data, roundObj));
            sentWinnersRef.current.add(roundObj._id); // Mark this round's winner as sent
            console.log('🏆 Polling: Winner data sent successfully');
          } catch (error) {
            console.log('🏆 Polling: Failed to send winner data:', error);
          }
        } else if (roundObj?.winner) {
          console.log('🏆 Polling: Winner already sent for this round, skipping');
        }
      } catch (err) {
        console.error('Error polling game state:', err);
      }
    };

    fetchGameState();
    const interval = setInterval(fetchGameState, 500); // Poll every 0.5 seconds
    return () => clearInterval(interval);
  }, [gameId]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.headerLine1}>
            The Official Unofficial
          </div>
          <div style={styles.headerLine2}>
            <img 
              src={getVeeFriendsLogoHeader()} 
              alt="VeeFriends" 
              style={styles.logo}
              onError={(e) => {
                console.error('Logo failed to load');
                e.target.style.display = 'none';
              }}
            />
            TCG Dashboard
          </div>
        </div>

        {/* Player 1 Section */}
        <div style={styles.playerSection}>
          <h3 style={styles.playerHeader}>
            👤 Player 1 Setup
          </h3>
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="Enter Player 1 Email"
                value={player1Email}
                onChange={(e) => setPlayer1Email(e.target.value)}
                style={styles.input}
              />
            </div>
            <button 
              onClick={() => fetchDecks(player1Email, setPlayer1Decks)}
              style={styles.button}
              onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = theme.shadows.button;
              }}
            >
              Load Decks
            </button>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Deck</label>
            <select 
              onChange={(e) => setSelectedDeck1(player1Decks[e.target.value])}
              style={styles.deckSelect}
            >
              <option value="">Select Deck</option>
              {player1Decks.map((deck, index) => (
                <option key={deck._id} value={index}>
                  {deck.name} ({deck.cards.length}/20 cards)
                  {deck.cards.length < 20 ? ' - INCOMPLETE' : ' - Complete'}
                </option>
              ))}
            </select>
            {selectedDeck1 && selectedDeck1.cards.length < 20 && (
              <p style={{ color: theme.colors.red, fontSize: '0.8rem', marginTop: '0.25rem' }}>
                ⚠️ This deck is incomplete and cannot be used to start a game
              </p>
            )}
          </div>
          
          {/* Player 1 Portal Link */}
          {gameId && gameState?.player1 && (
            <div style={styles.portalLinkSection}>
              <label style={styles.label}>Player Portal Link</label>
              <div style={styles.portalLinkRow}>
                <span style={styles.portalLink}>
                  https://veefriends-tgc.onrender.com/player?gameId={gameId}&email={gameState.player1.email}
                </span>
                <button 
                  onClick={() => copyToClipboard(
                    `https://veefriends-tgc.onrender.com/player?gameId=${gameId}&email=${gameState.player1.email}`,
                    1
                  )}
                  style={styles.copyButton}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = theme.colors.subtleBorder;
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  📋 Copy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Player 2 Section */}
        <div style={styles.playerSection}>
          <h3 style={styles.playerHeader}>
            👤 Player 2 Setup
          </h3>
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="Enter Player 2 Email"
                value={player2Email}
                onChange={(e) => setPlayer2Email(e.target.value)}
                style={styles.input}
              />
            </div>
            <button 
              onClick={() => fetchDecks(player2Email, setPlayer2Decks)}
              style={styles.button}
              onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = theme.shadows.button;
              }}
            >
              Load Decks
            </button>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Deck</label>
            <select 
              onChange={(e) => setSelectedDeck2(player2Decks[e.target.value])}
              style={styles.deckSelect}
            >
              <option value="">Select Deck</option>
              {player2Decks.map((deck, index) => (
                <option key={deck._id} value={index}>
                  {deck.name} ({deck.cards.length}/20 cards)
                  {deck.cards.length < 20 ? ' - INCOMPLETE' : ' - Complete'}
                </option>
              ))}
            </select>
            {selectedDeck2 && selectedDeck2.cards.length < 20 && (
              <p style={{ color: theme.colors.red, fontSize: '0.8rem', marginTop: '0.25rem' }}>
                ⚠️ This deck is incomplete and cannot be used to start a game
              </p>
            )}
          </div>
          
          {/* Player 2 Portal Link */}
          {gameId && gameState?.player2 && (
            <div style={styles.portalLinkSection}>
              <label style={styles.label}>Player Portal Link</label>
              <div style={styles.portalLinkRow}>
                <span style={styles.portalLink}>
                  https://veefriends-tgc.onrender.com/player?gameId={gameId}&email={gameState.player2.email}
                </span>
                <button 
                  onClick={() => copyToClipboard(
                    `https://veefriends-tgc.onrender.com/player?gameId=${gameId}&email=${gameState.player2.email}`,
                    2
                  )}
                  style={styles.copyButton}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = theme.colors.subtleBorder;
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  📋 Copy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Game Control Section - Only show when no game is active */}
        {!gameId && (
          <div style={styles.gameControlSection}>
            <h3 style={styles.sectionTitle}>🎮 Game Control</h3>
            <button 
              onClick={handleStartGame}
              style={{
                ...styles.startGameButton,
                opacity: (!selectedDeck1 || !selectedDeck2 || selectedDeck1.cards.length < 20 || selectedDeck2.cards.length < 20) ? 0.5 : 1,
                cursor: (!selectedDeck1 || !selectedDeck2 || selectedDeck1.cards.length < 20 || selectedDeck2.cards.length < 20) ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={e => {
                if (selectedDeck1 && selectedDeck2 && selectedDeck1.cards.length >= 20 && selectedDeck2.cards.length >= 20) {
                  Object.assign(e.target.style, styles.buttonHover);
                }
              }}
              onMouseLeave={e => {
                if (selectedDeck1 && selectedDeck2 && selectedDeck1.cards.length >= 20 && selectedDeck2.cards.length >= 20) {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }
              }}
            >
              🚀 Start Game
            </button>
            {(!selectedDeck1 || !selectedDeck2 || selectedDeck1.cards.length < 20 || selectedDeck2.cards.length < 20) && (
              <p style={{ color: theme.colors.orange, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                ⚠️ Both players need complete decks (20 cards) to start a game
              </p>
            )}
          </div>
        )}

        {/* Load Game Section - Only show when no game is active */}
        {!gameId && (
          <div style={styles.loadGameSection}>
            <h3 style={styles.sectionTitle}>📥 Load Existing Game</h3>
            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Game ID</label>
                <input
                  type="text"
                  placeholder="Enter Game ID to load"
                  value={loadGameId}
                  onChange={(e) => setLoadGameId(e.target.value)}
                  style={styles.input}
                />
              </div>
              <button 
                onClick={handleLoadGame}
                style={styles.button}
                onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                onMouseLeave={e => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }}
              >
                📂 Load Game
              </button>
            </div>
          </div>
        )}

        {/* Game Status Section */}
        {gameId && (
          <div style={styles.gameStatusSection}>
            <h3 style={styles.sectionTitle}>📊 Game Status</h3>
            <p style={styles.gameIdDisplay}>
              <strong>Game ID:</strong> {gameId}
            </p>

            {/* Producer Dashboard Game Link */}
            <div style={styles.portalLinkSection}>
              <label style={styles.label}>Producer Dashboard Game Link</label>
              <div style={styles.portalLinkRow}>
                <span style={styles.portalLink}>
                  https://veefriends-tgc.onrender.com/producer?gameId={gameId}
                </span>
                <button 
                  onClick={() => copyToClipboard(
                    `https://veefriends-tgc.onrender.com/producer?gameId=${gameId}`,
                    'Producer'
                  )}
                  style={styles.copyButton}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = theme.colors.subtleBorder;
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  📋 Copy
                </button>
              </div>
            </div>
            
            {gameState && !gameState.winner && (
              <div style={{ textAlign: 'center' }}>
                <p style={styles.gameStatusText}>Game In Progress</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleStartRound}
                    style={styles.button}
                    onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                    onMouseLeave={e => {
                      e.target.style.transform = 'none';
                      e.target.style.boxShadow = theme.shadows.button;
                    }}
                  >
                    ▶️ Start Next Round
                  </button>
                  
                  <button 
                    onClick={() => setShowAdminEdit(!showAdminEdit)}
                    style={styles.adminToggleButton}
                    onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                    onMouseLeave={e => {
                      e.target.style.transform = 'none';
                      e.target.style.boxShadow = theme.shadows.button;
                    }}
                  >
                    {showAdminEdit ? '🔒 Hide Admin Edit' : '⚙️ Show Admin Edit'}
                  </button>

                  <button
                    onClick={() => setShowDeckManifest(!showDeckManifest)}
                    style={styles.deckManifestButton}
                  >
                    {showDeckManifest ? 'Hide Full Decks' : 'Show Full Decks'}
                  </button>
                </div>
              </div>
            )}

            {gameState?.winner && (
              <div style={{ textAlign: 'center' }}>
                <p style={styles.gameStatusText}>
                  <strong>Game Status:</strong> FINISHED - {gameState.winner} Wins! 🏆
                </p>
              </div>
            )}
          </div>
        )}

        {/* Admin Edit Section */}
        {gameId && gameState && showAdminEdit && (
          <div style={styles.adminEditSection}>
            <h3 style={styles.sectionTitle}>⚙️ Admin Edit Mode</h3>
            
            {/* Player Score Editor */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: theme.colors.gold, marginBottom: '1rem' }}>
                Player Scores
              </h4>
              
              {/* Player 1 Scores */}
              <div>
                <h4 style={{ color: theme.colors.lightBlue, margin: '0.5rem 0' }}>
                  Player 1: {gameState.player1?.name || 'Unknown'}
                </h4>
                
                <div style={styles.editRow}>
                  <span style={styles.editLabel}>Handle:</span>
                  <input
                    style={styles.editInput}
                    type="text"
                    defaultValue={gameState.player1?.handle || ''}
                    onBlur={(e) => updateGameData('player1_handle', e.target.value)}
                  />
                </div>
                
                <div style={styles.editRow}>
                  <span style={styles.editLabel}>Aura:</span>
                  <input
                    style={styles.editInput}
                    type="number"
                    defaultValue={gameState.player1?.score?.aura || 0}
                    onBlur={(e) => updateGameData('player1_score_aura', e.target.value)}
                  />
                </div>
                
                <div style={styles.editRow}>
                  <span style={styles.editLabel}>Skill:</span>
                  <input
                    style={styles.editInput}
                    type="number"
                    defaultValue={gameState.player1?.score?.skill || 0}
                    onBlur={(e) => updateGameData('player1_score_skill', e.target.value)}
                  />
                </div>
                
                <div style={styles.editRow}>
                  <span style={styles.editLabel}>Stamina:</span>
                  <input
                    style={styles.editInput}
                    type="number"
                    defaultValue={gameState.player1?.score?.stamina || 0}
                    onBlur={(e) => updateGameData('player1_score_stamina', e.target.value)}
                  />
                </div>
              </div>

              {/* Player 2 Scores */}
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ color: theme.colors.lightBlue, margin: '0.5rem 0' }}>
                  Player 2: {gameState.player2?.name || 'Unknown'}
                </h4>
                
                <div style={styles.editRow}>
                  <span style={styles.editLabel}>Handle:</span>
                  <input
                    style={styles.editInput}
                    type="text"
                    defaultValue={gameState.player2?.handle || ''}
                    onBlur={(e) => updateGameData('player2_handle', e.target.value)}
                  />
                </div>
                
                <div style={styles.editRow}>
                  <span style={styles.editLabel}>Aura:</span>
                  <input
                    style={styles.editInput}
                    type="number"
                    defaultValue={gameState.player2?.score?.aura || 0}
                    onBlur={(e) => updateGameData('player2_score_aura', e.target.value)}
                  />
                </div>
                
                <div style={styles.editRow}>
                  <span style={styles.editLabel}>Skill:</span>
                  <input
                    style={styles.editInput}
                    type="number"
                    defaultValue={gameState.player2?.score?.skill || 0}
                    onBlur={(e) => updateGameData('player2_score_skill', e.target.value)}
                  />
                </div>
                
                <div style={styles.editRow}>
                  <span style={styles.editLabel}>Stamina:</span>
                  <input
                    style={styles.editInput}
                    type="number"
                    defaultValue={gameState.player2?.score?.stamina || 0}
                    onBlur={(e) => updateGameData('player2_score_stamina', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Round Card Editor - C1 and C2 fields */}
            {gameState.rounds && gameState.rounds.length > 0 && gameState.currentRound > 0 && (() => {
              const currentRoundIndex = gameState.currentRound - 1;
              const currentRound = gameState.rounds[currentRoundIndex];
              
              return (
                <div>
                  <h4 style={{ color: theme.colors.gold, marginBottom: '1rem' }}>
                    Edit Round {gameState.currentRound} Cards
                  </h4>
                  
                  {/* Player 1 Card (C1) */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: theme.colors.lightBlue, margin: '0.5rem 0' }}>Player 1 Card:</h4>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Character:</span>
                      <input
                        style={styles.editInput}
                        defaultValue={currentRound.C1?.character || ''}
                        onBlur={(e) => updateGameData('round_card_character', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Rarity:</span>
                      <input
                        style={styles.editInput}
                        defaultValue={currentRound.C1?.rarity || ''}
                        onBlur={(e) => updateGameData('round_card_rarity', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Aura:</span>
                      <input
                        style={styles.editInput}
                        type="number"
                        defaultValue={currentRound.C1?.Aura || 0}
                        onBlur={(e) => updateGameData('round_card_aura', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Skill:</span>
                      <input
                        style={styles.editInput}
                        type="number"
                        defaultValue={currentRound.C1?.Skill || 0}
                        onBlur={(e) => updateGameData('round_card_skill', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Stamina:</span>
                      <input
                        style={styles.editInput}
                        type="number"
                        defaultValue={currentRound.C1?.Stamina || 0}
                        onBlur={(e) => updateGameData('round_card_stamina', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Score:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        step="0.01"
                        defaultValue={currentRound.C1?.Score || 0}
                        onBlur={(e) => updateGameData('round_card_score', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                  </div>

                  {/* Player 2 Card (C2) */}
                  <div>
                    <h4 style={{ color: theme.colors.lightBlue, margin: '0.5rem 0' }}>Player 2 Card:</h4>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Character:</span>
                      <input
                        style={styles.editInput}
                        defaultValue={currentRound.C2?.character || ''}
                        onBlur={(e) => updateGameData('round_card_character', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Rarity:</span>
                      <input
                        style={styles.editInput}
                        defaultValue={currentRound.C2?.rarity || ''}
                        onBlur={(e) => updateGameData('round_card_rarity', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Aura:</span>
                      <input
                        style={styles.editInput}
                        type="number"
                        defaultValue={currentRound.C2?.Aura || 0}
                        onBlur={(e) => updateGameData('round_card_aura', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Skill:</span>
                      <input
                        style={styles.editInput}
                        type="number"
                        defaultValue={currentRound.C2?.Skill || 0}
                        onBlur={(e) => updateGameData('round_card_skill', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Stamina:</span>
                      <input
                        style={styles.editInput}
                        type="number"
                        defaultValue={currentRound.C2?.Stamina || 0}
                        onBlur={(e) => updateGameData('round_card_stamina', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Score:</span>
                      <input
                        style={styles.editInput}
                        type="number"
                        step="0.01"
                        defaultValue={currentRound.C2?.Score || 0}
                        onBlur={(e) => updateGameData('round_card_score', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
            
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p style={{ color: theme.colors.lightGray, fontSize: '0.9rem' }}>
                Changes are saved automatically when you finish editing a field.
              </p>
            </div>
          </div>
        )}

        {/* Deck Manifest Section */}
        {gameId && gameState && showDeckManifest && (
          <div style={styles.deckManifestSection}>
            <h3 style={styles.sectionTitle}>📋 Full Deck Manifests</h3>
            <p style={{ color: theme.colors.lightGray, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Cards are listed in the order they will be drawn. Round {gameState.currentRound} cards have already been drawn.
            </p>
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {/* Player 1 Deck */}
              <div style={{ flex: '1', minWidth: '300px' }}>
                <div style={styles.deckList}>
                  <div style={styles.deckHeader}>
                    🎴 Player 1: {gameState.player1?.name || 'Unknown'}
                    {gameState.player1?.handle && (
                      <div style={{ fontSize: '0.9rem', fontWeight: 'normal', marginTop: '0.25rem' }}>
                        (@{gameState.player1.handle.replace(/^@+/, '')})
                      </div>
                    )}
                  </div>
                  <div style={{ color: theme.colors.lightGray, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    {gameState.player1?.deck?.length || 0} cards remaining
                  </div>
                  <ul style={styles.cardList}>
                    {gameState.player1?.deck?.map((card, index) => (
                      <li key={index} style={styles.cardItem}>
                        <span style={styles.cardName}>
                          {index + 1}. {card.character}
                        </span>
                        <span style={styles.cardRarity}>({card.rarity})</span>
                      </li>
                    )) || <li style={{ color: theme.colors.lightGray }}>No cards remaining</li>}
                  </ul>
                </div>
              </div>

              {/* Player 2 Deck */}
              <div style={{ flex: '1', minWidth: '300px' }}>
                <div style={styles.deckList}>
                  <div style={styles.deckHeader}>
                    🎴 Player 2: {gameState.player2?.name || 'Unknown'}
                    {gameState.player2?.handle && (
                      <div style={{ fontSize: '0.9rem', fontWeight: 'normal', marginTop: '0.25rem' }}>
                        (@{gameState.player2.handle.replace(/^@+/, '')})
                      </div>
                    )}
                  </div>
                  <div style={{ color: theme.colors.lightGray, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    {gameState.player2?.deck?.length || 0} cards remaining
                  </div>
                  <ul style={styles.cardList}>
                    {gameState.player2?.deck?.map((card, index) => (
                      <li key={index} style={styles.cardItem}>
                        <span style={styles.cardName}>
                          {index + 1}. {card.character}
                        </span>
                        <span style={styles.cardRarity}>({card.rarity})</span>
                      </li>
                    )) || <li style={{ color: theme.colors.lightGray }}>No cards remaining</li>}
                  </ul>
                </div>
              </div>
            </div>

            {/* Optional: Print button */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                onClick={() => {
                  const manifestContent = `VEEFRIENDS CARD GAME - DECK MANIFEST\nGame ID: ${gameId}\n\nPLAYER 1: ${gameState.player1?.name}${gameState.player1?.handle ? ` (@${gameState.player1.handle.replace(/^@+/, '')})` : ''}\n${gameState.player1?.deck?.map((card, i) => `${i+1}. ${card.character} (${card.rarity})`).join('\n') || 'No cards remaining'}\n\nPLAYER 2: ${gameState.player2?.name}${gameState.player2?.handle ? ` (@${gameState.player2.handle.replace(/^@+/, '')})` : ''}\n${gameState.player2?.deck?.map((card, i) => `${i+1}. ${card.character} (${card.rarity})`).join('\n') || 'No cards remaining'}`;
                  
                  const printWindow = window.open('', '_blank');
                  printWindow.document.write(`
                    <html><head><title>Deck Manifest - ${gameId}</title></head>
                    <body style="font-family: monospace; white-space: pre-wrap; padding: 20px;">
                      ${manifestContent}
                    </body></html>
                  `);
                  printWindow.print();
                }}
                style={{
                  ...baseStyles.button,
                  backgroundColor: theme.colors.green,
                  borderColor: theme.colors.green,
                  fontSize: '0.9rem',
                  padding: '0.5rem 1rem'
                }}
              >
                🖨️ Print Manifest
              </button>
            </div>
          </div>
        )}

        {/* Captivate Data Section */}
        <div style={styles.captivateSection}>
          <h3 style={styles.sectionTitle}>📡 Captivate Integration</h3>
          
          {/* Last Round Data Sent */}
          {lastCaptivateData && (
            <div>
              <h4 style={{ color: theme.colors.lightBlue, marginBottom: '0.5rem' }}>
                Last Round Data Sent to Captivate:
              </h4>
              <pre style={styles.captivateData}>
                {JSON.stringify(lastCaptivateData, null, 2)}
              </pre>
            </div>
          )}

          {/* Last Player Data Sent */}
          {lastPlayerData && (
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: theme.colors.lightBlue, marginBottom: '0.5rem' }}>
                Last Player/Score Data Sent to Captivate:
              </h4>
              <pre style={styles.captivateData}>
                {JSON.stringify(lastPlayerData, null, 2)}
              </pre>
            </div>
          )}

          {/* Two Separate Resend Buttons */}
          {gameId && gameState && (
            <div style={{ marginTop: '1rem', textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={async () => {
                  try {
                    console.log('🔄 RESEND ROUND: Starting round data resync...');
                    
                    // First, refresh the game state
                    const gameRes = await axios.get(`${API_BASE}/api/games/${gameId}`);
                    const freshGameState = gameRes.data;
                    setGameState(freshGameState);
                    console.log('🔄 Fresh game state fetched');
                    
                    // Send current and next round data
                    const currentRound = freshGameState.currentRound;
                    const rounds = freshGameState.rounds || [];
                    const currentRoundObj = rounds[currentRound - 1];
                    const nextRoundObj = rounds[currentRound]; // Next round
                    
                    if (currentRoundObj || nextRoundObj) {
                      console.log('🔄 Sending current and next round data...');
                      const results = await sendBothRoundsDataToCaptivate(currentRoundObj, nextRoundObj, freshGameState);
                      
                      if (currentRoundObj) {
                        setLastCaptivateData(mapRoundDataForCaptivate(currentRoundObj));
                      }
                      
                      console.log('✅ Round data sent:', results);
                      alert('✅ Round data successfully resent to Captivate!');
                    } else {
                      alert('⚠️ No round data available to send');
                    }
                    
                    console.log('🔄 RESEND ROUND: Round data resync finished successfully');
                    
                  } catch (err) {
                    console.error('🔄 RESEND ROUND: Failed to resend round data:', err);
                    alert('❌ Failed to resend round data to Captivate. Check console for details.');
                  }
                }}
                style={{
                  ...styles.button,
                  backgroundColor: theme.colors.blue,
                  borderColor: theme.colors.blue,
                  fontSize: '1rem',
                  padding: '0.75rem 1.25rem'
                }}
                onMouseEnter={e => Object.assign(e.target.style, {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px rgba(59, 130, 246, 0.3)`
                })}
                onMouseLeave={e => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }}
              >
                🎴 Resend Round Data
              </button>

              <button 
                onClick={async () => {
                  try {
                    console.log('🔄 RESEND WINNER: Starting winner/player data resync...');
                    
                    // First, refresh the game state
                    const gameRes = await axios.get(`${API_BASE}/api/games/${gameId}`);
                    const freshGameState = gameRes.data;
                    setGameState(freshGameState);
                    console.log('🔄 Fresh game state fetched');
                    
                    // Get the current round for winner data
                    const currentRound = freshGameState.currentRound;
                    const rounds = freshGameState.rounds || [];
                    const currentRoundObj = rounds[currentRound - 1];
                    
                    // Send player scores and winner data
                    console.log('🔄 Sending player/winner data...');
                    await sendPlayerAndWinnerDataToCaptivate(freshGameState, currentRoundObj);
                    setLastPlayerData(mapPlayerDataForCaptivate(freshGameState, currentRoundObj));
                    console.log('✅ Player/winner data sent');
                    
                    alert('✅ Winner/Player data successfully resent to Captivate!');
                    console.log('🔄 RESEND WINNER: Winner/player data resync finished successfully');
                    
                  } catch (err) {
                    console.error('🔄 RESEND WINNER: Failed to resend winner/player data:', err);
                    alert('❌ Failed to resend winner/player data to Captivate. Check console for details.');
                  }
                }}
                style={{
                  ...styles.button,
                  backgroundColor: theme.colors.green,
                  borderColor: theme.colors.green,
                  fontSize: '1rem',
                  padding: '0.75rem 1.25rem'
                }}
                onMouseEnter={e => Object.assign(e.target.style, {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px rgba(34, 197, 94, 0.3)`
                })}
                onMouseLeave={e => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }}
              >
                🏆 Resend Winner Data
              </button>
            </div>
          )}

        </div>

        {/* New Game Button - Only show when a game is active */}
        {gameId && (
          <div style={{
            ...styles.gameControlSection,
            backgroundColor: theme.colors.darkOrange,
            borderColor: theme.colors.orange,
            marginTop: '2rem'
          }}>
            <h3 style={styles.sectionTitle}>🔄 Start Over</h3>
            <button 
              onClick={() => {
                // Clear all game state
                setGameId('');
                setGameState(null);
                setLastCaptivateData(null);
                setLastPlayerData(null);
                setLoadGameId('');
                setShowAdminEdit(false);
                
                // Navigate to base producer URL (dynamic)
                const baseUrl = window.location.origin + window.location.pathname.split('?')[0];
                window.location.href = baseUrl;
              }}
              style={{
                ...styles.button,
                backgroundColor: theme.colors.orange,
                borderColor: theme.colors.orange,
                fontSize: '1.2rem',
                padding: '0.75rem 1.5rem',
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto'
              }}
              onMouseEnter={e => Object.assign(e.target.style, {
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px rgba(234, 88, 12, 0.3)`
              })}
              onMouseLeave={e => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = theme.shadows.button;
              }}
            >
              🔄 Start New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProducerDashboard;