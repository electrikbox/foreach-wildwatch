import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  isLoading: boolean;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  isLoading,
}) => {
  const handleDelete = () => {
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
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={handleDelete}
      disabled={isLoading}
    >
      <Text style={styles.deleteButtonText}>Supprimer l&apos;observation</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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