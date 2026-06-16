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
  const infoPills: { icon: ReactNode; value: string }[] = [
    { icon: <Calendar size={12} className="text-zinc-400" />, value: formatDate(e.fecha, 'long') },
    e.contacto.nombre && { icon: <User size={12} className="text-zinc-400" />, value: e.contacto.nombre },
    e.contacto.telefono && { icon: <Phone size={12} className="text-zinc-400" />, value: e.contacto.telefono },
    e.contacto.email && { icon: <Mail size={12} className="text-zinc-400" />, value: e.contacto.email },
  ].filter(Boolean) as { icon: ReactNode; value: string }[];

  return (
    <Sheet onClose={onClose} ariaLabel={`Detalle de ${e.nombreNegocio}`}>
      {/* Header */}
      <div className="sticky top-0 bg-white flex items-center justify-between p-5 border-b border-zinc-100 z-10">
        <div>
          <h2 className="font-semibold text-zinc-900 text-base">{e.nombreNegocio}</h2>
          <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
            <Building2 size={11} /> {e.tipoNegocio}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              border border-zinc-200 hover:bg-zinc-50 transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
          >
            {e.completada
              ? <><CheckCircle2 size={14} className="text-emerald-500" /> Completada</>
              : <><Circle size={14} className="text-zinc-400" /> Marcar completa</>}
          </button>
          <IconButton onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </IconButton>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6">
        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs">
          {infoPills.map(pill => (
            <span
              key={pill.value}
              className="flex items-center gap-1.5 text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5"
            >
              {pill.icon} {pill.value}
            </span>
          ))}
        </div>

        {/* Respuestas */}
        <div className="flex flex-col gap-4">
          {PREGUNTAS_MOM_TEST.map(({ key, labelDetalle }) => {
            const val = e.respuestas[key];
            if (!val) return null;
            return (
              <div key={key}>
                <p className="text-xs font-semibold text-zinc-500 mb-1.5">{labelDetalle}</p>
                <p className="text-sm text-zinc-800 bg-zinc-50 rounded-xl border border-zinc-100 px-4 py-3 leading-relaxed">
                  {val}
                </p>
              </div>
            );
          })}
        </div>

        {/* Insights */}
        {e.insights && (
          <div>
            <p className="text-xs font-semibold text-zinc-500 mb-1.5 flex items-center gap-1.5">
              💡 Insights generales
            </p>
            <p className="text-sm text-zinc-800 bg-amber-50 rounded-xl border border-amber-100 px-4 py-3 leading-relaxed">
              {e.insights}
            </p>
          </div>
        )}

        {/* Edit button */}
        <Button variant="outline" onClick={onEdit} className="w-full">
          Editar entrevista
        </Button>
      </div>
    </Sheet>
  );
}
