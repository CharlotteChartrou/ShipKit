import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ProductPreview } from "@/components/marketing/product-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);

  return (
    <main>
      <Container className="space-y-28 pb-28 pt-10 sm:pt-16">
        <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-slate-600 uppercase shadow-[0_8px_24px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              {copy.landing.eyebrow}
            </div>

            <div className="space-y-5">
              <p className="text-sm font-medium tracking-[0.01em] text-slate-600 dark:text-slate-300">
                {copy.landing.pain}
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                {copy.landing.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {copy.landing.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">{copy.landing.ctaPrimary}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/pricing">{copy.landing.ctaSecondary}</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              {copy.landing.trust.map((item) => (
                <div
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.04]"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardDescription>{locale === "fr" ? "Stack" : "Stack"}</CardDescription>
                  <CardTitle>Next.js + Supabase</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {copy.landing.stackDescription}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>{locale === "fr" ? "Paiement" : "Billing"}</CardDescription>
                  <CardTitle>{locale === "fr" ? "Prêt pour Stripe" : "Stripe-ready"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {copy.landing.billingDescription}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>{locale === "fr" ? "Expérience" : "Experience"}</CardDescription>
                  <CardTitle>{locale === "fr" ? "Système UI soigné" : "Clean UI system"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {copy.landing.experienceDescription}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.14),transparent_30%)] blur-2xl dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.16),transparent_30%)]" />
            <Card className="relative overflow-hidden border-slate-300/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,249,255,0.86))] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/20" />
              <CardHeader className="pb-2">
                <CardDescription>{copy.landing.whyEyebrow}</CardDescription>
                <CardTitle>{copy.landing.whyTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
                <p>{copy.landing.whyBody}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {copy.landing.included}
                    </p>
                    <p className="mt-3 text-base font-medium text-slate-950 dark:text-white">
                      {copy.landing.includedBody}
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50/85 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {copy.landing.builtForSpeed}
                    </p>
                    <p className="mt-3 text-base font-medium text-slate-950 dark:text-white">
                      {copy.landing.builtForSpeedBody}
                    </p>
                  </div>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-slate-100 dark:border-white/10 dark:bg-white dark:text-slate-950">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 dark:text-slate-600">
                    {copy.landing.readyNow}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-left">
                    <div>
                      <p className="text-2xl font-semibold">SSR</p>
                      <p className="mt-1 text-xs text-slate-300 dark:text-slate-600">Auth</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">Stripe</p>
                      <p className="mt-1 text-xs text-slate-300 dark:text-slate-600">Checkout</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">Resend</p>
                      <p className="mt-1 text-xs text-slate-300 dark:text-slate-600">Email</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <ProductPreview locale={locale} />
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{copy.landing.featuresEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {copy.landing.featuresTitle}
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {copy.landing.features.map((feature) => (
              <Card className="group relative overflow-hidden" key={feature.title}>
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-white/20" />
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{copy.landing.pricingEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {copy.landing.pricingTitle}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{copy.common.oneTimeForever}</p>
              <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                {copy.common.earlyAccessPrice}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {copy.landing.plans.map((plan) => (
              <Card className={plan.name === "Pro" ? "relative overflow-hidden border-slate-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,247,255,0.88))] dark:border-white/20 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]" : ""} key={plan.name}>
                {plan.name === "Pro" ? (
                  <div className="absolute right-6 top-6 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                    {copy.common.mostPopular}
                  </div>
                ) : null}
                <CardHeader>
                  <CardDescription>{plan.name === "Pro" ? copy.common.bestValue : copy.common.essentialFoundation}</CardDescription>
                  <CardTitle>{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{plan.price}</p>
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{copy.common.oneTimeForever}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {plan.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div
                        className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-700 dark:border-white/8 dark:bg-white/4 dark:text-slate-300"
                        key={feature}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full" variant={plan.name === "Pro" ? "primary" : "secondary"}>
                    <Link href="/pricing">{plan.name === "Pro" ? copy.common.choosePro : copy.common.chooseStarter}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{copy.landing.faqEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {copy.landing.faqTitle}
            </h2>
          </div>

          <div className="grid gap-4">
            {copy.landing.faqs.map((faq) => (
              <Card className="relative overflow-hidden" key={faq.question}>
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-white/20" />
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="overflow-hidden border-slate-300/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,249,255,0.88))] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
            <CardContent className="flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{copy.landing.ctaEyebrow}</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {copy.landing.ctaTitle}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {copy.landing.ctaBody}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/signup">{copy.landing.ctaPrimary}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/pricing">{copy.landing.ctaSecondary}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
