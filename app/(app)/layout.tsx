import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getCurrentLocale } from "@/lib/locale";
import { getCurrentAppUser } from "@/lib/users";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getCurrentLocale();
  const appUser = await getCurrentAppUser();

  if (!appUser) {
    redirect("/login?next=/dashboard");
  }

  return <DashboardShell locale={locale}>{children}</DashboardShell>;
}
