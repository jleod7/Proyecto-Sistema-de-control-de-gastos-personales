export interface Feriado {
  date: string;         // "2026-01-01"
  localName: string;   // "Año Nuevo"
  name: string;        // "New Year's Day"
  countryCode: string; // "EC"
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}
