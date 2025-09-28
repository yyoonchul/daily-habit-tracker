import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { PlatformColor } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

interface LiquidGlassIconButtonProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  onPress: () => void;
  style?: ViewStyle;
  effect?: 'clear' | 'regular' | 'none';
  color?: string;
  disabled?: boolean;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const LiquidGlassIconButton: React.FC<LiquidGlassIconButtonProps> = ({
  name,
  size = 20,
  onPress,
  style,
  effect = 'regular',
  color,
  disabled = false,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const buttonStyle = [
    styles.button,
    disabled && styles.disabled,
    !isLiquidGlassSupported && styles.fallbackButton,
    style,
  ];

  const iconColor = color || PlatformColor('labelColor');

  return (
    <LiquidGlassView
      style={buttonStyle}
      effect={effect}
      interactive={!disabled}
      onPress={disabled ? undefined : onPress}
      accessible={accessible}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <Ionicons
        name={name}
        size={size}
        color={disabled ? PlatformColor('tertiaryLabelColor') : iconColor}
      />
    </LiquidGlassView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  disabled: {
    opacity: 0.5,
  },
});
