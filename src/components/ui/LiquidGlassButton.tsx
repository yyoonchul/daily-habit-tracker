import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, PlatformColor, Pressable } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function LiquidGlassButton({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: LiquidGlassButtonProps) {
  const effect = variant === 'primary' ? 'regular' : variant === 'secondary' ? 'clear' : 'none';
  const tintColor = variant === 'primary' ? 'rgba(0, 122, 255, 0.1)' : undefined;

  return (
    <Pressable onPress={disabled ? undefined : onPress} disabled={disabled}>
      <LiquidGlassView
        style={[
          styles.button,
          styles[size],
          !isLiquidGlassSupported && styles.fallback,
          disabled && styles.disabled,
          style,
        ]}
        interactive={!disabled}
        effect={effect}
        tintColor={tintColor}
      >
        <Text
          style={[
            styles.text,
            { color: PlatformColor('labelColor') },
            variant === 'primary' && styles.primaryText,
            textStyle,
          ]}
        >
          {children}
        </Text>
      </LiquidGlassView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    fontWeight: 'bold',
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

