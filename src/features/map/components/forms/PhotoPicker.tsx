import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface PhotoPickerProps {
  photo?: string;
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: () => void;
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({
  photo,
  onPhotoSelected,
  onPhotoRemoved
}) => {
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus.status !== 'granted' || mediaLibraryStatus.status !== 'granted') {
        Alert.alert(
          'Permissions requises',
          'Désolé, nous avons besoin des permissions pour accéder à votre appareil photo et à votre galerie photo.'
        );
        return false;
      }
    }
    return true;
  };

  const showImageSourceSelector = () => {
    Alert.alert(
      'Sélectionner une photo',
      'Choisissez la source de votre photo',
      [
        {
          text: 'Appareil photo',
          onPress: () => pickImageFromCamera(),
        },
        {
          text: 'Galerie',
          onPress: () => pickImageFromLibrary(),
        },
        ...(photo ? [{
          text: 'Supprimer',
          style: 'destructive' as const,
          onPress: onPhotoRemoved,
        }] : []),
        {
          text: 'Annuler',
          style: 'cancel' as const,
        },
      ]
    );
  };

  const pickImageFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      onPhotoSelected(result.assets[0].uri);
    }
  };

  const pickImageFromLibrary = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      onPhotoSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Photo :</Text>
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={showImageSourceSelector}
        activeOpacity={0.7}
      >
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={styles.photo}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>📷</Text>
            <Text style={styles.placeholderSubtext}>Toucher pour ajouter une photo</Text>
          </View>
        )}
        {photo && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Modifier</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  photoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 12,
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});