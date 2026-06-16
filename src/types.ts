export interface Contacto {
  nombre?: string;
  telefono?: string;
  email?: string;
}

export interface RespuestasEntrevista {
  solucionActual?: string;
  ultimaVezProblema?: string;
  herramientasPasadas?: string;
  costeSolucionPasada?: string;
  otrasNotas?: string;
}

export interface Entrevista {
  id: string;
  nombreNegocio: string;
  tipoNegocio: string;
  fecha: string; // ISO date string
  contacto: Contacto;
  respuestas: RespuestasEntrevista;
  insights: string;
  completada: boolean;
  creadoEn: string;
}

export type Vista = 'historial' | 'nueva' | 'guia';
