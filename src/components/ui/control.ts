import { cn } from "@/lib/cn";

/**
 * Estilos base compartidos por Input y Select: una línea de escritura.
 * Fondo transparente y subrayado de tinta que se intensifica al enfocar.
 */
export function controlClasses(error = false): string {
	return cn(
		"w-full border-0 border-b bg-transparent px-1 py-2 text-[0.95rem] text-ink",
		"placeholder:text-ink-faint/70 outline-none transition-colors",
		"focus:border-ink",
		error ? "border-pen focus:border-pen" : "border-ink-faint/40",
	);
}
