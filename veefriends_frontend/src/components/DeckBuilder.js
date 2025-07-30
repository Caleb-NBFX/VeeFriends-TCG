import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config';
import CardDisplay from './CardDisplay';
import { getOptimizedCardImageUrl, getCardFallbackImage, getVeeFriendsLogoHeader } from '../utils/imageUtils';
import { useVeeFriendsTheme, createGridStyles, createHoverTransform, createFlexContainer } from '../theme/VeeFriendsTheme';

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
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  // Use the centralized theme
  const { theme, baseStyles } = useVeeFriendsTheme();

  // Component-specific styles that extend the base styles
  const styles = {
    ...baseStyles,
    deckGrid: createGridStyles('120px', '1rem'),
    cardContainer: {
      position: 'relative',
      ...createHoverTransform(1),
      borderRadius: theme.borderRadius.sm,
      overflow: 'hidden'
    },
    cardContainerHovered: {
      ...createHoverTransform(1.05)
    },
    addCardContainer: createFlexContainer('row', '10px', 'wrap'),
    searchContainer: {
      position: 'relative',
      minWidth: '200px'
    }
  };

  const rarityPoints = {
    "Core": 0,
    "Rare": 2,
    "Very Rare": 3,  
    "Epic": 4,
    "Hologram": 5,
    "Lava": 5,
    "Gold": 5,
    "Emerald": 5,
    "Diamond": 5,
    "Bubblegum": 5
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

    try {
      console.log('Fetching cards from API...');
      const res = await axios.get(`${API_BASE}/api/cards`);
      console.log('API Response:', res.data);
      
      const cardData = res.data.find(c => c.character.toUpperCase() === character);
      console.log('Found card data:', cardData);
      console.log('Looking for character:', character);
      
      // Add this debug line right before you create the card object:
      console.log('Adding card with character:', character, 'rarity:', rarity);
      
      const card = { character, rarity };
      console.log('Card object created:', card);
      console.log('Generated URL:', getOptimizedCardImageUrl(card, { width: 200, height: 280 }));
      
      const newCard = { character, rarity, ...cardData };
      console.log('New card object:', newCard);
      
      setDeck([...deck, newCard]);
      setPreviewCard(newCard);
      setCharacter('');
      setFilteredCharacters([]);
      
      setTimeout(() => setPreviewCard(null), 5000);
    } catch (err) {
      console.error('Failed to fetch card data:', err);
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
    if (!firstName.trim() || !handle.trim() || !email.trim() || !deckName.trim() || deck.length !== 20) {
      alert('Please fill all required fields (First Name, Handle, Email, Deck Name) and build a full deck.');
      return;
    }

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
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.headerLine1}>
            Build Your Official Unofficial
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
            TCG Deck
          </div>
        </div>
        
        {/* User Information Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>👤 User Information</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="First Name *"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ ...styles.input, width: '200px' }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ ...styles.input, width: '200px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Handle (Display Name) *"
              value={handle}
              onChange={e => setHandle(e.target.value)}
              style={{ ...styles.input, width: '200px' }}
            />
            <select 
              value={platform} 
              onChange={e => setPlatform(e.target.value)}
              style={{ ...styles.select, width: '120px' }}
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
            style={{ ...styles.input, width: '300px' }}
          />
          <br />
          <input
            type="text"
            placeholder="Deck Name *"
            value={deckName}
            onChange={e => setDeckName(e.target.value)}
            style={{ ...styles.input, width: '300px' }}
          />
          <br />
          <small style={styles.requiredText}>* Required fields</small>
        </div>

        {/* Preview Card */}
        {previewCard && (
          <div style={styles.previewCard}>
            <h3 style={styles.previewTitle}>
              ✅ Card Added to Deck!
            </h3>
            <CardDisplay card={previewCard} size="medium" />
          </div>
        )}

        {/* Deck Building Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🃏 Add Cards to Deck</h3>
          <div style={styles.addCardContainer}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Character name"
                value={character}
                onChange={handleCharacterInput}
                autoComplete="off"
                style={{ ...styles.input, width: '200px', marginRight: 0, marginBottom: 0 }}
              />
              {filteredCharacters.length > 0 && (
                <div style={styles.autocomplete}>
                  {filteredCharacters.map((name, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleCharacterSelect(name)} 
                      style={{
                        ...styles.autocompleteItem,
                        backgroundColor: idx % 2 === 0 ? '#F9FAFB' : '#FFFFFF'
                      }}
                      onMouseEnter={e => e.target.style.backgroundColor = theme.colors.gold}
                      onMouseLeave={e => e.target.style.backgroundColor = idx % 2 === 0 ? '#F9FAFB' : '#FFFFFF'}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <select 
              value={rarity} 
              onChange={e => setRarity(e.target.value)}
              style={styles.select}
            >
              <option>Core</option>
              <option>Rare</option>
              <option>Very Rare</option>
              <option>Epic</option>
              <option>Bubblegum</option>
              <option>Diamond</option>
              <option>Emerald</option>
              <option>Gold</option>
              <option>Hologram</option>
              <option>Lava</option>
            </select>
            <button 
              onClick={addCard}
              style={styles.button}
              onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = theme.shadows.button;
              }}
            >
              Add Card
            </button>
          </div>
        </div>
        
        {/* Deck Display */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            🎯 Current Deck ({deck.length}/20) | Rarity Points: {totalRarityPoints}/15
          </h3>
          
          <div style={styles.deckGrid}>
            {deck.map((card, idx) => {
              const imageUrl = getOptimizedCardImageUrl(card, { width: 200, height: 280 });
              const fallbackUrl = getCardFallbackImage(card);
              
              return (
                <div 
                  key={idx} 
                  style={{
                    ...styles.cardContainer,
                    ...(hoveredCardIndex === idx ? styles.cardContainerHovered : {})
                  }}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={card.character}
                      style={styles.cardImage}
                      onError={(e) => e.target.src = fallbackUrl}
                    />
                  ) : (
                    <div style={{
                      ...styles.cardImage,
                      height: '150px',
                      backgroundColor: '#E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#000'
                    }}>
                      No Image
                    </div>
                  )}
                  
                  <div style={styles.cardName}>
                    {card.character}
                  </div>
                  
                  <button 
                    onClick={() => removeCard(idx)}
                    style={{
                      ...styles.trashIcon,
                      opacity: hoveredCardIndex === idx ? 1 : 0
                    }}
                    title="Remove card"
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={submitDeck}
            style={styles.submitButton}
            onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={e => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = theme.shadows.button;
            }}
          >
            🚀 Submit Deck
          </button>
        </div>
        
        <hr style={styles.hr} />
        
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>💾 Load Saved Decks</h3>
          <button 
            onClick={loadDecks}
            style={styles.button}
            onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={e => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = theme.shadows.button;
            }}
          >
            Load Saved Decks
          </button>
          {savedDecks.length > 0 && (
            <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
              {savedDecks.map((d, i) => (
                <li key={i} style={styles.savedDeckItem}>
                  <span style={styles.savedDeckText}>
                    {d.name} ({new Date(d.createdAt).toLocaleString()})
                  </span>
                  <button 
                    onClick={() => loadSelectedDeck(d.cards)}
                    style={{ ...styles.button, padding: '5px 10px', fontSize: '14px' }}
                    onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                    onMouseLeave={e => {
                      e.target.style.transform = 'none';
                      e.target.style.boxShadow = theme.shadows.button;
                    }}
                  >
                    Load
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeckBuilder;
