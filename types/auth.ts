export const subscriptionStatuses = [
  "free",
  "trialing",
  "active",
  "past_due",
  "canceled",
] as const;

export type SubscriptionStatus = (typeof subscriptionStatuses)[number];
export type SubscriptionPlan = "free" | "starter" | "pro";

export interface AppUser {
  id: string;
  email: string;
  created_at: string;
  subscription_plan: SubscriptionPlan;
  subscription_status: SubscriptionStatus;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
}
