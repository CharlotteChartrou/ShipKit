import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardPageHeader } from "@/components/shared/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";
import { getCurrentAppUser } from "@/lib/users";

export default async function AccountPage() {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const user = await getCurrentAppUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        actions={
          <Button asChild variant="secondary">
            <Link href="/plan">{copy.common.managePlan}</Link>
          </Button>
        }
        description={copy.accountPage.description}
        eyebrow={copy.common.account}
        title={copy.accountPage.title}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>{copy.accountPage.identity}</CardDescription>
            <CardTitle>{user.email}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">{copy.dashboard.workspaceId}</p>
              <p className="mt-1 break-all text-slate-950 dark:text-white">{user.id}</p>
            </div>
            <div className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">{copy.accountPage.created}</p>
              <p className="mt-1 text-slate-950 dark:text-white">{new Date(user.created_at).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>{copy.accountPage.planDetails}</CardDescription>
            <CardTitle>{user.subscription_plan}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">{copy.common.plan}</p>
              <p className="mt-1 text-slate-950 dark:text-white capitalize">{user.subscription_plan}</p>
            </div>
            <div className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">{copy.dashboard.planStatus}</p>
              <p className="mt-1 text-slate-950 dark:text-white capitalize">{user.subscription_status}</p>
            </div>
            <div className="rounded-2xl border border-[rgba(99,102,241,0.12)] bg-white/82 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-slate-500 dark:text-slate-400">{copy.accountPage.billingCustomerId}</p>
              <p className="mt-1 break-all text-slate-950 dark:text-white">{user.stripe_customer_id ?? copy.accountPage.notCreatedYet}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
