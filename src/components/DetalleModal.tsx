import { Button, IconButton, Sheet } from '@/components/ui';
import { PREGUNTAS_MOM_TEST } from '@/lib/constants';
import { formatDate } from '@/lib/format';
import type { Entrevista } from '@/types';
import { Building2, Calendar, CheckCircle2, Circle, Mail, Phone, User, X } from 'lucide-react';
import type { ReactNode } from 'react';

interface DetalleModalProps {
  entrevista: Entrevista;
  onClose: () => void;
  onEdit: () => void;
  onToggle: () => void;
}

export function DetalleModal({ entrevista: e, onClose, onEdit, onToggle }: DetalleModalProps) {
  const meta: { icon: ReactNode; value: string }[] = [
    { icon: <Calendar size={13} />, value: formatDate(e.fecha, 'long') },
    e.contacto.nombre && { icon: <User size={13} />, value: e.contacto.nombre },
    e.contacto.telefono && { icon: <Phone size={13} />, value: e.contacto.telefono },
    e.contacto.email && { icon: <Mail size={13} />, value: e.contacto.email },
  ].filter(Boolean) as { icon: ReactNode; value: string }[];

  return (
    <Sheet onClose={onClose} ariaLabel={`Detalle de ${e.nombreNegocio}`}>
      {/* Cabecera de página */}
      <div className="paper sticky top-0 z-10 flex items-start justify-between gap-3 px-6 py-5">
        <div>
          <h2 className="font-hand text-3xl leading-none text-ink text-balance">{e.nombreNegocio}</h2>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-faint">
            <Building2 size={13} /> {e.tipoNegocio}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggle}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 font-hand text-base text-ink-soft
              transition-all duration-150
              hover:bg-ink/8 hover:text-ink active:scale-95 active:bg-ink/12
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          >
            {e.completada
              ? <><CheckCircle2 size={15} className="text-leaf" /> Completada</>
              : <><Circle size={15} className="text-ink-faint" /> Marcar completa</>}
          </button>
          <IconButton onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </IconButton>
        </div>
      </div>

      <div className="flex flex-col gap-7 px-6 pb-7 pt-2">
        {/* Notas al margen */}
        <div className="flex flex-col gap-1 border-l-2 border-ink/15 pl-3">
          {meta.map(m => (
            <p key={m.value} className="flex items-center gap-2 font-hand text-lg leading-snug text-ink-soft">
              <span className="text-ink-faint">{m.icon}</span> {m.value}
            </p>
          ))}
        </div>

        {/* Respuestas */}
        <div className="flex flex-col gap-5">
          {PREGUNTAS_MOM_TEST.map(({ key, labelDetalle }) => {
            const val = e.respuestas[key];
            if (!val) return null;
            return (
              <div key={key}>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-faint">{labelDetalle}</p>
                <p className="font-hand text-xl leading-7 text-ink text-pretty">{val}</p>
              </div>
            );
          })}
        </div>

        {/* Insights */}
        {e.insights && (
          <div>
            <p className="mb-1.5 font-hand text-xl leading-none text-ink">💡 Insights generales</p>
            <p className="font-hand text-xl leading-7 text-ink">
              <span className="marker-hl">{e.insights}</span>
            </p>
          </div>
        )}

        {/* Editar */}
        <Button variant="outline" onClick={onEdit} className="w-full">
          Editar entrevista
        </Button>
      </div>
    </Sheet>
  );
}
