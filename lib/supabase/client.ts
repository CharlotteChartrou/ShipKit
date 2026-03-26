import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/env";

export function createBrowserSupabaseClient() {
  const { supabasePublishableKey, supabaseUrl } = getSupabaseEnv();

  return createBrowserClient(
    supabaseUrl,
    supabasePublishableKey,
  );
}
