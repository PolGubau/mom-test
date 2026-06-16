import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-paper shadow-sm hover:bg-ink-soft active:bg-ink active:shadow-none",
  outline:
    "border border-ink/30 text-ink hover:bg-ink/[0.06] active:bg-ink/10",
  ghost:
    "border border-ink/15 text-ink-soft hover:text-ink hover:bg-ink/[0.06] active:bg-ink/10",
  danger:
    "bg-pen text-paper shadow-sm hover:bg-pen/85 active:bg-pen active:shadow-none",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
        "transition-all duration-150",
        "active:scale-[0.96]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
