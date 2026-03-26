import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border border-[rgba(99,102,241,0.14)] bg-white/92 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-white/14 dark:bg-white/8 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-indigo-300/50 dark:focus:bg-white/10 dark:focus:ring-indigo-400/12",
        className,
      )}
      {...props}
    />
  );
}
