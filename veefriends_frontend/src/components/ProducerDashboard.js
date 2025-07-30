import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import API_BASE from '../config';
import { sendRoundDataToCaptivate, sendPlayerAndWinnerDataToCaptivate, getColorForRarity } from '../utils/sendRoundDataToCaptivate';
import { getVeeFriendsLogoHeader } from '../utils/imageUtils';
import { useVeeFriendsTheme, createFlexContainer } from '../theme/VeeFriendsTheme';

function ProducerDashboard() {
  console.log('ProducerDashboard mounted');

  const [player1Email, setPlayer1Email] = useState('');
  const [player2Email, setPlayer2Email] = useState('');
  const [player1Decks, setPlayer1Decks] = useState([]);
  const [player2Decks, setPlayer2Decks] = useState([]);
  const [selectedDeck1, setSelectedDeck1] = useState(null);
  const [selectedDeck2, setSelectedDeck2] = useState(null);
  const [gameId, setGameId] = useState('');
  const [loadGameId, setLoadGameId] = useState('');
  const [lastCaptivateData, setLastCaptivateData] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showAdminEdit, setShowAdminEdit] = useState(false);

  const lastRoundIdRef = useRef(null);

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
      gap: '1rem',
      alignItems: 'center',
      marginBottom: '1rem',
      padding: '0.5rem',
      backgroundColor: theme.colors.black,
      borderRadius: theme.borderRadius.sm,
      border: `1px solid ${theme.colors.subtleBorder}`
    },
    editLabel: {
      color: theme.colors.white,
      fontSize: '0.8rem',
      minWidth: '120px',
      fontWeight: 'bold'
    },
    editInput: {
      ...baseStyles.input,
      flex: 1,
      fontSize: '0.9rem',
      padding: '0.5rem'
    },
    editButton: {
      ...baseStyles.button,
      fontSize: '0.8rem',
      padding: '0.5rem 1rem'
    },
    roundCard: {
      backgroundColor: theme.colors.black,
      border: `1px solid ${theme.colors.subtleBorder}`,
      borderRadius: theme.borderRadius.sm,
      padding: '1rem',
      margin: '0.5rem 0'
    },
    roundHeader: {
      color: theme.colors.gold,
      fontSize: '1rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async (text, playerNumber) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`Player ${playerNumber} portal link copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy link to clipboard');
    }
  };

  // Update game data function
  const updateGameData = async (field, value, roundIndex = undefined, cardPlayer = undefined) => {
    try {
      const response = await axios.put(`${API_BASE}/api/games/${gameId}/edit`, {
        field,
        value,
        roundIndex,
        cardPlayer
      });
      
      if (response.data.success) {
        // Refresh game data
        const res = await axios.get(`${API_BASE}/api/games/${gameId}`);
        setGameState(res.data);
        alert('Game data updated successfully!');
      }
    } catch (error) {
      console.error('Error updating game data:', error);
      alert('Failed to update game data');
    }
  };

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

        // Detect round change (send card1/card2 data)
        if (roundId && lastRoundIdRef.current !== roundId) {
          lastRoundIdRef.current = roundId;
          await sendRoundDataToCaptivate(roundObj);
          setLastCaptivateData(mapRoundDataForCaptivate(roundObj));
        }

        // Detect round winner (send player/winner data)
        if (roundObj?.winner && !roundObj._sentToCaptivate) {
          await sendPlayerAndWinnerDataToCaptivate(res.data, roundObj);
          roundObj._sentToCaptivate = true; // Prevent duplicate sends in polling
        }
      } catch (err) {
        console.error('Error polling game state:', err);
      }
    };

    fetchGameState();
    const interval = setInterval(fetchGameState, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, [gameId]);

  const fetchDecks = async (email, setDecks) => {
    try {
      const res = await axios.get(`${API_BASE}/api/decks?email=${email}`);
      setDecks(res.data);
    } catch (err) {
      console.error('Error fetching decks:', err);
      alert('Failed to fetch decks');
    }
  };

  const handleStartGame = async () => {
    if (!selectedDeck1 || !selectedDeck2) {
      alert('Select a deck for both players');
      return;
    }

    // Detailed debugging
    console.log('=== DECK DEBUGGING ===');
    console.log('selectedDeck1 full object:', selectedDeck1);
    console.log('selectedDeck1.handle:', selectedDeck1.handle);
    console.log('selectedDeck1.firstName:', selectedDeck1.firstName);
    console.log('selectedDeck1.lastName:', selectedDeck1.lastName);
    console.log('selectedDeck2 full object:', selectedDeck2);
    console.log('selectedDeck2.handle:', selectedDeck2.handle);
    console.log('selectedDeck2.firstName:', selectedDeck2.firstName);
    console.log('selectedDeck2.lastName:', selectedDeck2.lastName);

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

    console.log('player1Data being sent:', player1Data);
    console.log('player2Data being sent:', player2Data);

    try {
      const res = await axios.post(`${API_BASE}/api/games`, {
        player1: player1Data,
        player2: player2Data
      });
      
      console.log('Game created response:', res.data);
      console.log('Game player1 handle:', res.data.player1?.handle);
      console.log('Game player2 handle:', res.data.player2?.handle);
      
      setGameId(res.data._id);
      alert(`Game started! Game ID: ${res.data._id}`);

      // Send initial round data to Captivate (since game auto-starts first round)
      const game = res.data;
      const currentRound = game.currentRound;
      const rounds = game.rounds || [];
      const roundObj = rounds[currentRound - 1];
      if (roundObj) {
        lastRoundIdRef.current = roundObj._id;
        await sendRoundDataToCaptivate(roundObj);
        setLastCaptivateData(mapRoundDataForCaptivate(roundObj));
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

  // Helper to map round data for UI display (matches sendRoundDataToCaptivate)
  function mapRoundDataForCaptivate(roundData) {
    const card1 = roundData.C1 || {};
    const card2 = roundData.C2 || {};
    return {
      card1_aura: card1.Aura ?? 0,
      card1_skill: card1.Skill ?? 0,
      card1_stamina: card1.Stamina ?? 0,
      card1_character: card1.character ?? "",
      card1_rarity: card1.rarity ?? "",
      card1_score: card1.Score !== undefined ? Math.round(card1.Score) : 0,
      card1_color: getColorForRarity(card1.rarity),
      card1_imageUrl: card1.card ?? "",
      card1_rarityImageUrl: card1.rarityImage ?? "",
      card1_tier: card1.tier ?? "",
      card1_quote: card1.quote ?? "",
      card1_vfc: card1.vfc ?? "",
      card1_cardId: card1.card ?? "",
      card2_aura: card2.Aura ?? 0,
      card2_skill: card2.Skill ?? 0,
      card2_stamina: card2.Stamina ?? 0,
      card2_character: card2.character ?? "",
      card2_rarity: card2.rarity ?? "",
      card2_score: card2.Score !== undefined ? Math.round(card2.Score) : 0,
      card2_color: getColorForRarity(card2.rarity),
      card2_imageUrl: card2.card ?? "",
      card2_rarityImageUrl: card2.rarityImage ?? "",
      card2_tier: card2.tier ?? "",
      card2_quote: card2.quote ?? "",
      card2_vfc: card2.vfc ?? "",
      card2_cardId: card2.card ?? "",
    };
  }

  const handleLoadGame = async () => {
    if (!loadGameId) {
      alert('Please enter a Game ID to load.');
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/api/games/${loadGameId}`);
      setGameId(loadGameId);
      setGameState(res.data);
      alert(`Game loaded! Game ID: ${loadGameId}`);
      const game = res.data;
      if (game.player1 && game.player2) {
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

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
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
                  {deck.name}
                </option>
              ))}
            </select>
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
                  {deck.name}
                </option>
              ))}
            </select>
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
              style={styles.startGameButton}
              onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = theme.shadows.button;
              }}
            >
              🚀 Start Game
            </button>
          </div>
        )}

        {/* Game Status Section */}
        {gameId && (
          <div style={styles.gameStatusSection}>
            <h3 style={styles.sectionTitle}>📊 Game Status</h3>
            <p style={styles.gameIdDisplay}>
              <strong>Game ID:</strong> {gameId}
            </p>
            
            {gameState && !gameState.winner && (
              <div style={{ textAlign: 'center' }}>
                <p style={styles.gameStatusText}>Game In Progress</p>
                <div style={styles.inputRow}>
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
                    ⚙️ {showAdminEdit ? 'Hide' : 'Show'} Admin Edit
                  </button>
                </div>
              </div>
            )}

            {gameState?.winner && (
              <div style={{ textAlign: 'center' }}>
                <p style={styles.gameStatusText}>
                  <strong>Game Status:</strong> FINISHED - {gameState.winner} Wins! 🏆
                </p>
                <button 
                  onClick={() => setShowAdminEdit(!showAdminEdit)}
                  style={styles.adminToggleButton}
                  onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                  onMouseLeave={e => {
                    e.target.style.transform = 'none';
                    e.target.style.boxShadow = theme.shadows.button;
                  }}
                >
                  ⚙️ {showAdminEdit ? 'Hide' : 'Show'} Admin Edit
                </button>
              </div>
            )}
          </div>
        )}

        {/* Admin Edit Section */}
        {gameId && gameState && showAdminEdit && (
          <div style={styles.adminEditSection}>
            <h3 style={styles.sectionTitle}>⚙️ Admin Edit Mode</h3>
            <p style={{ color: theme.colors.white, marginBottom: '1rem' }}>
              ⚠️ <strong>Warning:</strong> Direct database modifications. Use carefully!
            </p>

            {/* Player Handles & Scores */}
            <div style={styles.roundCard}>
              <div style={styles.roundHeader}>Player Information & Scores</div>
              
              <div style={styles.editRow}>
                <span style={styles.editLabel}>Player 1 Handle:</span>
                <input 
                  style={styles.editInput}
                  defaultValue={gameState.player1?.handle || ''}
                  onBlur={(e) => updateGameData('player1_handle', e.target.value)}
                />
              </div>
              
              <div style={styles.editRow}>
                <span style={styles.editLabel}>Player 2 Handle:</span>
                <input 
                  style={styles.editInput}
                  defaultValue={gameState.player2?.handle || ''}
                  onBlur={(e) => updateGameData('player2_handle', e.target.value)}
                />
              </div>

              <div style={styles.editRow}>
                <span style={styles.editLabel}>P1 Aura Score:</span>
                <input 
                  style={styles.editInput}
                  type="number"
                  defaultValue={gameState.player1?.score?.aura || 0}
                  onBlur={(e) => updateGameData('player1_score_aura', e.target.value)}
                />
              </div>

              <div style={styles.editRow}>
                <span style={styles.editLabel}>P1 Skill Score:</span>
                <input 
                  style={styles.editInput}
                  type="number"
                  defaultValue={gameState.player1?.score?.skill || 0}
                  onBlur={(e) => updateGameData('player1_score_skill', e.target.value)}
                />
              </div>

              <div style={styles.editRow}>
                <span style={styles.editLabel}>P1 Stamina Score:</span>
                <input 
                  style={styles.editInput}
                  type="number"
                  defaultValue={gameState.player1?.score?.stamina || 0}
                  onBlur={(e) => updateGameData('player1_score_stamina', e.target.value)}
                />
              </div>

              <div style={styles.editRow}>
                <span style={styles.editLabel}>P2 Aura Score:</span>
                <input 
                  style={styles.editInput}
                  type="number"
                  defaultValue={gameState.player2?.score?.aura || 0}
                  onBlur={(e) => updateGameData('player2_score_aura', e.target.value)}
                />
              </div>

              <div style={styles.editRow}>
                <span style={styles.editLabel}>P2 Skill Score:</span>
                <input 
                  style={styles.editInput}
                  type="number"
                  defaultValue={gameState.player2?.score?.skill || 0}
                  onBlur={(e) => updateGameData('player2_score_skill', e.target.value)}
                />
              </div>

              <div style={styles.editRow}>
                <span style={styles.editLabel}>P2 Stamina Score:</span>
                <input 
                  style={styles.editInput}
                  type="number"
                  defaultValue={gameState.player2?.score?.stamina || 0}
                  onBlur={(e) => updateGameData('player2_score_stamina', e.target.value)}
                />
              </div>
            </div>

            {/* Current Round Data */}
            {gameState.rounds && gameState.currentRound > 0 && (() => {
              const currentRoundIndex = gameState.currentRound - 1;
              const round = gameState.rounds[currentRoundIndex];
              
              if (!round) return null;
              
              return (
                <div style={styles.roundCard}>
                  <div style={styles.roundHeader}>Current Round {round.round} - Card Data</div>
                  
                  {/* Player 1 Card (C1) */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: theme.colors.lightBlue, margin: '0.5rem 0' }}>Player 1 Card:</h4>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Character:</span>
                      <input 
                        style={styles.editInput}
                        defaultValue={round.C1?.character || ''}
                        onBlur={(e) => updateGameData('round_card_character', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Rarity:</span>
                      <input 
                        style={styles.editInput}
                        defaultValue={round.C1?.rarity || ''}
                        onBlur={(e) => updateGameData('round_card_rarity', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Aura:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        defaultValue={round.C1?.Aura || 0}
                        onBlur={(e) => updateGameData('round_card_aura', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Skill:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        defaultValue={round.C1?.Skill || 0}
                        onBlur={(e) => updateGameData('round_card_skill', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Stamina:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        defaultValue={round.C1?.Stamina || 0}
                        onBlur={(e) => updateGameData('round_card_stamina', e.target.value, currentRoundIndex, 'C1')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Score:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        step="0.01"
                        defaultValue={round.C1?.Score || 0}
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
                        defaultValue={round.C2?.character || ''}
                        onBlur={(e) => updateGameData('round_card_character', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Rarity:</span>
                      <input 
                        style={styles.editInput}
                        defaultValue={round.C2?.rarity || ''}
                        onBlur={(e) => updateGameData('round_card_rarity', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Aura:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        defaultValue={round.C2?.Aura || 0}
                        onBlur={(e) => updateGameData('round_card_aura', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Skill:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        defaultValue={round.C2?.Skill || 0}
                        onBlur={(e) => updateGameData('round_card_skill', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Stamina:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        defaultValue={round.C2?.Stamina || 0}
                        onBlur={(e) => updateGameData('round_card_stamina', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                    
                    <div style={styles.editRow}>
                      <span style={styles.editLabel}>Score:</span>
                      <input 
                        style={styles.editInput}
                        type="number"
                        step="0.01"
                        defaultValue={round.C2?.Score || 0}
                        onBlur={(e) => updateGameData('round_card_score', e.target.value, currentRoundIndex, 'C2')}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Load Existing Game Section */}
        <div style={styles.loadGameSection}>
          <h3 style={styles.sectionTitle}>📂 Load Existing Game</h3>
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Game ID</label>
              <input
                type="text"
                placeholder="Enter Game ID"
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
              Load Game
            </button>
          </div>
        </div>

        {/* Captivate Data Section */}
        {lastCaptivateData && (
          <div style={styles.captivateSection}>
            <h3 style={styles.sectionTitle}>📡 Last Data Sent to Captivate</h3>
            <pre style={styles.captivateData}>
              {JSON.stringify(lastCaptivateData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProducerDashboard;