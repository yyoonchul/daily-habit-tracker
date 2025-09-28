import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '@/contexts/ThemeContext';
import { ThemeColor, ThemeMode } from '@/types';

export default function SettingsScreen() {
  const { primaryColor, setPrimaryColor, theme, setTheme, colorPresets } = useTheme();

  const colorOptions: { name: string; value: ThemeColor; color: string }[] = [
    { name: 'Blue', value: 'blue', color: colorPresets.blue },
    { name: 'Purple', value: 'purple', color: colorPresets.purple },
    { name: 'Green', value: 'green', color: colorPresets.green },
    { name: 'Orange', value: 'orange', color: colorPresets.orange },
    { name: 'Pink', value: 'pink', color: colorPresets.pink },
    { name: 'Red', value: 'red', color: colorPresets.red },
  ];

  const themeOptions: { name: string; value: ThemeMode; icon: string }[] = [
    { name: 'Light Mode', value: 'light', icon: 'sunny' },
    { name: 'Dark Mode', value: 'dark', icon: 'moon' },
    { name: 'System', value: 'system', icon: 'phone-portrait' },
  ];

  const handleColorSelect = (color: string) => {
    setPrimaryColor(color);
  };

  const handleThemeSelect = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>Customize your app experience</Text>
          </View>

          {/* Theme Color Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Theme Color</Text>
              <Text style={styles.sectionDescription}>
                Choose a color that will be used throughout the app
              </Text>
            </View>
            
            <View style={styles.colorGrid}>
              {colorOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.colorButton,
                    primaryColor === option.color && styles.selectedColorButton
                  ]}
                  onPress={() => handleColorSelect(option.color)}
                >
                  <View style={[styles.colorCircle, { backgroundColor: option.color }]}>
                    {primaryColor === option.color && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <Text style={styles.colorLabel}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Appearance Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Appearance</Text>
              <Text style={styles.sectionDescription}>
                Choose how the app looks on your device
              </Text>
            </View>
            
            <View style={styles.themeOptions}>
              {themeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.themeButton,
                    theme === option.value && styles.selectedThemeButton
                  ]}
                  onPress={() => handleThemeSelect(option.value)}
                >
                  <View style={styles.themeButtonContent}>
                    <Ionicons 
                      name={option.icon as any} 
                      size={20} 
                      color={theme === option.value ? 'white' : 'rgba(255, 255, 255, 0.7)'} 
                    />
                    <Text style={[
                      styles.themeButtonText,
                      theme === option.value && styles.selectedThemeButtonText
                    ]}>
                      {option.name}
                    </Text>
                    {theme === option.value && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>About</Text>
            </View>
            
            <View style={styles.aboutInfo}>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Version</Text>
                <Text style={styles.aboutValue}>1.0.0</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Build</Text>
                <Text style={styles.aboutValue}>2024.01</Text>
              </View>
            </View>
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
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    backdropFilter: 'blur(10px)',
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: '30%',
  },
  selectedColorButton: {
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  themeOptions: {
    gap: 12,
  },
  themeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedThemeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'white',
  },
  themeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeButtonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
  },
  selectedThemeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  aboutInfo: {
    gap: 12,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  aboutValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
});
