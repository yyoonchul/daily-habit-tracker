import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import contexts
import { RoutineProvider } from './src/contexts/RoutineContext';
import { ThemeProvider } from './src/contexts/ThemeContext';

// Import navigation
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RoutineProvider>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </RoutineProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
