import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { detailStyles } from "../../styles/appStyles";
import { AppScreenProps } from "../../navigation/typesNavigation";
import { Gasto } from "../../types/gasto";
import { gastoService } from "../../services/gastoService";
import { useFocusEffect } from "@react-navigation/native";

type Props = AppScreenProps<"Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { id } = route.params;

  const [gasto, setGasto] = useState<Gasto | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadGasto();
    }, []),
  );

  const loadGasto = async (): Promise<void> => {
    try {
      const data = await gastoService.getById(id);
      setGasto(data);
      if (data === null) {
        Alert.alert("Error", "Gasto no encontrado");
        navigation.goBack();
        return;
      }
    } catch (error) {
      Alert.alert("Error", "No se puede cargar el gasto");
      console.log(error);
    }
  };

  const confirmDelete = (): void => {
    if (gasto === null) return;

    Alert.alert(
      "Eliminar gasto",
      `¿Estás seguro que quieres eliminar "${gasto.descripcion}"? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: handleDelete },
      ]
    );
  };

  const handleDelete = async (): Promise<void> => {
    if (gasto === null) return;
    try {
      await gastoService.delete(gasto.id);
      Alert.alert("Exitoso", "Gasto eliminado con éxito", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "El gasto no se puede eliminar");
      console.log(error);
    }
  };

  if (gasto === null) {
    return (
      <View style={detailStyles.container}>
        <Text style={detailStyles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={detailStyles.container}>
      {/* Foto del comprobante */}
      {gasto.fotoUri && (
        <View style={detailStyles.fotoContainer}>
          <Text style={detailStyles.label}>Comprobante</Text>
          <Image
            source={{ uri: gasto.fotoUri }}
            style={detailStyles.foto}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={detailStyles.card}>
        <Text style={detailStyles.title}>{gasto.descripcion}</Text>
        <Text style={detailStyles.montoDestacado}>${gasto.monto.toFixed(2)}</Text>

        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Categoría</Text>
          <Text style={detailStyles.value}>{gasto.categoria}</Text>
        </View>

        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Fecha</Text>
          <Text style={detailStyles.value}>{gasto.fecha}</Text>
        </View>

        <View style={detailStyles.field}>
          <Text style={detailStyles.label}>Observación</Text>
          <Text style={detailStyles.value}>
            {gasto.observacion ? gasto.observacion : "Sin observación"}
          </Text>
        </View>

        <View style={detailStyles.buttonContainer}>
          <TouchableOpacity
            style={detailStyles.editButton}
            onPress={() => navigation.navigate("Form", { id: gasto.id })}
          >
            <Text style={detailStyles.editButtonText}>✏️ Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={detailStyles.deleteButton}
            onPress={confirmDelete}
          >
            <Text style={detailStyles.deleteButtonText}>🗑️ Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Ubicación del gasto */}
      {gasto.latitud !== undefined && gasto.longitud !== undefined && (
        <View style={detailStyles.mapContainer}>
          <Text style={detailStyles.mapLabel}>Ubicación del gasto</Text>
          <View style={detailStyles.coordsCard}>
            <Text style={detailStyles.coordsText}>
              📍 Latitud: {gasto.latitud.toFixed(6)}
            </Text>
            <Text style={detailStyles.coordsText}>
              📍 Longitud: {gasto.longitud.toFixed(6)}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
