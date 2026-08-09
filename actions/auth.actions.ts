"use server";

import * as login from "./auth/login.action";
import * as reg from "./auth/register.action";
import * as pwd from "./auth/password.action";
import * as prof from "./auth/profile.action";

export type { ActionState } from "./auth/login.action";

export async function loginAction(...args: Parameters<typeof login.loginAction>) {
  return login.loginAction(...args);
}

export async function registerAction(...args: Parameters<typeof reg.registerAction>) {
  return reg.registerAction(...args);
}

export async function logoutAction(...args: Parameters<typeof pwd.logoutAction>) {
  return pwd.logoutAction(...args);
}

export async function forgotPasswordAction(...args: Parameters<typeof pwd.forgotPasswordAction>) {
  return pwd.forgotPasswordAction(...args);
}

export async function resetPasswordAction(...args: Parameters<typeof pwd.resetPasswordAction>) {
  return pwd.resetPasswordAction(...args);
}

export async function changePasswordAction(...args: Parameters<typeof pwd.changePasswordAction>) {
  return pwd.changePasswordAction(...args);
}

export async function updateProfileAction(...args: Parameters<typeof prof.updateProfileAction>) {
  return prof.updateProfileAction(...args);
}
