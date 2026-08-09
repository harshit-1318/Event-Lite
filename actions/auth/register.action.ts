"use server";

import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth.schema";
import { Role, NotificationType } from "@prisma/client";
import { type ActionState } from "./login.action";

export async function registerAction(data: RegisterInput): Promise<ActionState> {
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Please correct the form errors.",
    };
  }

  const { name, email, password, phone, rollNo, studentClass, department, fatherName } =
    validated.data;

  try {
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return {
        success: false,
        message: "An account with this email already exists. Please log in.",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        role: Role.STUDENT,
        phone: phone || null,
        rollNo: rollNo.trim(),
        studentClass: studentClass.trim(),
        department: department || null,
        fatherName: fatherName || null,
        isActive: true,
      },
    });

    await prisma.notification.create({
      data: {
        userId: newUser.id,
        title: "Welcome to EventElite! 🎓",
        message: `Welcome ${newUser.name}. Your student account is active. Browse events and register!`,
        type: NotificationType.ADMIN_ALERT,
        link: "/events",
      },
    });

    return {
      success: true,
      message: "Registration successful! You can now log in.",
    };
  } catch (error) {
    return { success: false, message: "Failed to create account. Please try again." };
  }
}
