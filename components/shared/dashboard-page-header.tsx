import type { ReactNode } from "react";

interface DashboardPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function DashboardPageHeader({
  actions,
  description,
  eyebrow,
  title,
}: DashboardPageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[rgba(99,102,241,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(241,244,255,0.82))] p-6 shadow-[0_24px_70px_rgba(79,70,229,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] dark:shadow-none sm:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/80 to-transparent dark:via-white/20" />
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-400/12" />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
          {eyebrow}
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
