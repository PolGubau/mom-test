import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

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
          emphasis
            ? "font-hand text-xl leading-snug text-ink"
            : "text-xs font-medium text-ink-soft",
        )}
      >
        {label}
      </label>
      {hint && (
        <p className="font-hand text-base leading-tight text-pen/90">{hint}</p>
      )}
      {children}
      {error && <p className="font-hand text-base text-pen">{error}</p>}
    </div>
  );
}
