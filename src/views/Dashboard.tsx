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
    <Card className={cn('group/card transition-all duration-200', e.completada && 'bg-leaf/4')}>
      <div className="flex items-stretch gap-0">
        {/* Área principal — clic abre el detalle */}
        <button
          type="button"
          onClick={() => onSelect(e)}
          className={cn(
            'flex flex-1 items-start gap-3 p-4 text-left',
            'rounded-l-lg transition-colors duration-150',
            'hover:bg-ink/3 active:bg-ink/6',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-inset',
          )}
          aria-label={`Ver detalle de ${e.nombreNegocio}`}
        >
          {/* Toggle completada */}
          <button
            type="button"
            tabIndex={-1}
            onClick={ev => { ev.stopPropagation(); onToggle(e.id); }}
            onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.stopPropagation(); onToggle(e.id); } }}
            className="group/check mt-0.5 shrink-0 rounded-md transition-all duration-150 hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
            aria-label={e.completada ? 'Marcar incompleta' : 'Marcar completa'}
          >
            {e.completada
              ? <CheckCircle2 size={21} className="text-leaf" />
              : <Circle size={21} className="text-ink-faint/50 group-hover/check:text-ink-faint" />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-2">
              <h3 className="truncate font-hand text-2xl leading-none text-ink text-balance">
                {e.nombreNegocio}
              </h3>
              {e.completada && <Badge variant="success" className="shrink-0">✓ hecho</Badge>}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 font-hand text-base text-ink-faint">
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
              <p className="mt-2 line-clamp-2 font-hand text-lg leading-snug text-ink-soft text-pretty">
                {e.insights}
              </p>
            )}
          </div>

          <ChevronRight
            size={16}
            className="mt-1 shrink-0 text-ink-faint/40 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:text-ink-faint"
          />
        </button>

        {/* Acción de borrar — separada */}
        <div className="flex items-center border-l border-ink/8 px-2">
          <IconButton
            tone="danger"
            onClick={() => onDelete(e.id)}
            aria-label="Eliminar"
          >
            <Trash2 size={15} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

function EmptyState({ onNueva }: { onNueva: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
      <ClipboardList size={40} strokeWidth={1.5} className="-rotate-6 text-ink-faint/60" />
      <div>
        <h3 className="mb-1.5 font-hand text-3xl leading-none text-ink text-balance">
          Sin entrevistas aún
        </h3>
        <p className="mx-auto max-w-xs font-hand text-lg leading-snug text-ink-faint text-pretty">
          Empieza registrando tu primera visita a un negocio local.
        </p>
      </div>
      <Button onClick={onNueva}>Crear primera entrevista</Button>
    </div>
  );
}
