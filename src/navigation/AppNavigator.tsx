import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PlatformColor } from 'react-native';

// Import screens from features
import RoutineScreen from '../features/routine/screens/RoutineScreen';
import AnalyticsScreen from '../features/analytics/screens/AnalyticsScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Routine') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: PlatformColor('systemBlue'),
        tabBarInactiveTintColor: PlatformColor('secondaryLabelColor'),
        tabBarStyle: {
          backgroundColor: PlatformColor('systemBackground'),
          borderTopColor: PlatformColor('separatorColor'),
        },
        headerStyle: {
          backgroundColor: PlatformColor('systemBackground'),
        },
        headerTintColor: PlatformColor('labelColor'),
      })}
    >
      <Tab.Screen 
        name="Routine" 
        component={RoutineScreen}
        options={{ title: 'Daily Routines' }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{ title: 'Analytics' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
