import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  /** Etiqueta más prominente (preguntas Mom Test). */
  emphasis?: boolean;
  children: ReactNode;
}

export function Field({ label, error, hint, emphasis = false, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={cn(
          "text-xs",
          emphasis ? "font-semibold text-zinc-700" : "font-medium text-zinc-600",
        )}
      >
        {label}
      </label>
      {hint && (
        <p className="text-[11px] text-indigo-500 bg-indigo-50 rounded-lg px-2.5 py-1.5 border border-indigo-100">
          {hint}
        </p>
      )}
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
