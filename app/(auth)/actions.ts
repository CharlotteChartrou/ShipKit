"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authFormSchema } from "@/lib/validations/auth";
import { localePath } from "@/lib/locale";
import { getCurrentLocale } from "@/lib/locale-server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { syncAuthenticatedUser } from "@/lib/users";

async function getRedirectTarget(formData: FormData) {
  const locale = await getCurrentLocale();
  const next = formData.get("next");
  return typeof next === "string" && next.startsWith("/") ? next : localePath(locale, "/dashboard");
}

function getAuthPayload(formData: FormData) {
  return authFormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}

export async function login(formData: FormData) {
  const payload = getAuthPayload(formData);
  const locale = await getCurrentLocale();
  const next = await getRedirectTarget(formData);
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    redirect(`${localePath(locale, "/login")}?message=${encodeURIComponent(error.message)}`);
  }

  await syncAuthenticatedUser();
  revalidatePath("/", "layout");
  revalidatePath("/dashboard");
  revalidatePath("/profile");
  redirect(next);
}

export async function signup(formData: FormData) {
  const payload = getAuthPayload(formData);
  const locale = await getCurrentLocale();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(localePath(locale, "/dashboard"))}`,
    },
  });

  if (error) {
    redirect(`${localePath(locale, "/signup")}?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect(`${localePath(locale, "/login")}?message=Check your email to confirm your account.`);
}

export async function logout() {
  const locale = await getCurrentLocale();
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  revalidatePath("/dashboard");
  revalidatePath("/profile");
  redirect(`${localePath(locale, "/login")}?message=You have been signed out.`);
}
