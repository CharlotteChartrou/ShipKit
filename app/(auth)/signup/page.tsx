import Link from "next/link";
import { AuthForm } from "@/components/shared/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocaleCopy } from "@/lib/i18n";
import { localePath } from "@/lib/locale";
import { getCurrentLocale } from "@/lib/locale-server";
import { signup } from "../actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const params = await searchParams;
  const message = typeof params.message === "string" ? params.message : undefined;
  const content =
    locale === "fr"
      ? {
          panelEyebrow: "Starter project",
          panelTitle: "Commencez avec une base claire, pas avec du bruit.",
          panelBody:
            "Creez votre compte pour acceder a une structure SaaS propre, extensible et deja organisee pour avancer plus vite.",
          panelPoints: [
            "Authentification deja structuree",
            "Dashboard pret a personnaliser",
            "Base serieuse pour votre produit",
          ],
        }
      : {
          panelEyebrow: "Starter project",
          panelTitle: "Start with a clean foundation, not setup noise.",
          panelBody:
            "Create your account to access a SaaS foundation that is organized, extensible, and ready for real product work.",
          panelPoints: [
            "Authentication already structured",
            "Dashboard ready to customize",
            "Serious foundation for your product",
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
            <CardDescription>{copy.auth.signupEyebrow}</CardDescription>
            <CardTitle className="text-3xl">{copy.auth.signupTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AuthForm
              action={signup}
              buttonLabel={copy.common.getStarted}
              locale={locale}
              mode="signup"
              message={message}
              passwordHint={copy.auth.signupHint}
            />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {copy.auth.signupFooter}{" "}
              <Link
                className="font-medium text-slate-950 hover:text-slate-700 dark:text-white dark:hover:text-slate-200"
                href={localePath(locale, "/login")}
              >
                {copy.common.signIn}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
