import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/cn";

interface LogoProps {
  subtitle?: string;
  className?: string;
}

export function Logo({ subtitle, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
        <ClipboardList size={14} className="text-white" />
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-900 leading-tight">Mom Test</p>
        {subtitle && <p className="text-[11px] text-zinc-400">{subtitle}</p>}
      </div>
    </div>
  );
}
