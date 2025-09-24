import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { FormInput } from './components/forms/FormInput';
import { CoordinateDisplay } from './components/forms/CoordinateDisplay';
import { ActionButtons } from './components/forms/ActionButtons';
import { DeleteButton } from './components/forms/DeleteButton';
import { LoadingModal } from './components/modals/LoadingModal';
import { useObservationForm } from './hooks/useObservationForm';

export default function ObservationForm() {
  const {
    name,
    setName,
    date,
    setDate,
    isLoading,
    isEditMode,
    title,
    saveButtonText,
    displayLatitude,
    displayLongitude,
    saveObservation,
    deleteObservation,
    handleCancel,
    isLoadingForm,
  } = useObservationForm();

  if (isLoadingForm) {
    return <LoadingModal message="Chargement..." />;
  }

  return (
    <TouchableWithoutFeedback onPress={handleCancel}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>

        <CoordinateDisplay
          latitude={displayLatitude!}
          longitude={displayLongitude!}
        />

        <FormInput
          label="Nom de l'observation :"
          value={name}
          onChangeText={setName}
          placeholder="Entrez un nom..."
          autoFocus
        />

        <FormInput
          label="Date :"
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />

        <ActionButtons
          onSave={saveObservation}
          onCancel={handleCancel}
          saveButtonText={saveButtonText}
          isLoading={isLoading}
        />

        {isEditMode && (
          <DeleteButton
            onDelete={deleteObservation}
            isLoading={isLoading}
          />
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
});