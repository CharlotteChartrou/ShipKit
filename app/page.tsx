import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocaleCopy } from "@/lib/i18n";
import { localePath } from "@/lib/locale";
import { getCurrentLocale } from "@/lib/locale-server";
import { getBillingPlans } from "@/lib/stripe";
import { getCurrentAppUser } from "@/lib/users";

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const appUser = await getCurrentAppUser();
  const starterKitPlan = getBillingPlans(locale)[0];

  const heroSecondaryLabel = appUser
    ? copy.landing.hero.secondaryCtaSignedIn
    : copy.landing.hero.secondaryCtaSignedOut;
  const heroSecondaryHref = localePath(locale, appUser ? "/dashboard" : "/login");
  const finalSecondaryLabel = appUser
    ? copy.landing.finalCta.secondaryCtaSignedIn
    : copy.landing.finalCta.secondaryCtaSignedOut;
  const finalSecondaryHref = localePath(locale, appUser ? "/dashboard" : "/login");

  return (
    <main>
      <Container className="pb-24 pt-12 sm:pt-20">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="relative overflow-hidden rounded-[36px] border border-[rgba(99,102,241,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(241,244,255,0.76))] px-6 py-8 shadow-[0_30px_90px_rgba(79,70,229,0.09)] backdrop-blur-2xl sm:px-10 sm:py-12 dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(10,15,30,0.94),rgba(12,18,34,0.9))] dark:shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent" />
            <div className="absolute -right-20 top-[-80px] h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-300/12" />
            <div className="absolute -left-12 bottom-[-80px] h-44 w-44 rounded-full bg-indigo-400/12 blur-3xl dark:bg-indigo-400/10" />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {copy.landing.hero.eyebrow}
                  </p>
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl dark:text-white">
                    {copy.landing.hero.title}
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                    {copy.landing.hero.description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                  <Button asChild size="lg">
                    <Link href={localePath(locale, "/plan")}>{copy.landing.hero.primaryCta}</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href={heroSecondaryHref}>{heroSecondaryLabel}</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-1 lg:justify-start">
                  {copy.landing.hero.trust.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[rgba(99,102,241,0.12)] bg-white/88 px-4 py-2 text-sm text-slate-600 shadow-[0_10px_30px_rgba(79,70,229,0.06)] dark:border-white/12 dark:bg-white/[0.08] dark:text-slate-200 dark:shadow-none"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <Card className="relative border-[rgba(99,102,241,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,243,255,0.92))] shadow-[0_24px_70px_rgba(79,70,229,0.12)] dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(20,27,45,0.96),rgba(14,20,36,0.94))] dark:shadow-[0_24px_70px_rgba(2,6,23,0.36)]">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <CardDescription>{copy.landing.offer.eyebrow}</CardDescription>
                    <CardTitle className="text-3xl">{starterKitPlan.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                      {starterKitPlan.price}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {copy.common.oneTimeForever}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {copy.landing.offer.body}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {starterKitPlan.features.map((feature) => (
                      <li
                        className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/88 px-4 py-3 text-sm text-slate-700 dark:border-white/12 dark:bg-white/[0.06] dark:text-slate-100"
                        key={feature}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href={localePath(locale, "/plan")}>{copy.common.getStarterKit}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {copy.landing.whatYouGet.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                {copy.landing.whatYouGet.title}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {copy.landing.whatYouGet.items.map((item) => (
                <Card
                  key={item.title}
                  className="border-[rgba(99,102,241,0.12)] bg-white/88 shadow-[0_20px_50px_rgba(79,70,229,0.08)] dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(14,20,36,0.92),rgba(10,16,30,0.9))] dark:shadow-[0_20px_50px_rgba(2,6,23,0.32)]"
                >
                  <CardHeader className="space-y-2">
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="border-[rgba(99,102,241,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,245,255,0.9))] shadow-[0_20px_50px_rgba(79,70,229,0.08)] dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(14,20,36,0.92),rgba(10,16,30,0.9))] dark:shadow-[0_20px_50px_rgba(2,6,23,0.32)]">
              <CardHeader className="space-y-3">
                <CardDescription>{copy.landing.value.eyebrow}</CardDescription>
                <CardTitle className="text-3xl">{copy.landing.value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  {copy.landing.value.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[rgba(99,102,241,0.12)] bg-white/88 shadow-[0_20px_50px_rgba(79,70,229,0.08)] dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(14,20,36,0.92),rgba(10,16,30,0.9))] dark:shadow-[0_20px_50px_rgba(2,6,23,0.32)]">
              <CardHeader className="space-y-3">
                <CardDescription>{copy.landing.socialProof.eyebrow}</CardDescription>
                <CardTitle className="text-3xl">“{copy.landing.socialProof.quote}”</CardTitle>
              </CardHeader>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Card className="border-[rgba(99,102,241,0.12)] bg-white/88 shadow-[0_20px_50px_rgba(79,70,229,0.08)] dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(14,20,36,0.92),rgba(10,16,30,0.9))] dark:shadow-[0_20px_50px_rgba(2,6,23,0.32)]">
              <CardHeader className="space-y-3">
                <CardDescription>{copy.landing.offer.eyebrow}</CardDescription>
                <CardTitle className="text-3xl">{copy.landing.offer.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {copy.planPage.offerBody}
                </p>
                <Button asChild>
                  <Link href={localePath(locale, "/plan")}>{copy.common.getStarterKit}</Link>
                </Button>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {copy.common.oneTimeForever}
                </p>
              </CardContent>
            </Card>

            <Card className="border-[rgba(99,102,241,0.12)] bg-white/88 shadow-[0_20px_50px_rgba(79,70,229,0.08)] dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(14,20,36,0.92),rgba(10,16,30,0.9))] dark:shadow-[0_20px_50px_rgba(2,6,23,0.32)]">
              <CardHeader className="space-y-3">
                <CardDescription>{copy.landing.faq.eyebrow}</CardDescription>
                <CardTitle className="text-3xl">{copy.landing.faq.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {copy.landing.faq.items.map((item) => (
                  <div className="space-y-2" key={item.question}>
                    <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                      {item.question}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="rounded-[32px] border border-[rgba(99,102,241,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(243,245,255,0.82))] px-6 py-8 text-center shadow-[0_20px_60px_rgba(79,70,229,0.08)] sm:px-10 sm:py-10 dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(12,18,34,0.94),rgba(9,14,27,0.92))] dark:shadow-[0_20px_60px_rgba(2,6,23,0.34)]">
            <div className="mx-auto max-w-3xl space-y-5">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                {copy.landing.finalCta.title}
              </h2>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                {copy.landing.finalCta.description}
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={localePath(locale, "/plan")}>{copy.landing.finalCta.primaryCta}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href={finalSecondaryHref}>{finalSecondaryLabel}</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
