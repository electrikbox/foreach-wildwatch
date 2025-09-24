import AsyncStorage from '@react-native-async-storage/async-storage';
import { Observation } from '../types/observation-types';

const STORAGE_KEY = 'observations';

// Récupérer toutes les observations
export async function getObservations(): Promise<Observation[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading observations:', error);
    return [];
  }
}

// Ajouter une observation
export async function addObservation(observation: Omit<Observation, 'id' | 'createdAt'>): Promise<Observation> {
  try {
    const newObservation: Observation = {
      ...observation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const observations = await getObservations();
    const updatedObservations = [...observations, newObservation];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedObservations));

    return newObservation;
  } catch (error) {
    console.error('Error adding observation:', error);
    throw error;
  }
}

// Mettre à jour une observation
export async function updateObservation(id: string, updatedData: Partial<Observation>): Promise<void> {
  try {
    const observations = await getObservations();
    const updatedObservations = observations.map(obs =>
      obs.id === id ? { ...obs, ...updatedData } : obs
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedObservations));
  } catch (error) {
    console.error('Error updating observation:', error);
    throw error;
  }
}

// Supprimer une observation
export async function deleteObservation(id: string): Promise<void> {
  try {
    const observations = await getObservations();
    const filteredObservations = observations.filter(obs => obs.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredObservations));
  } catch (error) {
    console.error('Error deleting observation:', error);
    throw error;
  }
}

