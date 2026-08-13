import { requireAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { UserTable } from "@/components/dashboard/admin";
import { Users } from "lucide-react";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold">
          <Users className="w-3.5 h-3.5" /> Identity & Access
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">User Directory & RBAC</h1>
        <p className="text-xs text-slate-500">Manage user accounts, assign faculty/admin privileges, or deactivate profiles.</p>
      </div>

      <UserTable users={users as any} />
    </div>
  );
}
