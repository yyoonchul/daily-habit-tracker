import React from 'react';
import { StyleSheet, ViewStyle, PlatformColor, Pressable } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { Ionicons } from '@expo/vector-icons';

interface LiquidGlassIconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

export function LiquidGlassIconButton({
  icon,
  onPress,
  size = 20,
  color,
  style,
  disabled = false,
}: LiquidGlassIconButtonProps) {
  const iconColor = color || PlatformColor('labelColor');

  return (
    <Pressable onPress={disabled ? undefined : onPress} disabled={disabled}>
      <LiquidGlassView
        style={[
          styles.iconButton,
          !isLiquidGlassSupported && styles.fallback,
          disabled && styles.disabled,
          style,
        ]}
        interactive={!disabled}
        effect="regular"
      >
        <Ionicons name={icon} size={size} color={iconColor} />
      </LiquidGlassView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  fallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

