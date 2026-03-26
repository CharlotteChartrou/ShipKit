import { LegalPage } from "@/components/shared/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage
      description="Privacy information for the ShipKit website, authentication flow, and digital product delivery."
      title="Privacy policy"
    >
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Data collected</h2>
        <p>We respect your privacy.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Email address for authentication and account access</li>
          <li>Payment information handled securely by Stripe or Gumroad</li>
          <li>Basic usage data needed to operate the service</li>
        </ul>
        <p>
          We do not store your payment details directly.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Purpose of data</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Provide access to the product</li>
          <li>Manage user accounts</li>
          <li>Process purchases</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
          Third-party services
        </h2>
        <p>
          We use Supabase for authentication and Stripe or Gumroad for payments. These providers
          may process your data according to their own privacy policies.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Data retention</h2>
        <p>
          Your data is kept as long as necessary to provide the service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Your rights</h2>
        <p>
          You can request access, modification, or deletion of your data by contacting{" "}
          <a
            className="text-slate-950 underline underline-offset-4 dark:text-white"
            href="mailto:charlottechartrou@email.com"
          >
            charlottechartrou@email.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Security</h2>
        <p>We take reasonable measures to protect your data.</p>
        <p>By using this site, you agree to this policy.</p>
      </section>
    </LegalPage>
  );
}
