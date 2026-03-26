import { cache } from "react";
import type { User } from "@supabase/supabase-js";
import { hasSupabaseEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase";

// Central place for reading the signed-in Supabase user on the server.
export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!hasSupabaseEnv) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
