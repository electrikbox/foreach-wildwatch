import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PositionDisplayProps {
  latitude: number;
  longitude: number;
}

export const PositionDisplay: React.FC<PositionDisplayProps> = ({
  latitude,
  longitude,
}) => {
  return (
    <View style={styles.positionFrame}>
      <Text style={styles.positionTitle}>Ma position:</Text>
      <View style={styles.coordinatesRow}>
        <Text style={styles.positionText}>
          Latitude: {latitude.toFixed(6)}
        </Text>
        <Text style={styles.positionText}>
          Longitude: {longitude.toFixed(6)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  positionFrame: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 15,
  },
  positionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  coordinatesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  positionText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});