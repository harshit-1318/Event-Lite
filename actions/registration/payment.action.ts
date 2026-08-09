"use server";

import { prisma } from "@/lib/db/prisma";
import { requireAuth } from "@/lib/permissions/rbac";
import { PaymentStatus, NotificationType, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updatePaymentStatusAction(data: {
  registrationId: string;
  status: "PAID" | "REJECTED" | "PENDING";
}) {
  const user = await requireAuth();
  const { registrationId, status } = data;

  try {
    const reg = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: { event: true },
    });

    if (!reg) return { success: false, message: "Registration not found." };
    if (reg.event.organizerId !== user.id && user.role !== Role.ADMIN) {
      return { success: false, message: "Unauthorized to modify payment." };
    }

    const newStatus =
      status === "PAID"
        ? PaymentStatus.PAID
        : status === "REJECTED"
        ? PaymentStatus.REJECTED
        : PaymentStatus.PENDING;

    await prisma.registration.update({
      where: { id: registrationId },
      data: { paymentStatus: newStatus },
    });

    await prisma.notification.create({
      data: {
        userId: reg.userId,
        title: `Payment Update: ${reg.event.title}`,
        message: `Your payment for "${reg.event.title}" is now ${newStatus}.`,
        type: NotificationType.PAYMENT_UPDATE,
        link: `/dashboard/student/registrations`,
      },
    });

    revalidatePath("/dashboard/faculty/approvals");
    return { success: true, message: `Payment marked as ${newStatus}.` };
  } catch (error) {
    return { success: false, message: "Failed to update payment status." };
  }
}
