"use server";

import * as reg from "./registration/register.action";
import * as cancel from "./registration/cancel.action";
import * as pay from "./registration/payment.action";

export type { RegistrationResult } from "./registration/register.action";

export async function registerForEventAction(...args: Parameters<typeof reg.registerForEventAction>) {
  return reg.registerForEventAction(...args);
}

export async function cancelRegistrationAction(...args: Parameters<typeof cancel.cancelRegistrationAction>) {
  return cancel.cancelRegistrationAction(...args);
}

export async function updatePaymentStatusAction(...args: Parameters<typeof pay.updatePaymentStatusAction>) {
  return pay.updatePaymentStatusAction(...args);
}
