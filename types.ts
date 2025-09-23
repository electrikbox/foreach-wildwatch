// Types et interfaces centralisés pour l'application
import * as Location from 'expo-location';

// ==================== OBSERVATION ====================
export interface Observation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  date: string;
  createdAt: string;
}

// ==================== LOCATION/POSITION ====================
export type LocationStatus = 'loading' | 'granted' | 'denied' | 'error';

export interface UseCurrentPositionReturn {
  location: Location.LocationObject | null;
  status: LocationStatus;
  error: string | null;
  requestPermission: () => Promise<void>;
}

// ==================== COMPOSANTS UI ====================
export interface LoadingScreenProps {
  message?: string;
}

export interface UnauthorizedScreenProps {
  onRetry?: () => void;
}

// ==================== TYPES UTILITAIRES ====================
// Vous pouvez ajouter d'autres types ici au fur et à mesure :
// export type Status = 'idle' | 'loading' | 'success' | 'error';
// export interface ApiResponse<T> { data: T; error?: string; }