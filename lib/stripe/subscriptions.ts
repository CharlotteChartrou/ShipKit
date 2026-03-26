import "server-only";

import type Stripe from "stripe";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { normalizePlanId } from "@/lib/stripe/server";
import type { SubscriptionPlan, SubscriptionStatus } from "@/types/auth";

function mapStripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "trialing":
      return "trialing";
    case "active":
      return "active";
    case "past_due":
    case "unpaid":
    case "incomplete":
      return "past_due";
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    case "paused":
      return "free";
    default:
      return "free";
  }
}

export async function updateUserSubscriptionByCustomer(params: {
  customerId: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionId: string | null;
  subscriptionStatus: SubscriptionStatus;
}) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("users")
    .update({
      stripe_customer_id: params.customerId,
      subscription_plan: params.subscriptionPlan,
      stripe_subscription_id: params.subscriptionId,
      subscription_status: params.subscriptionStatus,
    })
    .eq("stripe_customer_id", params.customerId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUserSubscriptionFromSubscription(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const supabaseUserId = subscription.metadata.supabase_user_id;
  const subscriptionPlan = normalizePlanId(subscription.metadata.plan_id);

  try {
    await updateUserSubscriptionByCustomer({
      customerId,
      subscriptionPlan,
      subscriptionId: subscription.id,
      subscriptionStatus: mapStripeStatus(subscription.status),
    });
  } catch (error) {
    if (!supabaseUserId) {
      throw error;
    }

    await attachStripeCustomerToUser({
      customerId,
      subscriptionPlan,
      subscriptionId: subscription.id,
      subscriptionStatus: mapStripeStatus(subscription.status),
      userId: supabaseUserId,
    });
  }
}

export async function attachStripeCustomerToUser(params: {
  customerId: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionId: string | null;
  subscriptionStatus: SubscriptionStatus;
  userId: string;
}) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("users")
    .update({
      stripe_customer_id: params.customerId,
      subscription_plan: params.subscriptionPlan,
      stripe_subscription_id: params.subscriptionId,
      subscription_status: params.subscriptionStatus,
    })
    .eq("id", params.userId);

  if (error) {
    throw new Error(error.message);
  }
}

export function getSubscriptionStatusFromCheckoutSession(
  session: Stripe.Checkout.Session,
): SubscriptionStatus {
  return session.payment_status === "paid" ? "active" : "free";
}

export function getSubscriptionPlanFromCheckoutSession(session: Stripe.Checkout.Session): SubscriptionPlan {
  return normalizePlanId(session.metadata?.plan_id);
}
