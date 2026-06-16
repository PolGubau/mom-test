import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded-lg"
    >
      <span
        className={cn(
          "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors",
          checked ? "bg-emerald-600 border-emerald-600" : "border-zinc-300 bg-white",
        )}
      >
        {checked && <Check size={12} className="text-white" strokeWidth={3} />}
      </span>
      <span className="text-sm font-medium text-zinc-700">{label}</span>
    </button>
  );
}
