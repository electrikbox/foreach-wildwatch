import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { LocationStatus, UseCurrentPositionReturn } from '../types/observation-types';

export const useCurrentPosition = (): UseCurrentPositionReturn => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [status, setStatus] = useState<LocationStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      setStatus('loading');
      setError(null);

      console.log('Requesting location permission...');
      const { status: permissionStatus } = await Location.requestForegroundPermissionsAsync();

      console.log('Permission status:', permissionStatus);

      if (permissionStatus !== 'granted') {
        setStatus('denied');
        setError('Permission to access location was denied');
        return;
      }

      setStatus('granted');
      console.log('Getting current position...');

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log('Location received:', currentLocation.coords.latitude, currentLocation.coords.longitude);
      setLocation(currentLocation);
    } catch (err) {
      console.error('Error getting location:', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return {
    location,
    status,
    error,
    requestPermission,
  };
};