import { Logo } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Vista } from '@/types';
import { BookOpen, ClipboardList, PlusCircle } from 'lucide-react';

interface NavItem {
  id: Vista;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'historial', label: 'Historial', icon: <ClipboardList size={19} /> },
  { id: 'nueva', label: 'Nueva', icon: <PlusCircle size={19} /> },
  { id: 'guia', label: 'Guía', icon: <BookOpen size={19} /> },
];

interface NavigationProps {
  vistaActual: Vista;
  onChange: (vista: Vista) => void;
}

export function BottomNav({ vistaActual, onChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-paper border-t border-paper-edge safe-area-pb md:hidden">
      <div className="flex items-stretch h-16">
        {navItems.map(item => {
          const active = vistaActual === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex-1 flex flex-col items-center justify-center gap-0.5',
                'transition-all duration-150 active:scale-95',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/30',
                active
                  ? 'text-ink'
                  : 'text-ink-faint hover:text-ink-soft hover:bg-ink/4 active:bg-ink/6',
              )}
            >
              <span className={cn('transition-transform duration-200', active && '-rotate-6')}>
                {item.icon}
              </span>
              <span className={cn('font-hand text-base leading-none', active && 'font-semibold')}>
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-1.5 h-0.5 w-7 rounded-full bg-ink animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function TopNav({ vistaActual, onChange }: NavigationProps) {
  return (
    <header className="hidden md:flex sticky top-0 z-50 bg-paper/85 backdrop-blur border-b border-paper-edge">
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between px-6 h-14">
        <Logo />
        <nav className="flex items-end gap-6">
          {navItems.map(item => {
            const active = vistaActual === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative pb-1 px-1 font-hand text-xl leading-none rounded-sm',
                  'transition-all duration-150 active:scale-95',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30',
                  active ? 'text-ink' : 'text-ink-faint hover:text-ink-soft active:text-ink',
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-ink" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
