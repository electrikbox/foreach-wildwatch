import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import Mapbox from '@rnmapbox/maps';
import { MaterialIcons } from '@expo/vector-icons';
import { Observation } from '../../shared/types/observation-types';

interface ObservationMarkersProps {
  observations: Observation[];
  onObservationPress: (observationId: string) => void;
  mapLoaded: boolean;
}

const ObservationMarker: React.FC<{
  observation: Observation;
  onPress: () => void;
  mapLoaded: boolean;
}> = ({ observation, onPress, mapLoaded }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (mapLoaded) {
      const randomDelay = Math.random() * 400; // Délai aléatoire entre 0 et 400ms

      const timer = setTimeout(() => {
        // Animation bounce avec scale et opacity
        opacity.value = withTiming(1, { duration: 200 });
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 250,
          mass: 1,
        });
      }, randomDelay);

      return () => clearTimeout(timer);
    }
  }, [mapLoaded]);

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: 20,
      stiffness: 500,
    }, () => {
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 500,
      });
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
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
      <Animated.View style={[styles.markerWrapper, animatedStyle]}>
        <View style={styles.markerContent}>
          <View style={styles.labelCapsule}>
            <Text style={styles.labelText}>{observation.name}</Text>
          </View>
          <Pressable onPress={onPress} onPressIn={handlePressIn}>
            <MaterialIcons
              name="location-on"
              size={50}
              color="#FF6B35"
              style={styles.locationIcon}
            />
          </Pressable>
        </View>
      </Animated.View>
    </Mapbox.MarkerView>
  );
};

export const ObservationMarkers: React.FC<ObservationMarkersProps> = ({
  observations,
  onObservationPress,
  mapLoaded,
}) => {
  return (
    <>
      {observations.map((observation) => (
        <ObservationMarker
          key={observation.id}
          observation={observation}
          onPress={() => onObservationPress(observation.id)}
          mapLoaded={mapLoaded}
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