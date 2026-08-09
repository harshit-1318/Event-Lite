"use server";

import { prisma } from "@/lib/db/prisma";
import { requireAuth } from "@/lib/permissions/rbac";
import { dispatchRegistrationConfirmation } from "@/lib/email/dispatcher";
import { processRegistrationTx } from "./helpers";
import { PaymentStatus, RegistrationStatus, ParticipationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type RegistrationResult = {
  success: boolean;
  message: string;
  registrationId?: string;
  paymentStatus?: PaymentStatus;
};

export async function registerForEventAction(data: {
  eventId: string;
  participationStatus?: ParticipationStatus;
}): Promise<RegistrationResult> {
  const user = await requireAuth();
  const { eventId, participationStatus = ParticipationStatus.ATTENDING } = data;

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event || event.status !== "PUBLISHED") {
      return { success: false, message: "Event not available for enrollment." };
    }

    const currentCount = await prisma.registration.count({
      where: { eventId: event.id, status: RegistrationStatus.CONFIRMED },
    });
    if (currentCount >= event.capacity) {
      return { success: false, message: "Registration full! All seats booked." };
    }

    const paymentStatus = Number(event.fee) === 0 ? PaymentStatus.FREE : PaymentStatus.PENDING;
    const registration = await processRegistrationTx({
      userId: user.id,
      event,
      paymentStatus,
      participationStatus,
    });

    if (user.email) {
      dispatchRegistrationConfirmation({
        email: user.email,
        userName: user.name || "Student",
        eventTitle: event.title,
        eventDate: event.startDate.toDateString(),
        eventVenue: event.venue,
        ticketId: registration.id,
      });
    }

    revalidatePath(`/events/${event.slug}`);
    revalidatePath("/dashboard/student");
    return {
      success: true,
      message: paymentStatus === PaymentStatus.FREE ? "🎉 Registration Confirmed!" : "🎉 Registration Submitted (Payment Pending)!",
      registrationId: registration.id,
      paymentStatus: registration.paymentStatus,
    };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to complete registration." };
  }
}
