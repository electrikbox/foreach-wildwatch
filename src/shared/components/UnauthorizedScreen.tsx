import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UnauthorizedScreenProps } from '../types/observation-types';

export const UnauthorizedScreen: React.FC<UnauthorizedScreenProps> = ({ onRetry }) => {
  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible d\'ouvrir les paramètres. Veuillez y accéder manuellement.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.title}>Accès à la localisation requis</Text>
        <Text style={styles.message}>
          Cette application a besoin d'accéder à votre position pour afficher la carte et votre localisation.
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={openSettings}>
          <Text style={styles.primaryButtonText}>Ouvrir les paramètres</Text>
        </TouchableOpacity>

        {onRetry && (
          <TouchableOpacity style={styles.secondaryButton} onPress={onRetry}>
            <Text style={styles.secondaryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    minWidth: 200,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    minWidth: 200,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});