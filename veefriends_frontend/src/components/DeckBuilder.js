import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config';

function DeckBuilder() {
  const [email, setEmail] = useState('');
  const [deckName, setDeckName] = useState('');
  const [character, setCharacter] = useState('');
  const [rarity, setRarity] = useState('Core');
  const [deck, setDeck] = useState([]);
  const [savedDecks, setSavedDecks] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const rarityPoints = {
    "Core": 0,
    "Rare": 2,
    "Very Rare": 3,
    "Epic": 4,
    "Spectacular": 5
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/cards`);
        const names = res.data.map(c => c.character.toUpperCase());
        setAllCharacters(names);
      } catch (err) {
        console.error('Failed to fetch character list');
      }
    };
    fetchCharacters();
  }, []);

  const totalRarityPoints = deck.reduce((sum, card) => sum + rarityPoints[card.rarity], 0);

  const addCard = () => {
    if (deck.length >= 20) return alert('Deck is full');
    if (deck.some(c => c.character === character)) return alert('Character already in deck');
    if (totalRarityPoints + rarityPoints[rarity] > 15) return alert('Not enough rarity points');
    if (!allCharacters.includes(character)) return alert('Invalid character name');

    setDeck([...deck, { character, rarity }]);
    setCharacter('');
    setFilteredCharacters([]);
  };

  const removeCard = (index) => {
    const updatedDeck = [...deck];
    updatedDeck.splice(index, 1);
    setDeck(updatedDeck);
  };

  const submitDeck = async () => {
    if (!email || !deckName || deck.length !== 20) {
      alert('Please fill email, deck name, and build a full deck.');
      return;
    }

    const payload = {
      name: deckName,
      email: email,
      cards: deck
    };

    try {
      await axios.post(`${API_BASE}/api/decks`, payload);
      alert('Deck submitted!');
    } catch (err) {
      console.error("Error saving deck:", err);
      alert('Failed to submit deck');
    }
  };

  const loadDecks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/decks?email=${email}`);
      setSavedDecks(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load saved decks');
    }
  };

  const loadSelectedDeck = (cards) => {
    setDeck(cards);
  };

  const handleCharacterInput = (e) => {
    const input = e.target.value.toUpperCase();
    setCharacter(input);
    const matches = allCharacters.filter(name => name.includes(input));
    setFilteredCharacters(matches.slice(0, 10));
  };

  const handleCharacterSelect = (name) => {
    setCharacter(name);
    setFilteredCharacters([]);
  };

  return (
    <div>
      <h2>Build Your Deck</h2>
      <input
        type="text"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Deck name"
        value={deckName}
        onChange={e => setDeckName(e.target.value)}
      />
      <div>
        <input
          type="text"
          placeholder="Character name"
          value={character}
          onChange={handleCharacterInput}
          autoComplete="off"
        />
        {filteredCharacters.length > 0 && (
          <ul style={{ border: '1px solid #ccc', maxHeight: '100px', overflowY: 'scroll', paddingLeft: 10 }}>
            {filteredCharacters.map((name, idx) => (
              <li key={idx} onClick={() => handleCharacterSelect(name)} style={{ cursor: 'pointer' }}>
                {name}
              </li>
            ))}
          </ul>
        )}
        <select value={rarity} onChange={e => setRarity(e.target.value)}>
          <option>Core</option>
          <option>Rare</option>
          <option>Very Rare</option>
          <option>Epic</option>
          <option>Spectacular</option>
        </select>
        <button onClick={addCard}>Add Card</button>
      </div>
      <p>Deck Size: {deck.length} / 20</p>
      <p>Rarity Points: {totalRarityPoints} / 15</p>
      <ul>
        {deck.map((card, idx) => (
          <li key={idx}>
            {card.character} ({card.rarity})
            <button onClick={() => removeCard(idx)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={submitDeck}>Submit Deck</button>
      <hr />
      <button onClick={loadDecks}>Load Saved Decks</button>
      <ul>
        {savedDecks.map((d, i) => (
          <li key={i}>
            {d.name} ({new Date(d.createdAt).toLocaleString()})
            <button onClick={() => loadSelectedDeck(d.cards)}>Load</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeckBuilder;
