import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { hasEmailEnv } from "@/lib/env";
import { sendWelcomeEmail } from "@/lib/email/send";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next.startsWith("/") ? next : "/dashboard";
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("next");

  if (tokenHash && type) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

    if (!error) {
      if (hasEmailEnv) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          await sendWelcomeEmail({
            email: user.email,
          });
        }
      }

      return NextResponse.redirect(redirectTo);
    }
  }

  redirectTo.pathname = "/login";
  redirectTo.searchParams.set("message", "Your confirmation link is invalid or has expired.");
  return NextResponse.redirect(redirectTo);
}
