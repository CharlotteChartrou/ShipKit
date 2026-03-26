import type { Metadata } from "next";
import Script from "next/script";
import { AppHeader } from "@/components/shared/app-header";
import { AuthProvider } from "@/components/shared/auth-provider";
import { SiteFooter } from "@/components/shared/site-footer";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { hasSupabaseEnv } from "@/lib/env";
import { getCurrentLocale } from "@/lib/locale";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getThemeBootstrapScript } from "@/utils/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starter Project",
  description: "A clean Next.js SaaS starter with auth, billing, and a reusable dashboard structure.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;
  const locale = await getCurrentLocale();

  if (hasSupabaseEnv) {
    const supabase = await createServerSupabaseClient();
    session = (await supabase.auth.getSession()).data.session;
  }

  return (
    <html lang="en">
      <body className="font-sans">
        {/* Apply the saved theme before hydration to avoid a light/dark flash on first paint. */}
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {getThemeBootstrapScript()}
        </Script>
        <ThemeProvider>
          <AuthProvider initialSession={session}>
            <div className="relative min-h-screen">
              <AppHeader locale={locale} session={session} />
              <div className="flex min-h-[calc(100vh-76px)] flex-col">
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
