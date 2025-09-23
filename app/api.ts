import AsyncStorage from '@react-native-async-storage/async-storage';

interface Observation {
    id: string;
    species: string;
    location: {
        latitude: number;
        longitude: number;
    };
    timestamp: number;
}

const STORAGE_KEY = 'observations';

export async function saveObservation(observation: Observation): Promise<void> {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        const observations: Observation[] = existing ? JSON.parse(existing) : [];
        observations.push(observation);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
    } catch (error) {
        console.error('Error saving observation:', error);
    }
}

export async function getObservations(): Promise<Observation[]> {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        return existing ? JSON.parse(existing) : [];
    } catch (error) {
        console.error('Error retrieving observations:', error);
        return [];
    }
}

export async function getObservation(id: string): Promise<Observation | null> {
    try {
        const observations = await getObservations();
        return observations.find(obs => obs.id === id) || null;
    } catch (error) {
        console.error('Error retrieving observation:', error);
        return null;
    }
}

export async function updateObservation(id: string, updatedObservation: Partial<Observation>): Promise<void> {
    try {
        const observations = await getObservations();
        const index = observations.findIndex(obs => obs.id === id);
        if (index !== -1) {
            observations[index] = { ...observations[index], ...updatedObservation };
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
        }
    } catch (error) {
        console.error('Error updating observation:', error);
    }
}

export async function deleteObservation(id: string): Promise<void> {
    try {
        const observations = await getObservations();
        const filteredObservations = observations.filter(obs => obs.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredObservations));
    } catch (error) {
        console.error('Error deleting observation:', error);
    }
}

export async function clearObservations(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing observations:', error);
    }
}