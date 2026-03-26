"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";

interface ClientSessionCardProps {
  locale: Locale;
}

export function ClientSessionCard({ locale }: ClientSessionCardProps) {
  const { session, status, user } = useAuth();
  const copy = getLocaleCopy(locale);

  return (
    <Card>
      <CardHeader>
        <CardDescription>{copy.dashboard.sessionEyebrow}</CardDescription>
        <CardTitle>{copy.dashboard.sessionTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
        <p>{copy.dashboard.state}: {status}</p>
        <p>{copy.dashboard.signedIn}: {user ? (locale === "fr" ? "Oui" : "Yes") : (locale === "fr" ? "Non" : "No")}</p>
        <p>{copy.dashboard.sessionExpires}: {session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : copy.dashboard.unknown}</p>
      </CardContent>
    </Card>
  );
}
