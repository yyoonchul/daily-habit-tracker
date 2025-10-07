import React from 'react';
import { View, StyleSheet, PlatformColor, Pressable } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home', path: '/(tabs)' },
    { name: 'Analytics', icon: 'stats-chart-outline', activeIcon: 'stats-chart', path: '/(tabs)/(analytics)' },
    { name: 'Manage', icon: 'list-outline', activeIcon: 'list', path: '/(tabs)/(management)' },
    { name: 'Settings', icon: 'settings-outline', activeIcon: 'settings', path: '/(tabs)/(settings)' },
  ];

  return (
    <LiquidGlassView
      style={[
        styles.container,
        !isLiquidGlassSupported && styles.fallback,
      ]}
      effect="regular"
    >
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || pathname.startsWith(tab.path);
          const iconName = isActive ? tab.activeIcon : tab.icon;

          return (
            <Pressable
              key={tab.name}
              onPress={() => router.push(tab.path as any)}
              style={styles.tab}
            >
              <Ionicons
                name={iconName as any}
                size={24}
                color={
                  isActive
                    ? PlatformColor('systemBlue')
                    : PlatformColor('secondaryLabelColor')
                }
              />
            </Pressable>
          );
        })}
      </View>
    </LiquidGlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tab: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

