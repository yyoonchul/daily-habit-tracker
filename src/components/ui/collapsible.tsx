import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { PlatformColor } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LiquidGlassView
      style={styles.container}
      effect="clear"
      interactive
      tintColor={isOpen ? 'rgba(0, 122, 255, 0.05)' : undefined}
    >
      <LiquidGlassView
        style={styles.heading}
        effect="regular"
        interactive
        onPress={() => setIsOpen((value) => !value)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${isOpen ? 'Collapse' : 'Expand'} ${title}`}
      >
        <Ionicons
          name="chevron-forward"
          size={18}
          color={PlatformColor('labelColor')}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <Text style={styles.titleText}>{title}</Text>
      </LiquidGlassView>
      {isOpen && (
        <LiquidGlassView style={styles.content} effect="clear">
          {children}
        </LiquidGlassView>
      )}
    </LiquidGlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    margin: 8,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  content: {
    marginTop: 12,
    marginLeft: 24,
    padding: 12,
    borderRadius: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: PlatformColor('labelColor'),
    flex: 1,
  },
});
