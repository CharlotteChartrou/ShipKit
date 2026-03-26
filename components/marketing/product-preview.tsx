import { Card } from "@/components/ui/card";
import { ShipKitLogo } from "@/components/brand/shipkit-logo";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";

interface ProductPreviewProps {
  locale: Locale;
}

export function ProductPreview({ locale }: ProductPreviewProps) {
  const copy = getLocaleCopy(locale);

  return (
    <div className="mx-auto max-w-6xl space-y-5 text-center">
      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{copy.preview.eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {copy.preview.title}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          {copy.preview.body}
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute inset-x-10 -top-6 h-24 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_70%)]" />
        <Card className="group relative overflow-hidden border-slate-300/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,255,0.92))] p-3 text-left shadow-[0_30px_90px_rgba(15,23,42,0.14)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] sm:p-4">
          <div className="rounded-[24px] border border-slate-200/80 bg-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950/90">
            <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 py-3 dark:border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <div className="ml-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                shipkit.app/{locale === "fr" ? "espace" : "dashboard"}
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
              <aside className="border-b border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03] lg:border-b-0 lg:border-r">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]">
                    <ShipKitLogo iconClassName="h-10 w-10" locale={locale} withTagline />
                  </div>

                  <div className="space-y-2">
                    {copy.preview.nav.map((label, index) => (
                      <div
                        className={
                          index === 0
                            ? "rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
                            : "rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200"
                        }
                        key={label}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="space-y-5 p-4 sm:p-6">
                <div className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.88))] p-5 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {copy.preview.dashboardHome}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                      {copy.preview.dashboardTitle}
                    </h3>
                    <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {copy.preview.dashboardBody}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                    {copy.preview.proActive}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: copy.preview.plan, value: "Pro" },
                    { label: copy.preview.payments, value: copy.preview.ready },
                    { label: copy.preview.email, value: copy.preview.connected },
                  ].map(({ label, value }) => (
                    <div
                      className="rounded-[22px] border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.04]"
                      key={label}
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                        {label}
                      </p>
                      <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-[24px] border border-slate-200 bg-white/90 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">{copy.preview.launchChecklist}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {copy.preview.checklistBody}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-cyan-600 dark:text-cyan-300">{copy.preview.complete}</div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {copy.preview.checklist.map((label, index) => (
                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-white/8 dark:bg-white/[0.03]" key={label}>
                          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                          <span
                            className={
                              index < 3
                                ? "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300"
                                : "rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                            }
                          >
                            {index < 3 ? copy.preview.done : copy.preview.next}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-slate-100 dark:border-white/10 dark:bg-white dark:text-slate-950">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 dark:text-slate-600">
                      {copy.preview.includedSurfaces}
                    </p>
                    <div className="mt-5 space-y-4">
                      {copy.preview.surfaces.map((item) => (
                        <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm dark:border-slate-200 dark:bg-slate-100" key={item}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
