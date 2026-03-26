import "server-only";

import type { AppUser } from "@/lib/users";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getAppUserById(userId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("users")
    .select("id, email, created_at, subscription_plan, subscription_status, stripe_customer_id, stripe_subscription_id")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as AppUser | null;
}

export async function getAppUserByEmail(email: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("users")
    .select("id, email, created_at, subscription_plan, subscription_status, stripe_customer_id, stripe_subscription_id")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as AppUser | null;
}

interface GrantProAccessParams {
  email?: string;
  userId?: string;
}

export async function grantProAccess({ email, userId }: GrantProAccessParams) {
  if (!email && !userId) {
    throw new Error("Provide either an email or a userId.");
  }

  const supabase = createAdminClient();
  const column = userId ? "id" : "email";
  const value = userId ?? email;

  const { data, error } = await supabase
    .from("users")
    .update({
      subscription_plan: "pro",
      subscription_status: "active",
    })
    .eq(column, value)
    .select("id, email, created_at, subscription_plan, subscription_status, stripe_customer_id, stripe_subscription_id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error(`No user found for ${column}=${value}.`);
  }

  return data as AppUser;
}
