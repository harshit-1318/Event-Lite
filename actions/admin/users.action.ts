"use server";

import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/permissions/rbac";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function toggleUserStatusAction(userId: string) {
  const admin = await requireAdmin();

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { success: false, message: "User not found." };
    if (user.id === admin.id) return { success: false, message: "Cannot deactivate own admin account." };

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });

    await prisma.auditLog.create({
      data: {
        userId: admin.id,
        action: updated.isActive ? "USER_ACTIVATE" : "USER_DEACTIVATE",
        entity: "USER",
        entityId: user.id,
        details: { email: user.email, name: user.name },
      },
    });

    revalidatePath("/dashboard/admin/users");
    return {
      success: true,
      message: `User ${user.name} is now ${updated.isActive ? "Active" : "Deactivated"}.`,
    };
  } catch (error) {
    return { success: false, message: "Failed to update user status." };
  }
}

export async function changeUserRoleAction(userId: string, role: Role) {
  const admin = await requireAdmin();

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    await prisma.auditLog.create({
      data: {
        userId: admin.id,
        action: "USER_ROLE_CHANGE",
        entity: "USER",
        entityId: user.id,
        details: { email: user.email, newRole: role },
      },
    });

    revalidatePath("/dashboard/admin/users");
    return { success: true, message: `Role for ${user.name} changed to ${role}.` };
  } catch (error) {
    return { success: false, message: "Failed to update user role." };
  }
}
