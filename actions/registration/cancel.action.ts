"use server";

import { prisma } from "@/lib/db/prisma";
import { requireAuth } from "@/lib/permissions/rbac";
import { RegistrationStatus, NotificationType, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function cancelRegistrationAction(registrationId: string) {
  const user = await requireAuth();

  try {
    const reg = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: { event: true },
    });

    if (!reg) return { success: false, message: "Registration record not found." };
    if (reg.userId !== user.id && user.role !== Role.ADMIN) {
      return { success: false, message: "Unauthorized to cancel registration." };
    }

    await prisma.registration.update({
      where: { id: registrationId },
      data: { status: RegistrationStatus.CANCELLED, cancelledAt: new Date() },
    });

    await prisma.notification.create({
      data: {
        userId: reg.userId,
        title: "Registration Cancelled",
        message: `Your registration for "${reg.event.title}" has been cancelled.`,
        type: NotificationType.EVENT_CANCELLATION,
      },
    });

    revalidatePath("/dashboard/student/registrations");
    revalidatePath(`/events/${reg.event.slug}`);
    return { success: true, message: "Registration cancelled successfully." };
  } catch (error) {
    return { success: false, message: "Failed to cancel registration." };
  }
}
