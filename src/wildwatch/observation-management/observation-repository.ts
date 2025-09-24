import { useState, useEffect, useCallback } from 'react';
import { Observation } from '../../shared/types/observation-types';
import {
  getObservations,
  addObservation as apiAddObservation,
  updateObservation as apiUpdateObservation,
  deleteObservation as apiDeleteObservation
} from '../../shared/api/observation-api';

export const useObservations = () => {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadObservations = useCallback(async () => {
    try {
      setIsLoading(true);
      const observations = await getObservations();
      console.log('📱 Loaded observations from API:', observations);
      setObservations(observations);
    } catch (error) {
      console.error('Error loading observations:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addObservation = async (observation: Omit<Observation, 'id' | 'createdAt'>) => {
    try {
      const newObservation = await apiAddObservation(observation);
      const updatedObservations = [...observations, newObservation];
      setObservations(updatedObservations);
      return newObservation;
    } catch (error) {
      console.error('Error adding observation:', error);
      throw error;
    }
  };

  const updateObservation = async (id: string, updatedData: Partial<Observation>) => {
    try {
      await apiUpdateObservation(id, updatedData);
      const updatedObservations = observations.map(obs =>
        obs.id === id ? { ...obs, ...updatedData } : obs
      );
      setObservations(updatedObservations);
    } catch (error) {
      console.error('Error updating observation:', error);
      throw error;
    }
  };

  const deleteObservation = async (id: string) => {
    try {
      await apiDeleteObservation(id);
      const updatedObservations = observations.filter(obs => obs.id !== id);
      setObservations(updatedObservations);
    } catch (error) {
      console.error('Error deleting observation:', error);
      throw error;
    }
  };


  useEffect(() => {
    loadObservations();
  }, [loadObservations]);

  return {
    observations,
    isLoading,
    addObservation,
    updateObservation,
    deleteObservation,
    refreshObservations: loadObservations,
  };
};