import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { PlatformColor } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  effect?: 'clear' | 'regular' | 'none';
  interactive?: boolean;
  tintColor?: string;
  colorScheme?: 'light' | 'dark' | 'system';
  onPress?: () => void;
  accessible?: boolean;
  accessibilityRole?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  style,
  textStyle,
  effect = 'clear',
  interactive = true,
  tintColor,
  colorScheme = 'system',
  onPress,
  accessible = true,
  accessibilityRole = 'button',
  accessibilityLabel,
  accessibilityHint,
}) => {
  const cardStyle = [
    styles.card,
    !isLiquidGlassSupported && styles.fallbackCard,
    style,
  ];

  return (
    <LiquidGlassView
      style={cardStyle}
      effect={effect}
      interactive={interactive}
      tintColor={tintColor}
      colorScheme={colorScheme}
      onPress={onPress}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </LiquidGlassView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    margin: 8,
  },
  fallbackCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  text: {
    color: PlatformColor('labelColor'),
    fontSize: 16,
    fontWeight: '500',
  },
});
