export const VeeFriendsTheme = {
  colors: {
    darkPurple: '#300442',
    primaryPurple: '#3e0754',
    gold: '#e8b343',
    subtleBorder: '#5a4a6b',
    white: '#FFFFFF',
    black: '#000000',
    green: '#10B981',
    darkGreen: '#065F46',
    lightGray: '#D1D5DB',
    red: '#DC3545'
  },
  
  fonts: {
    primary: '"TradeGothicNextLTProBoldCompressed", "Trade Gothic Next", "Trebuchet MS", sans-serif'
  },
  
  spacing: {
    xs: '5px',
    sm: '10px',
    md: '15px',
    lg: '20px',
    xl: '2rem'
  },
  
  borderRadius: {
    sm: '8px',
    md: '10px',
    lg: '15px'
  },
  
  shadows: {
    button: '3px 3px 0px #000',
    buttonPressed: '1px 1px 0px #000',
    buttonHover: '1px 1px 0px #000',
    card: '0 4px 8px rgba(0,0,0,0.2)',
    text: '2px 2px 4px rgba(0,0,0,0.3)',
    logo: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
  },
  
  fontSize: {
    small: '12px',
    medium: '14px',
    large: '16px',
    xl: '18px',
    header: '2.5rem',
    sectionTitle: '1.5rem',
    previewTitle: '1.3rem'
  }
};

// Pre-defined component styles
export const getBaseStyles = (theme = VeeFriendsTheme) => ({
  container: {
    backgroundColor: theme.colors.primaryPurple,
    minHeight: '100vh',
    padding: '0',
    margin: '0',
    fontFamily: theme.fonts.primary,
    color: theme.colors.white
  },
  
  content: {
    padding: theme.spacing.lg,
    maxWidth: '100%'
  },
  
  header: {
    color: theme.colors.gold,
    fontSize: theme.fontSize.header,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    textShadow: theme.shadows.text,
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  
  headerLine1: {
    fontSize: theme.fontSize.header,
    lineHeight: '1.1'
  },
  
  headerLine2: {
    fontSize: theme.fontSize.header,
    lineHeight: '1.1',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  
  logo: {
    height: '60px',
    width: 'auto',
    filter: theme.shadows.logo
  },
  
  section: {
    backgroundColor: theme.colors.darkPurple,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    border: `2px solid ${theme.colors.subtleBorder}`,
    boxShadow: theme.shadows.card
  },
  
  sectionTitle: {
    color: theme.colors.gold,
    fontSize: theme.fontSize.sectionTitle,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase'
  },
  
  button: {
    backgroundColor: theme.colors.gold,
    color: theme.colors.black,
    border: `3px solid ${theme.colors.black}`,
    borderRadius: theme.borderRadius.md,
    padding: '12px 20px',
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: theme.shadows.button,
    transition: 'all 0.1s',
    fontFamily: theme.fonts.primary,
    textTransform: 'uppercase'
  },
  
  buttonHover: {
    transform: 'translate(2px, 2px)',
    boxShadow: theme.shadows.buttonHover
  },
  
  submitButton: {
    backgroundColor: theme.colors.gold,
    color: theme.colors.black,
    border: `3px solid ${theme.colors.black}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.fontSize.xl,
    padding: '15px 30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: theme.shadows.button,
    transition: 'all 0.1s',
    fontFamily: theme.fonts.primary,
    textTransform: 'uppercase'
  },
  
  input: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: `2px solid ${theme.colors.gold}`,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    textTransform: 'none'
  },
  
  select: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: `2px solid ${theme.colors.gold}`,
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    textTransform: 'none'
  },
  
  previewCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    border: `3px solid ${theme.colors.green}`,
    borderRadius: theme.borderRadius.lg,
    background: theme.colors.darkGreen,
    boxShadow: theme.shadows.card
  },
  
  previewTitle: {
    color: theme.colors.green,
    fontWeight: 'bold',
    fontSize: theme.fontSize.previewTitle,
    textTransform: 'uppercase'
  },
  
  cardImage: {
    width: '100%',
    height: 'auto',
    borderRadius: theme.borderRadius.sm,
    border: `2px solid ${theme.colors.gold}`
  },
  
  cardName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: theme.fontSize.small,
    marginTop: theme.spacing.xs,
    wordWrap: 'break-word',
    lineHeight: '1.2',
    color: theme.colors.white,
    textTransform: 'uppercase'
  },
  
  autocomplete: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    border: `2px solid ${theme.colors.gold}`,
    maxHeight: '150px',
    overflowY: 'scroll',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.xs,
    zIndex: 1000
  },
  
  autocompleteItem: {
    padding: theme.spacing.sm,
    cursor: 'pointer',
    borderBottom: '1px solid #E5E7EB',
    fontWeight: 'bold',
    color: theme.colors.black,
    textTransform: 'none'
  },
  
  requiredText: {
    color: theme.colors.lightGray,
    fontWeight: 'bold',
    textTransform: 'none'
  },
  
  savedDeckItem: {
    backgroundColor: theme.colors.primaryPurple,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: `2px solid ${theme.colors.subtleBorder}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  savedDeckText: {
    fontWeight: 'bold',
    color: theme.colors.white,
    textTransform: 'none'
  },
  
  hr: {
    margin: `${theme.spacing.xl} 0`,
    border: `1px solid ${theme.colors.subtleBorder}`
  },
  
  trashIcon: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: 'rgba(220, 53, 69, 0.9)',
    color: theme.colors.white,
    border: 'none',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSize.small,
    opacity: 0,
    transition: 'opacity 0.2s'
  }
});

// Custom hook for easy access
export const useVeeFriendsTheme = () => {
  const theme = VeeFriendsTheme;
  const baseStyles = getBaseStyles(theme);
  
  return { theme, baseStyles };
};

// Utility functions for common style patterns
export const createGridStyles = (minWidth = '120px', gap = '1rem') => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
  gap: gap,
  marginTop: '1rem'
});

export const createHoverTransform = (scale = 1.05) => ({
  cursor: 'pointer',
  transition: 'transform 0.2s',
  transform: `scale(${scale})`
});

export const createFlexContainer = (direction = 'row', gap = '10px', wrap = 'wrap') => ({
  display: 'flex',
  flexDirection: direction,
  alignItems: 'flex-start',
  gap: gap,
  flexWrap: wrap
});