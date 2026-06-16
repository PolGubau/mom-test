export type DateStyle = "short" | "long";

/** Formatea una fecha ISO al locale es-ES. */
export function formatDate(iso: string, style: DateStyle = "short"): string {
  const options: Intl.DateTimeFormatOptions =
    style === "long"
      ? { day: "2-digit", month: "long", year: "numeric" }
      : { day: "2-digit", month: "short", year: "numeric" };
  return new Date(iso).toLocaleDateString("es-ES", options);
}
