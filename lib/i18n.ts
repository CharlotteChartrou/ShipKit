import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import { localePath } from "@/lib/locale";

export const LOCALE_COOKIE = "starter-project-locale";

export type Locale = "en" | "fr";
export type Messages = typeof enMessages;

const messagesByLocale: Record<Locale, Messages> = {
  en: enMessages,
  fr: frMessages,
};

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "fr" ? "fr" : "en";
}

export function getLocaleCopy(locale: Locale): Messages {
  return messagesByLocale[locale];
}

export function getMarketingNavigation(locale: Locale) {
  const copy = getLocaleCopy(locale);

  return [
    { href: localePath(locale, "/dashboard"), label: copy.navigation.marketing.workspace },
    { href: localePath(locale, "/account"), label: copy.navigation.marketing.account },
    { href: localePath(locale, "/plan"), label: copy.navigation.marketing.plan },
  ] as const;
}

export function getDashboardNavigation(locale: Locale) {
  const copy = getLocaleCopy(locale);

  return [
    {
      href: localePath(locale, "/dashboard"),
      label: copy.navigation.dashboard.workspace.label,
      description: copy.navigation.dashboard.workspace.description,
    },
    {
      href: localePath(locale, "/account"),
      label: copy.navigation.dashboard.account.label,
      description: copy.navigation.dashboard.account.description,
    },
    {
      href: localePath(locale, "/plan"),
      label: copy.navigation.dashboard.plan.label,
      description: copy.navigation.dashboard.plan.description,
    },
  ] as const;
}
