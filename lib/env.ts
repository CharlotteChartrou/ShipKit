const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
const stripePriceStarter = process.env.STRIPE_PRICE_STARTER ?? "";
const resendApiKey = process.env.RESEND_API_KEY ?? "";
const emailFrom = process.env.EMAIL_FROM ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const gumroadProductUrl = process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL ?? "";

export const hasSupabaseEnv = Boolean(supabaseUrl && supabasePublishableKey);
export const hasSupabaseAdminEnv = Boolean(supabaseUrl && supabaseServiceRoleKey);
export const hasStripeEnv = Boolean(
  stripeSecretKey && stripeWebhookSecret && stripePriceStarter,
);
export const hasEmailEnv = Boolean(resendApiKey && emailFrom);
export const hasGumroadEnv = Boolean(gumroadProductUrl);

export function getSupabaseEnv() {
  if (!hasSupabaseEnv) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    );
  }

  return {
    supabaseUrl,
    supabasePublishableKey,
  };
}

export function getSupabaseAdminEnv() {
  if (!hasSupabaseAdminEnv) {
    throw new Error(
      "Missing Supabase admin environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return {
    supabaseServiceRoleKey,
    supabaseUrl,
  };
}

export function getStripeEnv() {
  if (!hasStripeEnv) {
    throw new Error(
      "Missing Stripe environment variables. Set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, and STRIPE_PRICE_STARTER.",
    );
  }

  return {
    siteUrl,
    stripePriceStarter,
    stripeSecretKey,
    stripeWebhookSecret,
  };
}

export function getEmailEnv() {
  if (!hasEmailEnv) {
    throw new Error(
      "Missing email environment variables. Set RESEND_API_KEY and EMAIL_FROM.",
    );
  }

  return {
    emailFrom,
    resendApiKey,
    siteUrl,
  };
}

export function getGumroadEnv() {
  if (!hasGumroadEnv) {
    throw new Error(
      "Missing Gumroad environment variable. Set NEXT_PUBLIC_GUMROAD_PRODUCT_URL.",
    );
  }

  return {
    gumroadProductUrl,
  };
}
