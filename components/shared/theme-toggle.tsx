"use client";

import { useTheme } from "@/components/shared/theme-provider";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";

interface ThemeToggleProps {
  locale: Locale;
}

export function ThemeToggle({ locale }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const copy = getLocaleCopy(locale);

  return (
    <button
      aria-label={copy.common.toggleTheme}
      aria-pressed={theme === "dark"}
      className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 px-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white sm:h-11 sm:px-4 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
      onClick={toggleTheme}
      type="button"
    >
      <span className="text-base leading-none">{theme === "dark" ? "◐" : "◑"}</span>
      <span className="hidden sm:inline">{theme === "dark" ? copy.common.dark : copy.common.light}</span>
    </button>
  );
}
