import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type IconButtonTone = "default" | "primary" | "danger";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: IconButtonTone;
}

const tones: Record<IconButtonTone, string> = {
  default: "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100",
  primary: "text-zinc-300 hover:text-indigo-600 hover:bg-indigo-50",
  danger: "text-zinc-300 hover:text-red-500 hover:bg-red-50",
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
        "p-1.5 rounded-lg transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
