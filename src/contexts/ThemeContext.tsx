import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export const colorPresets = {
  blue: '214 100% 59%',
  purple: '262 83% 58%',
  green: '142 76% 36%',
  orange: '25 95% 53%',
  pink: '330 81% 60%',
  red: '0 84% 60%',
};

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorPreset = keyof typeof colorPresets;

interface ThemeContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_settings';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColorState] = useState(colorPresets.blue);
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Load saved preferences
  useEffect(() => {
    loadThemeSettings();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'system') {
        setActualTheme(colorScheme === 'dark' ? 'dark' : 'light');
      }
    });

    return () => subscription.remove();
  }, [theme]);

  // Update actual theme when theme mode changes
  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = Appearance.getColorScheme();
      setActualTheme(systemTheme === 'dark' ? 'dark' : 'light');
    } else {
      setActualTheme(theme);
    }
  }, [theme]);

  const loadThemeSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (settings) {
        const { primaryColor: savedColor, theme: savedTheme } = JSON.parse(settings);
        if (savedColor) setPrimaryColorState(savedColor);
        if (savedTheme) setThemeState(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme settings:', error);
    }
  };

  const saveThemeSettings = async (color: string, themeMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(
        THEME_STORAGE_KEY,
        JSON.stringify({ primaryColor: color, theme: themeMode })
      );
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  };

  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
    saveThemeSettings(color, theme);
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    saveThemeSettings(primaryColor, newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        theme,
        setTheme,
        actualTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

