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
    },
    // Responsive input styles for mobile
    responsiveInput: {
      ...baseStyles.input,
      width: '100%',
      maxWidth: '300px',
      boxSizing: 'border-box'
    },
    // Responsive deck title for mobile
    deckTitle: {
      ...baseStyles.sectionTitle,
      '@media (max-width: 768px)': {
        fontSize: '1rem',
        lineHeight: '1.4',
        textAlign: 'center'
      }
    },
    // Responsive preview card for mobile
    previewCardMobile: {
      ...baseStyles.previewCard,
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }
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

  // Fixed: Calculate total rarity points with proper fallback
  const totalRarityPoints = deck.reduce((sum, card) => {
    const points = rarityPoints[card.rarity] || 0;
    return sum + points;
  }, 0);

  const addCard = async () => {
    if (deck.length >= 20) return alert('Deck is full');
    if (deck.some(c => c.character === character)) return alert('Character already in deck');
    if (totalRarityPoints + (rarityPoints[rarity] || 0) > 15) return alert('Not enough rarity points');
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

  const submitDeck = async (forceOverwrite = false) => {
    if (!firstName.trim() || !handle.trim() || !email.trim() || !deckName.trim() || !deck.length) {
      alert('Please fill all required fields (First Name, Handle, Email, Deck Name) and add at least one card.');
      return;
    }

    // Allow submission of incomplete decks, but warn the user
    if (deck.length < 20 && !forceOverwrite) {
      const confirmed = window.confirm(
        `Your deck only has ${deck.length} cards. Incomplete decks cannot be used to start games. ` +
        'Do you want to save this deck anyway?'
      );
      if (!confirmed) return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      handle: handle.trim(),
      platform,
      email: normalizedEmail,
      name: deckName.trim(),
      cards: deck,
      overwrite: forceOverwrite
    };

    try {
      const response = await axios.post(`${API_BASE}/api/decks`, payload);
      
      const action = response.data.action || 'saved';
      const actionText = action === 'updated' ? 'updated' : 'saved';
      
      if (deck.length < 20) {
        alert(`Incomplete deck ${actionText}! (${deck.length}/20 cards)\nNote: You'll need 20 cards to start a game.`);
      } else {
        alert(`Complete deck ${actionText} successfully!`);
      }
      
      // Refresh the saved decks list if email is populated
      if (email.trim()) {
        await loadDecks();
      }
    } catch (err) {
      console.error("Error saving deck:", err);
      
      if (err.response && err.response.status === 409 && err.response.data.error === 'DECK_EXISTS') {
        // Handle duplicate deck name
        const existingDeck = err.response.data.existingDeck;
        const confirmed = window.confirm(
          `A deck named "${deckName.trim()}" already exists!\n\n` +
          `Existing deck: ${existingDeck.cardCount}/20 cards (${existingDeck.isComplete ? 'Complete' : 'Incomplete'})\n` +
          `Created: ${new Date(existingDeck.createdAt).toLocaleDateString()}\n\n` +
          `Current deck: ${deck.length}/20 cards (${deck.length === 20 ? 'Complete' : 'Incomplete'})\n\n` +
          'Do you want to overwrite the existing deck?'
        );
        
        if (confirmed) {
          // Retry with overwrite flag
          await submitDeck(true);
        }
      } else {
        alert('Failed to submit deck');
      }
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

  // Fixed: Auto-populate fields when loading a deck
  const loadSelectedDeck = (deckData) => {
    // Load the cards
    setDeck(deckData.cards || []);
    
    // Auto-populate user fields from the selected deck
    if (deckData.firstName) setFirstName(deckData.firstName);
    if (deckData.lastName) setLastName(deckData.lastName);
    if (deckData.handle) setHandle(deckData.handle);
    if (deckData.platform) setPlatform(deckData.platform);
    if (deckData.email) setEmail(deckData.email);
    if (deckData.name) setDeckName(deckData.name);
    
    console.log('Loaded deck data:', deckData);
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

  const fillOutDeck = async () => {
    if (deck.length >= 20) {
      alert('Deck is already full!');
      return;
    }

    try {
      // Fetch all available cards
      const res = await axios.get(`${API_BASE}/api/cards`);
      const availableCards = res.data;
      
      // Get characters already in deck
      const usedCharacters = deck.map(card => card.character.toUpperCase());
      
      // Filter out already used characters
      const unusedCards = availableCards.filter(card => 
        !usedCharacters.includes(card.character.toUpperCase())
      );
      
      if (unusedCards.length === 0) {
        alert('No more unique characters available!');
        return;
      }

      // Current state
      const currentDeck = [...deck];
      let currentRarityPoints = totalRarityPoints;
      const remainingSlots = 20 - currentDeck.length;
      
      // Rarities we can use (excluding spectacular classes)
      const allowedRarities = ['Core', 'Rare', 'Very Rare', 'Epic'];
      const maxRarityPoints = 15;
      
      // Shuffle available cards for randomness
      const shuffledCards = [...unusedCards].sort(() => Math.random() - 0.5);
      
      // Fill remaining slots
      for (let i = 0; i < remainingSlots && shuffledCards.length > 0; i++) {
        const remainingSlotsAfterThis = remainingSlots - i - 1;
        const remainingPointBudget = maxRarityPoints - currentRarityPoints;
        
        // Determine what rarities are feasible for this slot
        const feasibleRarities = allowedRarities.filter(rarity => {
          const points = rarityPoints[rarity] || 0;
          // Can we afford this rarity and still have budget for remaining slots?
          return points <= remainingPointBudget;
        });
        
        if (feasibleRarities.length === 0) {
          // If no rarities fit budget, force Core (0 points)
          feasibleRarities.push('Core');
        }
        
        // Weighted selection favoring higher rarities when budget allows
        let selectedRarity;
        if (remainingPointBudget >= 4 && feasibleRarities.includes('Epic')) {
          // Prefer Epic if we have budget
          const weights = { 'Core': 1, 'Rare': 2, 'Very Rare': 3, 'Epic': 4 };
          const weightedRarities = feasibleRarities.flatMap(rarity => 
            Array(weights[rarity] || 1).fill(rarity)
          );
          selectedRarity = weightedRarities[Math.floor(Math.random() * weightedRarities.length)];
        } else {
          // Random selection from feasible options
          selectedRarity = feasibleRarities[Math.floor(Math.random() * feasibleRarities.length)];
        }
        
        // Select a random card and assign the selected rarity
        const cardIndex = Math.floor(Math.random() * shuffledCards.length);
        const selectedCard = shuffledCards.splice(cardIndex, 1)[0];
        
        const newCard = {
          character: selectedCard.character,
          rarity: selectedRarity,
          ...selectedCard
        };
        
        currentDeck.push(newCard);
        currentRarityPoints += rarityPoints[selectedRarity] || 0;
      }
      
      setDeck(currentDeck);
      
      const finalRarityPoints = currentDeck.reduce((sum, card) => {
        return sum + (rarityPoints[card.rarity] || 0);
      }, 0);
      
      alert(
        `Deck automatically filled!\n` +
        `Total cards: ${currentDeck.length}/20\n` +
        `Rarity points: ${finalRarityPoints}/15\n` +
        `Added ${remainingSlots} random cards.`
      );
      
    } catch (err) {
      console.error('Failed to fill out deck:', err);
      alert('Failed to fill out deck. Please try again.');
    }
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
          <input
            type="text"
            placeholder="First Name *"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={styles.responsiveInput}
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            style={styles.responsiveInput}
          />
          <br />
          <input
            type="text"
            placeholder="Whatnot Username (Display Name) *"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            style={styles.responsiveInput}
          />
          <br />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.responsiveInput}
          />
          <br />
          <input
            type="text"
            placeholder="Deck Name *"
            value={deckName}
            onChange={e => setDeckName(e.target.value)}
            style={styles.responsiveInput}
          />
          <br />
          <small style={styles.requiredText}>* Required fields</small>
        </div>

        {/* Preview Card */}
        {previewCard && (
          <div style={styles.previewCardMobile}>
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
                style={{ 
                  ...styles.input, 
                  width: '100%',
                  maxWidth: '200px',
                  marginRight: 0, 
                  marginBottom: 0,
                  boxSizing: 'border-box'
                }}
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
              style={{
                ...styles.select,
                boxSizing: 'border-box'
              }}
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
        
        {/* Deck Display - Fixed: Removed redundant incomplete text */}
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
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => submitDeck(false)}
              style={{
                ...styles.submitButton,
                backgroundColor: deck.length < 20 ? theme.colors.orange : styles.submitButton.backgroundColor
              }}
              onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={e => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = theme.shadows.button;
                e.target.style.backgroundColor = deck.length < 20 ? theme.colors.orange : styles.submitButton.backgroundColor;
              }}
            >
              {deck.length < 20 ? '💾 Save Incomplete Deck' : '🚀 Submit Complete Deck'}
            </button>
            
            {deck.length < 20 && (
              <button 
                onClick={fillOutDeck}
                style={{
                  ...styles.button,
                  backgroundColor: theme.colors.green,
                  color: 'white'
                }}
                onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
                onMouseLeave={e => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = theme.shadows.button;
                  e.target.style.backgroundColor = theme.colors.green;
                }}
              >
                🎲 Fill Out Deck
              </button>
            )}
          </div>
          
          {deck.length < 20 && (
            <p style={{ color: theme.colors.orange, fontSize: '0.9rem', marginTop: '0.5rem' }}>
              ⚠️ Incomplete decks can be saved but cannot be used to start games
            </p>
          )}
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
                    {d.name} ({d.cards.length}/20 cards) 
                    {/* Fixed: Check isComplete properly and show correct status */}
                    {d.cards.length === 20 ? (
                      <span style={{ color: theme.colors.green }}> - Complete</span>
                    ) : (
                      <span style={{ color: theme.colors.orange }}> - Incomplete</span>
                    )}
                    <br />
                    <small style={{ color: theme.colors.lightGray }}>
                      {new Date(d.createdAt).toLocaleString()}
                    </small>
                  </span>
                  <button 
                    onClick={() => loadSelectedDeck(d)}
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
