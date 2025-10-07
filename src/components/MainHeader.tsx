import React from 'react';
import { View, Text, StyleSheet, PlatformColor } from 'react-native';
import { LiquidGlassCard } from './ui';

interface MainHeaderProps {
  title: string;
  subtitle?: string;
}

export function MainHeader({ title, subtitle }: MainHeaderProps) {
  return (
    <LiquidGlassCard effect="clear" style={styles.header}>
      <Text style={[styles.title, { color: PlatformColor('labelColor') }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: PlatformColor('secondaryLabelColor') }]}>
          {subtitle}
        </Text>
      )}
    </LiquidGlassCard>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});

