import type { RespuestasEntrevista } from "@/types";

export const STORAGE_KEY = "mom-test-entrevistas";
export const META_GOAL = 10;

export const TIPOS_NEGOCIO = [
  "Restaurante / Bar",
  "Tienda de ropa",
  "Supermercado / Alimentación",
  "Peluquería / Estética",
  "Farmacia",
  "Ferretería / Bricolaje",
  "Librería / Papelería",
  "Gimnasio / Deporte",
  "Clínica / Salud",
  "Taller / Automóvil",
  "Hotel / Alojamiento",
  "Servicios profesionales",
  "Otro",
] as const;

export interface PreguntaMomTest {
  key: keyof RespuestasEntrevista;
  /** Etiqueta usada en el formulario (segunda persona). */
  label: string;
  /** Etiqueta usada en la vista de detalle. */
  labelDetalle: string;
  /** Pista de buenas prácticas Mom Test. */
  hint: string;
  placeholder?: string;
}

export const PREGUNTAS_MOM_TEST: PreguntaMomTest[] = [
  {
    key: "solucionActual",
    label: "¿Cómo resuelves actualmente la gestión del negocio?",
    labelDetalle: "¿Cómo resuelve actualmente la gestión?",
    hint: "Deja que describan su flujo actual sin mencionar software",
  },
  {
    key: "ultimaVezProblema",
    label: "¿Cuándo fue la última vez que tuviste un problema? ¿Qué pasó?",
    labelDetalle: "Última vez que tuvo el problema",
    hint: "Busca historias concretas, no opiniones generales",
  },
  {
    key: "herramientasPasadas",
    label: "¿Qué herramientas o soluciones has intentado en el pasado?",
    labelDetalle: "Herramientas/soluciones del pasado",
    hint: "¿Excel, papel, apps? ¿Funcionaron? ¿Por qué las dejaron?",
  },
  {
    key: "costeSolucionPasada",
    label: "¿Cuánto costó esa última solución? (€ o tiempo/semana)",
    labelDetalle: "Coste de la última solución",
    hint: "Clave: si pagaron, el dolor es real. Anota el importe exacto",
    placeholder: "ej. 200€/mes, ~5h semanales...",
  },
];
