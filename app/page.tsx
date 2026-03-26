import { redirect } from "next/navigation";
import { getCurrentAppUser } from "@/lib/users";

export default async function HomePage() {
  const appUser = await getCurrentAppUser();

  redirect(appUser ? "/dashboard" : "/login");
}
