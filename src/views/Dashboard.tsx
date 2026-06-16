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
    <div className="flex flex-col gap-7 animate-page-in">
      {/* Marcador de progreso */}
      <Card className="p-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="font-hand text-xl leading-none text-ink-soft">Progreso</p>
            <p className="mt-1 font-hand text-5xl leading-none text-ink">
              {completadas}
              <span className="text-3xl text-ink-faint"> / {meta}</span>
            </p>
          </div>
          <p className="font-hand text-2xl text-ink-faint">{Math.round(progreso)}%</p>
        </div>
        <ProgressBar value={progreso} complete={complete} />
        <p className="mt-2 font-hand text-base text-ink-faint">
          {complete ? '¡Meta alcanzada! 🎉' : 'entrevistas completadas'}
        </p>
      </Card>

      {/* Lista */}
      {entrevistas.length === 0 ? (
        <EmptyState onNueva={onNueva} />
      ) : (
        <div className="flex flex-col gap-4">
          <p className="px-1 font-hand text-lg text-ink-faint">
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
    <Card className={cn('p-4 transition-all', e.completada && 'bg-leaf/4')}>
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggle(e.id)}
          className="group mt-0.5 shrink-0 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          aria-label={e.completada ? 'Marcar incompleta' : 'Marcar completa'}
        >
          {e.completada
            ? <CheckCircle2 size={21} className="text-leaf" />
            : <Circle size={21} className="text-ink-faint/60 group-hover:text-ink-faint" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <h3 className="truncate font-hand text-2xl leading-none text-ink">{e.nombreNegocio}</h3>
            {e.completada && <Badge variant="success" className="shrink-0">✓ hecho</Badge>}
          </div>
          <div className="flex items-center gap-3 font-hand text-base text-ink-faint">
            <span className="flex items-center gap-1">
              <Building2 size={12} />
              {e.tipoNegocio}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(e.fecha)}
            </span>
          </div>
          {e.insights && (
            <p className="mt-2 line-clamp-2 font-hand text-lg leading-snug text-ink-soft">
              {e.insights}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <IconButton tone="danger" onClick={() => onDelete(e.id)} aria-label="Eliminar">
            <Trash2 size={15} />
          </IconButton>
          <IconButton tone="primary" onClick={() => onSelect(e)} aria-label="Ver detalle">
            <ChevronRight size={16} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

function EmptyState({ onNueva }: { onNueva: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <ClipboardList size={40} strokeWidth={1.5} className="-rotate-6 text-ink-faint" />
      <div>
        <h3 className="mb-1 font-hand text-3xl leading-none text-ink">Sin entrevistas aún</h3>
        <p className="mx-auto max-w-xs font-hand text-lg leading-snug text-ink-faint">
          Empieza registrando tu primera visita a un negocio local.
        </p>
      </div>
      <Button onClick={onNueva}>Crear primera entrevista</Button>
    </div>
  );
}
