"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StarterProjectLogo } from "@/components/brand/starter-project-logo";
import { cn } from "@/utils/cn";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";
import { dashboardNavigation } from "@/lib/navigation";

interface DashboardSidebarProps {
  locale: Locale;
}

export function DashboardSidebar({ locale }: DashboardSidebarProps) {
  const pathname = usePathname();
  const copy = getLocaleCopy(locale);
  const navigation = dashboardNavigation(locale);

  return (
    <aside className="w-full lg:w-72 lg:flex-none">
      <div className="rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,248,255,0.76))] p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] lg:sticky lg:top-24">
        <div className="border-b border-slate-200/80 px-3 pb-4 dark:border-white/8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
            {copy.common.workspace}
          </p>
          <div className="mt-3">
            <StarterProjectLogo iconClassName="h-9 w-9" locale={locale} />
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {locale === "fr"
              ? "Une base claire pour votre application, votre compte et la gestion de votre offre."
              : "A clean foundation for your app, account, and billing management."}
          </p>
        </div>

        <nav className="mt-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                className={cn(
                  "group flex items-center justify-between rounded-2xl px-4 py-3 transition duration-200",
                  isActive
                    ? "bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] dark:bg-white dark:text-slate-950 dark:shadow-[0_18px_40px_rgba(255,255,255,0.14)]"
                    : "bg-slate-950/[0.03] text-slate-600 hover:bg-slate-950/[0.06] hover:text-slate-950 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white",
                )}
                href={item.href}
                key={item.href}
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p
                    className={cn(
                      "text-xs",
                      isActive ? "text-slate-300 dark:text-slate-700" : "text-slate-500",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition",
                    isActive ? "bg-white dark:bg-slate-950" : "bg-slate-300 dark:bg-white/15",
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
