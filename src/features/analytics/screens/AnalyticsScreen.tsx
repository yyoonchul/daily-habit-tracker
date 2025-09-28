import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, PlatformColor } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LiquidGlassView, LiquidGlassContainerView, isLiquidGlassSupported } from '@callstack/liquid-glass';

import { useRoutines } from '../../../contexts/RoutineContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { LiquidGlassButton, LiquidGlassCard } from '../../../components/ui';

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
    <LiquidGlassView style={styles.section} effect="clear">
      <LiquidGlassView style={styles.sectionHeader} effect="clear">
        <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>Overview</Text>
        <Text style={[styles.sectionSubtitle, { color: PlatformColor('secondaryLabelColor') }]}>
          Today's performance summary
        </Text>
      </LiquidGlassView>
      
      <LiquidGlassView
        style={[
          styles.mainCard,
          !isLiquidGlassSupported && styles.fallbackCard,
        ]}
        effect="regular"
        tintColor="rgba(0, 122, 255, 0.1)"
      >
        <Ionicons name="target" size={32} color={PlatformColor('systemBlue')} />
        <Text style={[styles.mainValue, { color: PlatformColor('labelColor') }]}>
          {completionRate}%
        </Text>
        <Text style={[styles.mainLabel, { color: PlatformColor('secondaryLabelColor') }]}>
          Today's Completion
        </Text>
      </LiquidGlassView>

      <LiquidGlassContainerView spacing={16}>
        <LiquidGlassView
          style={[
            styles.secondaryCard,
            !isLiquidGlassSupported && styles.fallbackCard,
          ]}
          effect="clear"
        >
          <Ionicons name="trending-up" size={24} color={PlatformColor('systemGreen')} />
          <Text style={[styles.secondaryValue, { color: PlatformColor('labelColor') }]}>
            {averageStreak}
          </Text>
          <Text style={[styles.secondaryLabel, { color: PlatformColor('secondaryLabelColor') }]}>
            Average Streak
          </Text>
        </LiquidGlassView>
        <LiquidGlassView
          style={[
            styles.secondaryCard,
            !isLiquidGlassSupported && styles.fallbackCard,
          ]}
          effect="clear"
        >
          <Ionicons name="calendar" size={24} color={PlatformColor('systemOrange')} />
          <Text style={[styles.secondaryValue, { color: PlatformColor('labelColor') }]}>
            {routines.length}
          </Text>
          <Text style={[styles.secondaryLabel, { color: PlatformColor('secondaryLabelColor') }]}>
            Total Routines
          </Text>
        </LiquidGlassView>
      </LiquidGlassContainerView>
    </LiquidGlassView>
  );

  const TrendsSection = () => (
    <LiquidGlassView style={styles.section} effect="clear">
      <LiquidGlassView style={styles.sectionHeader} effect="clear">
        <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>Trends</Text>
        <Text style={[styles.sectionSubtitle, { color: PlatformColor('secondaryLabelColor') }]}>
          Completion rate over time
        </Text>
      </LiquidGlassView>
      
      <LiquidGlassView
        style={[
          styles.chartCard,
          !isLiquidGlassSupported && styles.fallbackCard,
        ]}
        effect="regular"
      >
        <View style={styles.chartHeader}>
          <Ionicons name="trending-up" size={20} color={PlatformColor('systemBlue')} />
          <Text style={[styles.chartTitle, { color: PlatformColor('labelColor') }]}>
            Completion Rate Trend
          </Text>
        </View>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="bar-chart" size={48} color={PlatformColor('systemBlue')} />
          <Text style={[styles.chartText, { color: PlatformColor('secondaryLabelColor') }]}>
            Chart visualization would go here
          </Text>
        </View>
      </LiquidGlassView>
    </LiquidGlassView>
  );

  const ActivitySection = () => (
    <LiquidGlassView style={styles.section} effect="clear">
      <LiquidGlassView style={styles.sectionHeader} effect="clear">
        <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>Activity</Text>
        <Text style={[styles.sectionSubtitle, { color: PlatformColor('secondaryLabelColor') }]}>
          Monthly completion heatmap
        </Text>
      </LiquidGlassView>
      
      <LiquidGlassView
        style={[
          styles.calendarCard,
          !isLiquidGlassSupported && styles.fallbackCard,
        ]}
        effect="regular"
      >
        <View style={styles.calendarHeader}>
          <LiquidGlassView
            style={styles.calendarNavButton}
            effect="clear"
            interactive
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Previous month"
          >
            <Ionicons name="chevron-back" size={20} color={PlatformColor('labelColor')} />
          </LiquidGlassView>
          <Text style={[styles.calendarMonth, { color: PlatformColor('labelColor') }]}>
            September 2024
          </Text>
          <LiquidGlassView
            style={styles.calendarNavButton}
            effect="clear"
            interactive
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Next month"
          >
            <Ionicons name="chevron-forward" size={20} color={PlatformColor('labelColor')} />
          </LiquidGlassView>
        </View>
        <View style={styles.calendarGrid}>
          {Array.from({ length: 30 }, (_, i) => (
            <LiquidGlassView
              key={i}
              style={[
                styles.calendarDay,
                { backgroundColor: PlatformColor('systemBlue') + '40' }
              ]}
              effect="clear"
            >
              <Text style={[styles.calendarDayText, { color: PlatformColor('labelColor') }]}>
                {i + 1}
              </Text>
            </LiquidGlassView>
          ))}
        </View>
      </LiquidGlassView>
    </LiquidGlassView>
  );

  const RoutinesSection = () => (
    <LiquidGlassView style={styles.section} effect="clear">
      <LiquidGlassView style={styles.sectionHeader} effect="clear">
        <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>Routines</Text>
        <Text style={[styles.sectionSubtitle, { color: PlatformColor('secondaryLabelColor') }]}>
          Individual routine details
        </Text>
      </LiquidGlassView>
      
      <LiquidGlassView
        style={[
          styles.routinesCard,
          !isLiquidGlassSupported && styles.fallbackCard,
        ]}
        effect="regular"
      >
        {routines.map((routine) => (
          <LiquidGlassView
            key={routine.id}
            style={styles.routineItem}
            effect="clear"
            interactive
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${routine.title} - ${routine.completed ? 'Completed' : 'Pending'}`}
          >
            <View style={styles.routineInfo}>
              <Text style={[styles.routineName, { color: PlatformColor('labelColor') }]}>
                {routine.title}
              </Text>
              <Text style={[styles.routineMeta, { color: PlatformColor('secondaryLabelColor') }]}>
                {routine.frequency} • {routine.scheduledTime}
              </Text>
            </View>
            <View style={styles.routineStats}>
              <Text style={[styles.routineStreak, { color: PlatformColor('systemOrange') }]}>
                {routine.streak} day streak
              </Text>
              <Text style={[
                styles.routineStatus,
                { color: routine.completed ? PlatformColor('systemGreen') : PlatformColor('secondaryLabelColor') }
              ]}>
                {routine.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </LiquidGlassView>
        ))}
      </LiquidGlassView>
    </LiquidGlassView>
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
        
        <LiquidGlassView style={styles.navigation} effect="clear">
          <LiquidGlassContainerView spacing={8}>
            {sections.map((_, index) => (
              <LiquidGlassView
                key={index}
                style={[
                  styles.indicator,
                  currentSection === index && styles.activeIndicator,
                  !isLiquidGlassSupported && styles.fallbackIndicator,
                ]}
                effect={currentSection === index ? "regular" : "clear"}
                interactive
                onPress={() => setCurrentSection(index)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Navigate to ${sections[index]} section`}
              />
            ))}
          </LiquidGlassContainerView>
          <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>
            {sections[currentSection]}
          </Text>
        </LiquidGlassView>
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
    padding: 16,
    borderRadius: 16,
  },
  sectionHeader: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
  },
  mainCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  fallbackCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mainValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  mainLabel: {
    fontSize: 16,
  },
  secondaryCards: {
    flexDirection: 'row',
    gap: 16,
  },
  secondaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  secondaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  secondaryLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  chartCard: {
    borderRadius: 16,
    padding: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    fontSize: 14,
    marginTop: 8,
  },
  calendarCard: {
    borderRadius: 16,
    padding: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: '600',
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
    fontWeight: '500',
  },
  routinesCard: {
    borderRadius: 16,
    padding: 16,
    maxHeight: 300,
  },
  routineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  routineMeta: {
    fontSize: 12,
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
    padding: 16,
    borderRadius: 16,
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
  },
  activeIndicator: {
    transform: [{ scale: 1.25 }],
  },
  fallbackIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
