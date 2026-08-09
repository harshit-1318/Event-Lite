import { prisma } from "@/lib/db/prisma";
import { PaymentStatus, RegistrationStatus, ParticipationStatus, NotificationType } from "@prisma/client";

export async function processRegistrationTx(params: {
  userId: string;
  event: { id: string; title: string; slug: string; capacity: number };
  paymentStatus: PaymentStatus;
  participationStatus: ParticipationStatus;
}) {
  return await prisma.$transaction(async (tx) => {
    const confirmedCount = await tx.registration.count({
      where: { eventId: params.event.id, status: RegistrationStatus.CONFIRMED },
    });
    if (confirmedCount >= params.event.capacity) throw new Error("Capacity reached during checkout.");

    const reg = await tx.registration.upsert({
      where: { userId_eventId: { userId: params.userId, eventId: params.event.id } },
      create: {
        userId: params.userId,
        eventId: params.event.id,
        status: RegistrationStatus.CONFIRMED,
        paymentStatus: params.paymentStatus,
        participationStatus: params.participationStatus,
      },
      update: {
        status: RegistrationStatus.CONFIRMED,
        paymentStatus: params.paymentStatus,
        participationStatus: params.participationStatus,
        cancelledAt: null,
      },
    });

    await tx.notification.create({
      data: {
        userId: params.userId,
        title: `Registered: ${params.event.title}`,
        message: `Your enrollment in "${params.event.title}" is confirmed.`,
        type: NotificationType.REGISTRATION_CONFIRMATION,
        link: `/events/${params.event.slug}`,
      },
    });

    return reg;
  });
}
