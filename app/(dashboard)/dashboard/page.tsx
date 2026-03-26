import { redirect } from "next/navigation";
import Link from "next/link";
import { createProjectAction } from "@/app/(dashboard)/dashboard/actions";
import { ClientSessionCard } from "@/components/shared/client-session-card";
import { DashboardPageHeader } from "@/components/shared/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/lib/auth";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";
import { getProjectsForCurrentUser } from "@/lib/projects";
import { getCurrentAppUser } from "@/lib/users";

export default async function DashboardPage() {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const [user, appUser, projectData] = await Promise.all([
    getCurrentUser(),
    getCurrentAppUser(),
    getProjectsForCurrentUser(),
  ]);

  if (!user || !appUser) {
    redirect("/login?next=/dashboard");
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        actions={
          <>
            <Button asChild variant="secondary">
              <Link href="/account">{copy.common.viewAccountDetails}</Link>
            </Button>
            <Button asChild>
              <Link href="/plan">{copy.common.managePlan}</Link>
            </Button>
          </>
        }
        description={copy.dashboard.description}
        eyebrow={copy.dashboard.eyebrow}
        title={copy.dashboard.title}
      />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardDescription>{locale === "fr" ? "Point de depart" : "Getting started"}</CardDescription>
          <CardTitle>{locale === "fr" ? "Votre projet commence ici" : "Your project starts here"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {locale === "fr"
                ? "Commencez par ajouter votre premiere fonctionnalite. La section Projects ci-dessous montre comment etendre le starter avec une vraie action serveur."
                : "Start by adding your first feature. The Projects section below shows how to extend the starter with a real server action."}
            </p>
            <p className="text-sm font-medium text-slate-950 dark:text-white">
              {locale === "fr" ? "Ajoutez votre premiere fonctionnalite." : "Add your first feature."}
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/account">{copy.common.viewAccountDetails}</Link>
          </Button>
        </CardContent>
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

      <Card className="overflow-hidden">
        <CardHeader>
          <CardDescription>{locale === "fr" ? "Feature demo" : "Feature demo"}</CardDescription>
          <CardTitle>{locale === "fr" ? "Projects" : "Projects"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                {locale === "fr"
                  ? "Ce module montre une structure simple pour ajouter une fonctionnalite complete a votre produit."
                  : "This module shows a simple pattern for adding a complete feature to your product."}
              </p>
              {projectData.setupRequired ? (
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  {locale === "fr"
                    ? "Appliquez la migration projects pour activer cet exemple."
                    : "Apply the projects migration to enable this example."}
                </p>
              ) : null}
            </div>

            <form action={createProjectAction} className="flex w-full flex-col gap-3 sm:max-w-md sm:flex-row">
              <Input
                name="name"
                placeholder={locale === "fr" ? "Nom du projet" : "Project name"}
                required
                type="text"
              />
              <Button type="submit">{locale === "fr" ? "Creer" : "Create"}</Button>
            </form>
          </div>

          {projectData.projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-base font-medium text-slate-950 dark:text-white">
                {locale === "fr" ? "Aucun projet pour le moment" : "No projects yet"}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {locale === "fr"
                  ? "Creez votre premier projet pour voir comment une fonctionnalite data-backed s'integre dans la base."
                  : "Create your first project to see how a data-backed feature fits into the starter."}
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {projectData.projects.map((project) => (
                <div
                  className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 dark:border-white/10 dark:bg-white/5"
                  key={project.id}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-950 dark:text-white">{project.name}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {new Date(project.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                      {locale === "fr" ? "Projet" : "Project"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
