import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border border-[rgba(99,102,241,0.14)] bg-white/92 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white/20 dark:focus:bg-white/7 dark:focus:ring-white/6",
        className,
      )}
      {...props}
    />
  );
}
