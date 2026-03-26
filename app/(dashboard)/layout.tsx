import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/shared/dashboard-shell";
import { getCurrentAppUser } from "@/lib/users";
import { localePath } from "@/lib/locale";
import { getCurrentLocale } from "@/lib/locale-server";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getCurrentLocale();
  const appUser = await getCurrentAppUser();

  if (!appUser) {
    redirect(`${localePath(locale, "/login")}?next=/dashboard`);
  }

  return <DashboardShell locale={locale}>{children}</DashboardShell>;
}
