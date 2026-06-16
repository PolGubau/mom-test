import type { ReactNode } from "react";
import { Card } from "./Card";

interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export function Section({ title, icon, children }: SectionProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-100">
        <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
      </div>
      <div className="p-4 flex flex-col gap-4">{children}</div>
    </Card>
  );
}
