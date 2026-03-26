import { redirect } from "next/navigation";
import { ClientSessionCard } from "@/components/auth/client-session-card";
import { StarterKitDownloadButton } from "@/components/dashboard/starter-kit-download-button";
import { DashboardPageHeader } from "@/components/layout/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";
import { getCurrentAppUser } from "@/lib/users";
import Link from "next/link";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const [user, appUser, params] = await Promise.all([getCurrentUser(), getCurrentAppUser(), searchParams]);

  if (!user || !appUser) {
    redirect("/login?next=/dashboard");
  }

  const showStarterKitSuccess =
    typeof params.checkout === "string" &&
    params.checkout === "success" &&
    typeof params.unlocked === "string" &&
    params.unlocked === "starter-kit";

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        actions={
          <>
            <Button asChild variant="secondary">
              <Link href="/account">{copy.common.viewAccountDetails}</Link>
            </Button>
            <Button asChild>
              <Link href="/billing">{copy.common.managePlan}</Link>
            </Button>
          </>
        }
        description={copy.dashboard.description}
        eyebrow={copy.dashboard.eyebrow}
        title={copy.dashboard.title}
      />

      {showStarterKitSuccess ? (
        <div className="max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
          {locale === "fr" ? "Votre starter kit est pret 🎉" : "Your starter kit is ready 🎉"}
        </div>
      ) : null}

      <Card
        className={
          showStarterKitSuccess
            ? "overflow-hidden border-emerald-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.92))] shadow-[0_24px_80px_rgba(16,185,129,0.12)] dark:border-emerald-400/20 dark:bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(255,255,255,0.03))]"
            : "overflow-hidden"
        }
      >
        <CardHeader>
          <CardDescription>{locale === "fr" ? "Starter Kit" : "Starter Kit"}</CardDescription>
          <CardTitle>{locale === "fr" ? "Votre starter kit est pret" : "Your starter kit is ready"}</CardTitle>
        </CardHeader>
        {appUser.subscription_status === "active" ? (
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {locale === "fr"
                ? "Telechargez le code et commencez a construire votre SaaS aujourd'hui"
                : "Download the code and start building your SaaS today"}
            </p>
            <StarterKitDownloadButton
              label={locale === "fr" ? "Telecharger le starter kit" : "Download starter kit"}
            />
          </CardContent>
        ) : (
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {locale === "fr"
                ? "Passez a une offre payante pour acceder au starter kit complet"
                : "Upgrade to access the full starter kit"}
            </p>
            <Button asChild variant="secondary">
              <Link href="/pricing">{locale === "fr" ? "Voir les tarifs" : "View pricing"}</Link>
            </Button>
          </CardContent>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/20" />
          <CardHeader>
            <CardDescription>{copy.dashboard.activePlan}</CardDescription>
            <CardTitle className="capitalize">{appUser.subscription_plan}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">{copy.dashboard.planStatus}: {appUser.subscription_status}</p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/20" />
          <CardHeader>
            <CardDescription>{copy.dashboard.workspaceCreated}</CardDescription>
            <CardTitle>{new Date(appUser.created_at).toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">{copy.dashboard.provisioned}</p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/20" />
          <CardHeader>
            <CardDescription>{copy.dashboard.primaryEmail}</CardDescription>
            <CardTitle className="truncate">{appUser.email}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">{copy.dashboard.primaryEmailBody}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardDescription>{copy.dashboard.overviewEyebrow}</CardDescription>
            <CardTitle>{copy.dashboard.overviewTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">{copy.dashboard.workspaceId}</p>
                <p className="mt-1 break-all text-slate-950 dark:text-white">{appUser.id}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">{copy.dashboard.emailVerified}</p>
                <p className="mt-1 text-slate-950 dark:text-white">{user.email_confirmed_at ? (locale === "fr" ? "Oui" : "Yes") : (locale === "fr" ? "Non" : "No")}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">{copy.dashboard.recommendedNext}</p>
              <p className="mt-1 leading-6 text-slate-950 dark:text-white">
                {copy.dashboard.nextBody}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{copy.dashboard.access}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{copy.dashboard.live}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{copy.common.plan}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{appUser.subscription_status}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{copy.dashboard.theme}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{copy.dashboard.adaptive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ClientSessionCard locale={locale} />
      </div>
    </div>
  );
}
