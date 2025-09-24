import React, { useCallback } from 'react';
import { View, StyleSheet } from "react-native";
import Mapbox from '@rnmapbox/maps';
import { useFocusEffect } from 'expo-router';
import { useCurrentPosition } from '../../shared/hooks/useCurrentPosition';
import { useObservations } from '../observation-management/observation-repository';
import { LoadingScreen } from '../../shared/components/LoadingScreen';
import { UnauthorizedScreen } from '../../shared/components/UnauthorizedScreen';
import { UserLocationMarker } from './components/UserLocationMarker';
import { ObservationMarkers } from './components/ObservationMarkers';
import { PositionDisplay } from './components/PositionDisplay';
import { MapStatusOverlay } from './components/MapStatusOverlay';
import { useMapNavigation } from './hooks/useMapNavigation';

// Configuration du token Mapbox depuis les variables d'environnement
const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error('EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN is not defined in environment variables');
}

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);


export default function Index() {
  const { location, status, error, requestPermission } = useCurrentPosition();
  const { observations, refreshObservations } = useObservations();
  const { handleMapPress, handleObservationPress } = useMapNavigation();

  useFocusEffect(
    useCallback(() => {
      refreshObservations();
    }, [refreshObservations])
  );



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
        onDidFinishLoadingMap={() => {}}
      >
        <Mapbox.Camera
          centerCoordinate={[location.coords.longitude, location.coords.latitude]}
          zoomLevel={15}
          animationMode="flyTo"
          animationDuration={1000}
        />
        <UserLocationMarker
          coordinate={[location.coords.longitude, location.coords.latitude]}
        />

        <ObservationMarkers
          observations={observations}
          onObservationPress={handleObservationPress}
        />
      </Mapbox.MapView>
      <MapStatusOverlay />
      <PositionDisplay
        latitude={location.coords.latitude}
        longitude={location.coords.longitude}
      />

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
});
