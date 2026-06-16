import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function Section({ title, icon, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 font-hand text-2xl leading-none text-ink">
          <span className="text-ink-soft">{icon}</span>
          {title}
        </h3>
        <span className="h-0.5 w-14 rounded-full bg-ink/70" />
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
