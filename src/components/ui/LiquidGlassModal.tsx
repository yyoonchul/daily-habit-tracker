import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Animated, Dimensions } from 'react-native';
import { PlatformColor } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

interface LiquidGlassModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  effect?: 'clear' | 'regular' | 'none';
  showCloseButton?: boolean;
  accessible?: boolean;
  accessibilityLabel?: string;
}

export const LiquidGlassModal: React.FC<LiquidGlassModalProps> = ({
  visible,
  onClose,
  title,
  children,
  style,
  titleStyle,
  effect = 'regular',
  showCloseButton = true,
  accessible = true,
  accessibilityLabel,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <LiquidGlassView
        style={[
          styles.overlayGlass,
          !isLiquidGlassSupported && styles.fallbackOverlay,
        ]}
        effect="clear"
        onPress={onClose}
        accessible={accessible}
        accessibilityRole="button"
        accessibilityLabel="Close modal"
      >
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LiquidGlassView
            style={[
              styles.modalContent,
              {
                width: width > 768 ? 400 : width - 32,
                maxHeight: height * 0.8,
              },
              !isLiquidGlassSupported && styles.fallbackModal,
              style,
            ]}
            effect={effect}
            interactive
            accessible={accessible}
            accessibilityRole="dialog"
            accessibilityLabel={accessibilityLabel || title}
          >
            {title && (
              <Text style={[styles.title, titleStyle]}>{title}</Text>
            )}
            {children}
            {showCloseButton && (
              <LiquidGlassView
                style={styles.closeButton}
                effect="clear"
                interactive
                onPress={onClose}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </LiquidGlassView>
            )}
          </LiquidGlassView>
        </Animated.View>
      </LiquidGlassView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlayGlass: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 20,
    borderRadius: 20,
    margin: 20,
  },
  fallbackModal: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: PlatformColor('labelColor'),
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: PlatformColor('labelColor'),
    fontWeight: '600',
  },
});
