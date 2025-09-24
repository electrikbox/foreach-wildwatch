import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { MaterialIcons } from '@expo/vector-icons';
import { Observation } from '../../../shared/types/observation-types';

interface SimpleMarkerProps {
  observation: Observation;
  onPress: () => void;
}

const SimpleMarker: React.FC<SimpleMarkerProps> = ({ observation, onPress }) => {
  return (
    <Mapbox.MarkerView
      id={observation.id}
      coordinate={[observation.longitude, observation.latitude]}
      anchor={{ x: 0.5, y: 1 }}
      allowOverlap={true}
      allowOverlapWithPuck={true}
    >
      <TouchableOpacity
        style={styles.markerContainer}
        onPress={onPress}
      >
        <View style={styles.labelCapsule}>
          <Text style={styles.labelText}>{observation.name}</Text>
        </View>
        <MaterialIcons
          name="location-on"
          size={50}
          color="#FF6B35"
          style={styles.locationIcon}
        />
      </TouchableOpacity>
    </Mapbox.MarkerView>
  );
};

interface ObservationMarkersProps {
  observations: Observation[];
  onObservationPress: (observationId: string) => void;
}

export const ObservationMarkers: React.FC<ObservationMarkersProps> = ({
  observations,
  onObservationPress,
}) => {
  return (
    <>
      {observations.map((observation) => (
        <SimpleMarker
          key={observation.id}
          observation={observation}
          onPress={() => onObservationPress(observation.id)}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 10,
  },
  labelCapsule: {
    backgroundColor: '#1a3755',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    maxWidth: 120,
  },
  labelText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  locationIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {
      width: 0,
      height: 2
    },
    textShadowRadius: 10,
    marginTop: -2,
  },
});