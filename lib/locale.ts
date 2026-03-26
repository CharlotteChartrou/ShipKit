import { type Locale } from "@/lib/i18n";

export const locales: Locale[] = ["en", "fr"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fr";
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : null;
}

export function stripLocaleFromPathname(pathname: string) {
  const locale = getLocaleFromPathname(pathname);

  if (!locale) {
    return pathname || "/";
  }

  const stripped = pathname.replace(`/${locale}`, "");
  return stripped.length > 0 ? stripped : "/";
}

export function localePath(locale: Locale, pathname: string) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const strippedPath = stripLocaleFromPathname(normalizedPath);
  return strippedPath === "/" ? `/${locale}` : `/${locale}${strippedPath}`;
}
