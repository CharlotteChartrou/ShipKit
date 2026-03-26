import { LegalPage } from "@/components/shared/legal-page";

export default function TermsPage() {
  return (
    <LegalPage
      description="Terms for purchasing and using the SaaSFrame downloadable SaaS starter."
      title="Terms of service"
    >
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Product</h2>
        <p>
          You are purchasing a digital product delivered as a downloadable SaaS starter kit.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Payment</h2>
        <p>
          Payment is processed securely via Stripe or Gumroad.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Access</h2>
        <p>
          After purchase, you will receive access to download the product.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">License</h2>
        <p>
          You are granted a non-exclusive license to use the product for personal or commercial
          projects.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>You may not resell the product as-is</li>
          <li>You may not redistribute the source code</li>
          <li>You may not share the product publicly</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Refunds</h2>
        <p>
          Due to the nature of digital products, all sales are final. No refunds will be issued.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Support</h2>
        <p>No guaranteed support is included unless explicitly stated.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Liability</h2>
        <p>The product is provided &quot;as is&quot; without warranties.</p>
        <p>The seller is not responsible for any damages or issues arising from its use.</p>
        <p>By purchasing, you agree to these terms.</p>
      </section>
    </LegalPage>
  );
}
