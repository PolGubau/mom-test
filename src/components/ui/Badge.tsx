import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type BadgeVariant = "neutral" | "success";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  neutral: "text-ink-soft",
  success: "text-leaf -rotate-2",
};

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-hand text-lg leading-none",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
