import { PrismaClient, NotificationType } from "@prisma/client";

export async function seedNotifications(prisma: PrismaClient, students: any[]) {
  if (students.length === 0) return;

  await prisma.notification.create({
    data: {
      userId: students[0].id,
      title: "Welcome to EventElite V2! 🎓",
      message: "Your student registration is confirmed. Start exploring upcoming campus fests and workshops.",
      type: NotificationType.REGISTRATION_CONFIRMATION,
      link: "/events",
    },
  });

  console.log("🔔 Seeded initial student notifications.");
}
