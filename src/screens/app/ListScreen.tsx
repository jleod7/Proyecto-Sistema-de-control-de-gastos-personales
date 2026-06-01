import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS, listStyles } from "../../styles/appStyles";
import { AppScreenProps } from "../../navigation/typesNavigation";
import { useCallback, useEffect, useState } from "react";
import { Gasto } from "../../types/gasto";
import { Feriado } from "../../types/feriado";
import { gastoService } from "../../services/gastoService";
import { logout } from "../../services/authService";
import { getFeriadosEcuador } from "../../services/feriadoService";
import { useAuth } from "../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

type Props = AppScreenProps<"List">;

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// Colores por categoría para el gráfico de barras
const COLORES_CATEGORIA: Record<string, string> = {
  "Alimentación":    "#43A047",
  "Transporte":      "#1E88E5",
  "Educación":       "#7B1FA2",
  "Salud":           "#E53935",
  "Hogar":           "#F57C00",
  "Entretenimiento": "#00ACC1",
  "Servicios":       "#546E7A",
  "Otros":           "#8D6E63",
};

const getColorCategoria = (cat: string): string =>
  COLORES_CATEGORIA[cat] ?? COLORS.primary;

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

export const ListScreen = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [fechaFiltro, setFechaFiltro] = useState<string>("");
  const [proximoFeriado, setProximoFeriado] = useState<Feriado | null>(null);

  //useFocusEffect: recarga gastos cada vez que la pantalla vuelve a ser visible
  useFocusEffect(
    useCallback(() => {
      loadGastos();
    }, []),
  );

  useEffect(() => {
    cargarProximoFeriado();
  }, []);

  const loadGastos = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await gastoService.getAll();
      setGastos(data);
    } catch (error) {
      Alert.alert("Error", "No se puede cargar los gastos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cargarProximoFeriado = async (): Promise<void> => {
    try {
      const hoy = new Date().toISOString().split("T")[0];
      const data = await getFeriadosEcuador(new Date().getFullYear());
      const proximo = data.find((f) => f.date >= hoy) ?? null;
      setProximoFeriado(proximo);
    } catch {
      // Sin conexión: no mostrar error
    }
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: () => logout() },
    ]);
  };

  // Gastos filtrados por búsqueda y fecha
  const filteredGastos = gastos.filter((gasto) => {
    const matchTexto =
      gasto.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
      gasto.categoria.toLowerCase().includes(searchText.toLowerCase());
    const matchFecha = gasto.fecha.includes(fechaFiltro);
    return matchTexto && matchFecha;
  });

  // ── Estadísticas del mes actual ───────────────────────────────
  const gastosMes = gastos.filter((g) => esDelMesActual(g.fecha));
  const totalMes = gastosMes.reduce((sum, g) => sum + g.monto, 0);
  const gastoMasAlto =
    gastosMes.length > 0 ? Math.max(...gastosMes.map((g) => g.monto)) : 0;

  // Agrupar por categoría para el gráfico
  const calcularCategorias = () => {
    const mapa: Record<string, number> = {};
    gastosMes.forEach((g) => {
      mapa[g.categoria] = (mapa[g.categoria] ?? 0) + g.monto;
    });
    return Object.entries(mapa)
      .map(([categoria, total]) => ({ categoria, total }))
      .sort((a, b) => b.total - a.total);
  };

  const categorias = calcularCategorias();
  const categoriaTop = categorias.length > 0 ? categorias[0].categoria : "—";
  const topCategorias = categorias.slice(0, 4);
  const maxTotal = topCategorias.length > 0 ? topCategorias[0].total : 1;

  const hoy = new Date();
  const nombreMes = MESES[hoy.getMonth()];
  const anio = hoy.getFullYear();

  // Encabezado scrolleable del FlatList
  const ListHeader = (
    <>
      {/* Tarjeta principal: total del mes */}
      <View style={listStyles.totalCard}>
        <Text style={listStyles.totalCardLabel}>
          Total gastado en {nombreMes} {anio}
        </Text>
        <Text style={listStyles.totalCardMonto}>${totalMes.toFixed(2)}</Text>
        <Text style={listStyles.totalCardSub}>
          {gastosMes.length === 0
            ? "Aún no tienes gastos este mes"
            : `${gastosMes.length} gasto${gastosMes.length !== 1 ? "s" : ""} registrado${gastosMes.length !== 1 ? "s" : ""} este mes`}
        </Text>

        {gastosMes.length > 0 && (
          <>
            <View style={listStyles.totalCardDivider} />
            <View style={listStyles.statsRow}>
              <View style={listStyles.statItem}>
                <Text style={listStyles.statLabel}>Categoría top</Text>
                <Text style={listStyles.statValue} numberOfLines={1}>
                  {categoriaTop}
                </Text>
              </View>
              <View style={listStyles.statItem}>
                <Text style={listStyles.statLabel}>Gasto más alto</Text>
                <Text style={listStyles.statValue}>${gastoMasAlto.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Gráfico de barras por categoría */}
      <View style={listStyles.chartSection}>
        <Text style={listStyles.chartTitle}>
          📊 Gastos por categoría — {nombreMes}
        </Text>
        {topCategorias.length === 0 ? (
          <Text style={listStyles.chartSinDatos}>
            Registra gastos para ver el gráfico
          </Text>
        ) : (
          topCategorias.map((item) => {
            const porcentaje =
              maxTotal > 0 ? (item.total / maxTotal) * 100 : 0;
            return (
              <View key={item.categoria} style={listStyles.chartFila}>
                <View style={listStyles.chartFilaHeader}>
                  <Text style={listStyles.chartCategoria}>{item.categoria}</Text>
                  <Text style={listStyles.chartValor}>
                    ${item.total.toFixed(2)}
                  </Text>
                </View>
                <View style={listStyles.chartBarFondo}>
                  <View
                    style={[
                      listStyles.chartBarRelleno,
                      {
                        width: `${porcentaje}%` as any,
                        backgroundColor: getColorCategoria(item.categoria),
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })
        )}
      </View>

      {/* Feriado: chip sutil de una línea */}
      {proximoFeriado && (
        <TouchableOpacity
          style={listStyles.feriadoChip}
          onPress={() => navigation.navigate("Feriados")}
        >
          <Text style={listStyles.feriadoChipText} numberOfLines={2}>
            🇪🇨 Próximo feriado: {proximoFeriado.localName}{"\n"}{proximoFeriado.date}
          </Text>
          <Text style={listStyles.feriadoChipArrow}>›</Text>
        </TouchableOpacity>
      )}

      {/* Filtros de búsqueda */}
      <View style={listStyles.searchContainer}>
        <TextInput
          style={listStyles.searchInput}
          placeholder="🔍 Buscar por descripción o categoría..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TextInput
          style={[listStyles.searchInput, { marginTop: 8 }]}
          placeholder="📅 Filtrar por fecha (Ej: 05/2026)..."
          value={fechaFiltro}
          onChangeText={setFechaFiltro}
        />
      </View>

      {/* Accesos rápidos */}
      <View style={listStyles.botonesNav}>
        <TouchableOpacity
          style={listStyles.resumenButton}
          onPress={() => navigation.navigate("Resumen")}
        >
          <Text style={listStyles.resumenButtonText}>📊 Resumen Mensual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={listStyles.feriadosButtonOutlined}
          onPress={() => navigation.navigate("Feriados")}
        >
          <Text style={listStyles.feriadosButtonTextOutlined}>📅 Feriados EC</Text>
        </TouchableOpacity>
      </View>

      {/* Título de la sección de gastos */}
      {(filteredGastos.length > 0 || loading) && (
        <Text style={listStyles.listaSectionTitle}>
          {searchText || fechaFiltro ? "Resultados de búsqueda" : "Gastos recientes"}
        </Text>
      )}
    </>
  );

  return (
    <View style={listStyles.container}>
      {/* Header fijo con saludo */}
      <View style={listStyles.headerSection}>
        <View style={listStyles.headerTop}>
          <Text style={listStyles.headerGreeting}>Hola 👋</Text>
          <TouchableOpacity style={listStyles.logoutLink} onPress={handleLogout}>
            <Text style={listStyles.logoutLinkText}>Salir</Text>
          </TouchableOpacity>
        </View>
        <Text style={listStyles.headerSubtitle}>
          Controla tus gastos de {nombreMes.toLowerCase()}
        </Text>
        <Text style={listStyles.headerEmail}>Sesión activa</Text>
      </View>

      {/* Lista con todo el contenido como encabezado scrolleable */}
      <FlatList
        data={filteredGastos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={listStyles.list}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          loading ? (
            <Text style={listStyles.emptyText}>Cargando...</Text>
          ) : searchText || fechaFiltro ? (
            <Text style={listStyles.emptyText}>
              No se encontraron gastos con ese filtro
            </Text>
          ) : (
            <View style={listStyles.emptyCard}>
              <Text style={listStyles.emptyIcon}>🧾</Text>
              <Text style={listStyles.emptyTitle}>
                Aún no tienes gastos registrados
              </Text>
              <Text style={listStyles.emptySubtitle}>
                Toca el botón + para agregar tu primer gasto y empezar a
                controlar tu dinero.
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={listStyles.card}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          >
            <Text style={listStyles.cardDescripcion}>{item.descripcion}</Text>
            <Text style={listStyles.cardMonto}>${item.monto.toFixed(2)}</Text>
            <Text style={listStyles.cardDetalle}>📂 {item.categoria}</Text>
            <Text style={listStyles.cardFecha}>📅 {item.fecha}</Text>
          </TouchableOpacity>
        )}
      />

      {/* FAB - Registrar gasto */}
      <TouchableOpacity
        style={listStyles.fab}
        onPress={() => navigation.navigate("Form", {})}
      >
        <Text style={listStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
