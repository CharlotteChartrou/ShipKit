import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { logout } from "@/app/(auth)/actions";
import { ShipKitLogo } from "@/components/brand/shipkit-logo";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { marketingNavigation } from "@/lib/navigation";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";

interface AppHeaderProps {
  locale: Locale;
  session: Session | null;
}

export function AppHeader({ locale, session }: AppHeaderProps) {
  const copy = getLocaleCopy(locale);
  const navigation = marketingNavigation(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/72 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72">
      <Container className="flex h-[76px] items-center justify-between gap-4">
        <Link href="/">
          <ShipKitLogo locale={locale} withTagline />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-2 py-1 md:flex dark:border-white/10 dark:bg-white/[0.04]">
          {navigation.map((item) => (
            <Link key={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-950/[0.04] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleToggle locale={locale} />
          <ThemeToggle locale={locale} />
          {session?.user ? (
            <>
              <span className="hidden max-w-48 truncate text-sm text-slate-500 dark:text-slate-400 sm:inline">{session.user.email}</span>
              <form action={logout}>
                <Button variant="ghost">{locale === "fr" ? "Se déconnecter" : "Log out"}</Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild className="hidden sm:inline-flex" variant="ghost">
                <Link href="/login">{copy.common.signIn}</Link>
              </Button>
              <Button asChild>
                <Link href="/pricing">{locale === "fr" ? "Découvrir le starter" : "Get the starter kit"}</Link>
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
