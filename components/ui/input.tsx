import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-950 outline-none placeholder:text-slate-400 transition focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-200/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white/20 dark:focus:bg-white/7 dark:focus:ring-white/6",
        className,
      )}
      {...props}
    />
  );
}
