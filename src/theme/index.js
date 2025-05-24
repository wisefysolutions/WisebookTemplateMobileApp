import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Define the theme colors and styling for the app
export const theme = {
  dark: {
    // Base colors
    background: '#121212',
    backgroundLight: '#1E1E1E',
    cardBackground: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textInvert: '#FFFFFF',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    
    // Accent colors
    accent: '#7B4DFF', // Purple base
    accentLight: '#9C6AFF',
    accentDark: '#5E35C8',
    accentGlow: '#4D2AC8',
    
    // Gradients
    gradientStart: '#4A148C',
    gradientEnd: '#7B1FA2',
    cardGradientStart: '#222437',
    cardGradientEnd: '#12142B',
    
    // Achievement colors
    achievementStart: '#6A11CB',
    achievementEnd: '#2575FC',
    
    // Coach colors
    coachBackground: '#304FFE',
    coachGradientStart: '#304FFE',
    coachGradientEnd: '#7B1FA2',
    
    // Notification colors
    success: '#00C853',
    warning: '#FFD600',
    error: '#FF1744',
    
    // UI Elements
    hudBorder: 'rgba(255, 255, 255, 0.1)',
    buttonBackground: 'rgba(255, 255, 255, 0.08)',
    tabBarBackground: 'rgba(18, 18, 18, 0.95)',
    tabBarInactive: 'rgba(255, 255, 255, 0.5)',
    
    // Text effects
    textGlow: 'rgba(123, 77, 255, 0.5)',
    
    // Dimensions
    screenWidth: width,
    screenHeight: height,
  },
  
  light: {
    // Base colors
    background: '#F5F5F5',
    backgroundLight: '#EEEEEE',
    cardBackground: '#FFFFFF',
    text: '#121212',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    textInvert: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    
    // Accent colors
    accent: '#6200EE', // Purple base
    accentLight: '#7C4DFF',
    accentDark: '#5502C8',
    accentGlow: '#9370DB',
    
    // Gradients
    gradientStart: '#6200EE',
    gradientEnd: '#7C4DFF',
    cardGradientStart: '#3949AB',
    cardGradientEnd: '#1A237E',
    
    // Achievement colors
    achievementStart: '#6A11CB',
    achievementEnd: '#2575FC',
    
    // Coach colors
    coachBackground: '#304FFE',
    coachGradientStart: '#304FFE',
    coachGradientEnd: '#6200EE',
    
    // Notification colors
    success: '#00C853',
    warning: '#FFD600',
    error: '#D50000',
    
    // UI Elements
    hudBorder: 'rgba(0, 0, 0, 0.1)',
    buttonBackground: 'rgba(0, 0, 0, 0.05)',
    tabBarBackground: 'rgba(245, 245, 245, 0.95)',
    tabBarInactive: 'rgba(0, 0, 0, 0.5)',
    
    // Text effects
    textGlow: 'rgba(123, 77, 255, 0.3)',
    
    // Dimensions
    screenWidth: width,
    screenHeight: height,
  }
};

// Font sizing and scaling
export const typography = {
  // Font sizes
  heading1: 28,
  heading2: 24,
  heading3: 20,
  heading4: 18,
  paragraph: 16,
  caption: 14,
  small: 12,
  
  // Font weights
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  
  // Line heights
  lineHeightHeading: 1.2,
  lineHeightParagraph: 1.5,
  
  // Letter spacing
  letterSpacingTight: -0.5,
  letterSpacingNormal: 0,
  letterSpacingWide: 1,
};

// Spacing scale - com valores responsivos baseados no tamanho da tela
export const spacing = {
  get xs() { return Math.max(4, Math.round(width * 0.01)); },
  get sm() { return Math.max(8, Math.round(width * 0.02)); },
  get md() { return Math.max(16, Math.round(width * 0.04)); },
  get lg() { return Math.max(24, Math.round(width * 0.06)); },
  get xl() { return Math.max(32, Math.round(width * 0.08)); },
  get xxl() { return Math.max(48, Math.round(width * 0.12)); },
  
  // Screen padding - adaptável a diferentes tamanhos
  get screenPadding() { 
    return width < 600 ? this.md : width < 1200 ? this.lg : this.xl;
  },
  
  // Component spacing
  get componentMargin() {
    return width < 600 ? this.md : this.lg;
  },
  get sectionMargin() {
    return width < 600 ? this.lg : this.xl;
  },
  
  // Border radius
  borderRadiusSmall: 4,
  borderRadiusMedium: 8,
  borderRadiusLarge: 16,
  borderRadiusExtraLarge: 24,
  
  // Responsive grid
  get gridGutter() {
    return width < 600 ? this.sm : this.md;
  },
  get columnCount() {
    return width < 600 ? 1 : width < 900 ? 2 : width < 1200 ? 3 : 4;
  }
};

// Shadows
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
};

// Animation constants
export const animations = {
  duration: {
    short: 200,
    medium: 400,
    long: 700,
  },
  easing: {
    // Define custom easing curves if needed
  },
};

// Create a theme provider component
export const ThemeProvider = ({ children }) => {
  return children;
};

export default { theme, typography, spacing, shadows, animations };
