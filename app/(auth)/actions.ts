"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authFormSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";
import { syncAuthenticatedUser } from "@/lib/users";

function getRedirectTarget(formData: FormData) {
  const next = formData.get("next");
  return typeof next === "string" && next.startsWith("/") ? next : "/dashboard";
}

function getAuthPayload(formData: FormData) {
  return authFormSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}

export async function login(formData: FormData) {
  const payload = getAuthPayload(formData);
  const next = getRedirectTarget(formData);
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`);
  }

  await syncAuthenticatedUser();
  revalidatePath("/", "layout");
  revalidatePath("/dashboard");
  revalidatePath("/profile");
  redirect(next);
}

export async function signup(formData: FormData) {
  const payload = getAuthPayload(formData);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=/dashboard`,
    },
  });

  if (error) {
    redirect(`/signup?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/login?message=Check your email to confirm your account.");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  revalidatePath("/dashboard");
  revalidatePath("/profile");
  redirect("/login?message=You have been signed out.");
}
