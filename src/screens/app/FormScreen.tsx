import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";

import { COLORS, formStyles } from "../../styles/appStyles";
import { AppScreenProps } from "../../navigation/typesNavigation";
import { NuevoGasto } from "../../types/gasto";
import { gastoService } from "../../services/gastoService";
import { getFeriadosEcuador, esFeriado } from "../../services/feriadoService";
import { Feriado } from "../../types/feriado";
import { useCamera } from "../../hooks/useCamera";
import { useLocation } from "../../hooks/useLocation";
import { analizarFactura } from "../../services/iaService";

type Props = AppScreenProps<"Form">;

// Categorías sugeridas — el usuario puede elegir una o escribir la suya
const CATEGORIAS_SUGERIDAS = [
  "Alimentación",
  "Transporte",
  "Educación",
  "Salud",
  "Hogar",
  "Entretenimiento",
  "Servicios",
  "Otros",
];

const FORM_INICIAL: NuevoGasto = {
  descripcion: "",
  monto: undefined,
  categoria: "",
  fecha: "",
  observacion: "",
};

const getFechaHoy = (): string => {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}/${hoy.getFullYear()}`;
};

export const FormScreen = ({ route, navigation }: Props) => {
  const id = route.params?.id;
  const isEditMode: boolean = id !== undefined;

  const [form, setForm] = useState<NuevoGasto>({
    ...FORM_INICIAL,
    fecha: isEditMode ? "" : getFechaHoy(),
  });

  const [saving, setSaving] = useState<boolean>(false);
  const [feriados, setFeriados] = useState<Feriado[]>([]);
  const [avisoFeriado, setAvisoFeriado] = useState<string>("");

  // Estado para foto y coordenadas existentes (modo edición)
  const [existingFotoUri, setExistingFotoUri] = useState<string | null>(null);
  const [existingCoordenadas, setExistingCoordenadas] = useState<{
    latitud: number;
    longitud: number;
  } | null>(null);

  // Hooks de cámara y GPS
  const { fotoUri, fotoBase64, pickFromCamera, pickFromGallery, clearPhoto } =
    useCamera();
  const [analizando, setAnalizando] = useState<boolean>(false);
  const { coordenadas, obteniendo, obtenerUbicacion, limpiarUbicacion } =
    useLocation();

  //hook useEffect: permite ejecutar el código en segundo plano
  useEffect(() => {
    if (isEditMode && id !== undefined) {
      loadGasto(id);
    }
  }, [id]);

  //Cargar feriados de Ecuador al montar el componente
  useEffect(() => {
    getFeriadosEcuador(new Date().getFullYear())
      .then(setFeriados)
      .catch(() => {});
  }, []);

  const loadGasto = async (gastoId: string): Promise<void> => {
    try {
      const gasto = await gastoService.getById(gastoId);
      if (gasto === null) {
        Alert.alert("Error", "Gasto no encontrado");
        navigation.goBack();
        return;
      }
      setForm({
        descripcion: gasto.descripcion,
        monto: gasto.monto,
        categoria: gasto.categoria,
        fecha: gasto.fecha,
        observacion: gasto.observacion,
      });
      setExistingFotoUri(gasto.fotoUri ?? null);
      if (gasto.latitud !== undefined && gasto.longitud !== undefined) {
        setExistingCoordenadas({
          latitud: gasto.latitud,
          longitud: gasto.longitud,
        });
      }
    } catch (error) {
      Alert.alert("Error", "El gasto no se puede cargar");
      console.error(error);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    const nuevoForm = { ...form, [key]: value };
    setForm(nuevoForm);

    //Verificar si la fecha ingresada es feriado en Ecuador
    if (key === "fecha" && feriados.length > 0) {
      const feriadoEncontrado = esFeriado(value, feriados);
      if (feriadoEncontrado) {
        setAvisoFeriado(
          `🎉 ¡Esta fecha es feriado en Ecuador! "${feriadoEncontrado.localName}"`,
        );
      } else {
        setAvisoFeriado("");
      }
    }
  };

  // Seleccionar una categoría sugerida (también permite escribir manualmente)
  const handleSelectCategoria = (cat: string): void => {
    setForm({ ...form, categoria: cat });
  };

  const handleLimpiar = (): void => {
    Alert.alert(
      "Limpiar campos",
      "¿Quieres borrar todos los campos del formulario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpiar",
          onPress: () => {
            setForm({ ...FORM_INICIAL, fecha: getFechaHoy() });
            clearPhoto();
            limpiarUbicacion();
          },
        },
      ],
    );
  };

  const handleSave = async (): Promise<void> => {
    if (form.descripcion.trim() === "") {
      Alert.alert("Campos incompletos", "Describe en qué gastaste el dinero");
      return;
    }
    if (form.categoria.trim() === "") {
      Alert.alert("Campos incompletos", "Selecciona o escribe una categoría");
      return;
    }
    if (form.fecha.trim() === "") {
      Alert.alert("Campos incompletos", "La fecha no puede estar vacía");
      return;
    }
    if (!form.monto || isNaN(Number(form.monto)) || Number(form.monto) <= 0) {
      Alert.alert("Monto inválido", "Ingresa un monto mayor a 0");
      return;
    }

    // Construir gasto final: monto convertido a número y datos de foto/GPS incluidos
    const gastoFinal: NuevoGasto = {
      ...form,
      monto: parseFloat(String(form.monto)),
      fotoUri: fotoUri ?? existingFotoUri ?? undefined,
      latitud: displayCoordenadas?.latitud,
      longitud: displayCoordenadas?.longitud,
    };

    try {
      //Prevención de doble envío
      setSaving(true);
      if (isEditMode && id !== undefined) {
        await gastoService.update(id, gastoFinal);
        Alert.alert("¡Listo!", "Gasto actualizado correctamente", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        await gastoService.create(gastoFinal);
        Alert.alert("¡Registrado!", "Tu gasto fue guardado", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el gasto. Intenta de nuevo.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const previewFoto = fotoUri ?? existingFotoUri;
  const displayCoordenadas = coordenadas ?? existingCoordenadas;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={formStyles.container}
        contentContainerStyle={formStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={formStyles.title}>
          {isEditMode ? "Editar Gasto" : "Registrar Gasto"}
        </Text>

        {/* Foto del comprobante */}
        <Text style={formStyles.label}>Foto del comprobante (opcional)</Text>
        <View style={formStyles.fotoPicker}>
          {previewFoto ? (
            <Image
              source={{ uri: previewFoto }}
              style={formStyles.fotoPreview}
              resizeMode="cover"
            />
          ) : (
            <View style={formStyles.fotoPlaceholder}>
              <Text style={formStyles.fotoPlaceholderIcon}>📷</Text>
              <Text style={formStyles.fotoPlaceholderText}>
                Sin foto adjunta
              </Text>
            </View>
          )}
        </View>
        <View style={formStyles.fotoBtns}>
          <TouchableOpacity
            style={formStyles.fotoBtnCamera}
            onPress={pickFromCamera}
          >
            <Text style={formStyles.fotoBtnText}>📷 Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={formStyles.fotoBtnGallery}
            onPress={pickFromGallery}
          >
            <Text style={formStyles.fotoBtnTextSecondary}>🖼 Galería</Text>
          </TouchableOpacity>
        </View>

        {fotoBase64 && (
          <TouchableOpacity
            style={[
              formStyles.fotoBtnCamera,
              { marginTop: 8, backgroundColor: "#6200ea" },
            ]}
            onPress={async () => {
              setAnalizando(true);
              const datos = await analizarFactura(fotoBase64);
              setForm((prev) => ({
                ...prev,
                descripcion: datos.descripcion || prev.descripcion,
                monto: datos.monto ?? prev.monto,
                categoria: datos.categoria || prev.categoria,
                observacion: datos.observacion || prev.observacion,
              }));
              setAnalizando(false);
              Alert.alert(
                "✅ Listo",
                "Gemini analizó la factura y llenó los campos.",
              );
            }}
            disabled={analizando}
          >
            {analizando ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={formStyles.fotoBtnText}>🤖 Analizar con IA</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Descripción */}
        <Text style={formStyles.label}>¿En qué gastaste? *</Text>
        <TextInput
          style={formStyles.input}
          value={form.descripcion}
          onChangeText={(value) => handleInputChange("descripcion", value)}
          placeholder="Ej: Almuerzo, pasaje de bus, medicamento..."
          maxLength={60}
        />

        {/* Monto */}
        <Text style={formStyles.label}>Monto ($) *</Text>
        <TextInput
          style={formStyles.input}
          value={form.monto?.toString()}
          onChangeText={(value) => handleInputChange("monto", value)}
          keyboardType="numeric"
          placeholder="Ej: 25.50"
        />

        {/* Categoría con chips sugeridos */}
        <Text style={formStyles.label}>Categoría *</Text>
        <View style={formStyles.chipsContainer}>
          {CATEGORIAS_SUGERIDAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                formStyles.chip,
                form.categoria === cat && formStyles.chipSelected,
              ]}
              onPress={() => handleSelectCategoria(cat)}
            >
              <Text
                style={[
                  formStyles.chipText,
                  form.categoria === cat && formStyles.chipTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={formStyles.input}
          value={form.categoria}
          onChangeText={(value) => handleInputChange("categoria", value)}
          placeholder="O escribe una categoría personalizada"
          maxLength={40}
        />

        {/* Fecha */}
        <Text style={formStyles.label}>Fecha *</Text>
        <TextInput
          style={formStyles.input}
          value={form.fecha}
          onChangeText={(value) => handleInputChange("fecha", value)}
          placeholder="Ej: 31/05/2026"
          maxLength={10}
        />
        {avisoFeriado ? (
          <Text style={formStyles.avisoFeriado}>{avisoFeriado}</Text>
        ) : null}

        {/* Nota */}
        <Text style={formStyles.label}>Nota (opcional)</Text>
        <TextInput
          style={formStyles.inputMultiline}
          value={form.observacion}
          onChangeText={(value) => handleInputChange("observacion", value)}
          placeholder="Agrega un comentario sobre este gasto..."
          maxLength={120}
          multiline
        />

        {/* Ubicación GPS */}
        <Text style={formStyles.label}>Ubicación del gasto (opcional)</Text>
        <View style={formStyles.gpsSection}>
          <TouchableOpacity
            style={formStyles.gpsBtn}
            onPress={obtenerUbicacion}
            disabled={obteniendo}
          >
            {obteniendo && (
              <ActivityIndicator size="small" color={COLORS.white} />
            )}
            <Text style={formStyles.gpsBtnText}>
              {obteniendo ? "Obteniendo GPS..." : "📍 Obtener Ubicación"}
            </Text>
          </TouchableOpacity>
          {displayCoordenadas && (
            <View style={formStyles.gpsCoordenadas}>
              <Text style={formStyles.gpsCoordenadaText}>
                ✓ Lat: {displayCoordenadas.latitud.toFixed(6)}
              </Text>
              <Text style={formStyles.gpsCoordenadaText}>
                ✓ Lon: {displayCoordenadas.longitud.toFixed(6)}
              </Text>
            </View>
          )}
        </View>

        {/* Botón guardar */}
        <TouchableOpacity
          style={[
            formStyles.saveButton,
            saving && formStyles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={formStyles.saveButtonText}>
            {saving
              ? "Guardando..."
              : isEditMode
                ? "Actualizar Gasto"
                : "Guardar Gasto"}
          </Text>
        </TouchableOpacity>

        {!isEditMode && (
          <TouchableOpacity
            style={formStyles.clearButton}
            onPress={handleLimpiar}
          >
            <Text style={formStyles.clearButtonText}>🗑 Limpiar campos</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={formStyles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={formStyles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
