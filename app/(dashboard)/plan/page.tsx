import { redirect } from "next/navigation";
import { DashboardPageHeader } from "@/components/shared/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getGumroadEnv, hasGumroadEnv } from "@/lib/env";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";
import { getBillingPlans, getPlanById } from "@/lib/stripe";
import { getCurrentAppUser } from "@/lib/users";

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const [appUser, params] = await Promise.all([getCurrentAppUser(), searchParams]);

  if (!appUser) {
    redirect("/login?next=/plan");
  }

  const currentPlan = getPlanById(appUser.subscription_plan, locale);
  const starterKitPlan = getBillingPlans(locale)[0];
  const gumroadUrl = hasGumroadEnv ? getGumroadEnv().gumroadProductUrl : null;
  const message =
    typeof params.checkout === "string" && params.checkout === "success"
      ? copy.planPage.purchaseConfirmed
      : typeof params.checkout === "string" && params.checkout === "cancelled"
        ? copy.planPage.checkoutCanceled
        : typeof params.portal === "string" && params.portal === "unavailable"
          ? copy.planPage.portalUnavailable
          : undefined;

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        description={copy.planPage.description}
        eyebrow={copy.common.plan}
        title={copy.planPage.title}
      />

      {message ? (
        <div className="max-w-3xl rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          {message}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardDescription>{copy.planPage.activePlan}</CardDescription>
            <CardTitle>{currentPlan.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">{copy.planPage.accessStatus}</p>
                <p className="mt-1 text-slate-950 dark:text-white capitalize">{appUser.subscription_status}</p>
              </div>
              <div className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">{copy.planPage.planPrice}</p>
                <p className="mt-1 text-slate-950 dark:text-white">{currentPlan.price}</p>
              </div>
              <div className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">{copy.planPage.purchaseSource}</p>
                <p className="mt-1 text-slate-950 dark:text-white">{copy.planPage.purchaseSourceBody}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-[rgba(99,102,241,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,243,255,0.92))] shadow-[0_26px_70px_rgba(79,70,229,0.12)] dark:border-white/20 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] dark:shadow-none">
          {appUser.subscription_status === "active" ? (
            <div className="absolute right-6 top-6 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
              {copy.common.current}
            </div>
          ) : null}
          <CardHeader>
            <CardDescription>{copy.planPage.offerEyebrow}</CardDescription>
            <CardTitle>{copy.planPage.offerTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{starterKitPlan.price}</p>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{copy.common.oneTimeForever}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{copy.planPage.offerBody}</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {starterKitPlan.features.map((feature) => (
                <li className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-slate-50/84 px-4 py-3 dark:border-white/8 dark:bg-white/4" key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
            {gumroadUrl && appUser.subscription_status !== "active" ? (
              <Button asChild className="w-full">
                <a href={gumroadUrl} rel="noreferrer" target="_blank">
                  {copy.common.getStarterKit}
                </a>
              </Button>
            ) : (
              <Button className="w-full" disabled>
                {copy.common.getStarterKit}
              </Button>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
