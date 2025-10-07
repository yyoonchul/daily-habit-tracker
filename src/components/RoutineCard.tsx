import React from 'react';
import { View, Text, StyleSheet, PlatformColor, Pressable } from 'react-native';
import { LiquidGlassCard } from './ui';
import { Ionicons } from '@expo/vector-icons';
import { Routine } from '../types';

interface RoutineCardProps {
  routine: Routine;
  onToggle?: (id: string) => void;
  onEdit?: (routine: Routine) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export function RoutineCard({
  routine,
  onToggle,
  onEdit,
  onDelete,
  showActions = false,
}: RoutineCardProps) {
  return (
    <LiquidGlassCard
      interactive={!!onToggle}
      onPress={onToggle ? () => onToggle(routine.id) : undefined}
      style={[
        styles.card,
        routine.completedToday && styles.completedCard,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: PlatformColor('labelColor') },
              routine.completedToday && styles.completedTitle,
            ]}
          >
            {routine.title}
          </Text>
          {routine.completedToday && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={PlatformColor('systemGreen')}
            />
          )}
        </View>

        <View style={styles.metadata}>
          <View style={styles.metaItem}>
            <Ionicons
              name="time-outline"
              size={16}
              color={PlatformColor('systemBlue')}
            />
            <Text style={[styles.metaText, { color: PlatformColor('secondaryLabelColor') }]}>
              {routine.scheduledTime || 'Anytime'}
            </Text>
          </View>

          <Text style={[styles.metaText, { color: PlatformColor('secondaryLabelColor') }]}>
            {routine.frequency.toUpperCase()}
          </Text>

          {routine.streak > 0 && (
            <Text style={[styles.streakText, { color: PlatformColor('systemBlue') }]}>
              🔥 {routine.streak} day streak
            </Text>
          )}
        </View>

        {showActions && (
          <View style={styles.actions}>
            <Pressable
              onPress={() => onEdit?.(routine)}
              style={styles.actionButton}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color={PlatformColor('secondaryLabelColor')}
              />
            </Pressable>
            <Pressable
              onPress={() => onDelete?.(routine.id)}
              style={styles.actionButton}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color={PlatformColor('systemRed')}
              />
            </Pressable>
          </View>
        )}
      </View>
    </LiquidGlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
  },
  completedCard: {
    opacity: 0.8,
  },
  content: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
});

