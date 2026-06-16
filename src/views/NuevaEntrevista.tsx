import { Button, Checkbox, Field, Input, Section, Select, Textarea } from '@/components/ui';
import { PREGUNTAS_MOM_TEST, TIPOS_NEGOCIO } from '@/lib/constants';
import type { Entrevista } from '@/types';
import { Building2, ChevronDown, ChevronUp, Lightbulb, MessageSquareQuote, Save, User } from 'lucide-react';
import { useState } from 'react';

interface NuevaEntrevistaProps {
  entrevistaEditar?: Entrevista | null;
  onSave: (data: Omit<Entrevista, 'id' | 'creadoEn'>) => void;
  onCancel?: () => void;
}

const EMPTY_FORM = {
  nombreNegocio: '',
  tipoNegocio: '',
  fecha: new Date().toISOString().split('T')[0],
  contactoNombre: '',
  contactoTelefono: '',
  contactoEmail: '',
  solucionActual: '',
  ultimaVezProblema: '',
  herramientasPasadas: '',
  costeSolucionPasada: '',
  insights: '',
  completada: false,
};

type FormState = typeof EMPTY_FORM;

export function NuevaEntrevista({ entrevistaEditar, onSave, onCancel }: NuevaEntrevistaProps) {
  const [form, setForm] = useState<FormState>(() => {
    if (!entrevistaEditar) return EMPTY_FORM;
    return {
      nombreNegocio: entrevistaEditar.nombreNegocio,
      tipoNegocio: entrevistaEditar.tipoNegocio,
      fecha: entrevistaEditar.fecha,
      contactoNombre: entrevistaEditar.contacto.nombre ?? '',
      contactoTelefono: entrevistaEditar.contacto.telefono ?? '',
      contactoEmail: entrevistaEditar.contacto.email ?? '',
      solucionActual: entrevistaEditar.respuestas.solucionActual ?? '',
      ultimaVezProblema: entrevistaEditar.respuestas.ultimaVezProblema ?? '',
      herramientasPasadas: entrevistaEditar.respuestas.herramientasPasadas ?? '',
      costeSolucionPasada: entrevistaEditar.respuestas.costeSolucionPasada ?? '',
      insights: entrevistaEditar.insights,
      completada: entrevistaEditar.completada,
    };
  });
  const [showContacto, setShowContacto] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombreNegocio.trim()) e.nombreNegocio = 'Requerido';
    if (!form.tipoNegocio) e.tipoNegocio = 'Selecciona un tipo';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    onSave({
      nombreNegocio: form.nombreNegocio.trim(),
      tipoNegocio: form.tipoNegocio,
      fecha: form.fecha,
      contacto: {
        nombre: form.contactoNombre || undefined,
        telefono: form.contactoTelefono || undefined,
        email: form.contactoEmail || undefined,
      },
      respuestas: {
        solucionActual: form.solucionActual,
        ultimaVezProblema: form.ultimaVezProblema,
        herramientasPasadas: form.herramientasPasadas,
        costeSolucionPasada: form.costeSolucionPasada,
      },
      insights: form.insights,
      completada: form.completada,
    });
    if (!entrevistaEditar) setForm(EMPTY_FORM);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7 animate-page-in">
      {/* Encabezado */}
      <div>
        <h2 className="font-hand text-4xl leading-none text-ink">
          {entrevistaEditar ? 'Editar entrevista' : 'Nueva entrevista'}
        </h2>
        <p className="mt-1 font-hand text-lg text-ink-faint">Rellena durante o justo después de la visita</p>
      </div>

      {/* Datos básicos */}
      <Section title="Datos del negocio" icon={<Building2 size={18} />}>
        <Field label="Nombre del negocio" error={errors.nombreNegocio}>
          <Input
            error={!!errors.nombreNegocio}
            placeholder="ej. Panadería San José"
            value={form.nombreNegocio}
            onChange={e => set('nombreNegocio', e.target.value)}
          />
        </Field>
        <Field label="Tipo de negocio" error={errors.tipoNegocio}>
          <Select
            error={!!errors.tipoNegocio}
            value={form.tipoNegocio}
            onChange={e => set('tipoNegocio', e.target.value)}
          >
            <option value="">Selecciona tipo...</option>
            {TIPOS_NEGOCIO.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Fecha de visita">
          <Input
            type="date"
            value={form.fecha}
            onChange={e => set('fecha', e.target.value)}
          />
        </Field>
        <button
          type="button"
          onClick={() => setShowContacto(v => !v)}
          className="flex items-center gap-1.5 self-start rounded-sm font-hand text-lg text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
        >
          <User size={15} />
          Datos de contacto (opcional)
          {showContacto ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {showContacto && (
          <div className="flex flex-col gap-3 border-l-2 border-ink/15 pl-3">
            <Field label="Nombre">
              <Input placeholder="Nombre del contacto"
                value={form.contactoNombre} onChange={e => set('contactoNombre', e.target.value)} />
            </Field>
            <Field label="Teléfono">
              <Input placeholder="+34 600 000 000"
                value={form.contactoTelefono} onChange={e => set('contactoTelefono', e.target.value)} />
            </Field>
            <Field label="Email">
              <Input type="email" placeholder="email@negocio.com"
                value={form.contactoEmail} onChange={e => set('contactoEmail', e.target.value)} />
            </Field>
          </div>
        )}
      </Section>

      {/* Preguntas Mom Test */}
      <Section title="Preguntas Mom Test" icon={<MessageSquareQuote size={18} />}>
        {PREGUNTAS_MOM_TEST.map(q => {
          const key = q.key as keyof FormState;
          return (
            <Field key={q.key} label={q.label} hint={q.hint} emphasis>
              <Textarea
                className="min-h-20"
                placeholder={q.placeholder ?? 'Anota la respuesta tal cual la dieron...'}
                value={form[key] as string}
                onChange={e => set(key, e.target.value)}
              />
            </Field>
          );
        })}
      </Section>

      {/* Insights generales */}
      <Section title="Insights generales" icon={<Lightbulb size={18} />}>
        <Field label="Notas libres, dolores detectados, frases clave...">
          <Textarea
            className="min-h-28"
            placeholder="Anota cualquier cosa relevante: frases textuales, emociones, datos sorprendentes..."
            value={form.insights}
            onChange={e => set('insights', e.target.value)}
          />
        </Field>
        <Checkbox
          checked={form.completada}
          onChange={v => set('completada', v)}
          label="Marcar como completada"
        />
      </Section>

      {/* Actions */}
      <div className="flex gap-3 pb-6">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
        )}
        <Button type="submit" className="flex-1">
          <Save size={16} />
          {entrevistaEditar ? 'Guardar cambios' : 'Guardar entrevista'}
        </Button>
      </div>
    </form>
  );
}
