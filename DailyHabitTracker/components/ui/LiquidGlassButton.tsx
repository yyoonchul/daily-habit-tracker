import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { PlatformColor } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

interface LiquidGlassButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  effect?: 'clear' | 'regular' | 'none';
  disabled?: boolean;
  loading?: boolean;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  size = 'medium',
  effect = 'regular',
  disabled = false,
  loading = false,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    !isLiquidGlassSupported && styles.fallbackButton,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const tintColor = variant === 'primary' ? 'rgba(0, 122, 255, 0.1)' : undefined;

  return (
    <LiquidGlassView
      style={buttonStyle}
      effect={effect}
      interactive={!disabled && !loading}
      tintColor={tintColor}
      onPress={disabled || loading ? undefined : onPress}
      accessible={accessible}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
    >
      <Text style={textStyleCombined}>
        {loading ? 'Loading...' : title}
      </Text>
    </LiquidGlassView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  fallbackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  primary: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 52,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: PlatformColor('systemBlue'),
  },
  secondaryText: {
    color: PlatformColor('labelColor'),
  },
  ghostText: {
    color: PlatformColor('labelColor'),
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: PlatformColor('tertiaryLabelColor'),
  },
});
