import React from 'react';
import { View, StyleSheet } from 'react-native';
import Mapbox from '@rnmapbox/maps';

interface UserLocationMarkerProps {
  coordinate: [number, number];
}

export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ coordinate }) => {
  return (
    <Mapbox.PointAnnotation
      id="userLocation"
      coordinate={coordinate}
    >
      <View style={styles.annotationContainer} />
    </Mapbox.PointAnnotation>
  );
};

const styles = StyleSheet.create({
  annotationContainer: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    borderWidth: 4,
    borderColor: 'white',
  },
});