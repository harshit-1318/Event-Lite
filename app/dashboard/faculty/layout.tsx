import React from "react";
import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { LayoutDashboard, PlusCircle, CheckCircle, UserPlus } from "lucide-react";
import { prisma } from "@/lib/db/prisma";

export default async function FacultyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireFacultyOrAdmin();

  const pendingApprovalsCount = await prisma.registration.count({
    where: {
      event: { organizerId: user.id },
      paymentStatus: "PENDING",
      status: "CONFIRMED",
    },
  });

  const links = [
    { name: "Faculty Overview", href: "/dashboard/faculty", icon: LayoutDashboard },
    { name: "Create New Event", href: "/dashboard/faculty/events/create", icon: PlusCircle },
    { name: "Payment Approvals", href: "/dashboard/faculty/approvals", icon: CheckCircle, badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined },
    { name: "Direct Register Student", href: "/dashboard/faculty/register-student", icon: UserPlus },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950">
      <DashboardNav />
      <div className="max-w-7xl mx-auto w-full flex flex-1">
        <DashboardSidebar title="Faculty Coordinator" links={links} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
