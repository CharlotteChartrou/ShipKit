import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Locale } from "@/lib/i18n";
import { getLocaleCopy } from "@/lib/i18n";

interface AuthFormProps {
  action: (formData: FormData) => Promise<void>;
  buttonLabel: string;
  locale: Locale;
  mode: "login" | "signup";
  message?: string;
  next?: string;
  passwordHint: string;
}

export function AuthForm({
  action,
  buttonLabel,
  locale,
  mode,
  message,
  next,
  passwordHint,
}: AuthFormProps) {
  const copy = getLocaleCopy(locale);

  return (
    <form action={action} className="space-y-5">
      {next ? <input name="next" type="hidden" value={next} /> : null}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">
          {copy.auth.workEmail}
        </label>
        <Input autoComplete="email" id="email" name="email" placeholder="you@company.com" required type="email" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">
          {copy.auth.password}
        </label>
        <Input
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          id="password"
          minLength={8}
          name="password"
          placeholder="••••••••"
          required
          type="password"
        />
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-500">{passwordHint}</p>
      </div>

      {message ? (
        <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          {message}
        </div>
      ) : null}

      <SubmitButton className="w-full">{buttonLabel}</SubmitButton>
    </form>
  );
}
