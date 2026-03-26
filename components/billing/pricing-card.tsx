import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";
import type { BillingPlan } from "@/lib/stripe/server";

interface PricingCardProps {
  checkoutEnabled: boolean;
  locale: Locale;
  plan: BillingPlan;
}

export function PricingCard({ checkoutEnabled, locale, plan }: PricingCardProps) {
  const isPopular = plan.id === "pro";
  const copy = getLocaleCopy(locale);

  return (
    <Card
      className={
        isPopular
          ? "relative overflow-hidden border-slate-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(241,247,255,0.9))] shadow-[0_24px_80px_rgba(14,116,144,0.12)] dark:border-white/20 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]"
          : "relative overflow-hidden"
      }
    >
      {isPopular ? (
        <div className="absolute right-6 top-6 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
          {copy.common.mostPopular}
        </div>
      ) : null}
      <CardHeader>
        <CardDescription>{isPopular ? copy.common.bestValue : locale === "fr" ? "Accès immédiat" : "One-time access"}</CardDescription>
        <CardTitle>{plan.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{plan.price}</p>
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{copy.common.oneTimeForever}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{plan.description}</p>
        </div>

        <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          {plan.features.map((feature) => (
            <li key={feature} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-white/8 dark:bg-white/4">
              {feature}
            </li>
          ))}
        </ul>

        <form action="/api/stripe/checkout" method="post">
          <input name="planId" type="hidden" value={plan.id} />
          <SubmitButton className="w-full" disabled={!checkoutEnabled} pendingLabel={copy.common.redirecting}>
            {isPopular ? copy.common.choosePro : copy.common.chooseStarter}
          </SubmitButton>
        </form>
        {!checkoutEnabled ? (
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {copy.common.addStripeEnv}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
