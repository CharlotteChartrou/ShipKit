import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { getStripeEnv, hasEmailEnv } from "@/lib/env";
import { sendSubscriptionConfirmationEmail } from "@/lib/email/send";
import { getStripe } from "@/lib/stripe";
import {
  attachStripeCustomerToUser,
  getSubscriptionPlanFromCheckoutSession,
  getSubscriptionStatusFromCheckoutSession,
  updateUserSubscriptionByCustomer,
  updateUserSubscriptionFromSubscription,
} from "@/lib/stripe";
import { getAppUserById } from "@/lib/users-admin";

export async function POST(request: Request) {
  const stripe = getStripe();
  const { stripeWebhookSecret } = getStripeEnv();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId =
          typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id ?? null;
        const userId = session.metadata?.supabase_user_id;

        if (customerId && userId) {
          const subscriptionPlan = getSubscriptionPlanFromCheckoutSession(session);
          await attachStripeCustomerToUser({
            customerId,
            subscriptionPlan,
            subscriptionId,
            subscriptionStatus: getSubscriptionStatusFromCheckoutSession(session),
            userId,
          });

          if (hasEmailEnv) {
            const user = await getAppUserById(userId);

            if (user?.email) {
              await sendSubscriptionConfirmationEmail({
                email: user.email,
                plan: subscriptionPlan,
              });
            }
          }
        }

        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await updateUserSubscriptionFromSubscription(subscription);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id ?? null;

        if (customerId) {
          await updateUserSubscriptionByCustomer({
            customerId,
            subscriptionPlan: "free",
            subscriptionId: null,
            subscriptionStatus: "past_due",
          });
        }

        break;
      }
      default:
        break;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook handling failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
