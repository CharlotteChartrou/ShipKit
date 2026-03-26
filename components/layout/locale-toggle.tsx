"use client";

import { useRouter } from "next/navigation";
import { type Locale, LOCALE_COOKIE } from "@/lib/i18n";

interface LocaleToggleProps {
  locale: Locale;
}

export function LocaleToggle({ locale }: LocaleToggleProps) {
  const router = useRouter();
  const nextLocale = locale === "fr" ? "en" : "fr";

  return (
    <button
      aria-label={locale === "fr" ? "Changer la langue" : "Change language"}
      className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
        router.refresh();
      }}
      type="button"
    >
      <span className="text-xs font-semibold tracking-[0.16em] uppercase">{locale}</span>
      <span>{nextLocale.toUpperCase()}</span>
    </button>
  );
}
