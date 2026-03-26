import "server-only";

import Stripe from "stripe";
import { getStripeEnv } from "@/lib/env";
import type { Locale } from "@/lib/i18n";
import type { SubscriptionPlan } from "@/types/auth";

const billingPlansByLocale = {
  en: [
    {
      id: "starter",
      name: "Starter Kit",
      price: "$29",
      description: "Everything you need to launch your SaaS.",
      features: [
        "Auth and account flows",
        "Stripe checkout and billing sync",
        "Reusable dashboard UI",
      ],
    },
  ],
  fr: [
    {
      id: "starter",
      name: "Starter Kit",
      price: "$29",
      description: "Tout ce qu’il vous faut pour lancer votre SaaS.",
      features: [
        "Authentification et flux de compte",
        "Checkout Stripe et synchronisation de l’offre",
        "Dashboard reutilisable",
      ],
    },
  ],
} as const;

export const billingPlans = billingPlansByLocale.en;

export type BillingPlan = (typeof billingPlansByLocale.en)[number] | (typeof billingPlansByLocale.fr)[number];
export type BillingPlanId = (typeof billingPlans)[number]["id"];
export type ManagedPlanId = BillingPlanId | "free" | "pro";

export function getBillingPlans(locale: Locale = "en") {
  return billingPlansByLocale[locale];
}

export function getStripe() {
  const { stripeSecretKey } = getStripeEnv();
  return new Stripe(stripeSecretKey);
}

export function getPriceIdForPlan(planId: BillingPlanId) {
  const { stripePriceStarter } = getStripeEnv();
  return planId === "starter" ? stripePriceStarter : stripePriceStarter;
}

export function getPlanById(planId: ManagedPlanId, locale: Locale = "en") {
  if (planId === "free") {
    return {
      id: "free",
      name: locale === "fr" ? "Gratuit" : "Free",
      price: "$0",
      description:
        locale === "fr"
          ? "Essayez la base avant d’acheter le starter kit."
          : "Try the foundation before buying the starter kit.",
      features: locale === "fr" ? ["Acces de base", "Support communautaire"] : ["Basic access", "Community support"],
    };
  }

  const plans = getBillingPlans(locale);
  return plans.find((plan) => plan.id === planId) ?? plans[0];
}

export function normalizePlanId(value: string | null | undefined): SubscriptionPlan {
  if (value === "starter" || value === "pro") {
    return "starter";
  }

  return "free";
}
