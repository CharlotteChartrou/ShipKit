import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripeEnv } from "@/lib/env";
import { getCurrentAppUser } from "@/lib/users";
import { getPriceIdForPlan, getStripe, type BillingPlanId } from "@/lib/stripe";

const checkoutSchema = z.object({
  planId: z.literal("starter"),
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = checkoutSchema.safeParse({
    planId: formData.get("planId"),
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/plan", request.url), { status: 303 });
  }

  const appUser = await getCurrentAppUser();

  if (!appUser) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", "/plan");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const stripe = getStripe();
  const { siteUrl } = getStripeEnv();
  const planId = parsed.data.planId as BillingPlanId;
  const priceId = getPriceIdForPlan(planId);
  const successUrl = `${siteUrl}/plan?checkout=success`;
  const cancelUrl = `${siteUrl}/plan?checkout=cancelled`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    customer: appUser.stripe_customer_id ?? undefined,
    customer_email: appUser.stripe_customer_id ? undefined : appUser.email,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      plan_id: planId,
      supabase_user_id: appUser.id,
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe checkout session did not return a URL." }, { status: 500 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}
