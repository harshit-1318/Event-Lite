import { requireAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { UserManagementClient } from "@/components/dashboard/admin";
import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Directory & RBAC Control — Admin Portal",
  description: "Manage accounts, grant faculty/admin permissions, and control access.",
};

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      rollNo: true,
      studentClass: true,
      department: true,
      fatherName: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> Identity, Access & Role Control
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">User Directory & RBAC</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Assign faculty/admin privileges, toggle account access, or inspect user profile details.
        </p>
      </div>

      <UserManagementClient initialUsers={users} />
    </div>
  );
}
