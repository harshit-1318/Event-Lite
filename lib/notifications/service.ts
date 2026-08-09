import { prisma } from "@/lib/db/prisma";
import { NotificationType } from "@prisma/client";

export interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  link?: string;
}

export async function createNotification(params: CreateNotificationParams) {
  return await prisma.notification.create({
    data: {
      userId: params.userId,
      title: params.title,
      message: params.message,
      type: params.type || NotificationType.REGISTRATION_CONFIRMATION,
      link: params.link,
    },
  });
}

export async function getUserNotifications(userId: string, limit = 15) {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getUnreadNotificationCount(userId: string): Promise<number> {
  return await prisma.notification.count({
    where: { userId, isRead: false },
  });
}

export async function markNotificationAsRead(id: string, userId: string) {
  return await prisma.notification.updateMany({
    where: { id, userId },
    data: { isRead: true },
  });
}

export async function markAllNotificationsAsRead(userId: string) {
  return await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
