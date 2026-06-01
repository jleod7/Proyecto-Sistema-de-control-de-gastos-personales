import { axiosInstance } from "../api/axiosInstance";
import { Feriado } from "../types/feriado";

// Obtener feriados de Ecuador para un año dado
export const getFeriadosEcuador = async (year: number = 2026): Promise<Feriado[]> => {
  const response = await axiosInstance.get<Feriado[]>(`/PublicHolidays/${year}/EC`);
  return response.data;
};

// Verificar si una fecha (dd/mm/yyyy) es feriado en Ecuador
export const esFeriado = (fecha: string, feriados: Feriado[]): Feriado | null => {
  // Convertir "31/05/2026" a "2026-05-31"
  const partes = fecha.split("/");
  if (partes.length !== 3) return null;
  const fechaISO = `${partes[2]}-${partes[1]}-${partes[0]}`;

  return feriados.find((f) => f.date === fechaISO) ?? null;
};
