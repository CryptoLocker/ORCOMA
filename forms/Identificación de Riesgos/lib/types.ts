export type FormData = {
  nombre: string;
  identificacion: string;
  cargo: string;
  proyecto: string;
  ciudad: string;
  genero: string;
  sugerencias: string;
  riesgos: Record<string, boolean>;
};