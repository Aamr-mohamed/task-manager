export const AppColors = {
  primary: {
    main: '#1A73E8',      
    dark: '#1557B0',        
    light: '#4285F4',     
    accent: '#1A73E8',    
  },
  
  background: {
    primary: '#1F1F1F',    
    secondary: '#2D2D2D', 
    tertiary: '#3C3C3C',  
    overlay: 'rgba(0, 0, 0, 0.8)', 
  },
  
  priority: {
    low: '#34A853',       
    medium: '#FBBC04',    
    high: '#EA4335',      
    critical: '#EA4335',  
  },
  
  category: {
    work: '#1A73E8',      
    personal: '#34A853',  
    shopping: '#FBBC04',  
    health: '#EA4335',    
    other: '#9AA0A6',     
  },
  
  status: {
    completed: '#34A853', 
    pending: '#FBBC04',   
    overdue: '#EA4335',   
  },
  
  text: {
    primary: '#E8EAED',   
    secondary: '#9AA0A6', 
    tertiary: '#5F6368',  
    inverse: '#202124',   
  },
  
  interactive: {
    hover: '#3C3C3C',     
    pressed: '#4A4A4A',   
    disabled: '#2D2D2D',  
    focus: '#1A73E8',     
  },
  
  border: {
    light: '#3C3C3C',     
    medium: '#5F6368',    
    dark: '#9AA0A6',     
  },
  
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
  sm: 8,    
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
