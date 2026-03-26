import type { PropsWithChildren } from "react";
import { Container } from "@/components/shared/container";
import { DashboardSidebar } from "@/components/shared/dashboard-sidebar";
import type { Locale } from "@/lib/i18n";

interface DashboardShellProps extends PropsWithChildren {
  locale: Locale;
}

export function DashboardShell({ children, locale }: DashboardShellProps) {
  return (
    <main>
      <Container className="pb-16 pt-8 sm:pt-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <DashboardSidebar locale={locale} />
          <div className="min-w-0 flex-1 rounded-[32px] border border-slate-200/70 bg-white/[0.44] p-3 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:p-4">
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
}
