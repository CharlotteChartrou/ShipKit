import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { logout } from "@/app/(auth)/actions";
import { SaaSFrameLogo } from "@/components/brand/saasframe-logo";
import { Container } from "@/components/shared/container";
import { LocaleToggle } from "@/components/shared/locale-toggle";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { marketingNavigation } from "@/lib/navigation";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";
import { localePath } from "@/lib/locale";

interface AppHeaderProps {
  locale: Locale;
  session: Session | null;
}

export function AppHeader({ locale, session }: AppHeaderProps) {
  const copy = getLocaleCopy(locale);
  const navigation = marketingNavigation(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(99,102,241,0.12)] bg-[rgba(255,255,255,0.72)] backdrop-blur-2xl dark:border-white/10 dark:bg-[rgba(10,14,28,0.74)]">
      <Container className="flex min-h-[76px] items-center justify-between gap-2 py-3 sm:gap-4">
        <Link className="min-w-0 flex-1" href={localePath(locale, "/")}>
          <SaaSFrameLogo locale={locale} withTagline />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-[rgba(99,102,241,0.12)] bg-white/82 px-2 py-1 shadow-[0_12px_30px_rgba(79,70,229,0.06)] md:flex dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
          {navigation.map((item) => (
            <Link key={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-[rgba(79,70,229,0.08)] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LocaleToggle locale={locale} />
          <ThemeToggle locale={locale} />
          {session?.user ? (
            <>
              <span className="hidden max-w-48 truncate text-sm text-slate-500 dark:text-slate-400 sm:inline">{session.user.email}</span>
              <form action={logout}>
                <Button type="submit" variant="ghost">
                  {locale === "fr" ? "Se déconnecter" : "Log out"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild className="hidden sm:inline-flex" variant="ghost">
                <Link href={localePath(locale, "/login")}>{copy.common.signIn}</Link>
              </Button>
              <Button asChild>
                <Link href={localePath(locale, "/signup")}>{copy.common.getStarted}</Link>
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
