"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Locale, LOCALE_COOKIE } from "@/lib/i18n";
import { localePath, stripLocaleFromPathname } from "@/lib/locale";

interface LocaleToggleProps {
  locale: Locale;
}

export function LocaleToggle({ locale }: LocaleToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextLocale = locale === "fr" ? "en" : "fr";

  return (
    <button
      aria-label={locale === "fr" ? "Changer la langue" : "Change language"}
      className="inline-flex h-10 items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/80 px-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white sm:h-11 sm:gap-2 sm:px-4 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
        const nextPath = localePath(nextLocale, stripLocaleFromPathname(pathname));
        const query = searchParams.toString();
        router.push(query ? `${nextPath}?${query}` : nextPath);
      }}
      type="button"
    >
      <span className="text-[11px] font-semibold tracking-[0.16em] uppercase sm:text-xs">{locale}</span>
      <span className="text-[11px] sm:text-sm">{nextLocale.toUpperCase()}</span>
    </button>
  );
}
