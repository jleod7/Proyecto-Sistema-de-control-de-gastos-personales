export interface Gasto {
  id: string;           // Firebase genera el ID automáticamente (string)
  descripcion: string;
  monto: number;
  categoria: string;
  fecha: string;
  observacion: string;
  creadoEn?: number;
  fotoUri?: string;     // foto del comprobante (URI local del dispositivo)
  latitud?: number;     // coordenada GPS donde se realizó el gasto
  longitud?: number;    // coordenada GPS donde se realizó el gasto
}

export interface NuevoGasto {
  descripcion: string;
  monto: number | undefined;
  categoria: string;
  fecha: string;
  observacion: string;
  fotoUri?: string;
  latitud?: number;
  longitud?: number;
}
