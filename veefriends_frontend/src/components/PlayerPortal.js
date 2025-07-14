import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../config';

const PlayerPortal = ({ gameId, playerEmail }) => {
  const [game, setGame] = useState(null);
  const [playerRole, setPlayerRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const api = API_BASE || 'http://localhost:5001';

  const loadGame = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api}/api/games/${gameId}`);
      const gameData = response.data;
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
      console.log('Game Data:', gameData);
    } catch (error) {
      console.error('Error loading game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gameId && playerEmail) {
      loadGame();
      // Auto-refresh every 3 seconds
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
      });

      console.log('Response:', res.data);
      
      // Always reload after response
      await loadGame();
      
    } catch (error) {
      console.error('Error responding to challenge:', error);
      alert(error.response?.data?.error || 'Failed to respond to challenge.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed: Use consistent round indexing
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
  
  // Track which attributes have been challenged or rejected this round
  const challengedAttrs = round?.challengedAttributes || [];
  const rejectedAttrs = round?.rejections || {};
  const allRejected = Object.values(rejectedAttrs).filter(Boolean).length >= 3;
  
  // Check if this player can use TTT
  const isAttackerCardCore = drawnCard?.rarity?.toLowerCase() === 'core';
  const canUseTTT = !isResolved && !game?.usedTTT?.[playerRole] && !allRejected && !isAttackerCardCore;

  // Determine who should be responding to the current challenge
  // If there's a counterChallenger, they are now the challenger
  const currentChallenger = round?.counterChallenger || originalAttacker;
  const currentDefender = currentChallenger === 'P1' ? 'P2' : 'P1';
  const isCurrentDefender = playerRole === currentDefender;
  const isCurrentChallenger = playerRole === currentChallenger;

  // Get available counter attributes (not yet challenged or rejected)
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
    
    // Look for the last resolved round to determine next attacker
    for (let i = game.rounds.length - 1; i >= 0; i--) {
      const prevRound = game.rounds[i];
      if (prevRound?.winner || prevRound?.result === 'push') {
        // If previous round had a winner, they become defender next
        if (prevRound.winner) {
          return prevRound.winner === 'P1' ? 'P2' : 'P1';
        }
        // If it was a push, alternate based on round number
        return i % 2 === 0 ? 'P2' : 'P1';
      }
    }
    
    // Default to P1 for first round
    return 'P1';
  };

  const expectedAttacker = getExpectedAttacker();
  const canStartNextRound = isResolved && playerRole === expectedAttacker;

  if (!gameId || !playerEmail) return <RedirectForm />;

  // Check if game is over
  if (game?.winner) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1>🏆 Game Over!</h1>
        <h2>{game.winner === 'Tie' ? 'It\'s a Tie!' : `${game.winner} Wins!`}</h2>
        <p>The game has ended. No more rounds can be played.</p>
        
        {/* Final Scores */}
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
          <h4>📊 Final Scores</h4>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <div>
              <strong>Player 1</strong>
              <p>Aura: {game.player1?.score?.aura ?? 0}</p>
              <p>Skill: {game.player1?.score?.skill ?? 0}</p>
              <p>Stamina: {game.player1?.score?.stamina ?? 0}</p>
            </div>
            <div>
              <strong>Player 2</strong>
              <p>Aura: {game.player2?.score?.aura ?? 0}</p>
              <p>Skill: {game.player2?.score?.skill ?? 0}</p>
              <p>Stamina: {game.player2?.score?.stamina ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Welcome, {playerEmail}</h1>
      <h2>
        You are <strong>{playerRole === 'P1' ? 'Player 1' : playerRole === 'P2' ? 'Player 2' : 'Unknown'}</strong>
        {game && (
          <span> - {isCurrentChallenger ? 'Challenging' : 'Defending'}</span>
        )}
      </h2>

      {/* Next Round Button - moved to top */}
      {canStartNextRound && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <button 
            onClick={handleStartNextRound} 
            style={{ 
              backgroundColor: '#007bff',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1em',
              fontWeight: 'bold'
            }}
          >
            ▶️ Start Next Round
          </button>
        </div>
      )}

      {/* Debug Info */}
      <div style={{ background: '#f0f0f0', padding: '1rem', marginBottom: '1rem', fontSize: '0.8em' }}>
        <strong>Debug Info:</strong><br/>
        Round: {roundIndex + 1} | Resolved: {isResolved ? 'Yes' : 'No'} | 
        Original Attacker: {originalAttacker} | Current Challenger: {currentChallenger} | 
        Challenged: {hasChallenged ? round?.attribute : 'No'}
        {round?.rejections && <><br/>Rejections: {JSON.stringify(round.rejections)}</>}
        {round?.counterChallenger && <><br/>Counter Challenger: {round.counterChallenger}</>}
      </div>

      {/* Original Attacker Controls - only show if no challenge has been made yet */}
      {!isResolved && originalAttacker === playerRole && !hasChallenged && (
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #007bff', borderRadius: '8px' }}>
          <h3>🗡️ Choose an attribute to challenge:</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => handleChallenge('Aura')}
              disabled={rejectedAttrs.Aura || challengedAttrs.includes('Aura') || isLoading}
              style={{ 
                backgroundColor: (rejectedAttrs.Aura || challengedAttrs.includes('Aura')) ? '#ccc' : '#007bff',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: (rejectedAttrs.Aura || challengedAttrs.includes('Aura')) ? 'not-allowed' : 'pointer'
              }}
            >
              Aura {(rejectedAttrs.Aura || challengedAttrs.includes('Aura')) && '(Used)'}
            </button>
            <button
              onClick={() => handleChallenge('Skill')}
              disabled={rejectedAttrs.Skill || challengedAttrs.includes('Skill') || isLoading}
              style={{ 
                backgroundColor: (rejectedAttrs.Skill || challengedAttrs.includes('Skill')) ? '#ccc' : '#007bff',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: (rejectedAttrs.Skill || challengedAttrs.includes('Skill')) ? 'not-allowed' : 'pointer'
              }}
            >
              Skill {(rejectedAttrs.Skill || challengedAttrs.includes('Skill')) && '(Used)'}
            </button>
            <button
              onClick={() => handleChallenge('Stamina')}
              disabled={rejectedAttrs.Stamina || challengedAttrs.includes('Stamina') || isLoading}
              style={{ 
                backgroundColor: (rejectedAttrs.Stamina || challengedAttrs.includes('Stamina')) ? '#ccc' : '#007bff',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: (rejectedAttrs.Stamina || challengedAttrs.includes('Stamina')) ? 'not-allowed' : 'pointer'
              }}
            >
              Stamina {(rejectedAttrs.Stamina || challengedAttrs.includes('Stamina')) && '(Used)'}
            </button>
          </div>
          
          {canUseTTT && (
            <button 
              onClick={() => handleRespond('accept', true)}
              disabled={isLoading}
              style={{ 
                backgroundColor: '#28a745',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🪙 Use TTT (Total Score)
            </button>
          )}
        </div>
      )}

      {/* Defender Controls - show when a challenge has been made and this player is the current defender */}
      {!isResolved && isCurrentDefender && hasChallenged && !allRejected && (
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #dc3545', borderRadius: '8px' }}>
          <h3>🛡️ You've been challenged on: <strong>{round.attribute}</strong></h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
            <button 
              onClick={() => handleRespond('accept')}
              disabled={isLoading}
              style={{ 
                backgroundColor: '#28a745',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '1.1em'
              }}
            >
              ✅ Accept Challenge
            </button>
            
            {canCounter && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9em', fontWeight: 'bold' }}>Or Counter with:</span>
                {availableCounterAttrs.map(attr => (
                  <button
                    key={attr}
                    onClick={() => handleRespond('reject', false, attr)}
                    disabled={isLoading}
                    style={{ 
                      backgroundColor: '#ffc107',
                      color: 'black',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    🔄 Counter with {attr}
                  </button>
                ))}
              </div>
            )}

            {!canCounter && (
              <button 
                onClick={() => handleRespond('reject')}
                disabled={isLoading}
                style={{ 
                  backgroundColor: '#dc3545',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '1.1em'
                }}
              >
                ❌ Reject Challenge
              </button>
            )}
          </div>
          
          {canUseTTT && (
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => handleRespond('accept', true)}
                disabled={isLoading}
                style={{ 
                  backgroundColor: '#ffc107',
                  color: 'black',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🪙 Use TTT Instead
              </button>
            </div>
          )}
        </div>
      )}

      {/* Waiting message for current challenger when they're waiting for a response */}
      {!isResolved && isCurrentChallenger && hasChallenged && (
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #ffc107', borderRadius: '8px', background: '#fff9c4' }}>
          <h3>⏳ Waiting for opponent to respond to challenge on: <strong>{round.attribute}</strong></h3>
          <p>The other player needs to accept or counter your challenge.</p>
        </div>
      )}

      {/* Round Result */}
      {isResolved && (
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid #28a745', borderRadius: '8px' }}>
          <h3>🏆 Round Complete!</h3>
          {round.winner && <p><strong>Winner: {round.winner}</strong></p>}
          {round.result === 'push' && <p><strong>Result: Push (Tie)</strong></p>}
          <p><strong>Attribute:</strong> {round.attribute}</p>
          
          {/* Show opponent's card when round is resolved */}
          {opponentCard && (
            <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f8f9fa' }}>
              <h4>🃏 {playerRole === 'P1' ? 'P2' : 'P1'} Card This Round</h4>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div>
                  <h5>{opponentCard.character}</h5>
                  <p><strong>Rarity:</strong> {opponentCard.rarity}</p>
                  <p><strong>Aura:</strong> {opponentCard.Aura}</p>
                  <p><strong>Skill:</strong> {opponentCard.Skill}</p>
                  <p><strong>Stamina:</strong> {opponentCard.Stamina}</p>
                  <p><strong>Total Score:</strong> {Math.round(opponentCard.Score)}</p>
                </div>
                {opponentCard.card && (
                  <img
                    src={`/textures/${opponentCard.card}`}
                    alt={`${opponentCard.character} card`}
                    style={{ maxWidth: '150px', height: 'auto' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Card Display */}
      {drawnCard ? (
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>🃏 Your Card This Round</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <div>
              <h4>{drawnCard.character}</h4>
              <p><strong>Rarity:</strong> {drawnCard.rarity}</p>
              <p><strong>Aura:</strong> {drawnCard.Aura}</p>
              <p><strong>Skill:</strong> {drawnCard.Skill}</p>
              <p><strong>Stamina:</strong> {drawnCard.Stamina}</p>
              <p><strong>Total Score:</strong> {Math.round(drawnCard.Score)}</p>
            </div>
            {drawnCard.card && (
              <img
                src={`/textures/${drawnCard.card}`}
                alt={`${drawnCard.character} card`}
                style={{ maxWidth: '200px', height: 'auto' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <p>No card drawn yet this round.</p>
      )}

      {/* Score Display for Both Players */}
      {game && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
          <h4>📊 Current Scores</h4>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <div>
              <strong>Player 1</strong>
              <p>Aura: {game.player1?.score?.aura ?? 0}</p>
              <p>Skill: {game.player1?.score?.skill ?? 0}</p>
              <p>Stamina: {game.player1?.score?.stamina ?? 0}</p>
            </div>
            <div>
              <strong>Player 2</strong>
              <p>Aura: {game.player2?.score?.aura ?? 0}</p>
              <p>Skill: {game.player2?.score?.skill ?? 0}</p>
              <p>Stamina: {game.player2?.score?.stamina ?? 0}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RedirectForm = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameId && email) {
      navigate(`/player?gameId=${encodeURIComponent(gameId)}&email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Enter Game Info</h2>
      <input
        type="text"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        style={{ 
          display: 'block', 
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ 
          display: 'block', 
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />
      <button 
        type="submit"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Enter Player Portal
      </button>
    </form>
  );
};

export default PlayerPortal;