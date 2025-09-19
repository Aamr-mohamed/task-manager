/**
 * Google Tasks Dark Mode inspired theme
 * Dark, minimal, and clean design
 */

export const AppColors = {
  // Primary theme colors (Google Tasks blue)
  primary: {
    main: '#1A73E8',      // Google Blue
    dark: '#1557B0',      // Darker Google Blue  
    light: '#4285F4',     // Lighter Google Blue
    accent: '#1A73E8',    // Same as main
  },
  
  // Background colors (Dark theme)
  background: {
    primary: '#1F1F1F',   // Dark gray (main background)
    secondary: '#2D2D2D', // Slightly lighter gray (cards)
    tertiary: '#3C3C3C',  // Even lighter gray (elevated elements)
    overlay: 'rgba(0, 0, 0, 0.8)', // Modal overlay
  },
  
  // Priority colors (muted in dark mode)
  priority: {
    low: '#34A853',       // Google Green (muted)
    medium: '#FBBC04',    // Google Yellow (muted)
    high: '#EA4335',      // Google Red (muted)
    critical: '#EA4335',  // Same as high
  },
  
  // Category colors (Google inspired)
  category: {
    work: '#1A73E8',      // Google Blue
    personal: '#34A853',  // Google Green
    shopping: '#FBBC04',  // Google Yellow
    health: '#EA4335',    // Google Red
    other: '#9AA0A6',     // Google Gray
  },
  
  // Status colors
  status: {
    completed: '#34A853', // Google Green
    pending: '#FBBC04',   // Google Yellow
    overdue: '#EA4335',   // Google Red
  },
  
  // Text colors (Dark theme)
  text: {
    primary: '#E8EAED',   // Light gray (main text)
    secondary: '#9AA0A6', // Medium gray (secondary text)
    tertiary: '#5F6368',  // Darker gray (disabled/muted)
    inverse: '#202124',   // Dark text for light backgrounds
  },
  
  // Interactive elements (Dark theme)
  interactive: {
    hover: '#3C3C3C',     // Lighter dark gray
    pressed: '#4A4A4A',   // Even lighter gray
    disabled: '#2D2D2D',  // Same as secondary background
    focus: '#1A73E8',     // Google blue
  },
  
  // Borders and dividers (Dark theme)
  border: {
    light: '#3C3C3C',     // Subtle dark border
    medium: '#5F6368',    // Medium dark border
    dark: '#9AA0A6',      // Lighter border
  },
  
  // Shadow colors (Dark theme - more subtle)
  shadow: {
    light: 'rgba(0, 0, 0, 0.2)',
    medium: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.4)',
  },
};

export const AppSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const AppBorderRadius = {
  sm: 8,    // Google Tasks uses slightly rounded corners
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const AppFontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  title: 28,
  hero: 32,
};

export const AppShadows = {
  small: {
    shadowColor: AppColors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: AppColors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  large: {
    shadowColor: AppColors.shadow.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const AppAnimations = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
  timing: 'ease-in-out',
};
