import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { controlClasses } from "./control";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({ error = false, className, children, ...props }: SelectProps) {
  return (
    <select className={cn(controlClasses(error), className)} {...props}>
      {children}
    </select>
  );
}
