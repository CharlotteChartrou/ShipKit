import "server-only";

import { Resend } from "resend";
import { getEmailEnv } from "@/lib/env";

export function getResend() {
  const { resendApiKey } = getEmailEnv();
  return new Resend(resendApiKey);
}
