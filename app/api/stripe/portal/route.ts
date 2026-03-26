import { NextResponse } from "next/server";
import { getStripeEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe/server";
import { getCurrentAppUser } from "@/lib/users";

export async function POST(request: Request) {
  const appUser = await getCurrentAppUser();

  if (!appUser) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", "/billing");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  if (!appUser.stripe_customer_id) {
    return NextResponse.redirect(new URL("/billing?portal=unavailable", request.url), { status: 303 });
  }

  const stripe = getStripe();
  const { siteUrl } = getStripeEnv();
  const session = await stripe.billingPortal.sessions.create({
    customer: appUser.stripe_customer_id,
    return_url: `${siteUrl}/billing`,
  });

  return NextResponse.redirect(session.url, { status: 303 });
}
