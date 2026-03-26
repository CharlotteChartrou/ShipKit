import { PricingCard } from "@/components/billing/pricing-card";
import { Container } from "@/components/layout/container";
import { hasStripeEnv } from "@/lib/env";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";
import { getBillingPlans } from "@/lib/stripe/server";

export default async function PricingPage() {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const billingPlans = getBillingPlans(locale);

  return (
    <main>
      <Container className="space-y-8 pb-16 pt-8 sm:pt-12">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{copy.pricingPage.eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{copy.pricingPage.title}</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {copy.pricingPage.body}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            {copy.common.oneTimeForever}
          </div>
          <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 shadow-[0_10px_30px_rgba(245,158,11,0.08)] dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
            {copy.common.earlyAccessPrice}
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          {billingPlans.map((plan) => (
            <PricingCard checkoutEnabled={hasStripeEnv} key={plan.id} locale={locale} plan={plan} />
          ))}
        </section>
      </Container>
    </main>
  );
}
