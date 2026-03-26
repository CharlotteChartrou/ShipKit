import Link from "next/link";
import { AuthForm } from "@/components/shared/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const params = await searchParams;
  const message = typeof params.message === "string" ? params.message : undefined;
  const next = typeof params.next === "string" ? params.next : undefined;

  return (
    <div className="grid min-h-[calc(100vh-72px)] place-items-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription>{copy.auth.loginEyebrow}</CardDescription>
          <CardTitle>{copy.auth.loginTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AuthForm
            action={login}
            buttonLabel={copy.common.signIn}
            locale={locale}
            mode="login"
            message={message}
            next={next}
            passwordHint={copy.auth.loginHint}
          />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {copy.auth.loginFooter}{" "}
            <Link className="text-slate-950 hover:text-slate-700 dark:text-white dark:hover:text-slate-200" href="/signup">
              {copy.common.getStarted}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
