import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  complete?: boolean;
  className?: string;
}

export function ProgressBar({ value, complete = false, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("relative h-2.5 bg-ink/10 rounded-full overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-y-0 left-0 rounded-full transition-all duration-700",
          complete ? "bg-leaf" : "bg-ink",
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
