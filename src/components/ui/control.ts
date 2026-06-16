import { cn } from "@/lib/cn";

/** Estilos base compartidos por Input, Textarea y Select. */
export function controlClasses(error = false): string {
  return cn(
    "w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400",
    "bg-zinc-50 outline-none transition-all",
    "focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400",
    error
      ? "border-red-300 focus:ring-red-500/20 focus:border-red-400"
      : "border-zinc-200",
  );
}
