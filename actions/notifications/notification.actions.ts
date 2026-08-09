"use server";

import { requireAuth } from "@/lib/permissions/rbac";
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/notifications/service";
import { revalidatePath } from "next/cache";

export async function fetchUserNotificationsAction() {
  const user = await requireAuth();
  const notifications = await getUserNotifications(user.id);
  const unreadCount = await getUnreadNotificationCount(user.id);
  return { notifications, unreadCount };
}

export async function markAsReadAction(notificationId: string) {
  const user = await requireAuth();
  await markNotificationAsRead(notificationId, user.id);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function markAllAsReadAction() {
  const user = await requireAuth();
  await markAllNotificationsAsRead(user.id);
  revalidatePath("/dashboard");
  return { success: true };
}
