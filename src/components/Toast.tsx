import { IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import { CheckCircle2, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastItemProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(toast.id), 300);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      className={cn(
        'relative flex items-start gap-2.5 px-4 py-3 min-w-64 max-w-sm rounded-sm border shadow-md rotate-1',
        toast.type === 'success'
          ? 'bg-marker/70 border-marker'
          : 'bg-pen/10 border-pen/30',
        'transition-all duration-300 ease-out',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
      )}
    >
      {/* trozo de cinta adhesiva */}
      <span className="absolute -top-2 left-1/2 h-3.5 w-12 -translate-x-1/2 -rotate-2 rounded-[1px] bg-ink/10" />
      {toast.type === 'success' ? (
        <CheckCircle2 size={18} className="text-leaf shrink-0 mt-0.5" />
      ) : (
        <XCircle size={18} className="text-pen shrink-0 mt-0.5" />
      )}
      <p className="flex-1 font-hand text-lg leading-tight text-ink">{toast.message}</p>
      <IconButton onClick={() => onClose(toast.id)} aria-label="Cerrar notificación">
        <X size={14} />
      </IconButton>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-100 flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
