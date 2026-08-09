import { PrismaClient } from "@prisma/client";

export async function cleanDatabase(prisma: PrismaClient) {
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.category.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  console.log("🧹 Cleared existing database records.");
}
