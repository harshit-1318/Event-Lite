import { PrismaClient, RegistrationStatus, PaymentStatus, ParticipationStatus } from "@prisma/client";

export async function seedRegistrations(prisma: PrismaClient, students: any[], events: any[]) {
  if (students.length === 0 || events.length === 0) return;

  await prisma.registration.create({
    data: {
      userId: students[0].id,
      eventId: events[0].id,
      status: RegistrationStatus.CONFIRMED,
      paymentStatus: PaymentStatus.PAID,
      participationStatus: ParticipationStatus.ATTENDING,
    },
  });

  if (events.length > 1) {
    await prisma.registration.create({
      data: {
        userId: students[0].id,
        eventId: events[1].id,
        status: RegistrationStatus.CONFIRMED,
        paymentStatus: PaymentStatus.FREE,
        participationStatus: ParticipationStatus.ATTENDING,
      },
    });
  }

  if (students.length > 1 && events.length > 2) {
    await prisma.registration.create({
      data: {
        userId: students[1].id,
        eventId: events[2].id,
        status: RegistrationStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PENDING,
        participationStatus: ParticipationStatus.ATTENDING,
      },
    });
  }

  console.log("🎫 Seeded sample student registrations.");
}
