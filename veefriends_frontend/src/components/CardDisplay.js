import React, { useState } from 'react';
import { getOptimizedCardImageUrl, getCardFallbackImage } from '../utils/imageUtils';

const CardDisplay = ({ card, size = 'medium', showStats = true, layout = 'horizontal', style = {} }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  if (!card) return null;
  
  const sizeStyles = {
    small: { maxWidth: '100px', height: 'auto' },
    medium: { maxWidth: '200px', height: 'auto' },
    large: { maxWidth: '300px', height: 'auto' },
    xlarge: { maxWidth: '350px', height: 'auto' }
  };

  // Size configurations for Cloudinary optimization
  const sizeConfig = {
    small: { width: 100, height: 140 },
    medium: { width: 200, height: 280 },
    large: { width: 300, height: 420 },
    xlarge: { width: 350, height: 490 }
  };
  
  const { width, height } = sizeConfig[size] || sizeConfig.medium;
  
  // Get optimized image URL or fallback
  const imageUrl = imageError 
    ? getCardFallbackImage(card)
    : getOptimizedCardImageUrl(card, { 
        width, 
        height, 
        quality: 'auto',
        format: 'auto'
      });

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  
  // Clean up the quote by removing extra quotes, then add back single quotes
  const cleanQuote = (quote) => {
    if (!quote) return '';
    // Remove quotes from beginning and end, then any escaped quotes
    const cleaned = quote.replace(/^["']|["']$/g, '').replace(/\\"/g, '"').replace(/\\'/g, "'");
    // Add back single quotes around the cleaned quote
    return `"${cleaned}"`;
  };

  // Container style based on layout
  const containerStyle = layout === 'vertical' 
    ? { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ...style }
    : { display: 'flex', gap: '1rem', alignItems: 'flex-start', ...style };

  // Stats style for vertical layout
  const statsStyle = layout === 'vertical' 
    ? { marginTop: '1rem', width: sizeStyles[size].maxWidth }
    : {};
  
  return (
    <div style={containerStyle}>
      {/* Card Image */}
      {imageUrl && (
        <div style={{ position: 'relative', ...sizeStyles[size] }}>
          {imageLoading && (
            <div style={{
              ...sizeStyles[size],
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              border: '1px solid #ddd',
              minHeight: '140px'
            }}>
              <span style={{ fontSize: '0.8em', color: '#666' }}>Loading...</span>
            </div>
          )}
          
          <img
            src={imageUrl}
            alt={`${card.character} card`}
            style={{
              ...sizeStyles[size],
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: imageLoading ? 'none' : 'block'
            }}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>
      )}
      
      {/* Card Stats */}
      {showStats && (
        <div style={statsStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>{card.character}</h4>
          <p><strong>Rarity:</strong> {card.rarity}</p>
          <p><strong>Aura:</strong> {card.Aura || card.aura}</p>
          <p><strong>Skill:</strong> {card.Skill || card.skill}</p>
          <p><strong>Stamina:</strong> {card.Stamina || card.stamina}</p>
          {card.Score && <p><strong>Total Score:</strong> {Math.round(card.Score)}</p>}
          {(card.quote || card.Quote) && (
            <p style={{ fontStyle: 'italic', fontSize: '0.9em', marginTop: '0.5rem' }}>
              {cleanQuote(card.quote || card.Quote)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardDisplay;