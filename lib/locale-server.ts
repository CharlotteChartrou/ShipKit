import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale, type Locale } from "@/lib/i18n";
import { getLocaleFromPathname } from "@/lib/locale";

export async function getCurrentLocale(): Promise<Locale> {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname");
  const pathnameLocale = pathname ? getLocaleFromPathname(pathname) : null;

  if (pathnameLocale) {
    return pathnameLocale;
  }

  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);
}
