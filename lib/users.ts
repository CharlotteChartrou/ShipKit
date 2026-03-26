import "server-only";

import type { User } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { AppUser } from "@/types/auth";
export { subscriptionStatuses, type SubscriptionPlan, type SubscriptionStatus } from "@/types/auth";

const DEVELOPMENT_PRO_EMAIL = "charlottechartrou@email.com";

function normalizeAppUserPlan(appUser: AppUser): AppUser {
  if (appUser.subscription_plan === "pro") {
    return {
      ...appUser,
      subscription_plan: "starter",
    };
  }

  return appUser;
}

function applyDevelopmentAccessOverride(appUser: AppUser): AppUser {
  if (
    process.env.NODE_ENV === "development" &&
    appUser.email.toLowerCase() === DEVELOPMENT_PRO_EMAIL
  ) {
    return {
      ...appUser,
      subscription_plan: "starter",
      subscription_status: "active",
    };
  }

  return appUser;
}

function toAppUser(user: User): AppUser {
  return applyDevelopmentAccessOverride(
    normalizeAppUserPlan({
      id: user.id,
      email: user.email ?? "",
      created_at: user.created_at,
      subscription_plan: "free",
      subscription_status: "free",
      stripe_customer_id: null,
      stripe_subscription_id: null,
    }),
  );
}

export async function syncAuthenticatedUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const { data, error } = await supabase
    .from("users")
    .upsert(payload, { onConflict: "id" })
    .select("id, email, created_at, subscription_plan, subscription_status, stripe_customer_id, stripe_subscription_id")
    .single();

  if (error) {
    if (
      error.message.includes("Could not find the table 'public.users'") ||
      error.message.includes("relation \"public.users\" does not exist")
    ) {
      throw new Error(
        "Missing Supabase table: public.users. Apply the SQL migrations in supabase/migrations to your Supabase project before using auth flows.",
      );
    }

    throw new Error(error.message);
  }

  return applyDevelopmentAccessOverride(normalizeAppUserPlan((data ?? toAppUser(user)) as AppUser));
}

export async function getCurrentAppUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, email, created_at, subscription_plan, subscription_status, stripe_customer_id, stripe_subscription_id")
    .eq("id", user.id)
    .single();

  if (!error && data) {
    return applyDevelopmentAccessOverride(normalizeAppUserPlan(data as AppUser));
  }

  if (
    error &&
    (error.message.includes("Could not find the table 'public.users'") ||
      error.message.includes("relation \"public.users\" does not exist"))
  ) {
    throw new Error(
      "Missing Supabase table: public.users. Apply the SQL migrations in supabase/migrations to your Supabase project before using auth flows.",
    );
  }

  return syncAuthenticatedUser();
}
