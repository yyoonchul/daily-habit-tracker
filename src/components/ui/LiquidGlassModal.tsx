import React from 'react';
import { Modal, StyleSheet, ViewStyle, PlatformColor, Pressable, View } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

interface LiquidGlassModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function LiquidGlassModal({
  visible,
  onClose,
  children,
  style,
}: LiquidGlassModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.backdrop} />
        <Pressable onPress={(e) => e.stopPropagation()}>
          <LiquidGlassView
            style={[
              styles.modal,
              !isLiquidGlassSupported && styles.fallback,
              style,
            ]}
            effect="regular"
            interactive
          >
            {children}
          </LiquidGlassView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    maxWidth: 400,
    width: '100%',
    padding: 20,
    borderRadius: 20,
  },
  fallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

