import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../config';
import CardDisplay from './CardDisplay';
import { useVeeFriendsTheme } from '../theme/VeeFriendsTheme';

const PlayerPortal = ({ gameId, playerEmail }) => {
  const [game, setGame] = useState(null);
  const [playerRole, setPlayerRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Use the centralized theme
  const { theme, baseStyles } = useVeeFriendsTheme();

  // Component-specific styles that extend the base styles
  const styles = {
    ...baseStyles,
    container: {
      ...baseStyles.container,
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    },
    mainHeader: {
      ...baseStyles.sectionTitle,
      fontSize: '2rem',
      textAlign: 'left',
      marginBottom: '0.5rem'
    },
    subHeader: {
      color: theme.colors.lightGray,
      fontSize: '1.2rem',
      fontWeight: 'normal',
      marginTop: '0',
      marginBottom: '1.5rem',
      textTransform: 'none'
    },
    debugBox: {
      background: theme.colors.darkPurple,
      padding: '1rem',
      marginBottom: '1rem',
      fontSize: '0.8rem',
      borderRadius: theme.borderRadius.sm,
      border: `1px solid ${theme.colors.subtleBorder}`,
      color: theme.colors.lightGray,
      textTransform: 'none'
    },
    actionSection: {
      marginBottom: '2rem',
      padding: '1rem',
      border: `2px solid ${theme.colors.gold}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple
    },
    challengeSection: {
      marginBottom: '2rem',
      padding: '1rem',
      border: `2px solid ${theme.colors.red}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple
    },
    waitingSection: {
      marginBottom: '2rem',
      padding: '1rem',
      border: `2px solid ${theme.colors.gold}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: '#fff9c4',
      color: theme.colors.black
    },
    completedSection: {
      marginBottom: '2rem',
      padding: '1rem',
      border: `2px solid ${theme.colors.green}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkGreen
    },
    cardSection: {
      marginBottom: '2rem',
      padding: '0', // Remove padding from section
      border: `2px solid ${theme.colors.subtleBorder}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple
    },
    cardSectionInner: {
      padding: '2rem' // Add new inner container with padding
    },
    cardsContainer: {
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexWrap: 'nowrap',
      minHeight: '600px',
      padding: '0'
    },
    cardWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      flex: '0 0 auto',
      width: '350px',
      minWidth: '350px'
    },
    cardInfo: {
      marginTop: '1rem',
      width: '200px',
      textAlign: 'left',
      color: theme.colors.white
    },
    cardTitle: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: theme.colors.gold,
      textTransform: 'uppercase',
      marginBottom: '0.5rem'
    },
    cardDetail: {
      fontSize: '0.9rem',
      margin: '0.2rem 0',
      textTransform: 'none'
    },
    cardQuote: {
      fontSize: '0.8rem',
      fontStyle: 'italic',
      color: theme.colors.lightGray,
      marginTop: '0.5rem',
      textTransform: 'none'
    },
    scoreSection: {
      marginTop: '2rem',
      padding: '1rem',
      border: `2px solid ${theme.colors.subtleBorder}`,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.darkPurple
    },
    uniformButtonRow: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '1rem'
    },
    uniformButton: {
      ...baseStyles.button,
      minWidth: '140px',
      padding: '0.75rem 1rem',
      fontSize: '0.9rem',
      textAlign: 'center'
    },
    uniformButtonAccept: {
      ...baseStyles.button,
      minWidth: '140px',
      padding: '0.75rem 1rem',
      fontSize: '0.9rem',
      textAlign: 'center',
      backgroundColor: theme.colors.green,
      color: theme.colors.white,
      border: `3px solid ${theme.colors.black}`
    },
    uniformButtonReject: {
      ...baseStyles.button,
      minWidth: '140px',
      padding: '0.75rem 1rem',
      fontSize: '0.9rem',
      textAlign: 'center',
      backgroundColor: theme.colors.red,
      color: theme.colors.white,
      border: `3px solid ${theme.colors.black}`
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem',
      flexWrap: 'wrap'
    },
    buttonGroupVertical: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'center'
    },
    acceptButton: {
      ...baseStyles.button,
      backgroundColor: theme.colors.green,
      color: theme.colors.white,
      padding: '1rem 2rem',
      borderRadius: '50px',
      fontSize: '1.1rem',
      border: `3px solid ${theme.colors.black}`
    },
    rejectButton: {
      ...baseStyles.button,
      backgroundColor: theme.colors.red,
      color: theme.colors.white,
      padding: '1rem 2rem',
      borderRadius: '50px',
      fontSize: '1.1rem',
      border: `3px solid ${theme.colors.black}`
    },
    counterButton: {
      ...baseStyles.button,
      backgroundColor: theme.colors.gold,
      color: theme.colors.black,
      padding: '0.5rem 1rem',
      fontSize: '0.9rem'
    },
    tttButton: {
      ...baseStyles.button,
      backgroundColor: theme.colors.gold,
      color: theme.colors.black,
      padding: '0.5rem 1rem'
    },
    disabledButton: {
      ...baseStyles.button,
      backgroundColor: theme.colors.lightGray,
      color: theme.colors.black,
      cursor: 'not-allowed',
      opacity: 0.6,
      minWidth: '140px',
      padding: '0.75rem 1rem',
      fontSize: '0.9rem',
      textAlign: 'center'
    },
    nextRoundButton: {
      ...baseStyles.submitButton,
      fontSize: '1.1rem',
      padding: '1rem 2rem'
    },
    centerButton: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    scoreGrid: {
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    scorePlayer: {
      textAlign: 'center'
    },
    scoreLabel: {
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: theme.colors.gold,
      textTransform: 'uppercase'
    },
    scoreStat: {
      margin: '0.25rem 0',
      color: theme.colors.white,
      textTransform: 'none'
    },
    gameOverContainer: {
      ...baseStyles.container,
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    },
    gameOverHeader: {
      ...baseStyles.sectionTitle,
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    gameOverSubHeader: {
      ...baseStyles.sectionTitle,
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    cardPlaceholder: {
      width: '350px',
      height: '490px',
      backgroundColor: theme.colors.darkGray,
      border: `3px solid ${theme.colors.gold}`,
      borderRadius: theme.borderRadius.lg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.gold,
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '1rem',
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(232, 179, 67, 0.1) 10px, rgba(232, 179, 67, 0.1) 20px)'
    },
  };

  const api = API_BASE || 'http://localhost:5001';

  const loadGame = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api}/api/games/${gameId}`);
      const gameData = response.data;
      
      console.log('Full Game Data:', gameData);
      console.log('Player1 object:', gameData.player1);
      console.log('Player2 object:', gameData.player2);
      console.log('Player1 handle:', gameData.player1?.handle);
      console.log('Player2 handle:', gameData.player2?.handle);
      
      setGame(gameData);

      const normalizedEmail = playerEmail?.toLowerCase();
      const role =
        normalizedEmail === gameData.player1?.email?.toLowerCase()
          ? 'P1'
          : normalizedEmail === gameData.player2?.email?.toLowerCase()
          ? 'P2'
          : '';
      setPlayerRole(role);

      console.log('Player Role:', role);
    } catch (error) {
      console.error('Error loading game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gameId && playerEmail) {
      loadGame();
      const interval = setInterval(loadGame, 3000);
      return () => clearInterval(interval);
    }
  }, [gameId, playerEmail]);

  const handleStartNextRound = async () => {
    try {
      await axios.post(`${api}/api/games/${gameId}/start-round`);
      await loadGame();
    } catch (error) {
      console.error('Failed to start next round:', error);
      alert(error.response?.data?.error || 'Failed to start next round.');
    }
  };

  const handleChallenge = async (attribute) => {
    try {
      await axios.post(`${api}/api/games/${gameId}/challenge`, { attribute });
      console.log(`✔️ Challenge sent for attribute: ${attribute}`);
      await loadGame();
    } catch (error) {
      console.error('Error challenging attribute:', error);
      alert(error.response?.data?.error || 'Failed to challenge attribute.');
    }
  };

  const handleRespond = async (decision, useTTT = false, counterAttribute = null) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${api}/api/games/${gameId}/respond-turn`, {
        decision,
        useTTT,
        counterAttribute,
        playerRole // Add this line to send the player's role
      });

      console.log('Response:', res.data);
      await loadGame();
      
    } catch (error) {
      console.error('Error responding to challenge:', error);
      alert(error.response?.data?.error || 'Failed to respond to challenge.');
    } finally {
      setIsLoading(false);
    }
  };

  const roundIndex = game?.currentRound ? game.currentRound - 1 : 0;
  const round = game?.rounds?.[roundIndex];
  const drawnCard = playerRole === 'P1' ? round?.C1 : round?.C2;
  const opponentCard = playerRole === 'P1' ? round?.C2 : round?.C1;

  console.log('Current Round Index:', roundIndex);
  console.log('Round Object:', round);
  console.log('Drawn Card:', drawnCard);

  const score = playerRole === 'P1' ? game?.player1Score : playerRole === 'P2' ? game?.player2Score : null;
  const isResolved = !!(round?.winner || round?.result === 'push');
  const originalAttacker = round?.attacker;
  const hasChallenged = !!round?.attribute;
  
  const challengedAttrs = round?.challengedAttributes || [];
  const rejectedAttrs = round?.rejections || {};
  const allRejected = Object.values(rejectedAttrs).filter(Boolean).length >= 3;
  
  const isAttackerCardCore = drawnCard?.rarity?.toLowerCase() === 'core';
  const canUseTTT = !isResolved && !game?.usedTTT?.[playerRole] && !allRejected && !isAttackerCardCore;

  const currentChallenger = round?.counterChallenger || originalAttacker;
  const currentDefender = currentChallenger === 'P1' ? 'P2' : 'P1';
  const isCurrentDefender = playerRole === currentDefender;
  const isCurrentChallenger = playerRole === currentChallenger;

  const getAvailableCounterAttributes = () => {
    const allAttrs = ['Aura', 'Skill', 'Stamina'];
    return allAttrs.filter(attr => 
      !challengedAttrs.includes(attr) && !rejectedAttrs[attr]
    );
  };

  const availableCounterAttrs = getAvailableCounterAttributes();
  const canCounter = availableCounterAttrs.length > 0;

  console.log("⚠️ Game State Debug:");
  console.log("isResolved:", isResolved);
  console.log("originalAttacker:", originalAttacker);
  console.log("currentChallenger:", currentChallenger);
  console.log("currentDefender:", currentDefender);
  console.log("isCurrentDefender:", isCurrentDefender);
  console.log("isCurrentChallenger:", isCurrentChallenger);
  console.log("hasChallenged:", hasChallenged);
  console.log("canUseTTT:", canUseTTT);
  console.log("rejectedAttrs:", rejectedAttrs);
  console.log("allRejected:", allRejected);
  console.log("availableCounterAttrs:", availableCounterAttrs);
  console.log("canCounter:", canCounter);
  console.log("round.counterChallenger:", round?.counterChallenger);

  const getExpectedAttacker = () => {
    if (!game || !game.rounds || game.rounds.length === 0) return 'P1';
    
    for (let i = game.rounds.length - 1; i >= 0; i--) {
      const prevRound = game.rounds[i];
      if (prevRound?.winner || prevRound?.result === 'push') {
        if (prevRound.winner) {
          return prevRound.winner === 'P1' ? 'P2' : 'P1';
        }
        return i % 2 === 0 ? 'P2' : 'P1';
      }
    }
    
    return 'P1';
  };

  const expectedAttacker = getExpectedAttacker();
  const canStartNextRound = isResolved && playerRole === expectedAttacker;

  const CardBack = () => (
    <img 
      src="https://res.cloudinary.com/dfecvzwvg/image/upload/v1/VeeFriends/assets/series-2-card-back.png"
      alt="VeeFriends Card Back"
      style={{
        width: '350px',
        height: '490px',
        objectFit: 'cover',
        borderRadius: theme.borderRadius.lg,
        border: `3px solid ${theme.colors.gold}`,
        boxShadow: theme.shadows.card
      }}
    />
  );

  if (!gameId || !playerEmail) return <RedirectForm styles={styles} theme={theme} />;

  if (game?.winner) {
    return (
      <div style={styles.gameOverContainer}>
        <h1 style={styles.gameOverHeader}>🏆 Game Over!</h1>
        <h2 style={styles.gameOverSubHeader}>
          {game.winner === 'Tie' 
            ? 'It\'s a Tie!' 
            : `@${game.winner === 'P1' 
                ? (game?.player1?.handle ? game.player1.handle.replace(/^@+/, '') : 'Player1')
                : (game?.player2?.handle ? game.player2.handle.replace(/^@+/, '') : 'Player2')
              } Wins!`
          }
        </h2>
        <p style={{ color: theme.colors.white, textTransform: 'none' }}>The game has ended. No more rounds can be played.</p>
        
        <div style={styles.scoreSection}>
          <h4 style={styles.sectionTitle}>📊 Final Scores</h4>
          <div style={styles.scoreGrid}>
            <div style={styles.scorePlayer}>
              <div style={styles.scoreLabel}>Player 1</div>
              <p style={styles.scoreStat}>Aura: {game.player1?.score?.aura ?? 0}</p>
              <p style={styles.scoreStat}>Skill: {game.player1?.score?.skill ?? 0}</p>
              <p style={styles.scoreStat}>Stamina: {game.player1?.score?.stamina ?? 0}</p>
            </div>
            <div style={styles.scorePlayer}>
              <div style={styles.scoreLabel}>Player 2</div>
              <p style={styles.scoreStat}>Aura: {game.player2?.score?.aura ?? 0}</p>
              <p style={styles.scoreStat}>Skill: {game.player2?.score?.skill ?? 0}</p>
              <p style={styles.scoreStat}>Stamina: {game.player2?.score?.stamina ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Player info for welcome message
  const playerInfo = playerRole === 'P1' ? game?.player1 : game?.player2;
  const handle = playerInfo?.handle;

  // Remove leading @ if present
  const cleanHandle = handle ? handle.replace(/^@+/, '') : 'Unknown';

  return (
    <div style={styles.container}>
      <h2 style={styles.mainHeader}>Welcome @{cleanHandle}</h2>
      <h3 style={styles.subHeader}>
        {playerRole === 'P1' ? 'Player 1' : playerRole === 'P2' ? 'Player 2' : 'Unknown'}
        {game && (
          <span> - {isCurrentChallenger ? 'Challenging' : 'Defending'}</span>
        )}
      </h3>

      {/* Next Round Button - moved to top */}
      {canStartNextRound && (
        <div style={styles.centerButton}>
          <button 
            onClick={handleStartNextRound} 
            style={styles.nextRoundButton}
            onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={e => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = theme.shadows.button;
            }}
          >
            ▶️ Start Next Round
          </button>
        </div>
      )}

      {/* Debug Info - Commented out for production, uncomment for troubleshooting
      <div style={styles.debugBox}>
        <strong>Debug Info:</strong><br/>
        Round: {roundIndex + 1} | Resolved: {isResolved ? 'Yes' : 'No'} | 
        Original Attacker: {originalAttacker} | Current Challenger: {currentChallenger} | 
        Challenged: {hasChallenged ? round?.attribute : 'No'}
        {round?.rejections && <><br/>Rejections: {JSON.stringify(round.rejections)}</>}
        {round?.counterChallenger && <><br/>Counter Challenger: {round.counterChallenger}</>}
      </div>
      */}

      {/* Original Attacker Controls - only show if no challenge has been made yet */}
      {!isResolved && originalAttacker === playerRole && !hasChallenged && (
        <div style={styles.actionSection}>
          <h3 style={styles.sectionTitle}>🗡️ Choose your challenge:</h3>
          <div style={styles.uniformButtonRow}>
            <button
              onClick={() => handleChallenge('Aura')}
              disabled={rejectedAttrs.Aura || challengedAttrs.includes('Aura') || isLoading}
              style={rejectedAttrs.Aura || challengedAttrs.includes('Aura') ? styles.disabledButton : styles.uniformButton}
              onMouseEnter={e => !e.target.disabled && Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                if (!e.target.disabled) {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }
              }}
            >
              Aura {(rejectedAttrs.Aura || challengedAttrs.includes('Aura')) && '(Used)'}
            </button>
            <button
              onClick={() => handleChallenge('Skill')}
              disabled={rejectedAttrs.Skill || challengedAttrs.includes('Skill') || isLoading}
              style={rejectedAttrs.Skill || challengedAttrs.includes('Skill') ? styles.disabledButton : styles.uniformButton}
              onMouseEnter={e => !e.target.disabled && Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                if (!e.target.disabled) {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }
              }}
            >
              Skill {(rejectedAttrs.Skill || challengedAttrs.includes('Skill')) && '(Used)'}
            </button>
            <button
              onClick={() => handleChallenge('Stamina')}
              disabled={rejectedAttrs.Stamina || challengedAttrs.includes('Stamina') || isLoading}
              style={rejectedAttrs.Stamina || challengedAttrs.includes('Stamina') ? styles.disabledButton : styles.uniformButton}
              onMouseEnter={e => !e.target.disabled && Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                if (!e.target.disabled) {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }
              }}
            >
              Stamina {(rejectedAttrs.Stamina || challengedAttrs.includes('Stamina')) && '(Used)'}
            </button>
            
            {canUseTTT && (
              <button 
                onClick={() => handleRespond('accept', true)}
                disabled={isLoading}
                style={styles.uniformButton}
                onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                onMouseLeave={e => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }}
              >
                🪙 Use TTT
              </button>
            )}
          </div>
        </div>
      )}

      {/* Defender Controls - show when a challenge has been made and this player is the current defender */}
      {!isResolved && isCurrentDefender && hasChallenged && !allRejected && (
        <div style={styles.challengeSection}>
          <h3 style={styles.sectionTitle}>🛡️ Accept/Reject Challenge</h3>
          <p style={{ color: theme.colors.white, textTransform: 'none', marginBottom: '1rem' }}>
            You've been challenged on: <strong>{round.attribute}</strong>
          </p>
          
          <div style={styles.uniformButtonRow}>
            <button 
              onClick={() => handleRespond('accept')}
              disabled={isLoading}
              style={styles.uniformButtonAccept}
              onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = theme.shadows.button;
              }}
            >
              ✅ Accept Challenge
            </button>
            
            {canCounter ? (
              availableCounterAttrs.map(attr => (
                <button
                  key={attr}
                  onClick={() => handleRespond('reject', false, attr)}
                  disabled={isLoading}
                  style={styles.uniformButton}
                  onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                  onMouseLeave={e => {
                    e.target.style.transform = 'none';
                    e.target.style.boxShadow = theme.shadows.button;
                  }}
                >
                  🔄 Counter with {attr}
                </button>
              ))
            ) : (
              <button 
                onClick={() => handleRespond('reject')}
                disabled={isLoading}
                style={styles.uniformButtonReject}
                onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                onMouseLeave={e => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }}
              >
                ❌ Reject Challenge
              </button>
            )}
            
            {canUseTTT && (
              <button 
                onClick={() => handleRespond('accept', true)}
                disabled={isLoading}
                style={styles.uniformButton}
                onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                onMouseLeave={e => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                }}
              >
                🪙 Use TTT
              </button>
            )}
          </div>
        </div>
      )}

      {/* Waiting message for current challenger when they're waiting for a response */}
      {!isResolved && isCurrentChallenger && hasChallenged && (
        <div style={styles.waitingSection}>
          <h3 style={{ color: theme.colors.black, textTransform: 'uppercase' }}>⏳ Waiting for opponent to respond to challenge on: <strong>{round.attribute}</strong></h3>
          <p style={{ color: theme.colors.black, textTransform: 'none' }}>The other player needs to accept or counter your challenge.</p>
        </div>
      )}

      {/* Round Result */}
      {isResolved && (
        <div style={{
          ...styles.completedSection,
          backgroundColor: round.result === 'push' 
            ? '#B8860B' // Dark goldenrod for push - readable and thematic
            : round.winner === playerRole 
              ? theme.colors.darkGreen // Green for winner  
              : '#8B0000', // Dark red for loser
          borderColor: round.result === 'push'
            ? '#DAA520' // Lighter goldenrod border for contrast
            : round.winner === playerRole
              ? theme.colors.green
              : theme.colors.red
        }}>
          <h3 style={styles.sectionTitle}>🏆 Round {roundIndex + 1} Complete!</h3>
          {round.winner && (
            <p style={{ color: theme.colors.white, textTransform: 'none' }}>
              <strong>Winner: @{round.winner === 'P1' 
                ? (game?.player1?.handle ? game.player1.handle.replace(/^@+/, '') : 'Player1')
                : (game?.player2?.handle ? game.player2.handle.replace(/^@+/, '') : 'Player2')
              }</strong>
            </p>
          )}
          {round.result === 'push' && (
            <p style={{ color: theme.colors.white, textTransform: 'none' }}>
              <strong>Result: Push (Tie)</strong>
            </p>
          )}
          <p style={{ color: theme.colors.white, textTransform: 'none' }}>
            <strong>Attribute:</strong> {round.attribute}
          </p>
        </div>
      )}

      {/* Card Display - Combined for both players */}
      {(drawnCard || opponentCard) && (
        <div style={styles.cardSection}>
          <div style={styles.cardSectionInner}>
            <h3 style={styles.sectionTitle}>🃏 Cards This Round</h3>
            <div style={styles.cardsContainer}>
              {/* Player's Card */}
              <div style={styles.cardWrapper}>
                <div style={{ textAlign: 'left', marginBottom: '0.5rem', color: theme.colors.gold, fontWeight: 'bold', textTransform: 'uppercase' }}>
                  @{cleanHandle}
                </div>
                {drawnCard ? (
                  <CardDisplay card={drawnCard} size="xlarge" layout="vertical" />
                ) : (
                  <div style={{ color: theme.colors.white, textTransform: 'none' }}>No card drawn yet</div>
                )}
              </div>

              {/* Opponent's Card */}
              <div style={styles.cardWrapper}>
                <div style={{ textAlign: 'left', marginBottom: '0.5rem', color: theme.colors.gold, fontWeight: 'bold', textTransform: 'uppercase' }}>
                  @{playerRole === 'P1' ? (game?.player2?.handle ? game.player2.handle.replace(/^@+/, '') : 'Opponent') : (game?.player1?.handle ? game.player1.handle.replace(/^@+/, '') : 'Opponent')}
                </div>
                {opponentCard ? (
                  <>
                    {isResolved ? (
                      <CardDisplay card={opponentCard} size="xlarge" layout="vertical" />
                    ) : (
                      <CardBack />
                    )}
                  </>
                ) : (
                  <div style={{ color: theme.colors.white, textTransform: 'none' }}>No card drawn yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Score Display for Both Players */}
      {game && (
        <div style={styles.scoreSection}>
          <h4 style={styles.sectionTitle}>📊 Current Scores</h4>
          <div style={styles.scoreGrid}>
            <div style={styles.scorePlayer}>
              <div style={styles.scoreLabel}>Player 1</div>
              <p style={styles.scoreStat}>Aura: {game.player1?.score?.aura ?? 0}</p>
              <p style={styles.scoreStat}>Skill: {game.player1?.score?.skill ?? 0}</p>
              <p style={styles.scoreStat}>Stamina: {game.player1?.score?.stamina ?? 0}</p>
            </div>
            <div style={styles.scorePlayer}>
              <div style={styles.scoreLabel}>Player 2</div>
              <p style={styles.scoreStat}>Aura: {game.player2?.score?.aura ?? 0}</p>
              <p style={styles.scoreStat}>Skill: {game.player2?.score?.skill ?? 0}</p>
              <p style={styles.scoreStat}>Stamina: {game.player2?.score?.stamina ?? 0}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RedirectForm = ({ styles, theme }) => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameId && email) {
      navigate(`/player?gameId=${encodeURIComponent(gameId)}&email=${encodeURIComponent(email)}`);
    }
  };

  const formStyles = {
    container: {
      ...styles.container,
      maxWidth: '400px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    input: {
      ...styles.input,
      width: '100%',
      marginRight: 0,
      marginBottom: 0
    },
    submitButton: {
      ...styles.submitButton,
      width: '100%',
      padding: '0.75rem'
    }
  };

  return (
    <div style={formStyles.container}>
      <h2 style={styles.mainHeader}>Enter Game Info</h2>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <input
          type="text"
          placeholder="Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          style={formStyles.input}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={formStyles.input}
        />
        <button 
          type="submit"
          style={formStyles.submitButton}
          onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
          onMouseLeave={e => {
            e.target.style.transform = 'none';
            e.target.style.boxShadow = theme.shadows.button;
          }}
        >
          Enter Player Portal
        </button>
      </form>
    </div>
  );
};

export default PlayerPortal;