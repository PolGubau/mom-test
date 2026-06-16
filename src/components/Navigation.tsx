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
  { id: 'historial', label: 'Historial', icon: <ClipboardList size={22} /> },
  { id: 'nueva', label: 'Nueva', icon: <PlusCircle size={22} /> },
  { id: 'guia', label: 'Guía', icon: <BookOpen size={22} /> },
];

interface NavigationProps {
  vistaActual: Vista;
  onChange: (vista: Vista) => void;
}

export function BottomNav({ vistaActual, onChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-200 safe-area-pb md:hidden">
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
                'flex-1 flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/40',
                active ? 'text-indigo-600' : 'text-zinc-400 hover:text-zinc-600',
              )}
            >
              <span className={cn('transition-transform', active && 'scale-110')}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function TopNav({ vistaActual, onChange }: NavigationProps) {
  return (
    <header className="hidden md:flex sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between px-6 h-14">
        <Logo />
        <nav className="flex items-center gap-1">
          {navItems.map(item => {
            const active = vistaActual === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40',
                  active
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100',
                )}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
