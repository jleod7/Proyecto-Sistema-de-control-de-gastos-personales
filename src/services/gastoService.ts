import {
  ref,
  push,
  set,
  get,
  update,
  remove,
  DataSnapshot,
  serverTimestamp,
} from "firebase/database";
import { db, auth } from "../config/firebase";
import { Gasto, NuevoGasto } from "../types/gasto";

const GASTOS_PATH = "gastos";

// Obtener la ruta del usuario actual
const getUserPath = (): string => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuario no autenticado");
  return `${GASTOS_PATH}/${uid}`;
};

// Convertir snapshot de RTDB a array de Gasto
const snapshotToArray = (snapshot: DataSnapshot): Gasto[] => {
  const val = snapshot.val() as Record<string, Omit<Gasto, "id">> | null;
  if (!val) return [];

  return Object.entries(val).map(([id, data]) => ({
    id,
    descripcion: data.descripcion ?? "",
    monto: Number(data.monto ?? 0),
    categoria: data.categoria ?? "",
    fecha: data.fecha ?? "",
    observacion: data.observacion ?? "",
    creadoEn: data.creadoEn,
    fotoUri: data.fotoUri,
    latitud: data.latitud,
    longitud: data.longitud,
  }));
};

export const gastoService = {
  //CREATE
  async create(gasto: NuevoGasto): Promise<string> {
    const gastosRef = ref(db, getUserPath());
    const newRef = push(gastosRef);
    await set(newRef, {
      descripcion: gasto.descripcion,
      monto: gasto.monto!,
      categoria: gasto.categoria,
      fecha: gasto.fecha,
      observacion: gasto.observacion,
      creadoEn: serverTimestamp(),
      ...(gasto.fotoUri && { fotoUri: gasto.fotoUri }),
      ...(gasto.latitud !== undefined && { latitud: gasto.latitud }),
      ...(gasto.longitud !== undefined && { longitud: gasto.longitud }),
    });
    return newRef.key as string;
  },

  //READ (ALL)
  async getAll(): Promise<Gasto[]> {
    const gastosRef = ref(db, getUserPath());
    const snapshot = await get(gastosRef);
    const gastos = snapshotToArray(snapshot);
    return gastos.sort((a, b) => (b.creadoEn ?? 0) - (a.creadoEn ?? 0));
  },

  //READ (BY ID)
  async getById(id: string): Promise<Gasto | null> {
    const gastoRef = ref(db, `${getUserPath()}/${id}`);
    const snapshot = await get(gastoRef);
    if (!snapshot.exists()) return null;
    return {
      id,
      ...(snapshot.val() as Omit<Gasto, "id">),
    };
  },

  //UPDATE
  async update(id: string, gasto: NuevoGasto): Promise<void> {
    const gastoRef = ref(db, `${getUserPath()}/${id}`);
    await update(gastoRef, {
      descripcion: gasto.descripcion,
      monto: gasto.monto!,
      categoria: gasto.categoria,
      fecha: gasto.fecha,
      observacion: gasto.observacion,
      ...(gasto.fotoUri !== undefined && { fotoUri: gasto.fotoUri }),
      ...(gasto.latitud !== undefined && { latitud: gasto.latitud }),
      ...(gasto.longitud !== undefined && { longitud: gasto.longitud }),
    });
  },

  //DELETE
  async delete(id: string): Promise<void> {
    const gastoRef = ref(db, `${getUserPath()}/${id}`);
    await remove(gastoRef);
  },

  //DELETE ALL
  async deleteAll(): Promise<void> {
    const gastosRef = ref(db, getUserPath());
    await remove(gastosRef);
  },
};
