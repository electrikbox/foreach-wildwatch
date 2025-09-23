import * as Location from 'expo-location';
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(process.env.PUBLIC_MAPBOX_ACCESS_TOKEN!);

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      console.log('Requesting location permission...');

      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Permission status:', status);

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      console.log('Getting current position...');
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log('Location received:', currentLocation.coords.latitude, currentLocation.coords.longitude);
      setLocation(currentLocation);
    }

    getCurrentLocation();
  }, []);

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph}>{errorMsg}</Text>
      </SafeAreaView>
    );
  }

  if (!location) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph}>Waiting for location...</Text>
      </SafeAreaView>
    );
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
  container: {
    flex: 1,
  },
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
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  annotationContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    borderWidth: 4,
    borderColor: 'white',
  },
  scaleBarOutsideSafeArea: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 3,
  },
  scaleBarText: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
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
});
