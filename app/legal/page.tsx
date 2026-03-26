import { LegalPage } from "@/components/shared/legal-page";

export default function LegalNoticePage() {
  return (
    <LegalPage
      description="Legal information for the ShipKit website and downloadable SaaS starter kit."
      title="Legal notice"
    >
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Operator</h2>
        <p>This website is operated by ShipKit.</p>
        <p>
          Contact:{" "}
          <a
            className="text-slate-950 underline underline-offset-4 dark:text-white"
            href="mailto:charlottechartrou@email.com"
          >
            charlottechartrou@email.com
          </a>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Hosting</h2>
        <p>This website is hosted by Vercel Inc.</p>
        <p>440 N Barranca Ave #4133</p>
        <p>Covina, CA 91723</p>
        <p>United States</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Product</h2>
        <p>
          This website provides access to a downloadable SaaS starter kit for developers.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
          Intellectual property
        </h2>
        <p>
          All content and code provided through this website are the property of the owner unless
          otherwise stated.
        </p>
        <p>Unauthorized redistribution or resale of the product is prohibited.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Liability</h2>
        <p>
          The product is provided &quot;as is&quot; without warranty of any kind. The owner shall
          not be held liable for any damages resulting from the use of the product.
        </p>
      </section>
    </LegalPage>
  );
}
