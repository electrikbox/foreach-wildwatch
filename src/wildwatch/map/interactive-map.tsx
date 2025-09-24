import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Mapbox from '@rnmapbox/maps';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useCurrentPosition } from '../../shared/location/userCurrentPosition';
import { useObservations } from '../observation-management/observation-repository';
import { LoadingScreen } from '../../shared/components/LoadingScreen';
import { UnauthorizedScreen } from '../../shared/components/UnauthorizedScreen';

// Configuration du token Mapbox depuis les variables d'environnement
const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error('EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN is not defined in environment variables');
}

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

export default function Index() {
  const { location, status, error, requestPermission } = useCurrentPosition();
  const { observations, refreshObservations } = useObservations();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      refreshObservations();
    }, [refreshObservations])
  );

  const handleMapPress = (event: any) => {
    const { coordinates } = event.geometry;
    const [longitude, latitude] = coordinates;

    router.push({
      pathname: '/observation-form',
      params: {
        mode: 'add',
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
    });
  };

  const handleObservationPress = (observationId: string) => {
    router.push({
      pathname: '/observation-form',
      params: {
        mode: 'edit',
        observationId,
      },
    });
  };


  if (status === 'loading') {
    return <LoadingScreen message="Chargement de votre position..." />;
  }

  if (status === 'denied') {
    return <UnauthorizedScreen onRetry={requestPermission} />;
  }

  if (status === 'error') {
    return <LoadingScreen message={`Erreur: ${error}`} />;
  }

  if (!location) {
    return <LoadingScreen message="Récupération de la position..." />;
  }

  return (
    <View style={styles.fullContainer}>
      <Mapbox.MapView
        style={styles.fullscreen}
        styleURL={Mapbox.StyleURL.Street}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        scaleBarEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled={false}
        onPress={handleMapPress}
      >
        <Mapbox.Camera
          centerCoordinate={[location.coords.longitude, location.coords.latitude]}
          zoomLevel={15}
          animationMode="flyTo"
          animationDuration={1000}
        />
        <Mapbox.PointAnnotation
          id="userLocation"
          coordinate={[location.coords.longitude, location.coords.latitude]}
        >
          <View style={styles.annotationContainer} />
        </Mapbox.PointAnnotation>

        {observations.map((observation) => (
          <Mapbox.MarkerView
            key={observation.id}
            id={observation.id}
            coordinate={[observation.longitude, observation.latitude]}
            anchor={{ x: 0.5, y: 1 }}
            allowOverlap={true}
            allowOverlapWithPuck={true}
          >
            <TouchableOpacity
              style={styles.markerContainer}
              onPress={() => handleObservationPress(observation.id)}
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
        ))}
      </Mapbox.MapView>
      <View style={styles.statusBarOverlay} />
      <View style={styles.positionFrame}>
        <Text style={styles.positionTitle}>Ma position:</Text>
        <View style={styles.coordinatesRow}>
          <Text style={styles.positionText}>
            Latitude: {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.positionText}>
            Longitude: {location.coords.longitude.toFixed(6)}
          </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullscreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
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
  annotationContainer: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    borderWidth: 4,
    borderColor: 'white',
  },
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
