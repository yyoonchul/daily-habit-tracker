import { View, type ViewProps } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

// Liquid Glass View Component
export type LiquidGlassViewProps = ViewProps & {
  effect?: 'clear' | 'regular' | 'none';
  interactive?: boolean;
  tintColor?: string;
  colorScheme?: 'light' | 'dark' | 'system';
  onPress?: () => void;
  accessible?: boolean;
  accessibilityRole?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function LiquidGlassThemedView({ 
  style, 
  effect = 'clear',
  interactive = false,
  tintColor,
  colorScheme = 'system',
  onPress,
  accessible = true,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
  ...otherProps 
}: LiquidGlassViewProps) {
  const viewStyle = [
    style,
    !isLiquidGlassSupported && { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
  ];

  return (
    <LiquidGlassView
      style={viewStyle}
      effect={effect}
      interactive={interactive}
      tintColor={tintColor}
      colorScheme={colorScheme}
      onPress={onPress}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      {...otherProps}
    />
  );
}
