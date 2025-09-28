import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, PlatformColor } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LiquidGlassView, LiquidGlassContainerView, isLiquidGlassSupported } from '@callstack/liquid-glass';

import { useRoutines } from '@/contexts/RoutineContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Routine } from '@/types';
import { LiquidGlassButton, LiquidGlassCard, LiquidGlassIconButton } from '@/components/ui';

export default function HomeScreen() {
  const { routines, toggleRoutine, addRoutine } = useRoutines();
  const { primaryColor } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);

  const completedToday = routines.filter(r => r.completed).length;
  const totalRoutines = routines.length;
  const completionRate = totalRoutines > 0 ? Math.round((completedToday / totalRoutines) * 100) : 0;

  const sortedRoutines = [...routines].sort((a, b) => {
    if (a.scheduledTime === 'Any time' && b.scheduledTime !== 'Any time') return 1;
    if (b.scheduledTime === 'Any time' && a.scheduledTime !== 'Any time') return -1;
    if (a.scheduledTime === 'Any time' && b.scheduledTime === 'Any time') return 0;
    
    const timeA = a.scheduledTime.split(':').map(Number);
    const timeB = b.scheduledTime.split(':').map(Number);
    const minutesA = timeA[0] * 60 + timeA[1];
    const minutesB = timeB[0] * 60 + timeB[1];
    return minutesA - minutesB;
  });

  const handleAddRoutine = () => {
    Alert.prompt(
      'Add New Routine',
      'Enter routine name:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: (text) => {
            if (text && text.trim()) {
              addRoutine({
                title: text.trim(),
                scheduledTime: 'Any time',
                frequency: 'daily',
              });
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const RoutineCard = ({ routine }: { routine: Routine }) => (
    <LiquidGlassView
      style={[
        styles.routineCard,
        routine.completed && styles.completedCard,
        !isLiquidGlassSupported && styles.fallbackCard,
      ]}
      effect="clear"
      interactive
      tintColor={routine.completed ? 'rgba(52, 199, 89, 0.1)' : undefined}
      onPress={() => toggleRoutine(routine.id)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${routine.completed ? 'Mark as incomplete' : 'Mark as complete'} ${routine.title}`}
    >
      <View style={styles.routineContent}>
        <Text style={[
          styles.routineTitle, 
          routine.completed && styles.completedText,
          { color: PlatformColor('labelColor') }
        ]}>
          {routine.title}
        </Text>
        <View style={styles.routineMeta}>
          <View style={styles.routineInfo}>
            <Ionicons name="time-outline" size={16} color={PlatformColor('secondaryLabelColor')} />
            <Text style={[styles.routineTime, { color: PlatformColor('secondaryLabelColor') }]}>
              {routine.scheduledTime}
            </Text>
          </View>
          <View style={styles.routineInfo}>
            <Ionicons name="repeat-outline" size={16} color={PlatformColor('secondaryLabelColor')} />
            <Text style={[styles.routineFrequency, { color: PlatformColor('secondaryLabelColor') }]}>
              {routine.frequency}
            </Text>
          </View>
          <View style={styles.routineInfo}>
            <Ionicons name="flame-outline" size={16} color={PlatformColor('systemOrange')} />
            <Text style={[styles.routineStreak, { color: PlatformColor('systemOrange') }]}>
              {routine.streak} day streak
            </Text>
          </View>
        </View>
      </View>
      {routine.completed && (
        <Ionicons name="checkmark-circle" size={24} color={PlatformColor('systemGreen')} />
      )}
    </LiquidGlassView>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <LiquidGlassView style={styles.header} effect="clear">
            <Text style={[styles.headerTitle, { color: PlatformColor('labelColor') }]}>
              Apple Routine Flow
            </Text>
            <LiquidGlassIconButton
              name="add"
              size={24}
              onPress={handleAddRoutine}
              style={styles.addButton}
              effect="regular"
              tintColor="rgba(0, 122, 255, 0.1)"
              accessibilityLabel="Add new routine"
            />
          </LiquidGlassView>

          {/* Progress Stats */}
          <LiquidGlassView
            style={[
              styles.statsCard,
              !isLiquidGlassSupported && styles.fallbackCard,
            ]}
            effect="regular"
            tintColor="rgba(0, 122, 255, 0.1)"
          >
            <View style={styles.statsHeader}>
              <Ionicons name="target" size={24} color={PlatformColor('systemBlue')} />
              <Text style={[styles.statsTitle, { color: PlatformColor('labelColor') }]}>
                Today's Progress
              </Text>
            </View>
            <View style={styles.statsContent}>
              <Text style={[styles.completionText, { color: PlatformColor('secondaryLabelColor') }]}>
                {completedToday} / {totalRoutines} completed
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${completionRate}%`,
                      backgroundColor: PlatformColor('systemBlue')
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.completionRate, { color: PlatformColor('labelColor') }]}>
                {completionRate}%
              </Text>
            </View>
          </LiquidGlassView>

          {/* Routines List */}
          <LiquidGlassView style={styles.routinesSection} effect="clear">
            <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>
              Today's Routines
            </Text>
            {sortedRoutines.length > 0 ? (
              <LiquidGlassContainerView spacing={12}>
                {sortedRoutines.map((routine) => (
                  <RoutineCard key={routine.id} routine={routine} />
                ))}
              </LiquidGlassContainerView>
            ) : (
              <LiquidGlassView
                style={[
                  styles.emptyState,
                  !isLiquidGlassSupported && styles.fallbackCard,
                ]}
                effect="regular"
                tintColor="rgba(0, 122, 255, 0.05)"
              >
                <Ionicons name="list-outline" size={48} color={PlatformColor('tertiaryLabelColor')} />
                <Text style={[styles.emptyText, { color: PlatformColor('secondaryLabelColor') }]}>
                  No routines yet
                </Text>
                <LiquidGlassButton
                  title="Add Your First Routine"
                  onPress={handleAddRoutine}
                  variant="primary"
                  size="medium"
                  style={styles.emptyButton}
                  accessibilityLabel="Add your first routine"
                />
              </LiquidGlassView>
            )}
          </LiquidGlassView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    width: 40,
    height: 40,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  fallbackCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  statsContent: {
    alignItems: 'center',
  },
  completionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  completionRate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  routinesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  routineCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completedCard: {
    opacity: 0.7,
  },
  routineContent: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  routineMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  routineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  routineTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  routineFrequency: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'capitalize',
  },
  routineStreak: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 16,
    marginBottom: 24,
  },
  emptyButton: {
    marginTop: 16,
  },
});