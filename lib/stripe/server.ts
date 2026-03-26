import "server-only";

import Stripe from "stripe";
import { getStripeEnv } from "@/lib/env";
import type { Locale } from "@/lib/i18n";
import type { SubscriptionPlan } from "@/lib/users";

const billingPlansByLocale = {
  en: [
    {
      id: "starter",
      name: "Starter",
      price: "€29",
      description: "A one-time purchase for shipping your first polished SaaS foundation fast.",
      features: ["Auth and account flows", "Billing foundation", "Responsive dashboard UI"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "€59",
      description: "The best-value one-time purchase for teams who want the full starter kit from day one.",
      features: ["Everything in Starter", "Advanced billing flows", "Priority-ready foundation"],
    },
  ],
  fr: [
    {
      id: "starter",
      name: "Starter",
      price: "29 €",
      description: "Un paiement unique pour lancer rapidement une base SaaS propre et bien structurée.",
      features: ["Authentification et flux de compte", "Base de facturation", "Dashboard responsive"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "59 €",
      description: "Le meilleur choix pour obtenir toute la fondation produit dès le départ.",
      features: ["Tout ce qui est dans Starter", "Flux de facturation avancés", "Base prête à évoluer"],
    },
  ],
} as const;

export const billingPlans = billingPlansByLocale.en;

export type BillingPlan = (typeof billingPlansByLocale.en)[number] | (typeof billingPlansByLocale.fr)[number];
export type BillingPlanId = (typeof billingPlans)[number]["id"];
export type ManagedPlanId = BillingPlanId | "free";

export function getBillingPlans(locale: Locale = "en") {
  return billingPlansByLocale[locale];
}

export function getStripe() {
  const { stripeSecretKey } = getStripeEnv();
  return new Stripe(stripeSecretKey);
}

export function getPriceIdForPlan(planId: BillingPlanId) {
  const { stripePricePro, stripePriceStarter } = getStripeEnv();

  const priceIds: Record<BillingPlanId, string> = {
    starter: stripePriceStarter,
    pro: stripePricePro,
  };

  return priceIds[planId];
}

export function getPlanById(planId: ManagedPlanId, locale: Locale = "en") {
  if (planId === "free") {
    return {
      id: "free",
      name: locale === "fr" ? "Gratuit" : "Free",
      price: locale === "fr" ? "0 €" : "€0",
      description:
        locale === "fr"
          ? "Pour évaluer le produit avant un achat en paiement unique."
          : "For evaluating the product before making a one-time purchase.",
      features: locale === "fr" ? ["Support communautaire", "Accès de base"] : ["Community support", "Basic access"],
    };
  }

  const plans = getBillingPlans(locale);
  return plans.find((plan) => plan.id === planId) ?? plans[0];
}

export function normalizePlanId(value: string | null | undefined): SubscriptionPlan {
  if (value === "starter" || value === "pro") {
    return value;
  }

  return "free";
}
