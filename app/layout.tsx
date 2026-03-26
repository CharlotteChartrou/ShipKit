import type { Metadata } from "next";
import Script from "next/script";
import { AppHeader } from "@/components/layout/app-header";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { hasSupabaseEnv } from "@/lib/env";
import { getCurrentLocale } from "@/lib/locale";
import { createClient } from "@/lib/supabase/server";
import { getThemeBootstrapScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShipKit",
  description: "Developer SaaS starter with auth, billing, and a modern dashboard UI.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;
  const locale = await getCurrentLocale();

  if (hasSupabaseEnv) {
    const supabase = await createClient();
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
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
