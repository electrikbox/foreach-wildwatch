import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingScreenProps } from '../types/observation-types';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Chargement de votre position..."
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />
        <Text style={styles.message}>{message}</Text>
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
    padding: 20,
  },
  spinner: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
});