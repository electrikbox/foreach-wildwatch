import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from '../../../shared/components/Button';

interface FormButtonsProps {
  // Actions
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => Promise<void>;

  // States
  saveButtonText: string;
  isLoading: boolean;
  showDeleteButton?: boolean;
}

export const FormButtons: React.FC<FormButtonsProps> = ({
  onSave,
  onCancel,
  onDelete,
  saveButtonText,
  isLoading,
  showDeleteButton = false,
}) => {
  const handleDelete = () => {
    if (!onDelete) return;

    Alert.alert(
      'Confirmer la suppression',
      'Voulez-vous vraiment supprimer cette observation ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: onDelete,
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Save Button */}
      <Button
        title={saveButtonText}
        onPress={onSave}
        variant="primary"
        loading={isLoading}
      />

      {/* Cancel Button */}
      <Button
        title="Annuler"
        onPress={onCancel}
        variant="secondary"
        disabled={isLoading}
      />

      {/* Delete Button - Only in edit mode */}
      {showDeleteButton && (
        <Button
          title="Supprimer l'observation"
          onPress={handleDelete}
          variant="danger"
          disabled={isLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 15,
    marginBottom: 20,
  },
});