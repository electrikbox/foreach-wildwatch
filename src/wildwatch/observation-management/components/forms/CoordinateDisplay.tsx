import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CoordinateDisplayProps {
  latitude: number;
  longitude: number;
}

export const CoordinateDisplay: React.FC<CoordinateDisplayProps> = ({
  latitude,
  longitude,
}) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Position :</Text>
      <Text style={styles.infoText}>
        {latitude.toFixed(6)}, {longitude.toFixed(6)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});