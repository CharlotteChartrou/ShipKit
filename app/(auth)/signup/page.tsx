import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocaleCopy } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/locale";
import { signup } from "../actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getCurrentLocale();
  const copy = getLocaleCopy(locale);
  const params = await searchParams;
  const message = typeof params.message === "string" ? params.message : undefined;

  return (
    <div className="grid min-h-[calc(100vh-72px)] place-items-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription>{copy.auth.signupEyebrow}</CardDescription>
          <CardTitle>{copy.auth.signupTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AuthForm
            action={signup}
            buttonLabel={copy.common.getStarted}
            locale={locale}
            mode="signup"
            message={message}
            passwordHint={copy.auth.signupHint}
          />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {copy.auth.signupFooter}{" "}
            <Link className="text-slate-950 hover:text-slate-700 dark:text-white dark:hover:text-slate-200" href="/login">
              {copy.common.signIn}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
