import { createClient } from "@supabase/supabase-js";

function readArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) {
    return null;
  }

  return process.argv[index + 1] ?? null;
}

const userId = readArg("--id");
const email = readArg("--email");

if (!userId && !email) {
  console.error("Usage: npm run grant:pro -- --email you@example.com");
  console.error("   or: npm run grant:pro -- --id <supabase-user-id>");
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing required env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const column = userId ? "id" : "email";
const value = userId ?? email;

const { data, error } = await supabase
  .from("users")
  .update({
    subscription_plan: "pro",
    subscription_status: "active",
  })
  .eq(column, value)
  .select("id, email, subscription_plan, subscription_status")
  .maybeSingle();

if (error) {
  console.error(error.message);
  process.exit(1);
}

if (!data) {
  console.error(`No user found for ${column}=${value}.`);
  process.exit(1);
}

console.log("Granted Pro access:");
console.log(JSON.stringify(data, null, 2));
