import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColor, ThemeMode } from '../types';

interface ThemeContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  colorPresets: Record<ThemeColor, string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorPresets: Record<ThemeColor, string> = {
  blue: 'hsl(214, 100%, 59%)',
  purple: 'hsl(262, 83%, 58%)',
  green: 'hsl(142, 76%, 36%)',
  orange: 'hsl(25, 95%, 53%)',
  pink: 'hsl(330, 81%, 60%)',
  red: 'hsl(0, 84%, 60%)',
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColorState] = useState<string>(colorPresets.blue);
  const [theme, setThemeState] = useState<ThemeMode>('system');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedColor = await AsyncStorage.getItem('primaryColor');
      const savedTheme = await AsyncStorage.getItem('theme');
      
      if (savedColor) {
        setPrimaryColorState(savedColor);
      }
      if (savedTheme) {
        setThemeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  };

  const setPrimaryColor = async (color: string) => {
    try {
      setPrimaryColorState(color);
      await AsyncStorage.setItem('primaryColor', color);
    } catch (error) {
      console.error('Error saving primary color:', error);
    }
  };

  const setTheme = async (newTheme: ThemeMode) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        theme,
        setTheme,
        colorPresets,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
