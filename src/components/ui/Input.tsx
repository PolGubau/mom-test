import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { controlClasses } from "./control";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error = false, className, ...props }: InputProps) {
  return <input className={cn(controlClasses(error), className)} {...props} />;
}
