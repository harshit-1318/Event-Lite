import React from "react";
import { requireAdmin } from "@/lib/permissions/rbac";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { LayoutDashboard, Users, Calendar, Tags, ShieldAlert } from "lucide-react";
import { prisma } from "@/lib/db/prisma";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  const [totalUsers, totalEvents] = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
  ]);

  const links = [
    { name: "Executive Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "User Management", href: "/dashboard/admin/users", icon: Users, badge: totalUsers },
    { name: "Global Events", href: "/dashboard/admin/events", icon: Calendar, badge: totalEvents },
    { name: "Event Categories", href: "/dashboard/admin/categories", icon: Tags },
    { name: "Audit Security Logs", href: "/dashboard/admin/audit-logs", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950">
      <DashboardNav />
      <div className="max-w-7xl mx-auto w-full flex flex-1">
        <DashboardSidebar title="Super Admin Control" links={links} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
