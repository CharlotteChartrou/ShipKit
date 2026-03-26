import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBillingPlans } from "@/lib/stripe";
import { getCurrentLocale } from "@/lib/locale";
import { getCurrentAppUser } from "@/lib/users";

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const appUser = await getCurrentAppUser();
  const starterKitPlan = getBillingPlans(locale)[0];

  const content =
    locale === "fr"
      ? {
          eyebrow: "SaaSFrame",
          title: "Construisez votre SaaS sur une base propre.",
          description:
            "SaaSFrame est une base Next.js premium avec auth, dashboard et paiements deja structures pour vous laisser avancer sur votre vrai produit.",
          primaryCta: appUser ? "Ouvrir votre espace" : "Obtenir SaaSFrame",
          primaryHref: appUser ? "/dashboard" : "/plan",
          secondaryCta: appUser ? "Gerer votre offre" : "Voir l’aperçu du produit",
          secondaryHref: appUser ? "/plan" : "/login",
          trust: [
            "Patterns SaaS reels",
            "Architecture claire et extensible",
            "Pensé pour les devs qui veulent shipper proprement",
          ],
          includedEyebrow: "Ce que vous obtenez",
          includedTitle: "Le socle deja en place pour gagner du temps des le premier jour",
          includedCards: [
            {
              title: "Authentification",
              body: "Inscription, connexion, gestion de session et routes protegees sont deja structurees.",
            },
            {
              title: "Dashboard",
              body: "Un espace clair avec sidebar, compte, offre et une fonctionnalite exemple pour montrer comment etendre le projet.",
            },
            {
              title: "Paiements",
              body: "La base billing est deja prevue pour vendre votre produit sans repartir de zero.",
            },
          ],
          previewEyebrow: "Apercu produit",
          previewTitle: "Une base lisible, serieuse et facile a prendre en main",
          previewBody:
            "Vous partez d’une structure que vous comprenez rapidement, avec des dossiers nets, des composants reutilisables et un flux auth deja relie.",
          previewItems: [
            "App Router organise",
            "Composants UI reutilisables",
            "Dashboard extensible",
            "Auth + billing deja branches",
          ],
          offerEyebrow: "Offre simple",
          offerTitle: "Un seul achat, zero confusion",
          offerBody: "Payez une fois. Utilisez SaaSFrame librement comme base de votre produit.",
          faqEyebrow: "Questions frequentes",
          faqTitle: "Ce qu’il faut savoir avant d’acheter",
          faqItems: [
            {
              question: "Qu’est-ce que j’achete exactement ?",
              answer:
                "Un starter SaaS telechargeable avec auth, dashboard, structure projet et logique billing deja posees.",
            },
            {
              question: "Est-ce une simple demo ?",
              answer:
                "Non. La base est pensee pour etre comprise, modifiee et etendue rapidement dans un vrai projet.",
            },
            {
              question: "A qui s’adresse le produit ?",
              answer:
                "Aux developpeurs, freelances et indie builders qui veulent une base propre plutot qu’un template brouillon.",
            },
          ],
          finalTitle: "Pret a partir d’une base serieuse ?",
          finalBody:
            "Recuperez SaaSFrame, adaptez-le a votre produit, puis avancez directement sur ce qui vous differencie.",
          finalPrimary: "Obtenir SaaSFrame",
          finalSecondary: appUser ? "Ouvrir votre espace" : "Se connecter",
          finalSecondaryHref: appUser ? "/dashboard" : "/login",
        }
      : {
          eyebrow: "SaaSFrame",
          title: "Build your SaaS on a clean foundation.",
          description:
            "SaaSFrame is a premium Next.js foundation with auth, dashboard, and payment structure already in place so you can focus on the product itself.",
          primaryCta: appUser ? "Open your workspace" : "Get SaaSFrame",
          primaryHref: appUser ? "/dashboard" : "/plan",
          secondaryCta: appUser ? "Manage your plan" : "View product preview",
          secondaryHref: appUser ? "/plan" : "/login",
          trust: [
            "Built with real SaaS patterns",
            "Clean architecture you can extend",
            "Designed for developers shipping serious products",
          ],
          includedEyebrow: "What you get",
          includedTitle: "The core foundation already in place from day one",
          includedCards: [
            {
              title: "Authentication",
              body: "Sign-up, login, session handling, and protected routes are already structured.",
            },
            {
              title: "Dashboard",
              body: "A focused workspace with sidebar navigation, account pages, plan management, and an example feature.",
            },
            {
              title: "Payments",
              body: "The billing foundation is already there so you do not have to rebuild selling infrastructure from scratch.",
            },
          ],
          previewEyebrow: "Product preview",
          previewTitle: "A foundation that feels readable, serious, and ready to extend",
          previewBody:
            "You start from a structure that is easy to understand, with clear folders, reusable UI, and authentication already connected.",
          previewItems: [
            "Organized App Router structure",
            "Reusable UI components",
            "Extensible dashboard",
            "Auth and billing already wired",
          ],
          offerEyebrow: "Single offer",
          offerTitle: "One purchase, no extra decisions",
          offerBody: "Pay once. Use SaaSFrame as the foundation for your SaaS.",
          faqEyebrow: "FAQ",
          faqTitle: "What to know before you buy",
          faqItems: [
            {
              question: "What am I buying exactly?",
              answer:
                "A downloadable SaaS starter with authentication, dashboard structure, project organization, and billing foundations already set up.",
            },
            {
              question: "Is this just a demo?",
              answer:
                "No. The foundation is designed to be understood, modified, and extended quickly in a real product.",
            },
            {
              question: "Who is it for?",
              answer:
                "Developers, freelancers, and indie builders who want a clean base instead of a messy template.",
            },
          ],
          finalTitle: "Ready to start from a serious foundation?",
          finalBody:
            "Get SaaSFrame, adapt it to your product, and spend your time on what makes your SaaS unique.",
          finalPrimary: "Get SaaSFrame",
          finalSecondary: appUser ? "Open your workspace" : "Sign in",
          finalSecondaryHref: appUser ? "/dashboard" : "/login",
        };

  return (
    <main>
      <Container className="pb-24 pt-12 sm:pt-20">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="relative overflow-hidden rounded-[36px] border border-[rgba(99,102,241,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(241,244,255,0.74))] px-6 py-8 shadow-[0_30px_90px_rgba(79,70,229,0.09)] backdrop-blur-2xl sm:px-10 sm:py-12 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent" />
            <div className="absolute -right-20 top-[-80px] h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-300/12" />
            <div className="absolute -left-12 bottom-[-80px] h-44 w-44 rounded-full bg-indigo-400/12 blur-3xl dark:bg-indigo-400/10" />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {content.eyebrow}
                  </p>
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl dark:text-white">
                    {content.title}
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                    {content.description}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                  <Button asChild size="lg">
                    <Link href={content.primaryHref}>{content.primaryCta}</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href={content.secondaryHref}>{content.secondaryCta}</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-1 lg:justify-start">
                  {content.trust.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200/80 bg-white/88 px-4 py-2 text-sm text-slate-600 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:shadow-none"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <Card className="relative border-[rgba(99,102,241,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,243,255,0.92))] shadow-[0_24px_70px_rgba(79,70,229,0.12)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] dark:shadow-none">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <CardDescription>{content.offerEyebrow}</CardDescription>
                    <CardTitle className="text-3xl">{starterKitPlan.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                      {starterKitPlan.price}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {locale === "fr" ? "Paiement unique. Acces a vie." : "Pay once. Use forever."}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {content.offerBody}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {starterKitPlan.features.slice(0, 4).map((feature) => (
                      <li
                        className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/88 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                        key={feature}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/plan">{content.primaryCta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {content.includedEyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                {content.includedTitle}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {content.includedCards.map((card) => (
                <Card
                  key={card.title}
                className="border-[rgba(99,102,241,0.12)] bg-white/88 shadow-[0_20px_50px_rgba(79,70,229,0.08)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
                >
                  <CardHeader className="space-y-2">
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {card.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Card className="border-[rgba(99,102,241,0.12)] bg-white/88 shadow-[0_20px_50px_rgba(79,70,229,0.08)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
              <CardHeader className="space-y-3">
                <CardDescription>{content.previewEyebrow}</CardDescription>
                <CardTitle className="text-3xl">{content.previewTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {content.previewBody}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {content.previewItems.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-[rgba(99,102,241,0.12)] bg-slate-50/84 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                    >
                      <span>{item}</span>
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[rgba(99,102,241,0.12)] bg-white/88 shadow-[0_20px_50px_rgba(79,70,229,0.08)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
              <CardHeader className="space-y-3">
                <CardDescription>{content.faqEyebrow}</CardDescription>
                <CardTitle className="text-3xl">{content.faqTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {content.faqItems.map((item) => (
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

          <section className="rounded-[32px] border border-[rgba(99,102,241,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(243,245,255,0.82))] px-6 py-8 text-center shadow-[0_20px_60px_rgba(79,70,229,0.08)] sm:px-10 sm:py-10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <div className="mx-auto max-w-3xl space-y-5">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                {content.finalTitle}
              </h2>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                {content.finalBody}
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/plan">{content.finalPrimary}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href={content.finalSecondaryHref}>{content.finalSecondary}</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
