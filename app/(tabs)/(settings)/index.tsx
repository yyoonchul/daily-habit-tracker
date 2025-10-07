import React from 'react';
import { View, Text, ScrollView, StyleSheet, PlatformColor, Pressable } from 'react-native';
import { LiquidGlassCard, BottomNavigation, MainHeader } from '../../../src/components';
import { useTheme, colorPresets, ColorPreset } from '../../../src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const colorOptions: Array<{ name: string; key: ColorPreset; color: string }> = [
  { name: 'Blue', key: 'blue', color: 'hsl(214, 100%, 59%)' },
  { name: 'Purple', key: 'purple', color: 'hsl(262, 83%, 58%)' },
  { name: 'Green', key: 'green', color: 'hsl(142, 76%, 36%)' },
  { name: 'Orange', key: 'orange', color: 'hsl(25, 95%, 53%)' },
  { name: 'Pink', key: 'pink', color: 'hsl(330, 81%, 60%)' },
  { name: 'Red', key: 'red', color: 'hsl(0, 84%, 60%)' },
];

export default function SettingsScreen() {
  const { primaryColor, setPrimaryColor, theme, setTheme } = useTheme();

  const handleColorSelect = (color: string) => {
    setPrimaryColor(color);
  };

  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <MainHeader title="Settings" subtitle="Customize your app experience" />

        {/* Theme Color Section */}
        <LiquidGlassCard effect="regular" style={styles.section}>
          <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>
            Theme Color
          </Text>
          <Text style={[styles.sectionDescription, { color: PlatformColor('secondaryLabelColor') }]}>
            Choose a color that will be used throughout the app
          </Text>

          <View style={styles.colorGrid}>
            {colorOptions.map((option) => {
              const isSelected = primaryColor === colorPresets[option.key];

              return (
                <Pressable
                  key={option.key}
                  onPress={() => handleColorSelect(colorPresets[option.key])}
                  style={[
                    styles.colorButton,
                    isSelected && styles.colorButtonSelected,
                  ]}
                >
                  <View
                    style={[
                      styles.colorCircle,
                      { backgroundColor: option.color },
                    ]}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={20} color="white" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.colorLabel,
                      { color: PlatformColor('labelColor') },
                    ]}
                  >
                    {option.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </LiquidGlassCard>

        {/* Appearance Section */}
        <LiquidGlassCard effect="regular" style={styles.section}>
          <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>
            Appearance
          </Text>
          <Text style={[styles.sectionDescription, { color: PlatformColor('secondaryLabelColor') }]}>
            Choose how the app looks on your device
          </Text>

          <View style={styles.modeOptions}>
            {/* Light Mode */}
            <View style={styles.modeRow}>
              <View style={styles.modeLabel}>
                <Ionicons
                  name="sunny-outline"
                  size={20}
                  color={PlatformColor('secondaryLabelColor')}
                />
                <Text style={[styles.modeText, { color: PlatformColor('labelColor') }]}>
                  Light Mode
                </Text>
              </View>
              <Pressable
                onPress={() => handleThemeSelect('light')}
                style={[
                  styles.modeButton,
                  theme === 'light' && styles.modeButtonActive,
                ]}
              >
                {theme === 'light' && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color={PlatformColor('labelColor')}
                    style={styles.checkIcon}
                  />
                )}
                <Text
                  style={[
                    styles.modeButtonText,
                    { color: PlatformColor('labelColor') },
                  ]}
                >
                  Light
                </Text>
              </Pressable>
            </View>

            {/* Dark Mode */}
            <View style={styles.modeRow}>
              <View style={styles.modeLabel}>
                <Ionicons
                  name="moon-outline"
                  size={20}
                  color={PlatformColor('secondaryLabelColor')}
                />
                <Text style={[styles.modeText, { color: PlatformColor('labelColor') }]}>
                  Dark Mode
                </Text>
              </View>
              <Pressable
                onPress={() => handleThemeSelect('dark')}
                style={[
                  styles.modeButton,
                  theme === 'dark' && styles.modeButtonActive,
                ]}
              >
                {theme === 'dark' && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color={PlatformColor('labelColor')}
                    style={styles.checkIcon}
                  />
                )}
                <Text
                  style={[
                    styles.modeButtonText,
                    { color: PlatformColor('labelColor') },
                  ]}
                >
                  Dark
                </Text>
              </Pressable>
            </View>

            {/* System Mode */}
            <View style={styles.modeRow}>
              <View style={styles.modeLabel}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color={PlatformColor('secondaryLabelColor')}
                />
                <Text style={[styles.modeText, { color: PlatformColor('labelColor') }]}>
                  System
                </Text>
              </View>
              <Pressable
                onPress={() => handleThemeSelect('system')}
                style={[
                  styles.modeButton,
                  theme === 'system' && styles.modeButtonActive,
                ]}
              >
                {theme === 'system' && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color={PlatformColor('labelColor')}
                    style={styles.checkIcon}
                  />
                )}
                <Text
                  style={[
                    styles.modeButtonText,
                    { color: PlatformColor('labelColor') },
                  ]}
                >
                  Auto
                </Text>
              </Pressable>
            </View>
          </View>
        </LiquidGlassCard>

        {/* About Section */}
        <LiquidGlassCard effect="regular" style={styles.section}>
          <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>
            About
          </Text>

          <View style={styles.aboutInfo}>
            <View style={styles.aboutRow}>
              <Text style={[styles.aboutLabel, { color: PlatformColor('secondaryLabelColor') }]}>
                Version
              </Text>
              <Text style={[styles.aboutValue, { color: PlatformColor('labelColor') }]}>
                1.0.0
              </Text>
            </View>

            <View style={styles.aboutRow}>
              <Text style={[styles.aboutLabel, { color: PlatformColor('secondaryLabelColor') }]}>
                Build
              </Text>
              <Text style={[styles.aboutValue, { color: PlatformColor('labelColor') }]}>
                2024.01
              </Text>
            </View>
          </View>
        </LiquidGlassCard>
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  colorButton: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: PlatformColor('systemBlue'),
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  modeOptions: {
    gap: 16,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modeText: {
    fontSize: 16,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  modeButtonActive: {
    backgroundColor: PlatformColor('systemBlue'),
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  checkIcon: {
    marginRight: 4,
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
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});

