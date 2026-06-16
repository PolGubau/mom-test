import { useEffect } from "react";

/** Bloquea el scroll del body mientras `active` sea true. */
export function useLockBodyScroll(active = true): void {
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
