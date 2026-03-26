import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasSupabaseEnv, getSupabaseEnv } from "@/lib/env";
import { authRoutes, protectedAppRoutes } from "@/lib/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import { defaultLocale, getLocaleFromPathname, localePath, stripLocaleFromPathname } from "@/lib/locale";

function matchesPath(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (cookieLocale === "fr" || cookieLocale === "en") {
    return cookieLocale;
  }

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .find(Boolean);

  if (preferred?.startsWith("fr")) {
    return "fr";
  }

  return defaultLocale;
}

export async function updateSession(request: NextRequest) {
  const pathnameLocale = getLocaleFromPathname(request.nextUrl.pathname);

  if (!pathnameLocale) {
    const locale = getPreferredLocale(request);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localePath(locale, request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  const normalizedPathname = stripLocaleFromPathname(request.nextUrl.pathname);

  if (!hasSupabaseEnv) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set(LOCALE_COOKIE, pathnameLocale);
    return response;
  }

  const { supabasePublishableKey, supabaseUrl } = getSupabaseEnv();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Mirror refreshed auth cookies onto both the incoming request and the outgoing response
          // so Server Components and the browser stay in sync during the same request cycle.
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          requestHeaders.set("x-pathname", request.nextUrl.pathname);
          response = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { search } = request.nextUrl;
  response.cookies.set(LOCALE_COOKIE, pathnameLocale);

  if (!user && matchesPath(normalizedPathname, [...protectedAppRoutes])) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localePath(pathnameLocale, "/login");
    redirectUrl.searchParams.set("next", `${normalizedPathname}${search}`);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && matchesPath(normalizedPathname, [...authRoutes])) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localePath(pathnameLocale, "/dashboard");
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
