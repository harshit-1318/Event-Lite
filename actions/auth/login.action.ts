"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { AuthError } from "next-auth";
import { loginSchema, type LoginInput } from "@/lib/validations/auth.schema";
import { Role } from "@prisma/client";

export type ActionState<T = any> = {
  success?: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export async function loginAction(data: LoginInput): Promise<ActionState<{ role: Role }>> {
  const validated = loginSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid input fields.",
    };
  }

  const { email, password } = validated.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return { success: false, message: "Invalid email or password." };
    }

    if (!user.isActive) {
      return {
        success: false,
        message: "Your account is deactivated. Please contact campus administration.",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: `Welcome back, ${user.name}!`,
      data: { role: user.role },
    };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { success: false, message: "Invalid email or password." };
      }
    }
    return { success: false, message: "Authentication failed. Please check your credentials." };
  }
}
