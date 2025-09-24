import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Observation } from '../../shared/types/observation-types';
import { useObservations } from './observation-repository';

export default function ObservationForm() {
  const router = useRouter();
  const { latitude, longitude, observationId, mode } = useLocalSearchParams();
  const { observations, addObservation, updateObservation, deleteObservation: deleteObservationHook, isLoading: isLoadingObservations } = useObservations();
  const [observation, setObservation] = useState<Observation | null>(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(mode === 'edit');
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditMode = mode === 'edit';

  useEffect(() => {
    if (isEditMode && observationId && !isLoadingObservations && observations.length > 0 && !isDeleting) {
      loadObservation();
    } else if (!isEditMode) {
      // En mode création, initialiser avec la date d'aujourd'hui
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [observationId, isEditMode, observations, isLoadingObservations, isDeleting]);

  const loadObservation = async () => {
    try {
      const found = observations.find(obs => obs.id === observationId);

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
  };

  const saveObservation = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom pour cette observation');
      return;
    }

    setIsLoading(true);
    try {
      if (isEditMode && observation) {
        // Mode édition
        await updateObservation(observation.id, { name: name.trim() });
        Alert.alert('Succès', 'Observation modifiée !', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        // Mode ajout
        const newObservationData = {
          name: name.trim(),
          latitude: parseFloat(latitude as string),
          longitude: parseFloat(longitude as string),
          date: new Date(date).toISOString(),
        };
        await addObservation(newObservationData);
        Alert.alert('Succès', 'Observation enregistrée !', [
          { text: 'OK', onPress: () => router.back() }
        ]);
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

    Alert.alert(
      'Confirmer la suppression',
      'Voulez-vous vraiment supprimer cette observation ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeleting(true);
              await deleteObservationHook(observation.id);
              Alert.alert('Succès', 'Observation supprimée !', [
                { text: 'OK', onPress: () => router.back() }
              ]);
            } catch (error) {
              console.error('Error deleting observation:', error);
              Alert.alert('Erreur', 'Impossible de supprimer l\'observation');
              setIsDeleting(false);
            }
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoadingData || (isEditMode && isLoadingObservations)) {
    return (
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Chargement...</Text>
        </View>
      </View>
    );
  }

  // Calcul des données d'affichage
  const displayLatitude = isEditMode ? observation?.latitude : parseFloat(latitude as string);
  const displayLongitude = isEditMode ? observation?.longitude : parseFloat(longitude as string);

  const title = isEditMode ? 'Modifier l\'observation' : 'Nouvelle observation';
  const saveButtonText = isEditMode
    ? (isLoading ? 'Modification...' : 'Modifier')
    : (isLoading ? 'Enregistrement...' : 'Enregistrer');

  return (
    <TouchableWithoutFeedback onPress={handleCancel}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Position :</Text>
          <Text style={styles.infoText}>
            {displayLatitude?.toFixed(6)}, {displayLongitude?.toFixed(6)}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nom de l'observation :</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Entrez un nom..."
            placeholderTextColor="#999"
            autoFocus
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date :</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            onPress={saveObservation}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>{saveButtonText}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>

        {isEditMode && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteObservation}
            disabled={isLoading}
          >
            <Text style={styles.deleteButtonText}>Supprimer l'observation</Text>
          </TouchableOpacity>
        )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 15,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});