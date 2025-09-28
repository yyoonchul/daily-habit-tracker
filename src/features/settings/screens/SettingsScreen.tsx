import React from 'react';
import { View, Text, StyleSheet, ScrollView, PlatformColor } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LiquidGlassView, LiquidGlassContainerView, isLiquidGlassSupported } from '@callstack/liquid-glass';

import { useTheme } from '../../../contexts/ThemeContext';
import { LiquidGlassButton, LiquidGlassCard } from '../../../components/ui';

export default function SettingsScreen() {
  const { primaryColor, setPrimaryColor } = useTheme();

  const colorOptions = [
    { name: 'Blue', value: '#007AFF', color: PlatformColor('systemBlue') },
    { name: 'Green', value: '#34C759', color: PlatformColor('systemGreen') },
    { name: 'Orange', value: '#FF9500', color: PlatformColor('systemOrange') },
    { name: 'Red', value: '#FF3B30', color: PlatformColor('systemRed') },
    { name: 'Purple', value: '#AF52DE', color: PlatformColor('systemPurple') },
    { name: 'Pink', value: '#FF2D92', color: PlatformColor('systemPink') },
  ];

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
  };

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
              Settings
            </Text>
          </LiquidGlassView>

          {/* Theme Section */}
          <LiquidGlassView style={styles.section} effect="clear">
            <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>
              Theme
            </Text>
            <Text style={[styles.sectionSubtitle, { color: PlatformColor('secondaryLabelColor') }]}>
              Choose your preferred accent color
            </Text>
            
            <LiquidGlassContainerView spacing={12}>
              {colorOptions.map((option) => (
                <LiquidGlassView
                  key={option.value}
                  style={[
                    styles.colorOption,
                    primaryColor === option.value && styles.selectedColorOption,
                    !isLiquidGlassSupported && styles.fallbackCard,
                  ]}
                  effect="clear"
                  interactive
                  tintColor={primaryColor === option.value ? option.value + '20' : undefined}
                  onPress={() => handleColorChange(option.value)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${option.name} color`}
                >
                  <View style={[styles.colorPreview, { backgroundColor: option.value }]} />
                  <Text style={[styles.colorName, { color: PlatformColor('labelColor') }]}>
                    {option.name}
                  </Text>
                  {primaryColor === option.value && (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={20} 
                      color={PlatformColor('systemGreen')} 
                    />
                  )}
                </LiquidGlassView>
              ))}
            </LiquidGlassContainerView>
          </LiquidGlassView>

          {/* App Info Section */}
          <LiquidGlassView style={styles.section} effect="clear">
            <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>
              About
            </Text>
            
            <LiquidGlassView
              style={[
                styles.infoCard,
                !isLiquidGlassSupported && styles.fallbackCard,
              ]}
              effect="regular"
            >
              <View style={styles.infoItem}>
                <Ionicons name="information-circle" size={20} color={PlatformColor('systemBlue')} />
                <Text style={[styles.infoLabel, { color: PlatformColor('labelColor') }]}>
                  Version
                </Text>
                <Text style={[styles.infoValue, { color: PlatformColor('secondaryLabelColor') }]}>
                  1.0.0
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="build" size={20} color={PlatformColor('systemOrange')} />
                <Text style={[styles.infoLabel, { color: PlatformColor('labelColor') }]}>
                  Build
                </Text>
                <Text style={[styles.infoValue, { color: PlatformColor('secondaryLabelColor') }]}>
                  2024.1
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="heart" size={20} color={PlatformColor('systemRed')} />
                <Text style={[styles.infoLabel, { color: PlatformColor('labelColor') }]}>
                  Made with
                </Text>
                <Text style={[styles.infoValue, { color: PlatformColor('secondaryLabelColor') }]}>
                  React Native & Expo
                </Text>
              </View>
            </LiquidGlassView>
          </LiquidGlassView>

          {/* Actions Section */}
          <LiquidGlassView style={styles.section} effect="clear">
            <Text style={[styles.sectionTitle, { color: PlatformColor('labelColor') }]}>
              Actions
            </Text>
            
            <LiquidGlassContainerView spacing={12}>
              <LiquidGlassButton
                title="Export Data"
                onPress={() => {}}
                variant="secondary"
                size="medium"
                style={styles.actionButton}
                accessibilityLabel="Export your routine data"
              />
              
              <LiquidGlassButton
                title="Reset All Data"
                onPress={() => {}}
                variant="error"
                size="medium"
                style={styles.actionButton}
                accessibilityLabel="Reset all routine data"
              />
            </LiquidGlassContainerView>
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
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: PlatformColor('systemBlue'),
  },
  fallbackCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  colorName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 14,
  },
  actionButton: {
    marginBottom: 8,
  },
});
