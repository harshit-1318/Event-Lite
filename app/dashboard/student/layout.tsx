import React from "react";
import { requireAuth } from "@/lib/permissions/rbac";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Calendar, CalendarCheck, Bell, User } from "lucide-react";
import { prisma } from "@/lib/db/prisma";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  const [confirmedCount, unreadCount] = await Promise.all([
    prisma.registration.count({ where: { userId: user.id, status: "CONFIRMED" } }),
    prisma.notification.count({ where: { userId: user.id, isRead: false } }),
  ]);

  const links = [
    { name: "Overview", href: "/dashboard/student", icon: Calendar },
    { name: "My Registrations", href: "/dashboard/student/registrations", icon: CalendarCheck, badge: confirmedCount },
    { name: "Notifications", href: "/dashboard/student/notifications", icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { name: "Profile Settings", href: "/dashboard/student/profile", icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950">
      <DashboardNav />
      <div className="max-w-7xl mx-auto w-full flex flex-1">
        <DashboardSidebar title="Student Workspace" links={links} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
