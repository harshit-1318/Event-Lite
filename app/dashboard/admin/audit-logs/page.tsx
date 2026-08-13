import { requireAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { AuditLogTable } from "@/components/dashboard/admin";
import { ShieldAlert } from "lucide-react";

export default async function AdminAuditLogsPage() {
  await requireAdmin();

  const logs = await prisma.auditLog.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" /> Security & Compliance
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Security Audit Log</h1>
        <p className="text-xs text-slate-500">Immutable trace of authentication, permissions, and administrative events.</p>
      </div>

      <AuditLogTable logs={logs as any} />
    </div>
  );
}
