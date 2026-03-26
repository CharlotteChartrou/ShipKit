import "server-only";

import type { SubscriptionPlan } from "@/lib/users";
import { getEmailEnv, hasEmailEnv } from "@/lib/env";
import { getResend } from "@/lib/email/resend";
import {
  renderSubscriptionConfirmationEmail,
  renderWelcomeEmail,
} from "@/lib/email/templates";

async function sendEmail(params: {
  html: string;
  subject: string;
  text: string;
  to: string;
}) {
  if (!hasEmailEnv) {
    return;
  }

  const resend = getResend();
  const { emailFrom } = getEmailEnv();

  const { error } = await resend.emails.send({
    from: emailFrom,
    to: [params.to],
    subject: params.subject,
    html: params.html,
    text: params.text,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendWelcomeEmail(params: { email: string }) {
  const { siteUrl } = getEmailEnv();
  const template = renderWelcomeEmail({
    email: params.email,
    accountUrl: `${siteUrl}/account`,
  });

  await sendEmail({
    ...template,
    to: params.email,
  });
}

export async function sendSubscriptionConfirmationEmail(params: {
  email: string;
  plan: SubscriptionPlan;
}) {
  const { siteUrl } = getEmailEnv();
  const template = renderSubscriptionConfirmationEmail({
    email: params.email,
    plan: params.plan,
    billingUrl: `${siteUrl}/billing`,
  });

  await sendEmail({
    ...template,
    to: params.email,
  });
}
