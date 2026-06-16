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
      className="group flex items-center gap-2.5 cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
    >
      <span
        className={cn(
          "relative flex h-5 w-5 items-center justify-center rounded-[5px] border-2 transition-colors",
          checked ? "border-leaf" : "border-ink/35 group-hover:border-ink/60",
        )}
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-leaf"
            aria-hidden="true"
          >
            <path className="check-stroke" d="M4 12.5 L9.5 18 L20 5.5" />
          </svg>
        )}
      </span>
      <span className="font-hand text-lg text-ink">{label}</span>
    </button>
  );
}
