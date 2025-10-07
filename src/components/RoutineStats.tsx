import React from 'react';
import { View, Text, StyleSheet, PlatformColor } from 'react-native';
import { LiquidGlassCard } from './ui';
import { Routine } from '../types';

interface RoutineStatsProps {
  routines: Routine[];
}

export function RoutineStats({ routines }: RoutineStatsProps) {
  const completedToday = routines.filter((r) => r.completedToday).length;
  const totalRoutines = routines.length;
  const completionRate =
    totalRoutines > 0 ? Math.round((completedToday / totalRoutines) * 100) : 0;

  return (
    <LiquidGlassCard effect="regular" style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.label, { color: PlatformColor('secondaryLabelColor') }]}>
            Today's Progress
          </Text>
          <Text style={[styles.ratio, { color: PlatformColor('labelColor') }]}>
            {completedToday}/{totalRoutines}
          </Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${completionRate}%`,
                backgroundColor: PlatformColor('systemBlue'),
              },
            ]}
          />
        </View>

        <Text style={[styles.percentage, { color: PlatformColor('labelColor') }]}>
          {completionRate}%
        </Text>
      </View>
    </LiquidGlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  content: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  ratio: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

