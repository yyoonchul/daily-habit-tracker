import React from 'react';
import { StyleSheet, ViewStyle, PlatformColor, View } from 'react-native';

// Safe import for Expo Go (when native module is missing)
let LiquidGlassViewSafe: any = View;
let liquidGlassSupported = false as boolean;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('@callstack/liquid-glass');
  LiquidGlassViewSafe = mod?.LiquidGlassView ?? View;
  liquidGlassSupported = Boolean(mod?.isLiquidGlassSupported);
} catch (_e) {
  LiquidGlassViewSafe = View;
  liquidGlassSupported = false;
}

interface LiquidGlassCardProps {
  children: React.ReactNode;
  interactive?: boolean;
  effect?: 'clear' | 'regular' | 'none';
  style?: ViewStyle;
  onPress?: () => void;
}

export function LiquidGlassCard({
  children,
  interactive = false,
  effect = 'clear',
  style,
  onPress,
}: LiquidGlassCardProps) {
  return (
    <LiquidGlassViewSafe
      style={[
        styles.card,
        !liquidGlassSupported && styles.fallback,
        style,
      ]}
      interactive={interactive}
      effect={effect}
      onPress={onPress}
    >
      {children}
    </LiquidGlassViewSafe>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginVertical: 4,
  },
  fallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

