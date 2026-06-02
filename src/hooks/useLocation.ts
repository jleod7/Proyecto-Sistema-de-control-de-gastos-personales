import { useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

interface Coordenadas {
  latitud: number;
  longitud: number;
}

interface UseLocationReturn {
  coordenadas: Coordenadas | null;
  obteniendo: boolean;
  obtenerUbicacion: () => Promise<void>;
  limpiarUbicacion: () => void;
}

export const useLocation = (): UseLocationReturn => {
  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null);
  const [obteniendo, setObteniendo] = useState<boolean>(false);

  const obtenerUbicacion = async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita permiso para acceder a la ubicación.");
      return;
    }
    try {
      setObteniendo(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoordenadas({
        latitud: location.coords.latitude,
        longitud: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la ubicación. Intenta de nuevo.");
      console.log(error);
    } finally {
      setObteniendo(false);
    }
  };

  const limpiarUbicacion = (): void => setCoordenadas(null);

  return { coordenadas, obteniendo, obtenerUbicacion, limpiarUbicacion };
};
