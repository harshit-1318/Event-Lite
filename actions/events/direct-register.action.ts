"use server";

import { prisma } from "@/lib/db/prisma";
import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { PaymentStatus, RegistrationStatus, NotificationType } from "@prisma/client";
import { directRegisterSchema, type DirectRegisterInput } from "@/lib/validations/event.schema";
import { revalidatePath } from "next/cache";

export async function directRegisterAction(data: DirectRegisterInput) {
  const adminOrFaculty = await requireFacultyOrAdmin();

  const validated = directRegisterSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, message: "Please provide valid student details." };
  }

  const { eventId, emailOrRollNo } = validated.data;

  try {
    const student = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrRollNo.toLowerCase().trim() },
          { rollNo: emailOrRollNo.trim() },
        ],
      },
    });

    if (!student) {
      return { success: false, message: "Student record not found by email or roll number." };
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return { success: false, message: "Event not found." };

    const reg = await prisma.registration.upsert({
      where: { userId_eventId: { userId: student.id, eventId: event.id } },
      create: {
        userId: student.id,
        eventId: event.id,
        status: RegistrationStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID,
      },
      update: {
        status: RegistrationStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID,
        cancelledAt: null,
      },
    });

    await prisma.notification.create({
      data: {
        userId: student.id,
        title: `Enrolled by Faculty: ${event.title}`,
        message: `Faculty coordinator ${adminOrFaculty.name} enrolled you in "${event.title}".`,
        type: NotificationType.REGISTRATION_CONFIRMATION,
        link: `/events/${event.slug}`,
      },
    });

    revalidatePath("/dashboard/faculty/approvals");
    return { success: true, message: `Successfully enrolled ${student.name}!` };
  } catch (error) {
    return { success: false, message: "Failed to enroll student." };
  }
}
