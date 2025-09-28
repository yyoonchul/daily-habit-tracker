import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { PlatformColor } from 'react-native';

// Liquid Glass Color Schemes
export const liquidGlassColors = {
  primary: 'rgba(0, 122, 255, 0.1)',
  secondary: 'rgba(255, 255, 255, 0.05)',
  success: 'rgba(52, 199, 89, 0.1)',
  warning: 'rgba(255, 193, 7, 0.1)',
  error: 'rgba(255, 59, 48, 0.1)',
  info: 'rgba(90, 200, 250, 0.1)',
};

// Liquid Glass Text Colors
export const liquidGlassTextColors = {
  primary: PlatformColor('labelColor'),
  secondary: PlatformColor('secondaryLabelColor'),
  tertiary: PlatformColor('tertiaryLabelColor'),
  systemBlue: PlatformColor('systemBlue'),
  systemGreen: PlatformColor('systemGreen'),
  systemRed: PlatformColor('systemRed'),
  systemOrange: PlatformColor('systemOrange'),
};

// Liquid Glass Spacing
export const liquidGlassSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Liquid Glass Border Radius
export const liquidGlassBorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

// Liquid Glass Effects
export const liquidGlassEffects = {
  clear: 'clear' as const,
  regular: 'regular' as const,
  none: 'none' as const,
};

// Common Liquid Glass Styles
export const liquidGlassStyles = StyleSheet.create({
  // Card Styles
  card: {
    padding: liquidGlassSpacing.md,
    borderRadius: liquidGlassBorderRadius.lg,
    margin: liquidGlassSpacing.sm,
  },
  cardLarge: {
    padding: liquidGlassSpacing.lg,
    borderRadius: liquidGlassBorderRadius.xl,
    margin: liquidGlassSpacing.md,
  },
  cardSmall: {
    padding: liquidGlassSpacing.sm,
    borderRadius: liquidGlassBorderRadius.md,
    margin: liquidGlassSpacing.xs,
  },

  // Button Styles
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: liquidGlassBorderRadius.md,
    minHeight: 44,
  },
  buttonSmall: {
    paddingHorizontal: liquidGlassSpacing.md,
    paddingVertical: liquidGlassSpacing.sm,
    minHeight: 36,
  },
  buttonMedium: {
    paddingHorizontal: liquidGlassSpacing.lg,
    paddingVertical: liquidGlassSpacing.md,
    minHeight: 44,
  },
  buttonLarge: {
    paddingHorizontal: liquidGlassSpacing.xl,
    paddingVertical: liquidGlassSpacing.lg,
    minHeight: 52,
  },

  // Icon Button Styles
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  iconButtonLarge: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  // Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    padding: liquidGlassSpacing.lg,
    borderRadius: liquidGlassBorderRadius.xl,
    margin: liquidGlassSpacing.lg,
  },

  // Text Styles
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: liquidGlassTextColors.primary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: liquidGlassTextColors.primary,
  },
  body: {
    fontSize: 14,
    color: liquidGlassTextColors.secondary,
  },
  caption: {
    fontSize: 12,
    color: liquidGlassTextColors.tertiary,
  },

  // Status Styles
  success: {
    backgroundColor: liquidGlassColors.success,
    borderColor: liquidGlassTextColors.systemGreen,
  },
  warning: {
    backgroundColor: liquidGlassColors.warning,
    borderColor: liquidGlassTextColors.systemOrange,
  },
  error: {
    backgroundColor: liquidGlassColors.error,
    borderColor: liquidGlassTextColors.systemRed,
  },
  info: {
    backgroundColor: liquidGlassColors.info,
    borderColor: liquidGlassTextColors.systemBlue,
  },
});

// Liquid Glass Animation Presets
export const liquidGlassAnimations = {
  fadeIn: {
    opacity: 1,
    duration: 300,
  },
  fadeOut: {
    opacity: 0,
    duration: 200,
  },
  scaleIn: {
    scale: 1,
    duration: 300,
  },
  scaleOut: {
    scale: 0.9,
    duration: 200,
  },
  slideUp: {
    translateY: 0,
    duration: 300,
  },
  slideDown: {
    translateY: 100,
    duration: 200,
  },
};

// Liquid Glass Utility Functions
export const getLiquidGlassStyle = (
  baseStyle: ViewStyle,
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info',
  size?: 'small' | 'medium' | 'large'
): ViewStyle => {
  let style = { ...baseStyle };

  if (variant) {
    style = { ...style, ...liquidGlassStyles[variant] };
  }

  if (size) {
    const sizeKey = size === 'small' ? 'Small' : size === 'large' ? 'Large' : '';
    if (sizeKey) {
      style = { ...style, ...liquidGlassStyles[`card${sizeKey}` as keyof typeof liquidGlassStyles] };
    }
  }

  return style;
};

export const getLiquidGlassTextStyle = (
  baseStyle: TextStyle,
  variant?: 'title' | 'subtitle' | 'body' | 'caption'
): TextStyle => {
  if (variant) {
    return { ...baseStyle, ...liquidGlassStyles[variant] };
  }
  return baseStyle;
};
