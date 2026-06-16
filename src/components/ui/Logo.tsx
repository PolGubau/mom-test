import { cn } from "@/lib/cn";
import { NotebookPen } from "lucide-react";

interface LogoProps {
  subtitle?: string;
  className?: string;
}

export function Logo({ subtitle, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <NotebookPen size={20} strokeWidth={1.75} className="shrink-0 text-ink" />
      <div className="leading-none">
        <p className="font-hand text-2xl leading-none text-ink">Mom Test</p>
        {subtitle && <p className="mt-0.5 text-[11px] text-ink-faint">{subtitle}</p>}
      </div>
    </div>
  );
}
