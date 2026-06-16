import { cn } from "@/lib/cn";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error = false, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "lined w-full resize-none rounded-sm bg-transparent px-1 pt-0.5",
        "font-hand text-xl leading-7 text-ink",
        "placeholder:font-body placeholder:text-sm placeholder:leading-7 placeholder:text-ink-faint/70",
        "outline-none transition-colors",
        error && "bg-pen/5 ring-1 ring-pen/40",
        className,
      )}
      {...props}
    />
  );
}
