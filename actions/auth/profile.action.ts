"use server";

import { prisma } from "@/lib/db/prisma";
import { profileUpdateSchema, type ProfileUpdateInput } from "@/lib/validations/auth.schema";
import { requireAuth } from "@/lib/permissions/rbac";
import { revalidatePath } from "next/cache";
import { type ActionState } from "./login.action";

export async function updateProfileAction(data: ProfileUpdateInput): Promise<ActionState> {
  const user = await requireAuth();

  const validated = profileUpdateSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid profile data.",
    };
  }

  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: validated.data.name,
        phone: validated.data.phone || null,
        department: validated.data.department || null,
        rollNo: validated.data.rollNo || null,
        studentClass: validated.data.studentClass || null,
        fatherName: validated.data.fatherName || null,
      },
    });

    revalidatePath("/dashboard/student/profile");
    return { success: true, message: "Profile updated successfully!", data: updated };
  } catch (error) {
    return { success: false, message: "Failed to update profile." };
  }
}
