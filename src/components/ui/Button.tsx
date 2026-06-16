import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-soft shadow-sm",
  outline: "border border-ink/30 text-ink hover:bg-ink/5",
  ghost: "border border-ink/15 text-ink-soft hover:bg-ink/5",
  danger: "bg-pen text-paper hover:opacity-90 shadow-sm",
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
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all",
        "active:translate-y-px",
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
