import { Card } from '@/components/ui';
import { CheckCircle2, Clock, Heart, Lightbulb, MessageSquare, XCircle } from 'lucide-react';

const reglas = [
  {
    icon: <Heart size={18} className="text-indigo-500" />,
    titulo: 'Habla sobre su vida',
    desc: 'No sobre tu idea. Que te cuenten cómo trabajan, qué problemas tienen, qué les frustra.'
  },
  {
    icon: <Clock size={18} className="text-indigo-500" />,
    titulo: 'Pasado y presente, nunca futuro',
    desc: 'Las personas mienten sobre el futuro sin saberlo. Pregunta qué han hecho, no qué harían.'
  },
  {
    icon: <MessageSquare size={18} className="text-indigo-500" />,
    titulo: 'Escucha más, habla menos',
    desc: 'Tu trabajo es hacer preguntas y callarte. Si explicas tu idea, contaminas las respuestas.'
  },
  {
    icon: <Lightbulb size={18} className="text-indigo-500" />,
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
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div className="bg-linear-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
            <MessageSquare size={13} className="text-white" />
          </div>
          <span className="text-indigo-200 text-xs font-medium uppercase tracking-wider">The Mom Test</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Cómo entrevistar sin sesgar</h2>
        <p className="text-indigo-200 text-sm leading-relaxed">
          Preguntas que incluso tu madre respondería honestamente, porque no hablan sobre tu idea, sino sobre su vida.
        </p>
        <p className="text-indigo-300 text-xs mt-3">— Rob Fitzpatrick</p>
      </div>

      {/* Reglas */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 px-1">
          Las 4 Reglas de Oro
        </h3>
        <div className="flex flex-col gap-3">
          {reglas.map(r => (
            <Card key={r.titulo} className="p-4 flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                {r.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 mb-0.5">{r.titulo}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{r.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Ejemplos */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 px-1">
          Ejemplos: Bien vs Mal
        </h3>
        <div className="flex flex-col gap-4">
          {ejemplos.map(ej => (
            <Card key={ej.mal} className="overflow-hidden">
              <div className="p-4 border-b border-zinc-100">
                <div className="flex items-start gap-2.5 mb-1">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wider">Evita esto</span>
                </div>
                <p className="text-sm text-zinc-600 italic ml-6">"{ej.mal}"</p>
              </div>
              <div className="p-4 bg-emerald-50/50">
                <div className="flex items-start gap-2.5 mb-1">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Mejor así</span>
                </div>
                <p className="text-sm text-zinc-700 ml-6">"{ej.bien}"</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Señales */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
        <h3 className="text-sm font-semibold text-amber-900 mb-3 flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-600" />
          Señales que validan el problema
        </h3>
        <ul className="space-y-2">
          {[
            'Han pagado dinero por una solución (aunque mala)',
            'Han dedicado tiempo significativo a resolverlo',
            'Lo mencionan espontáneamente como un dolor',
            'Han buscado activamente alternativas en el pasado',
            'Se frustran al hablar del tema',
          ].map(s => (
            <li key={s} className="flex items-start gap-2 text-sm text-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
