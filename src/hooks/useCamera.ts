import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

interface UseCameraReturn {
  fotoUri: string | null;
  fotoBase64: string | null;
  pickFromCamera: () => Promise<void>;
  pickFromGallery: () => Promise<void>;
  clearPhoto: () => void;
}

export const useCamera = (): UseCameraReturn => {
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);

  const pickFromCamera = async (): Promise<void> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Se necesita permiso para usar la cámara.",
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
      setFotoBase64(result.assets[0].base64 ?? null);
    }
  };

  const pickFromGallery = async (): Promise<void> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Se necesita permiso para acceder a la galería.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
      setFotoBase64(result.assets[0].base64 ?? null);
    }
  };

  const clearPhoto = (): void => {
    setFotoUri(null);
    setFotoBase64(null);
  };

  return { fotoUri, fotoBase64, pickFromCamera, pickFromGallery, clearPhoto };
};
