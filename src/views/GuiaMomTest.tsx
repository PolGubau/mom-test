import { Card } from '@/components/ui';
import { CheckCircle2, Clock, Heart, Lightbulb, MessageSquare, XCircle } from 'lucide-react';

const reglas = [
  {
    icon: <Heart size={18} className="text-ink-soft" />,
    titulo: 'Habla sobre su vida',
    desc: 'No sobre tu idea. Que te cuenten cómo trabajan, qué problemas tienen, qué les frustra.'
  },
  {
    icon: <Clock size={18} className="text-ink-soft" />,
    titulo: 'Pasado y presente, nunca futuro',
    desc: 'Las personas mienten sobre el futuro sin saberlo. Pregunta qué han hecho, no qué harían.'
  },
  {
    icon: <MessageSquare size={18} className="text-ink-soft" />,
    titulo: 'Escucha más, habla menos',
    desc: 'Tu trabajo es hacer preguntas y callarte. Si explicas tu idea, contaminas las respuestas.'
  },
  {
    icon: <Lightbulb size={18} className="text-ink-soft" />,
    titulo: 'Busca el dolor real con precio',
    desc: 'Si pagaron dinero o tiempo para resolver algo, ese problema es real. Eso valida el mercado.'
  },
];

const ejemplos = [
  {
    mal: '¿Comprarías un software que automatice tu inventario?',
    bien: '¿Cómo gestionas el inventario actualmente? ¿Cuándo fue la última vez que tuviste un problema con el stock?',
  },
  {
    mal: '¿Cuánto pagarías por una solución así?',
    bien: '¿Cuánto te costó la última herramienta o solución que compraste para este problema?',
  },
  {
    mal: '¿Crees que esto sería útil para tu negocio?',
    bien: '¿Qué has intentado hacer para resolver esto antes? ¿Por qué no funcionó?',
  },
  {
    mal: '¿Te interesaría probar nuestra app?',
    bien: '¿Cuánto tiempo a la semana dedicas a esto ahora mismo?',
  },
];

export function GuiaMomTest() {
  return (
    <div className="flex flex-col gap-9 animate-page-in">
      {/* Portada */}
      <div className="border-b-2 border-ink/15 pb-5">
        <span className="font-hand text-lg text-ink-faint">The Mom Test</span>
        <h2 className="mt-1 font-hand text-4xl leading-none text-ink">Cómo entrevistar sin sesgar</h2>
        <p className="mt-3 max-w-prose font-hand text-xl leading-7 text-ink-soft text-pretty">
          Preguntas que incluso tu madre respondería honestamente, porque no hablan sobre tu idea, sino sobre su vida.
        </p>
        <p className="mt-2 font-hand text-lg text-ink-faint">— Rob Fitzpatrick</p>
      </div>

      {/* Reglas */}
      <section className="flex flex-col gap-4">
        <h3 className="font-hand text-2xl leading-none text-ink">Las 4 reglas de oro</h3>
        <div className="flex flex-col gap-4">
          {reglas.map((r, i) => (
            <div key={r.titulo} className="flex gap-3">
              <span className="mt-0.5 font-hand text-2xl leading-none text-ink-faint">{i + 1}.</span>
              <div>
                <p className="flex items-center gap-2 font-hand text-xl leading-none text-ink">
                  {r.icon} {r.titulo}
                </p>
                <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft text-pretty">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ejemplos */}
      <section className="flex flex-col gap-4">
        <h3 className="font-hand text-2xl leading-none text-ink">Ejemplos: bien vs mal</h3>
        <div className="flex flex-col gap-5">
          {ejemplos.map(ej => (
            <div key={ej.mal} className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <XCircle size={16} className="mt-1 shrink-0 text-pen" />
                <p className="font-hand text-xl leading-snug text-ink-faint line-through decoration-pen/60">
                  {ej.mal}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-1 shrink-0 text-leaf" />
                <p className="font-hand text-xl leading-snug text-ink">{ej.bien}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Señales */}
      <Card className="p-5">
        <h3 className="mb-3 flex items-center gap-2 font-hand text-2xl leading-none text-ink">
          <Lightbulb size={18} className="text-ink-soft" />
          Señales que validan el problema
        </h3>
        <ul className="flex flex-col gap-1.5">
          {[
            'Han pagado dinero por una solución (aunque mala)',
            'Han dedicado tiempo significativo a resolverlo',
            'Lo mencionan espontáneamente como un dolor',
            'Han buscado activamente alternativas en el pasado',
            'Se frustran al hablar del tema',
          ].map(s => (
            <li key={s} className="flex items-start gap-2 font-hand text-lg leading-snug text-ink-soft">
              <CheckCircle2 size={15} className="mt-1 shrink-0 text-leaf" />
              {s}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
