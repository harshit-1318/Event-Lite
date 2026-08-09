import React from "react";
import { requireFacultyOrAdmin } from "@/lib/permissions/rbac";
import { prisma } from "@/lib/db/prisma";
import { ApprovalTable } from "@/components/dashboard/faculty/approval-table";
import { CheckCircle } from "lucide-react";

export default async function FacultyApprovalsPage() {
  const user = await requireFacultyOrAdmin();

  const pendingRegistrations = await prisma.registration.findMany({
    where: {
      event: { organizerId: user.id },
      paymentStatus: "PENDING",
      status: "CONFIRMED",
    },
    include: {
      user: { select: { name: true, email: true, rollNo: true, department: true } },
      event: { select: { title: true, fee: true } },
    },
    orderBy: { registeredAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1 text-xs text-purple-600 font-semibold">
          <CheckCircle className="w-3.5 h-3.5" /> Verification Center
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Payment Approvals Queue</h1>
        <p className="text-xs text-slate-500">Review student fee payments for your department events and approve passes.</p>
      </div>

      <ApprovalTable registrations={pendingRegistrations as any} />
    </div>
  );
}
