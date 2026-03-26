import { redirect } from "next/navigation";
import { localePath } from "@/lib/locale";
import { getCurrentLocale } from "@/lib/locale-server";

export default async function ProfilePage() {
  // Keep the legacy route around so older links continue to land on the current account page.
  const locale = await getCurrentLocale();
  redirect(localePath(locale, "/account"));
}
