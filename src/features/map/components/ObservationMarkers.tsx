import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Mapbox from '@rnmapbox/maps';
import { MaterialIcons } from '@expo/vector-icons';
import { Observation } from '../../shared/types/observation-types';

interface ObservationMarkersProps {
  observations: Observation[];
  onObservationPress: (observationId: string) => void;
}

const ObservationMarker: React.FC<{ observation: Observation; onPress: () => void }> = ({
  observation,
  onPress
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(1.2, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Mapbox.MarkerView
      id={observation.id}
      coordinate={[observation.longitude, observation.latitude]}
      anchor={{ x: 0.5, y: 1 }}
      allowOverlap={true}
      allowOverlapWithPuck={true}
    >
      <View style={styles.markerWrapper}>
        <Pressable
          style={styles.markerContent}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={animatedStyle}>
            <View style={styles.labelCapsule}>
              <Text style={styles.labelText}>{observation.name}</Text>
            </View>
            <MaterialIcons
              name="location-on"
              size={50}
              color="#FF6B35"
              style={styles.locationIcon}
            />
          </Animated.View>
        </Pressable>
      </View>
    </Mapbox.MarkerView>
  );
};

export const ObservationMarkers: React.FC<ObservationMarkersProps> = ({
  observations,
  onObservationPress,
}) => {
  return (
    <>
      {observations.map((observation) => (
        <ObservationMarker
          key={observation.id}
          observation={observation}
          onPress={() => onObservationPress(observation.id)}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  markerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 100,
    paddingTop: 10,
  },
  markerContent: {
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
    maxWidth: 130,
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
});