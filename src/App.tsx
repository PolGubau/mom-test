import { DetalleModal } from '@/components/DetalleModal';
import { BottomNav, TopNav } from '@/components/Navigation';
import { ToastContainer } from '@/components/Toast';
import { Logo } from '@/components/ui';
import { useInterviews } from '@/hooks/useInterviews';
import { useToast } from '@/hooks/useToast';
import type { Entrevista, Vista } from '@/types';
import { Dashboard } from '@/views/Dashboard';
import { GuiaMomTest } from '@/views/GuiaMomTest';
import { NuevaEntrevista } from '@/views/NuevaEntrevista';
import { useState } from 'react';

export default function App() {
  const [vista, setVista] = useState<Vista>('historial');
  const [entrevistaDetalle, setEntrevistaDetalle] = useState<Entrevista | null>(null);
  const [entrevistaEditar, setEntrevistaEditar] = useState<Entrevista | null>(null);

  const {
    entrevistas, completadas, total, meta, progreso,
    addEntrevista, updateEntrevista, deleteEntrevista, toggleCompletada,
  } = useInterviews();

  const { toasts, addToast, removeToast } = useToast();

  const handleSave = (data: Omit<Entrevista, 'id' | 'creadoEn'>) => {
    if (entrevistaEditar) {
      updateEntrevista(entrevistaEditar.id, data);
      addToast('Entrevista actualizada ✓', 'success');
      setEntrevistaEditar(null);
      setEntrevistaDetalle(null);
      setVista('historial');
    } else {
      addEntrevista(data);
      addToast('Entrevista guardada ✓', 'success');
      setVista('historial');
    }
  };

  const handleDelete = (id: string) => {
    deleteEntrevista(id);
    addToast('Entrevista eliminada', 'error');
    if (entrevistaDetalle?.id === id) setEntrevistaDetalle(null);
  };

  const handleEdit = () => {
    setEntrevistaEditar(entrevistaDetalle);
    setEntrevistaDetalle(null);
    setVista('nueva');
  };

  const handleNueva = () => {
    setEntrevistaEditar(null);
    setVista('nueva');
  };

  const handleChangeVista = (v: Vista) => {
    setEntrevistaEditar(null);
    setVista(v);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-zinc-50">
      <TopNav vistaActual={vista} onChange={handleChangeVista} />

      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-zinc-200 px-4 py-3.5">
        <Logo
          subtitle={
            vista === 'historial'
              ? `${completadas}/${meta} completadas`
              : vista === 'nueva'
                ? entrevistaEditar
                  ? 'Editar entrevista'
                  : 'Nueva entrevista'
                : 'Guía de entrevistas'
          }
        />
      </div>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-5 pb-24 md:pb-8 md:px-6">
        {vista === 'historial' && (
          <Dashboard
            entrevistas={entrevistas}
            completadas={completadas}
            total={total}
            meta={meta}
            progreso={progreso}
            onDelete={handleDelete}
            onToggle={toggleCompletada}
            onSelect={setEntrevistaDetalle}
            onNueva={handleNueva}
          />
        )}
        {vista === 'nueva' && (
          <NuevaEntrevista
            entrevistaEditar={entrevistaEditar}
            onSave={handleSave}
            onCancel={entrevistaEditar
              ? () => { setEntrevistaEditar(null); setVista('historial'); }
              : undefined}
          />
        )}
        {vista === 'guia' && <GuiaMomTest />}
      </main>

      <BottomNav vistaActual={vista} onChange={handleChangeVista} />

      {entrevistaDetalle && (
        <DetalleModal
          entrevista={entrevistaDetalle}
          onClose={() => setEntrevistaDetalle(null)}
          onEdit={handleEdit}
          onToggle={() => {
            toggleCompletada(entrevistaDetalle.id);
            setEntrevistaDetalle(prev => prev ? { ...prev, completada: !prev.completada } : null);
          }}
        />
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
