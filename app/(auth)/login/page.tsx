import Link from "next/link";
import { AuthForm } from "@/components/shared/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocaleCopy } from "@/lib/i18n";
import { localePath } from "@/lib/locale";
import { getCurrentLocale } from "@/lib/locale-server";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const params = await searchParams;
  const message = typeof params.message === "string" ? params.message : undefined;
  const next = typeof params.next === "string" ? params.next : undefined;
  const content =
    locale === "fr"
      ? {
          panelEyebrow: "Connexion",
          panelTitle: "Retrouvez votre espace de travail sans friction.",
          panelBody:
            "Connectez-vous pour reprendre votre projet, gerer votre acces et continuer a construire sur une base propre.",
          panelPoints: [
            "Session geree proprement",
            "Routes protegees deja en place",
            "Structure prete a etre etendue",
          ],
        }
      : {
          panelEyebrow: "Sign in",
          panelTitle: "Get back into your workspace without friction.",
          panelBody:
            "Sign in to continue your project, manage access, and build on a clean production-ready foundation.",
          panelPoints: [
            "Clean session handling",
            "Protected routes already in place",
            "Structure ready to extend",
          ],
        };

  return (
    <main className="px-4 py-10 sm:py-16">
      <div className="mx-auto grid min-h-[calc(100vh-140px)] w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <section className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {content.panelEyebrow}
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl dark:text-white">
              {content.panelTitle}
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {content.panelBody}
            </p>
          </div>

          <div className="grid gap-3 sm:max-w-xl">
            {content.panelPoints.map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/82 px-4 py-3 text-sm text-slate-700 shadow-[0_14px_40px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:shadow-none"
              >
                <span>{item}</span>
                <span className="text-xs uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Card className="border-slate-200/80 bg-white/88 shadow-[0_28px_80px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
          <CardHeader className="space-y-3">
            <CardDescription>{copy.auth.loginEyebrow}</CardDescription>
            <CardTitle className="text-3xl">{copy.auth.loginTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AuthForm
              action={login}
              buttonLabel={copy.common.signIn}
              locale={locale}
              mode="login"
              message={message}
              next={next}
              passwordHint={copy.auth.loginHint}
            />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {copy.auth.loginFooter}{" "}
              <Link
                className="font-medium text-slate-950 hover:text-slate-700 dark:text-white dark:hover:text-slate-200"
                href={localePath(locale, "/signup")}
              >
                {copy.common.getStarted}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
