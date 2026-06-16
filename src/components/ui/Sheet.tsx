import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOnEscape } from "@/hooks/useOnEscape";
import type { ReactNode } from "react";

interface SheetProps {
  onClose: () => void;
  children: ReactNode;
  /** Etiqueta accesible del diálogo. */
  ariaLabel?: string;
}

/**
 * Diálogo modal: bottom sheet en móvil, centrado en desktop.
 * Cierra con Escape, clic en backdrop y bloquea el scroll de fondo.
 */
export function Sheet({ onClose, children, ariaLabel }: SheetProps) {
  useOnEscape(onClose);
  useLockBodyScroll(true);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className="paper relative w-full md:max-w-xl rounded-t-2xl md:rounded-xl
          max-h-[90dvh] overflow-y-auto flex flex-col animate-slide-up"
      >
        {children}
      </div>
    </div>
  );
}
