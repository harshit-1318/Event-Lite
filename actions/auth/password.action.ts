"use server";

import { signOut } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type ChangePasswordInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
} from "@/lib/validations/auth.schema";
import { requireAuth } from "@/lib/permissions/rbac";
import { type ActionState } from "./login.action";

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function forgotPasswordAction(data: ForgotPasswordInput): Promise<ActionState> {
  const validated = forgotPasswordSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const { email } = validated.data;
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) {
    return { success: true, message: "If an account exists, a reset link has been dispatched." };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: { email: user.email, token: resetToken, expiresAt: new Date(Date.now() + 3600000) },
  });

  return {
    success: true,
    message: "If an account exists, a reset link has been dispatched.",
    data: { token: resetToken },
  };
}

export async function resetPasswordAction(data: ResetPasswordInput): Promise<ActionState> {
  const validated = resetPasswordSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors, message: "Invalid inputs." };
  }

  const { token, password } = validated.data;
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.expiresAt < new Date()) {
    return { success: false, message: "This reset link is invalid or has expired." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.update({ where: { email: record.email }, data: { passwordHash } });
  await prisma.passwordResetToken.delete({ where: { id: record.id } });

  return { success: true, message: "Your password has been successfully reset!" };
}

export async function changePasswordAction(data: ChangePasswordInput): Promise<ActionState> {
  const user = await requireAuth();
  const validated = changePasswordSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors, message: "Invalid fields." };
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser?.passwordHash) return { success: false, message: "User not found." };

  const isValid = await bcrypt.compare(validated.data.currentPassword, dbUser.passwordHash);
  if (!isValid) return { success: false, message: "Current password incorrect." };

  const passwordHash = await bcrypt.hash(validated.data.newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return { success: true, message: "Password updated successfully!" };
}
