import { redirect } from "next/navigation";

export default function ProfilePage() {
  // Keep the legacy route around so older links continue to land on the current account page.
  redirect("/account");
}
