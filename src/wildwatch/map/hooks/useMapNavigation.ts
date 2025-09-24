import { useRouter } from 'expo-router';

export const useMapNavigation = () => {
  const router = useRouter();

  const handleMapPress = (event: any) => {
    const { coordinates } = event.geometry;
    const [longitude, latitude] = coordinates;

    router.push({
      pathname: '/observation-form',
      params: {
        mode: 'add',
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
    });
  };

  const handleObservationPress = (observationId: string) => {
    router.push({
      pathname: '/observation-form',
      params: {
        mode: 'edit',
        observationId,
      },
    });
  };

  return {
    handleMapPress,
    handleObservationPress,
  };
};