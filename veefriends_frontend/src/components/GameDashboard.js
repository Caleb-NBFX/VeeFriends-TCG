import React, { useState } from 'react';
import axios from 'axios';
import API_BASE from '../config';

function GameDashboard() {
  const [player1Email, setPlayer1Email] = useState('');
  const [player2Email, setPlayer2Email] = useState('');
  const [player1Decks, setPlayer1Decks] = useState([]);
  const [player2Decks, setPlayer2Decks] = useState([]);
  const [selectedP1Deck, setSelectedP1Deck] = useState('');
  const [selectedP2Deck, setSelectedP2Deck] = useState('');
  const [gameId, setGameId] = useState(null);

  const fetchDecks = async (email, setDecks) => {
    try {
      const res = await axios.get(`${API_BASE}/api/decks?email=${email}`);
      setDecks(res.data);
    } catch (err) {
      console.error("Failed to fetch decks for", email);
    }
  };

  const handleCreateGame = async () => {
    try {
      const p1Deck = player1Decks.find(d => d.name === selectedP1Deck);
      const p2Deck = player2Decks.find(d => d.name === selectedP2Deck);

      if (!p1Deck || !p2Deck) return alert('Please select decks for both players');

      const payload = {
        player1: { email: player1Email, deck: p1Deck.cards },
        player2: { email: player2Email, deck: p2Deck.cards }
      };

      const res = await axios.post(`${API_BASE}/api/games`, payload);
      setGameId(res.data.gameId);
    } catch (err) {
      console.error("Failed to create game:", err);
      alert("Game creation failed");
    }
  };

  return <div>...interface unchanged...</div>;
}

export default GameDashboard;
