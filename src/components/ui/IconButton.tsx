import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export type IconButtonTone = "default" | "primary" | "danger";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: IconButtonTone;
}

const tones: Record<IconButtonTone, string> = {
  default: "text-ink-faint hover:text-ink hover:bg-ink/5",
  primary: "text-ink-faint hover:text-ink hover:bg-ink/5",
  danger: "text-ink-faint hover:text-pen hover:bg-pen/10",
};

export function IconButton({
  tone = "default",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "p-1.5 rounded-md transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
