import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useRoutines } from '@/contexts/RoutineContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Routine } from '@/types';

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
    <TouchableOpacity
      style={[styles.routineCard, routine.completed && styles.completedCard]}
      onPress={() => toggleRoutine(routine.id)}
      activeOpacity={0.7}
    >
      <View style={styles.routineContent}>
        <Text style={[styles.routineTitle, routine.completed && styles.completedText]}>
          {routine.title}
        </Text>
        <View style={styles.routineMeta}>
          <View style={styles.routineInfo}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.routineTime}>{routine.scheduledTime}</Text>
          </View>
          <View style={styles.routineInfo}>
            <Ionicons name="repeat-outline" size={16} color="#666" />
            <Text style={styles.routineFrequency}>{routine.frequency}</Text>
          </View>
          <View style={styles.routineInfo}>
            <Ionicons name="flame-outline" size={16} color={primaryColor} />
            <Text style={[styles.routineStreak, { color: primaryColor }]}>
              {routine.streak} day streak
            </Text>
          </View>
        </View>
      </View>
      {routine.completed && (
        <Ionicons name="checkmark-circle" size={24} color={primaryColor} />
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Apple Routine Flow</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddRoutine}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Progress Stats */}
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Ionicons name="target" size={24} color={primaryColor} />
              <Text style={styles.statsTitle}>Today's Progress</Text>
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.completionText}>
                {completedToday} / {totalRoutines} completed
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${completionRate}%`,
                      backgroundColor: primaryColor 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.completionRate}>{completionRate}%</Text>
            </View>
          </View>

          {/* Routines List */}
          <View style={styles.routinesSection}>
            <Text style={styles.sectionTitle}>Today's Routines</Text>
            {sortedRoutines.length > 0 ? (
              sortedRoutines.map((routine) => (
                <RoutineCard key={routine.id} routine={routine} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="list-outline" size={48} color="#999" />
                <Text style={styles.emptyText}>No routines yet</Text>
                <TouchableOpacity style={styles.emptyButton} onPress={handleAddRoutine}>
                  <Text style={styles.emptyButtonText}>Add Your First Routine</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    backdropFilter: 'blur(10px)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backdropFilter: 'blur(10px)',
  },
  completedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});