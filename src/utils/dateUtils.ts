export const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const esDelMesActual = (fecha: string): boolean => {
  const partes = fecha.split("/");
  if (partes.length !== 3) return false;
  const hoy = new Date();
  return (
    parseInt(partes[1]) === hoy.getMonth() + 1 &&
    parseInt(partes[2]) === hoy.getFullYear()
  );
};
