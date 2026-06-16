import { Badge, Button, Card, IconButton, ProgressBar } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/format';
import type { Entrevista } from '@/types';
import { Building2, Calendar, CheckCircle2, ChevronRight, Circle, ClipboardList, Trash2 } from 'lucide-react';

interface DashboardProps {
  entrevistas: Entrevista[];
  completadas: number;
  total: number;
  meta: number;
  progreso: number;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onSelect: (e: Entrevista) => void;
  onNueva: () => void;
}

export function Dashboard({ entrevistas, completadas, meta, progreso, onDelete, onToggle, onSelect, onNueva }: DashboardProps) {
  const complete = progreso === 100;
  return (
    <div className="flex flex-col gap-6">
      {/* Progress Card */}
      <Card className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Progreso</p>
            <p className="text-2xl font-semibold text-zinc-900">
              {completadas} <span className="text-zinc-400 font-normal text-lg">/ {meta}</span>
            </p>
            <p className="text-sm text-zinc-500 mt-0.5">entrevistas completadas</p>
          </div>
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', complete ? 'bg-emerald-50' : 'bg-indigo-50')}>
            <ClipboardList size={22} className={complete ? 'text-emerald-600' : 'text-indigo-600'} />
          </div>
        </div>
        <ProgressBar value={progreso} complete={complete} />
        <p className="text-xs text-zinc-400 mt-2">{Math.round(progreso)}% completado</p>
      </Card>

      {/* List */}
      {entrevistas.length === 0 ? (
        <EmptyState onNueva={onNueva} />
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider px-1">
            {entrevistas.length} entrevista{entrevistas.length !== 1 ? 's' : ''}
          </p>
          {entrevistas.map(e => (
            <EntrevistaCard
              key={e.id}
              entrevista={e}
              onDelete={onDelete}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EntrevistaCard({ entrevista: e, onDelete, onToggle, onSelect }: {
  entrevista: Entrevista;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onSelect: (e: Entrevista) => void;
}) {
  return (
    <Card className={cn('overflow-hidden transition-all', e.completada ? 'border-emerald-200' : 'border-zinc-200')}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => onToggle(e.id)}
            className="mt-0.5 shrink-0 transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            aria-label={e.completada ? 'Marcar incompleta' : 'Marcar completa'}
          >
            {e.completada
              ? <CheckCircle2 size={20} className="text-emerald-500" />
              : <Circle size={20} className="text-zinc-300 hover:text-zinc-400" />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-zinc-900 text-sm truncate">{e.nombreNegocio}</h3>
              {e.completada && (
                <Badge variant="success" className="shrink-0">Completada</Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Building2 size={11} />
                {e.tipoNegocio}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(e.fecha)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <IconButton tone="danger" onClick={() => onDelete(e.id)} aria-label="Eliminar">
              <Trash2 size={15} />
            </IconButton>
            <IconButton tone="primary" onClick={() => onSelect(e)} aria-label="Ver detalle">
              <ChevronRight size={15} />
            </IconButton>
          </div>
        </div>
      </div>
      {e.insights && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-xs text-zinc-500 line-clamp-2 bg-zinc-50 rounded-lg px-3 py-2 border border-zinc-100">
            {e.insights}
          </p>
        </div>
      )}
    </Card>
  );
}

function EmptyState({ onNueva }: { onNueva: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
        <ClipboardList size={32} className="text-indigo-400" />
      </div>
      <div>
        <h3 className="font-semibold text-zinc-800 mb-1">Sin entrevistas aún</h3>
        <p className="text-sm text-zinc-400 max-w-xs">
          Empieza registrando tu primera visita a un negocio local.
        </p>
      </div>
      <Button onClick={onNueva}>Crear primera entrevista</Button>
    </div>
  );
}
