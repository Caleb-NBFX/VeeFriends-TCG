import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerPortal({ gameId, playerEmail }) {
  const [game, setGame] = useState(null);
  const [playerRole, setPlayerRole] = useState('');
  const [drawnCard, setDrawnCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/games/${gameId}`);
        const data = response.data;
        setGame(data);

        const normalizedEmail = playerEmail.toLowerCase();
        const p1Email = data.player1?.email?.toLowerCase();
        const p2Email = data.player2?.email?.toLowerCase();

        if (normalizedEmail === p1Email) {
          setPlayerRole('P1');
          setDrawnCard(data.player1Draw);
        } else if (normalizedEmail === p2Email) {
          setPlayerRole('P2');
          setDrawnCard(data.player2Draw);
        } else {
          setMessage('Email not found in game.');
        }
      } catch (err) {
        console.error('Error fetching game:', err);
        setMessage('Failed to load game.');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId, playerEmail]);

  const handleStartRound = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/games/${gameId}/start-round`);
      setGame(response.data);
      const updatedDraw = playerRole === 'P1' ? response.data.player1Draw : response.data.player2Draw;
      setDrawnCard(updatedDraw);
      setMessage('Round started!');
    } catch (err) {
      console.error('Failed to start round:', err);
      setMessage('Failed to start new round.');
    }
  };

  const handleSubmitTurn = async (action, attribute) => {
    try {
      const payload = {
        player: playerRole,
        action,
        attribute: attribute || selectedAttribute
      };
      const response = await axios.post(`http://localhost:5000/api/games/${gameId}/submit-turn`, payload);
      setGame(response.data);
      setMessage(`Turn submitted. Result: ${response.data.rounds.slice(-1)[0]?.result || 'pending'}`);
    } catch (err) {
      console.error('Failed to submit turn:', err);
      setMessage('Failed to submit turn.');
    }
  };

  if (loading) return <div>Loading game...</div>;

  if (!game) return <div>{message}</div>;

  const isAttacker = game.attacker === playerRole;
  const lastRound = game.rounds[game.rounds.length - 1];
  const awaitingDefender = lastRound?.challengedAttribute && !lastRound?.accepted;

  return (
    <div>
      <h2>Welcome, {playerEmail}</h2>
      <h3>Game is active. You are {isAttacker ? 'Attacking' : 'Defending'}.</h3>

      {drawnCard && (
        <div>
          <h4>Your Card: {drawnCard.character}</h4>
          <p>Aura: {drawnCard.aura}</p>
          <p>Skill: {drawnCard.skill}</p>
          <p>Stamina: {drawnCard.stamina}</p>
        </div>
      )}

      {isAttacker && !awaitingDefender && (
        <div>
          <h4>Choose an attribute to challenge:</h4>
          <button onClick={() => handleSubmitTurn('challenge', 'aura')}>Aura</button>
          <button onClick={() => handleSubmitTurn('challenge', 'skill')}>Skill</button>
          <button onClick={() => handleSubmitTurn('challenge', 'stamina')}>Stamina</button>
          <button onClick={() => handleSubmitTurn('challenge', 'total')}>Force Total</button>
        </div>
      )}

      {!isAttacker && awaitingDefender && (
        <div>
          <h4>{`Opponent challenged: ${lastRound.challengedAttribute}`}</h4>
          <button onClick={() => handleSubmitTurn('accept')}>Accept</button>
          <button onClick={() => handleSubmitTurn('reject')}>Reject</button>
        </div>
      )}

      {(!lastRound?.challengedAttribute || lastRound?.result) && (
        <button onClick={handleStartRound}>Start Round</button>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default PlayerPortal;
