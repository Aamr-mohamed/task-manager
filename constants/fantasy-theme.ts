export const FantasyColors = {
  // Primary magical theme colors
  primary: {
    mysticPurple: '#6A4C93',
    deepViolet: '#4A148C',
    royalBlue: '#1A237E',
    enchantedGold: '#FFD700',
  },
  
  // Background gradients
  background: {
    light: '#F5F3FF',
    dark: '#1A0B2E',
    gradient: ['#6A4C93', '#4A148C', '#1A237E'],
    cardLight: '#FFFFFF',
    cardDark: '#2D1B4E',
  },
  
  // Priority colors
  priority: {
    low: '#4CAF50',      // Peaceful Green
    medium: '#FF9800',   // Amber Warning  
    high: '#F44336',     // Urgent Red
    critical: '#9C27B0', // Royal Purple
  },
  
  // Category colors
  category: {
    quest: '#FF6B35',     
    spell: '#7B68EE',     
    adventure: '#32CD32', 
    treasure: '#FFD700',  
    other: '#9E9E9E',     
  },
  
  // Status colors
  status: {
    completed: '#4CAF50',
    pending: '#FF9800',
    overdue: '#F44336',
  },
  
  // UI elements
  text: {
    primary: '#1A0B2E',
    secondary: '#4A4458',
    light: '#FFFFFF',
    muted: '#6B7280',
  },
  
  // Interactive elements
  interactive: {
    hover: '#E8E4FF',
    pressed: '#D4CDFF',
    disabled: '#E0E0E0',
  },
  
  // Shadows and borders
  shadow: {
    light: 'rgba(106, 76, 147, 0.1)',
    medium: 'rgba(106, 76, 147, 0.2)',
    heavy: 'rgba(106, 76, 147, 0.3)',
  },
  
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  }
};

export const FantasySpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FantasyBorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FantasyFontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  title: 28,
  hero: 36,
};

export const FantasyShadows = {
  small: {
    shadowColor: FantasyColors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: FantasyColors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: FantasyColors.shadow.heavy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const FantasyAnimations = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  timing: 'ease-in-out',
};
