import type { SubscriptionPlan } from "@/lib/users";

function emailLayout(params: {
  ctaHref?: string;
  ctaLabel?: string;
  eyebrow: string;
  intro: string;
  title: string;
  body: string[];
}) {
  const cta = params.ctaHref && params.ctaLabel
    ? `
      <tr>
        <td style="padding: 28px 32px 0;">
          <a
            href="${params.ctaHref}"
            style="display:inline-block;border-radius:12px;background:#0f172a;color:#ffffff;padding:12px 18px;text-decoration:none;font-weight:600;"
          >
            ${params.ctaLabel}
          </a>
        </td>
      </tr>
    `
    : "";

  return `
    <div style="margin:0;padding:32px;background:#f8fafc;font-family:Arial, Helvetica, sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
        <tr>
          <td style="padding:32px 32px 12px;">
            <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#64748b;font-weight:700;">${params.eyebrow}</div>
            <h1 style="margin:14px 0 10px;font-size:28px;line-height:1.2;color:#0f172a;">${params.title}</h1>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#475569;">${params.intro}</p>
          </td>
        </tr>
        ${params.body
          .map(
            (paragraph) => `
          <tr>
            <td style="padding:8px 32px 0;font-size:15px;line-height:1.7;color:#475569;">
              ${paragraph}
            </td>
          </tr>
        `,
          )
          .join("")}
        ${cta}
        <tr>
          <td style="padding:28px 32px 32px;font-size:13px;line-height:1.7;color:#94a3b8;">
            Signal
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function renderWelcomeEmail(params: { accountUrl: string; email: string }) {
  const subject = "Welcome to Signal";
  const html = emailLayout({
    eyebrow: "Welcome",
    title: "Your account is ready",
    intro: `Thanks for joining Signal with ${params.email}.`,
    body: [
      "Your workspace is set up and ready for you to explore the dashboard, account settings, and billing flows.",
      "This starter is designed to stay minimal and scalable, so you can extend it without reworking the foundation later.",
    ],
    ctaHref: params.accountUrl,
    ctaLabel: "Open your account",
  });
  const text = [
    "Welcome to Signal",
    "",
    `Thanks for joining Signal with ${params.email}.`,
    "Your workspace is set up and ready for you to explore the dashboard, account settings, and billing flows.",
    `Open your account: ${params.accountUrl}`,
  ].join("\n");

  return { html, subject, text };
}

export function renderSubscriptionConfirmationEmail(params: {
  billingUrl: string;
  email: string;
  plan: SubscriptionPlan;
}) {
  const planLabel = params.plan === "free" ? "Free" : params.plan === "pro" ? "Pro" : "Starter";
  const subject = `${planLabel} subscription confirmed`;
  const html = emailLayout({
    eyebrow: "Billing",
    title: "Your subscription is confirmed",
    intro: `Your ${planLabel} plan is now active for ${params.email}.`,
    body: [
      "You can review invoices, payment methods, and future plan changes from the billing section of your dashboard.",
      "If you need to make changes later, the Stripe customer portal is linked directly from the billing page.",
    ],
    ctaHref: params.billingUrl,
    ctaLabel: "Open billing",
  });
  const text = [
    `${planLabel} subscription confirmed`,
    "",
    `Your ${planLabel} plan is now active for ${params.email}.`,
    "You can review invoices, payment methods, and future plan changes from the billing section of your dashboard.",
    `Open billing: ${params.billingUrl}`,
  ].join("\n");

  return { html, subject, text };
}
