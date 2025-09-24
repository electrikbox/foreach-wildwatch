import React from 'react';
import { View, StyleSheet } from 'react-native';

export const MapStatusOverlay: React.FC = () => {
  return <View style={styles.statusBarOverlay} />;
};

const styles = StyleSheet.create({
  statusBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1,
    pointerEvents: 'none',
  },
});