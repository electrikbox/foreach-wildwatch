import { useState, useEffect, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { Observation } from '../../shared/types/observation-types';
import { useObservations } from '../services/observation-repository';

export const useObservationForm = () => {
  const router = useRouter();
  const { latitude, longitude, observationId, mode } = useLocalSearchParams();
  const {
    observations,
    addObservation,
    updateObservation,
    deleteObservation: deleteObservationHook,
    isLoading: isLoadingObservations
  } = useObservations();

  const [observation, setObservation] = useState<Observation | null>(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(mode === 'edit');
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditMode = mode === 'edit';

  const loadObservation = useCallback(async () => {
    try {
      const found = observations.find((obs: Observation) => obs.id === observationId);

      if (found) {
        setObservation(found);
        setName(found.name);
        setDate(new Date(found.date).toISOString().split('T')[0]);
      } else {
        Alert.alert('Erreur', 'Observation non trouvée');
        router.back();
      }
    } catch (error) {
      console.error('Error loading observation:', error);
      Alert.alert('Erreur', 'Impossible de charger l\'observation');
      router.back();
    } finally {
      setIsLoadingData(false);
    }
  }, [observations, observationId, router]);

  useEffect(() => {
    if (isEditMode && observationId && !isLoadingObservations && observations.length > 0 && !isDeleting) {
      loadObservation();
    } else if (!isEditMode) {
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [observationId, isEditMode, observations, isLoadingObservations, isDeleting, loadObservation]);


  const saveObservation = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom pour cette observation');
      return;
    }

    setIsLoading(true);
    try {
      if (isEditMode && observation) {
        await updateObservation(observation.id, { name: name.trim() });
        router.back();
      } else {
        const newObservationData = {
          name: name.trim(),
          latitude: parseFloat(latitude as string),
          longitude: parseFloat(longitude as string),
          date: new Date(date).toISOString(),
        };
        await addObservation(newObservationData);
        router.back();
      }
    } catch (error) {
      console.error('Error saving observation:', error);
      Alert.alert('Erreur', `Impossible de ${isEditMode ? 'modifier' : 'sauvegarder'} l'observation`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteObservation = async () => {
    if (!observation) return;

    try {
      setIsDeleting(true);
      await deleteObservationHook(observation.id);
      router.back();
    } catch (error) {
      console.error('Error deleting observation:', error);
      Alert.alert('Erreur', 'Impossible de supprimer l\'observation');
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const displayLatitude = isEditMode ? observation?.latitude : parseFloat(latitude as string);
  const displayLongitude = isEditMode ? observation?.longitude : parseFloat(longitude as string);

  const title = isEditMode ? 'Modifier l\'observation' : 'Nouvelle observation';
  const saveButtonText = isEditMode
    ? (isLoading ? 'Modification...' : 'Modifier')
    : (isLoading ? 'Enregistrement...' : 'Enregistrer');

  return {
    // State
    name,
    setName,
    date,
    setDate,
    isLoading,
    isLoadingData,
    isEditMode,

    // Computed values
    title,
    saveButtonText,
    displayLatitude,
    displayLongitude,

    // Actions
    saveObservation,
    deleteObservation,
    handleCancel,

    // Loading states
    isLoadingForm: isLoadingData || (isEditMode && isLoadingObservations),
  };
};