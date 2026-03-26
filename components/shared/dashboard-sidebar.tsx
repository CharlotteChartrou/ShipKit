"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SaaSFrameLogo } from "@/components/brand/saasframe-logo";
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
      <div className="rounded-[28px] border border-[rgba(99,102,241,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(239,243,255,0.84))] p-4 shadow-[0_30px_80px_rgba(79,70,229,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] dark:shadow-none lg:sticky lg:top-24">
        <div className="border-b border-[rgba(99,102,241,0.12)] px-3 pb-4 dark:border-white/8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-500">
            {copy.common.workspace}
          </p>
          <div className="mt-3">
            <SaaSFrameLogo iconClassName="h-9 w-9" locale={locale} />
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {locale === "fr"
              ? "Une base SaaS premium pour votre produit, votre compte et votre plan."
              : "A premium SaaS foundation for your product, account, and plan management."}
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
                    ? "bg-[linear-gradient(135deg,#4F46E5,#7C3AED)] text-white shadow-[0_20px_45px_rgba(79,70,229,0.28)] dark:shadow-[0_18px_40px_rgba(79,70,229,0.18)]"
                    : "bg-[rgba(79,70,229,0.04)] text-slate-600 hover:bg-[rgba(79,70,229,0.08)] hover:text-slate-950 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white",
                )}
                href={item.href}
                key={item.href}
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p
                    className={cn(
                      "text-xs",
                      isActive ? "text-indigo-100 dark:text-indigo-100" : "text-slate-500",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition",
                    isActive ? "bg-white" : "bg-indigo-200 dark:bg-white/15",
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
