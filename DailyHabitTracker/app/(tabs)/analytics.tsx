import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useRoutines } from '@/contexts/RoutineContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const { routines } = useRoutines();
  const { primaryColor } = useTheme();
  const [currentSection, setCurrentSection] = useState(0);

  const sections = ['Overview', 'Trends', 'Activity', 'Routines'];

  const completionRate = routines.length > 0 
    ? Math.round((routines.filter(r => r.completed).length / routines.length) * 100) 
    : 0;

  const averageStreak = routines.length > 0 
    ? Math.round(routines.reduce((sum, r) => sum + r.streak, 0) / routines.length)
    : 0;

  const OverviewSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.sectionSubtitle}>Today's performance summary</Text>
      </View>
      
      <View style={styles.mainCard}>
        <Ionicons name="target" size={32} color={primaryColor} />
        <Text style={styles.mainValue}>{completionRate}%</Text>
        <Text style={styles.mainLabel}>Today's Completion</Text>
      </View>

      <View style={styles.secondaryCards}>
        <View style={styles.secondaryCard}>
          <Ionicons name="trending-up" size={24} color={primaryColor} />
          <Text style={styles.secondaryValue}>{averageStreak}</Text>
          <Text style={styles.secondaryLabel}>Average Streak</Text>
        </View>
        <View style={styles.secondaryCard}>
          <Ionicons name="calendar" size={24} color={primaryColor} />
          <Text style={styles.secondaryValue}>{routines.length}</Text>
          <Text style={styles.secondaryLabel}>Total Routines</Text>
        </View>
      </View>
    </View>
  );

  const TrendsSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trends</Text>
        <Text style={styles.sectionSubtitle}>Completion rate over time</Text>
      </View>
      
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Ionicons name="trending-up" size={20} color={primaryColor} />
          <Text style={styles.chartTitle}>Completion Rate Trend</Text>
        </View>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="bar-chart" size={48} color={primaryColor} />
          <Text style={styles.chartText}>Chart visualization would go here</Text>
        </View>
      </View>
    </View>
  );

  const ActivitySection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <Text style={styles.sectionSubtitle}>Monthly completion heatmap</Text>
      </View>
      
      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.calendarMonth}>September 2024</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.calendarGrid}>
          {Array.from({ length: 30 }, (_, i) => (
            <View key={i} style={[styles.calendarDay, { backgroundColor: primaryColor + '40' }]}>
              <Text style={styles.calendarDayText}>{i + 1}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const RoutinesSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Routines</Text>
        <Text style={styles.sectionSubtitle}>Individual routine details</Text>
      </View>
      
      <View style={styles.routinesCard}>
        {routines.map((routine) => (
          <TouchableOpacity key={routine.id} style={styles.routineItem}>
            <View style={styles.routineInfo}>
              <Text style={styles.routineName}>{routine.title}</Text>
              <Text style={styles.routineMeta}>
                {routine.frequency} • {routine.scheduledTime}
              </Text>
            </View>
            <View style={styles.routineStats}>
              <Text style={[styles.routineStreak, { color: primaryColor }]}>
                {routine.streak} day streak
              </Text>
              <Text style={[
                styles.routineStatus,
                { color: routine.completed ? primaryColor : '#999' }
              ]}>
                {routine.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 0: return <OverviewSection />;
      case 1: return <TrendsSection />;
      case 2: return <ActivitySection />;
      case 3: return <RoutinesSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {renderSection()}
        </ScrollView>
        
        <View style={styles.navigation}>
          <View style={styles.sectionIndicators}>
            {sections.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  currentSection === index && styles.activeIndicator
                ]}
                onPress={() => setCurrentSection(index)}
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>{sections[currentSection]}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    flex: 1,
    paddingBottom: 20,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  mainCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    backdropFilter: 'blur(10px)',
  },
  mainValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
  },
  mainLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  secondaryCards: {
    flexDirection: 'row',
    gap: 16,
  },
  secondaryCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  secondaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 4,
  },
  secondaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    backdropFilter: 'blur(10px)',
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  calendarCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    backdropFilter: 'blur(10px)',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  calendarDay: {
    width: (width - 80) / 7,
    height: (width - 80) / 7,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  routinesCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    maxHeight: 300,
    backdropFilter: 'blur(10px)',
  },
  routineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  routineMeta: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  routineStats: {
    alignItems: 'flex-end',
  },
  routineStreak: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  routineStatus: {
    fontSize: 10,
  },
  navigation: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  sectionIndicators: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeIndicator: {
    backgroundColor: 'white',
    transform: [{ scale: 1.25 }],
  },
});
