import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/shared/app-header";
import { AuthProvider } from "@/components/shared/auth-provider";
import { SiteFooter } from "@/components/shared/site-footer";
import { hasSupabaseEnv, getBaseSiteUrl } from "@/lib/env";
import { getLocaleCopy, type Locale } from "@/lib/i18n";
import { createServerSupabaseClient } from "@/lib/supabase";
import { isLocale, localePath, locales } from "@/lib/locale";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = getLocaleCopy(locale);
  const baseSiteUrl = getBaseSiteUrl();

  return {
    title: copy.brand.name,
    description: copy.brand.tagline,
    alternates: {
      canonical: localePath(locale, "/"),
      languages: {
        en: localePath("en", "/"),
        fr: localePath("fr", "/"),
      },
    },
    metadataBase: baseSiteUrl ? new URL(baseSiteUrl) : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  let session = null;

  if (hasSupabaseEnv) {
    const supabase = await createServerSupabaseClient();
    session = (await supabase.auth.getSession()).data.session;
  }

  return (
    <AuthProvider initialSession={session}>
      <div className="relative min-h-screen">
        <AppHeader locale={locale as Locale} session={session} />
        <div className="flex min-h-[calc(100vh-76px)] flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter locale={locale as Locale} />
        </div>
      </div>
    </AuthProvider>
  );
}
