import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  complete?: boolean;
  className?: string;
}

export function ProgressBar({ value, complete = false, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("relative h-2 bg-zinc-100 rounded-full overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-y-0 left-0 rounded-full transition-all duration-700",
          complete ? "bg-emerald-500" : "bg-indigo-600",
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
