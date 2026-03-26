import { redirect } from "next/navigation";
import { DashboardPageHeader } from "@/components/layout/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hasStripeEnv } from "@/lib/env";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";
import { getBillingPlans, getPlanById } from "@/lib/stripe/server";
import { getCurrentAppUser } from "@/lib/users";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const [appUser, params] = await Promise.all([getCurrentAppUser(), searchParams]);

  if (!appUser) {
    redirect("/login?next=/billing");
  }

  const currentPlan = getPlanById(appUser.subscription_plan, locale);
  const billingPlans = getBillingPlans(locale);
  const message =
    typeof params.checkout === "string" && params.checkout === "success"
      ? copy.billingPage.purchaseConfirmed
      : typeof params.checkout === "string" && params.checkout === "cancelled"
        ? copy.billingPage.checkoutCanceled
        : typeof params.portal === "string" && params.portal === "unavailable"
          ? copy.billingPage.portalUnavailable
          : undefined;

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        description={copy.billingPage.description}
        eyebrow={copy.common.plan}
        title={copy.billingPage.title}
      />

      {message ? (
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          {message}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardDescription>{copy.billingPage.activePlan}</CardDescription>
            <CardTitle>{currentPlan.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">{copy.billingPage.accessStatus}</p>
                <p className="mt-1 text-slate-950 dark:text-white capitalize">{appUser.subscription_status}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">{copy.billingPage.planPrice}</p>
                <p className="mt-1 text-slate-950 dark:text-white">{currentPlan.price}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-slate-500 dark:text-slate-400">{copy.accountPage.billingCustomerId}</p>
                <p className="mt-1 break-all text-slate-950 dark:text-white">{appUser.stripe_customer_id ?? copy.billingPage.connectedYet}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <form action="/api/stripe/portal" method="post">
                <Button className="w-full" disabled={!hasStripeEnv || !appUser.stripe_customer_id} variant="secondary">
                  {copy.common.openBillingPortal}
                </Button>
              </form>
              <p className="text-xs leading-5 text-slate-500 dark:text-slate-500">
                {copy.common.reviewInvoices}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {billingPlans.map((plan) => {
            const isCurrentPlan = appUser.subscription_plan === plan.id;
            const actionLabel =
              appUser.subscription_plan === "free"
                ? plan.id === "pro"
                  ? copy.common.choosePro
                  : copy.common.chooseStarter
                : isCurrentPlan
                  ? `${plan.name} ${copy.billingPage.activeSuffix}`
                  : plan.id === "pro"
                    ? copy.common.switchToPro
                    : copy.common.switchToStarter;

            return (
              <Card className={isCurrentPlan ? "relative overflow-hidden border-slate-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,247,255,0.88))] dark:border-white/20 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]" : "relative overflow-hidden"} key={plan.id}>
                {plan.id === "pro" && !isCurrentPlan ? (
                  <div className="absolute right-6 top-6 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                    {copy.common.mostPopular}
                  </div>
                ) : null}
                {isCurrentPlan ? (
                  <div className="absolute right-6 top-6 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                    {copy.common.current}
                  </div>
                ) : null}
                <CardHeader>
                  <CardDescription>{plan.name === "Pro" ? copy.common.bestValue : copy.common.essentialFoundation}</CardDescription>
                  <CardTitle>{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{plan.price}</p>
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{copy.common.oneTimeForever}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{plan.description}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {plan.features.map((feature) => (
                      <li className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-white/8 dark:bg-white/4" key={feature}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <form action="/api/stripe/checkout" method="post">
                    <input name="planId" type="hidden" value={plan.id} />
                    <Button className="w-full" disabled={!hasStripeEnv || isCurrentPlan}>
                      {actionLabel}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
