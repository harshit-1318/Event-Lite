import { requireAuth } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { NotificationList } from "@/components/dashboard/student";
import { Bell } from "lucide-react";

export default async function StudentNotificationsPage() {
  const user = await requireAuth();

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // Mark unread notifications as read
  if (notifications.some((n) => !n.isRead)) {
    await prisma.notification.updateMany({
      where: { userId: user.id, isRead: false },
      data: { isRead: true },
    });
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold">
          <Bell className="w-3.5 h-3.5" /> Activity Feed
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Notifications</h1>
        <p className="text-xs text-slate-500">Real-time alerts regarding event registrations and approvals.</p>
      </div>

      <NotificationList notifications={notifications} />
    </div>
  );
}
