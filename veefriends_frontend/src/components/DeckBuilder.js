import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config';
import CardDisplay from './CardDisplay';

function DeckBuilder() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [handle, setHandle] = useState('');
  const [platform, setPlatform] = useState('Whatnot');
  const [email, setEmail] = useState('');
  const [deckName, setDeckName] = useState('');
  const [character, setCharacter] = useState('');
  const [rarity, setRarity] = useState('Core');
  const [deck, setDeck] = useState([]);
  const [savedDecks, setSavedDecks] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [previewCard, setPreviewCard] = useState(null);

  const rarityPoints = {
    "Core": 0,
    "Rare": 2,
    "Very Rare": 3,
    "Epic": 4,
    "Spectacular": 5
  };

  const platforms = [
    'Whatnot',
    'X',
    'LinkedIn',
    'YouTube',
    'Instagram',
    'TikTok',
    'Other'
  ];

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

  const addCard = async () => {
    if (deck.length >= 20) return alert('Deck is full');
    if (deck.some(c => c.character === character)) return alert('Character already in deck');
    if (totalRarityPoints + rarityPoints[rarity] > 15) return alert('Not enough rarity points');
    if (!allCharacters.includes(character)) return alert('Invalid character name');

    // Fetch card details for preview
    try {
      const res = await axios.get(`${API_BASE}/api/cards`);
      const cardData = res.data.find(c => c.character.toUpperCase() === character);
      const newCard = { character, rarity, ...cardData };
      
      setDeck([...deck, newCard]);
      setPreviewCard(newCard); // Show the added card
      setCharacter('');
      setFilteredCharacters([]);
      
      // Clear preview after 3 seconds
      setTimeout(() => setPreviewCard(null), 3000);
    } catch (err) {
      // Fallback if API fails
      setDeck([...deck, { character, rarity }]);
      setCharacter('');
      setFilteredCharacters([]);
    }
  };

  const removeCard = (index) => {
    const updatedDeck = [...deck];
    updatedDeck.splice(index, 1);
    setDeck(updatedDeck);
  };

  const submitDeck = async () => {
    // Validate required fields
    if (!firstName.trim() || !handle.trim() || !email.trim() || !deckName.trim() || deck.length !== 20) {
      alert('Please fill all required fields (First Name, Handle, Email, Deck Name) and build a full deck.');
      return;
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      handle: handle.trim(),
      platform,
      email: normalizedEmail,
      name: deckName.trim(),
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
    if (!email.trim()) {
      alert('Please enter your email to load saved decks.');
      return;
    }

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const res = await axios.get(`${API_BASE}/api/decks?email=${normalizedEmail}`);
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
      
      {/* User Information Section */}
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>User Information</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="First Name *"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ marginRight: '10px', width: '200px' }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            style={{ width: '200px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Handle (Display Name) *"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            style={{ marginRight: '10px', width: '200px' }}
          />
          <select 
            value={platform} 
            onChange={e => setPlatform(e.target.value)}
            style={{ padding: '5px', width: '120px' }}
          >
            {platforms.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <br />
        <input
          type="text"
          placeholder="Deck Name *"
          value={deckName}
          onChange={e => setDeckName(e.target.value)}
          style={{ width: '300px' }}
        />
        <br />
        <small style={{ color: '#666' }}>* Required fields</small>
      </div>

      {/* Preview Card - Show recently added card */}
      {previewCard && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          border: '2px solid #28a745', 
          borderRadius: '8px', 
          background: '#f8fff8' 
        }}>
          <h3>✅ Card Added to Deck!</h3>
          <CardDisplay card={previewCard} size="medium" />
        </div>
      )}

      {/* Deck Building Section */}
      <div>
        <h3>Add Cards to Deck</h3>
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
      
      {/* Enhanced Deck Display */}
      <div style={{ marginTop: '20px' }}>
        <h3>Current Deck ({deck.length}/20)</h3>
        <p>Rarity Points: {totalRarityPoints} / 15</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {deck.map((card, idx) => (
            <div key={idx} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '1rem',
              background: '#f9f9f9'
            }}>
              <CardDisplay 
                card={card} 
                size="small" 
                showStats={false}
                style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              />
              <div style={{ marginTop: '0.5rem' }}>
                <strong>{card.character}</strong>
                <br />
                <span style={{ fontSize: '0.9em', color: '#666' }}>({card.rarity})</span>
                <br />
                <button 
                  onClick={() => removeCard(idx)}
                  style={{ 
                    marginTop: '0.5rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
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
