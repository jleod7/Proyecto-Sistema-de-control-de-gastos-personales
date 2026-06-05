import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from "react-native";
import { feriadosStyles } from "../../styles/appStyles";
import { AppScreenProps } from "../../navigation/typesNavigation";
import { Feriado } from "../../types/feriado";
import { getFeriadosEcuador } from "../../services/feriadoService";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { useFocusEffect } from "@react-navigation/native";

type Props = AppScreenProps<"Feriados">;

export const FeriadosScreen = ({ navigation }: Props) => {
  const [feriados, setFeriados] = useState<Feriado[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [year, setYear] = useState<number>(2026);

  //useFocusEffect: carga los datos cada vez que la pantalla es visible
  useFocusEffect(
    useCallback(() => {
      loadFeriados(year);
    }, [year]),
  );

  const loadFeriados = async (anio: number): Promise<void> => {
    try {
      setLoading(true);
      const data = await getFeriadosEcuador(anio);
      setFeriados(data);
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo cargar los feriados. Verifica tu conexión.",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Cargando feriados..." />;

  return (
    <View style={feriadosStyles.container}>
      {/* Selector de año */}
      <View style={feriadosStyles.yearContainer}>
        <TouchableOpacity
          style={feriadosStyles.yearBtn}
          onPress={() => setYear(year - 1)}
        >
          <Text style={feriadosStyles.yearBtnText}>◀</Text>
        </TouchableOpacity>
        <Text style={feriadosStyles.yearText}>Ecuador {year}</Text>
        <TouchableOpacity
          style={feriadosStyles.yearBtn}
          onPress={() => setYear(year + 1)}
        >
          <Text style={feriadosStyles.yearBtnText}>▶</Text>
        </TouchableOpacity>
      </View>

      <Text style={feriadosStyles.info}>
        💡 Tip: Ten en cuenta los feriados para planificar tus gastos
      </Text>

      <FlatList
        data={feriados}
        keyExtractor={(item) => item.date}
        contentContainerStyle={feriadosStyles.list}
        ListEmptyComponent={
          <Text style={feriadosStyles.emptyText}>
            No hay feriados disponibles
          </Text>
        }
        renderItem={({ item }) => (
          <View style={feriadosStyles.card}>
            <View style={feriadosStyles.cardHeader}>
              <Text style={feriadosStyles.cardFecha}>{item.date}</Text>
            </View>
            <Text style={feriadosStyles.cardNombre}>{item.localName}</Text>
            <Text style={feriadosStyles.cardSubnombre}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};
