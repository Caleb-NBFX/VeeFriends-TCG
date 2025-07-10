import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import API_BASE from '../config';
import { sendRoundDataToCaptivate, sendPlayerAndWinnerDataToCaptivate, getColorForRarity } from '../utils/sendRoundDataToCaptivate';

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

  const lastRoundIdRef = useRef(null);

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

    try {
      const res = await axios.post(`${API_BASE}/api/games`, {
        player1: { email: player1Email, deck: selectedDeck1.cards },
        player2: { email: player2Email, deck: selectedDeck2.cards }
      });
      setGameId(res.data._id);
      alert(`Game started! Game ID: ${res.data._id}`);

      // Send current round data to Captivate
      const game = res.data;
      const currentRound = game.currentRound;
      const rounds = game.rounds || [];
      const roundObj = rounds[currentRound - 1];
      if (roundObj) {
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
      alert(`Game loaded! Game ID: ${loadGameId}`);
      const game = res.data;
      if (game.player1 && game.player2) {
        // Send current round data to Captivate
        const currentRound = game.currentRound;
        const rounds = game.rounds || [];
        const roundObj = rounds[currentRound - 1];
        if (roundObj) {
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
    <div>
      <h2>Game Setup</h2>

      <div>
        <h3>Player 1</h3>
        <input
          type="email"
          placeholder="Enter Player 1 Email"
          value={player1Email}
          onChange={(e) => setPlayer1Email(e.target.value)}
        />
        <button onClick={() => fetchDecks(player1Email, setPlayer1Decks)}>Load Decks</button>
        <select onChange={(e) => setSelectedDeck1(player1Decks[e.target.value])}>
          <option value="">Select Deck</option>
          {player1Decks.map((deck, index) => (
            <option key={deck._id} value={index}>
              {deck.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Player 2</h3>
        <input
          type="email"
          placeholder="Enter Player 2 Email"
          value={player2Email}
          onChange={(e) => setPlayer2Email(e.target.value)}
        />
        <button onClick={() => fetchDecks(player2Email, setPlayer2Decks)}>Load Decks</button>
        <select onChange={(e) => setSelectedDeck2(player2Decks[e.target.value])}>
          <option value="">Select Deck</option>
          {player2Decks.map((deck, index) => (
            <option key={deck._id} value={index}>
              {deck.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleStartGame}>Start Game</button>

      {gameId && (
        <div>
          <p><strong>Game ID:</strong> {gameId}</p>
          <button onClick={handleStartRound}>Start Round</button>
        </div>
      )}

      <div>
        <h3>Load Existing Game</h3>
        <input
          type="text"
          placeholder="Enter Game ID"
          value={loadGameId}
          onChange={(e) => setLoadGameId(e.target.value)}
        />
        <button onClick={handleLoadGame}>Load Game</button>
      </div>

      {lastCaptivateData && (
        <div style={{ marginTop: 20, padding: 10, background: '#f0f0f0' }}>
          <strong>Last Data Sent to Captivate:</strong>
          <pre style={{ fontSize: 12, maxHeight: 200, overflow: 'auto' }}>
            {JSON.stringify(lastCaptivateData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ProducerDashboard;