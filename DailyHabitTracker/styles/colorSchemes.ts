import { PlatformColor } from 'react-native';

// Liquid Glass Color Schemes for different themes
export const liquidGlassColorSchemes = {
  light: {
    primary: 'rgba(0, 122, 255, 0.1)',
    secondary: 'rgba(0, 0, 0, 0.05)',
    background: 'rgba(255, 255, 255, 0.1)',
    surface: 'rgba(255, 255, 255, 0.2)',
    text: {
      primary: PlatformColor('labelColor'),
      secondary: PlatformColor('secondaryLabelColor'),
      tertiary: PlatformColor('tertiaryLabelColor'),
    },
    system: {
      blue: PlatformColor('systemBlue'),
      green: PlatformColor('systemGreen'),
      red: PlatformColor('systemRed'),
      orange: PlatformColor('systemOrange'),
      yellow: PlatformColor('systemYellow'),
      purple: PlatformColor('systemPurple'),
      pink: PlatformColor('systemPink'),
      teal: PlatformColor('systemTeal'),
    },
  },
  dark: {
    primary: 'rgba(0, 122, 255, 0.2)',
    secondary: 'rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.3)',
    surface: 'rgba(255, 255, 255, 0.1)',
    text: {
      primary: PlatformColor('labelColor'),
      secondary: PlatformColor('secondaryLabelColor'),
      tertiary: PlatformColor('tertiaryLabelColor'),
    },
    system: {
      blue: PlatformColor('systemBlue'),
      green: PlatformColor('systemGreen'),
      red: PlatformColor('systemRed'),
      orange: PlatformColor('systemOrange'),
      yellow: PlatformColor('systemYellow'),
      purple: PlatformColor('systemPurple'),
      pink: PlatformColor('systemPink'),
      teal: PlatformColor('systemTeal'),
    },
  },
};

// Liquid Glass Tint Colors
export const liquidGlassTintColors = {
  primary: 'rgba(0, 122, 255, 0.1)',
  secondary: 'rgba(255, 255, 255, 0.05)',
  success: 'rgba(52, 199, 89, 0.1)',
  warning: 'rgba(255, 193, 7, 0.1)',
  error: 'rgba(255, 59, 48, 0.1)',
  info: 'rgba(90, 200, 250, 0.1)',
  purple: 'rgba(175, 82, 222, 0.1)',
  pink: 'rgba(255, 45, 85, 0.1)',
  orange: 'rgba(255, 149, 0, 0.1)',
  yellow: 'rgba(255, 204, 0, 0.1)',
  teal: 'rgba(90, 200, 250, 0.1)',
  indigo: 'rgba(88, 86, 214, 0.1)',
};

// Liquid Glass Status Colors
export const liquidGlassStatusColors = {
  success: {
    background: 'rgba(52, 199, 89, 0.1)',
    text: PlatformColor('systemGreen'),
    border: PlatformColor('systemGreen'),
  },
  warning: {
    background: 'rgba(255, 193, 7, 0.1)',
    text: PlatformColor('systemOrange'),
    border: PlatformColor('systemOrange'),
  },
  error: {
    background: 'rgba(255, 59, 48, 0.1)',
    text: PlatformColor('systemRed'),
    border: PlatformColor('systemRed'),
  },
  info: {
    background: 'rgba(90, 200, 250, 0.1)',
    text: PlatformColor('systemBlue'),
    border: PlatformColor('systemBlue'),
  },
};

// Liquid Glass Background Colors
export const liquidGlassBackgrounds = {
  primary: 'rgba(0, 122, 255, 0.1)',
  secondary: 'rgba(255, 255, 255, 0.05)',
  tertiary: 'rgba(255, 255, 255, 0.1)',
  quaternary: 'rgba(255, 255, 255, 0.15)',
  overlay: 'rgba(0, 0, 0, 0.3)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  overlayDark: 'rgba(0, 0, 0, 0.5)',
};

// Liquid Glass Border Colors
export const liquidGlassBorders = {
  primary: 'rgba(255, 255, 255, 0.2)',
  secondary: 'rgba(255, 255, 255, 0.1)',
  tertiary: 'rgba(255, 255, 255, 0.05)',
  accent: 'rgba(0, 122, 255, 0.3)',
  success: 'rgba(52, 199, 89, 0.3)',
  warning: 'rgba(255, 193, 7, 0.3)',
  error: 'rgba(255, 59, 48, 0.3)',
};

// Liquid Glass Shadow Colors
export const liquidGlassShadows = {
  light: 'rgba(0, 0, 0, 0.1)',
  medium: 'rgba(0, 0, 0, 0.2)',
  dark: 'rgba(0, 0, 0, 0.3)',
  colored: 'rgba(0, 122, 255, 0.2)',
};

// Utility function to get color scheme based on theme
export const getLiquidGlassColorScheme = (theme: 'light' | 'dark' | 'system' = 'system') => {
  if (theme === 'system') {
    // Use PlatformColor for automatic adaptation
    return {
      primary: PlatformColor('systemBlue'),
      secondary: PlatformColor('secondaryLabelColor'),
      background: PlatformColor('systemBackground'),
      text: PlatformColor('labelColor'),
    };
  }
  
  return liquidGlassColorSchemes[theme];
};

// Utility function to get tint color
export const getLiquidGlassTintColor = (variant: keyof typeof liquidGlassTintColors) => {
  return liquidGlassTintColors[variant];
};

// Utility function to get status color
export const getLiquidGlassStatusColor = (status: keyof typeof liquidGlassStatusColors) => {
  return liquidGlassStatusColors[status];
};
