import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { getCurrentLocale } from "@/lib/locale-server";
import { getThemeBootstrapScript } from "@/utils/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaSFrame",
  description: "Build your SaaS on a clean foundation.",
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
  const locale = await getCurrentLocale();

  return (
    <html lang={locale}>
      <body className="font-sans">
        {/* Apply the saved theme before hydration to avoid a light/dark flash on first paint. */}
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {getThemeBootstrapScript()}
        </Script>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
