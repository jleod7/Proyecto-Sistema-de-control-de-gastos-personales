import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { resumenStyles } from "../../styles/appStyles";
import { AppScreenProps } from "../../navigation/typesNavigation";
import { Gasto } from "../../types/gasto";
import { gastoService } from "../../services/gastoService";
import { useFocusEffect } from "@react-navigation/native";

type Props = AppScreenProps<"Resumen">;

interface ResumenCategoria {
  categoria: string;
  total: number;
  cantidad: number;
}

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// Verifica si una fecha "dd/mm/yyyy" es del mes y año actuales
const esDelMesActual = (fecha: string): boolean => {
  const partes = fecha.split("/");
  if (partes.length !== 3) return false;
  const hoy = new Date();
  return (
    parseInt(partes[1]) === hoy.getMonth() + 1 &&
    parseInt(partes[2]) === hoy.getFullYear()
  );
};

export const ResumenScreen = ({ navigation }: Props) => {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //useFocusEffect: carga los datos cada vez que la pantalla es visible
  useFocusEffect(
    useCallback(() => {
      loadGastos();
    }, []),
  );

  const loadGastos = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await gastoService.getAll();
      setGastos(data);
    } catch (error) {
      Alert.alert("Error", "No se puede cargar el resumen");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //Agrupar gastos por categoría
  const getResumenPorCategoria = (): ResumenCategoria[] => {
    const mapaCategoria: { [key: string]: ResumenCategoria } = {};

    gastos.forEach((gasto) => {
      const cat = gasto.categoria;
      if (mapaCategoria[cat]) {
        mapaCategoria[cat].total += gasto.monto;
        mapaCategoria[cat].cantidad += 1;
      } else {
        mapaCategoria[cat] = {
          categoria: cat,
          total: gasto.monto,
          cantidad: 1,
        };
      }
    });

    return Object.values(mapaCategoria).sort((a, b) => b.total - a.total);
  };

  const resumen = getResumenPorCategoria();
  const totalGeneral = gastos.reduce((sum, g) => sum + g.monto, 0);

  // Totales del mes actual
  const gastosMes = gastos.filter((g) => esDelMesActual(g.fecha));
  const totalMes = gastosMes.reduce((sum, g) => sum + g.monto, 0);

  const nombreMes = MESES[new Date().getMonth()];

  return (
    <View style={resumenStyles.container}>
      {/* Fila de tarjetas: mes actual + total general */}
      <View style={resumenStyles.totalesRow}>
        <View style={resumenStyles.mesCard}>
          <Text style={resumenStyles.mesLabel}>{nombreMes}</Text>
          <Text style={resumenStyles.mesMonto}>${totalMes.toFixed(2)}</Text>
          <Text style={resumenStyles.mesSub}>{gastosMes.length} gasto(s) este mes</Text>
        </View>
        <View style={resumenStyles.generalCard}>
          <Text style={resumenStyles.totalLabel}>Total General</Text>
          <Text style={[resumenStyles.totalMonto, { fontSize: 20 }]}>
            ${totalGeneral.toFixed(2)}
          </Text>
          <Text style={resumenStyles.totalSub}>{gastos.length} gasto(s)</Text>
        </View>
      </View>

      <Text style={resumenStyles.seccionTitle}>Gasto por Categoría</Text>

      <FlatList
        data={resumen}
        keyExtractor={(item) => item.categoria}
        contentContainerStyle={resumenStyles.list}
        ListEmptyComponent={
          <Text style={resumenStyles.emptyText}>
            {loading ? "Cargando..." : "No hay gastos registrados todavía"}
          </Text>
        }
        renderItem={({ item }) => {
          const porcentaje = totalGeneral > 0 ? (item.total / totalGeneral) * 100 : 0;
          return (
            <View style={resumenStyles.card}>
              <View style={resumenStyles.cardHeader}>
                <Text style={resumenStyles.cardCategoria}>{item.categoria}</Text>
                <Text style={resumenStyles.cardTotal}>${item.total.toFixed(2)}</Text>
              </View>
              <Text style={resumenStyles.cardCantidad}>
                {item.cantidad} gasto(s) — {porcentaje.toFixed(1)}% del total
              </Text>
              {/* Barra de progreso simple */}
              <View style={resumenStyles.barraFondo}>
                <View
                  style={[
                    resumenStyles.barraRelleno,
                    { width: `${porcentaje}%` as any },
                  ]}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
