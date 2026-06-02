import { StyleSheet } from "react-native";

export const COLORS = {
  primary: '#1B5E20',
  secondary: '#2E7D32',
  background: '#F5F5F5',
  white: '#FFFFFF',
  textDark: '#333333',
  textMedium: '#666666',
  textLight: '#999999',
  border: '#DDDDDD',
  inputBg: '#FAFAFA',
  danger: '#C62828',
  dangerBg: '#FFEBEE',
  success: '#2E7D32',
  warning: '#F57C00',
  shadow: '#000000',
  totalBg: '#E8F5E9',
  totalText: '#1B5E20',
  barraColor: '#43A047',
};

export const SIZES = {
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 24,
  borderRadius: 10,
  fontSmall: 13,
  fontMedium: 16,
  fontLarge: 18,
  fontTitle: 22,
  fabSize: 60,
};

// ============================================================
// LIST SCREEN STYLES
// ============================================================

export const listStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchContainer: {
    padding: SIZES.paddingMedium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingSmall + 2,
    fontSize: SIZES.fontMedium,
    backgroundColor: COLORS.inputBg,
  },
  botonesNav: {
    flexDirection: 'row',
    margin: SIZES.paddingMedium,
    marginBottom: 0,
    gap: 8,
  },
  resumenButton: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  resumenButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontSmall + 1,
    fontWeight: 'bold',
  },
  list: { padding: SIZES.paddingMedium },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingMedium,
    marginBottom: 12,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardDescripcion: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardMonto: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.warning,
    marginTop: 4,
  },
  cardDetalle: {
    fontSize: SIZES.fontSmall + 1,
    color: COLORS.textMedium,
    marginTop: 4,
  },
  cardFecha: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    color: COLORS.textLight,
    fontSize: SIZES.fontMedium,
  },
  fab: {
    position: 'absolute',
    bottom: SIZES.paddingLarge,
    right: SIZES.paddingLarge,
    width: SIZES.fabSize,
    height: SIZES.fabSize,
    borderRadius: SIZES.fabSize / 2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: 'bold',
  },

  // ── Header personalizado ─────────────────────────────────────
  headerSection: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.paddingMedium,
    paddingTop: 36,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  headerGreeting: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: SIZES.fontSmall + 1,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 3,
  },
  headerEmail: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
  },
  logoutLink: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
  },
  logoutLinkText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: SIZES.fontSmall - 1,
    fontWeight: '600',
  },

  // ── Tarjeta principal de total mensual ────────────────────────
  totalCard: {
    margin: SIZES.paddingMedium,
    marginBottom: 0,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SIZES.paddingLarge,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  totalCardLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  totalCardMonto: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.primary,
    marginVertical: 4,
    letterSpacing: -1,
  },
  totalCardSub: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textMedium,
    marginBottom: 2,
  },
  totalCardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statItem: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.borderRadius,
    padding: 10,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  statValue: {
    fontSize: SIZES.fontSmall + 1,
    fontWeight: '700',
    color: COLORS.textDark,
  },

  // ── Feriado sutil (chip de una línea) ─────────────────────────
  feriadoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.paddingMedium,
    marginTop: SIZES.paddingMedium,
    backgroundColor: '#FFFDE7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFE082',
    gap: 6,
  },
  feriadoChipText: {
    fontSize: 12,
    color: '#795548',
    flex: 1,
  },
  feriadoChipArrow: {
    fontSize: 12,
    color: '#A1887F',
  },

  // ── Botón Feriados EC (estilo outline / secundario) ───────────
  feriadosButtonOutlined: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
  },
  feriadosButtonTextOutlined: {
    color: COLORS.secondary,
    fontSize: SIZES.fontSmall + 1,
    fontWeight: '600',
  },

  // ── Estado vacío ─────────────────────────────────────────────
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: SIZES.paddingLarge,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: SIZES.fontLarge,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: SIZES.fontSmall + 1,
    color: COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 20,
  },

  // ── Título sección lista ──────────────────────────────────────
  listaSectionTitle: {
    fontSize: SIZES.fontSmall,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: SIZES.paddingMedium,
    paddingTop: SIZES.paddingMedium,
    paddingBottom: 6,
  },

  // ── Gráfico de categorías del mes ─────────────────────────────
  chartSection: {
    margin: SIZES.paddingMedium,
    marginBottom: 0,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingMedium,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  chartTitle: {
    fontSize: SIZES.fontSmall,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  chartFila: {
    marginBottom: 8,
  },
  chartFilaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chartCategoria: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textDark,
    fontWeight: '600',
    flex: 1,
  },
  chartValor: {
    fontSize: SIZES.fontSmall,
    color: COLORS.warning,
    fontWeight: '700',
  },
  chartBarFondo: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  chartBarRelleno: {
    height: 6,
    borderRadius: 3,
  },
  chartSinDatos: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingVertical: 6,
  },
});

// ============================================================
// DETAIL SCREEN STYLES
// ============================================================

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.paddingLarge,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingLarge,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.paddingMedium,
  },
  montoDestacado: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.warning,
    marginBottom: SIZES.paddingMedium,
  },
  field: { marginBottom: SIZES.paddingMedium },
  label: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: SIZES.fontLarge,
    color: COLORS.textDark,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: SIZES.paddingLarge,
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.dangerBg,
    padding: 14,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 60,
    color: COLORS.textLight,
  },

  // ── Foto del comprobante ──────────────────────────────────────
  fotoContainer: {
    marginBottom: SIZES.paddingMedium,
  },
  foto: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.borderRadius,
    marginTop: 6,
  },

  // ── Mapa de ubicación ─────────────────────────────────────────
  mapContainer: {
    marginTop: SIZES.paddingMedium,
    marginBottom: SIZES.paddingLarge,
  },
  mapLabel: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  coordsCard: {
    backgroundColor: COLORS.totalBg,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingMedium,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginTop: 6,
  },
  coordsText: {
    fontSize: SIZES.fontMedium,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
});

// ============================================================
// FORM SCREEN STYLES
// ============================================================

export const formStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { padding: SIZES.paddingLarge },
  title: {
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.paddingLarge,
  },
  label: {
    fontSize: SIZES.fontSmall + 1,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.paddingSmall,
    padding: 12,
    fontSize: SIZES.fontMedium,
    backgroundColor: COLORS.inputBg,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.paddingSmall,
    padding: 12,
    fontSize: SIZES.fontMedium,
    backgroundColor: COLORS.inputBg,
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: SIZES.paddingSmall,
    marginTop: SIZES.paddingLarge,
    alignItems: 'center',
  },
  saveButtonDisabled: { backgroundColor: COLORS.textLight },
  saveButtonText: {
    color: COLORS.white,
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 14,
    borderRadius: SIZES.paddingSmall,
    marginTop: SIZES.paddingSmall,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  clearButtonText: {
    color: COLORS.danger,
    fontSize: SIZES.fontMedium,
  },
  cancelButton: {
    padding: 14,
    borderRadius: SIZES.paddingSmall,
    marginTop: SIZES.paddingSmall,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.textMedium,
    fontSize: SIZES.fontMedium,
  },
  avisoFeriado: {
    fontSize: SIZES.fontSmall + 1,
    color: '#E65100',
    fontWeight: '600',
    marginTop: 6,
    padding: 8,
    backgroundColor: '#FFF8E1',
    borderRadius: SIZES.paddingSmall,
    borderWidth: 1,
    borderColor: '#FFC107',
  },

  // ── Foto del comprobante ──────────────────────────────────────
  fotoPicker: {
    height: 180,
    backgroundColor: COLORS.inputBg,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 8,
  },
  fotoPreview: {
    width: '100%',
    height: '100%',
  },
  fotoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoPlaceholderIcon: { fontSize: 36, marginBottom: 6 },
  fotoPlaceholderText: { color: COLORS.textLight, fontSize: 13 },
  fotoBtns: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  fotoBtnCamera: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  fotoBtnGallery: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.inputBg,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fotoBtnText: { color: COLORS.white, fontWeight: '600', fontSize: 13 },
  fotoBtnTextSecondary: { color: COLORS.textMedium, fontWeight: '600', fontSize: 13 },

  // ── Ubicación GPS ─────────────────────────────────────────────
  gpsSection: {
    marginBottom: 16,
  },
  gpsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.borderRadius,
    gap: 8,
  },
  gpsBtnText: { color: COLORS.white, fontWeight: '600', fontSize: 14 },
  gpsCoordenadas: {
    marginTop: 8,
    padding: 10,
    backgroundColor: COLORS.totalBg,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  gpsCoordenadaText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ── Chips de categoría ────────────────────────────────────────
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBg,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textMedium,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },
});

// ============================================================
// RESUMEN SCREEN STYLES
// ============================================================

export const resumenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  totalLabel: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textMedium,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  totalMonto: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.totalText,
    marginTop: 4,
  },
  totalSub: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textMedium,
    marginTop: 4,
  },
  seccionTitle: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginHorizontal: SIZES.paddingMedium,
    marginBottom: SIZES.paddingSmall,
  },
  list: {
    paddingHorizontal: SIZES.paddingMedium,
    paddingBottom: SIZES.paddingLarge,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingMedium,
    marginBottom: 12,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategoria: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1,
  },
  cardTotal: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.warning,
  },
  cardCantidad: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textMedium,
    marginTop: 6,
  },
  barraFondo: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  barraRelleno: {
    height: 8,
    backgroundColor: COLORS.barraColor,
    borderRadius: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    color: COLORS.textLight,
    fontSize: SIZES.fontMedium,
  },

  // ── Fila de tarjetas de totales (mes + general) ───────────────
  totalesRow: {
    flexDirection: 'row',
    marginHorizontal: SIZES.paddingMedium,
    marginTop: SIZES.paddingMedium,
    marginBottom: 0,
    gap: 10,
  },
  mesCard: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingMedium,
    alignItems: 'center',
  },
  mesLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
  },
  mesMonto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 4,
  },
  mesSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  generalCard: {
    flex: 1,
    backgroundColor: COLORS.totalBg,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingMedium,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
});

// ============================================================
// AUTH SCREEN STYLES (Login / Register)
// ============================================================

export const loginStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7FAFC',
    padding: 24,
    justifyContent: 'center',
  },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: '#1A202C' },
  subtitle: { fontSize: 16, color: '#718096', marginTop: 4 },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  button: { marginTop: 8 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 15, color: '#718096' },
  link: { fontSize: 15, color: COLORS.primary, fontWeight: '700' },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconEmoji: { fontSize: 36 },
});

export const registerStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7FAFC',
    padding: 24,
    justifyContent: 'center',
  },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: '#1A202C' },
  subtitle: { fontSize: 16, color: '#718096', marginTop: 4 },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  button: { marginTop: 8 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 15, color: '#718096' },
  link: { fontSize: 15, color: COLORS.primary, fontWeight: '700' },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconEmoji: { fontSize: 36 },
});

// ============================================================
// SHARED COMPONENT STYLES
// ============================================================

export const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  text: { marginTop: 12, fontSize: 16, color: '#718096' },
});

export const buttonStyles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

// ============================================================
// FERIADOS SCREEN STYLES
// ============================================================

export const feriadosStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  yearContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.paddingMedium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  yearBtn: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
  },
  yearBtnText: {
    color: COLORS.white,
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: SIZES.fontTitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginHorizontal: 20,
  },
  info: {
    fontSize: SIZES.fontSmall,
    color: '#795548',
    backgroundColor: '#FFF8E1',
    padding: SIZES.paddingMedium,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFC107',
  },
  list: { padding: SIZES.paddingMedium },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.paddingMedium,
    marginBottom: 10,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardFecha: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  cardTipo: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textMedium,
  },
  cardNombre: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: '#E65100',
  },
  cardSubnombre: {
    fontSize: SIZES.fontSmall,
    color: COLORS.textMedium,
    marginTop: 2,
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    color: COLORS.textLight,
    fontSize: SIZES.fontMedium,
  },
});

export const inputStyles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#2D3748', marginBottom: 6 },
  inputWrapper: { position: 'relative' },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2D3748',
    backgroundColor: '#F7FAFC',
  },
  inputError: { borderColor: COLORS.danger },
  eyeIcon: { position: 'absolute', right: 14, top: 12 },
  errorText: { fontSize: 12, color: COLORS.danger, marginTop: 4 },
});
