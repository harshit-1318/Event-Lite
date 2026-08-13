"use client";

import { useTransition } from "react";
import { updatePaymentStatusAction } from "@/actions/registration.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface ApprovalTableProps {
  registrations: Array<{
    id: string;
    paymentStatus: string;
    registeredAt: Date | string;
    user: { name: string; email: string; rollNo?: string | null; department?: string | null };
    event: { title: string; fee: any };
  }>;
}

export function ApprovalTable({ registrations }: ApprovalTableProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdate = (id: string, status: "PAID" | "REJECTED") => {
    startTransition(async () => {
      const res = await updatePaymentStatusAction({ registrationId: id, status });
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  if (registrations.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
        No pending student payments to review.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-xs text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="p-3.5">Student Details</th>
            <th className="p-3.5">Event & Fee</th>
            <th className="p-3.5">Status</th>
            <th className="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {registrations.map((reg) => (
            <tr key={reg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
              <td className="p-3.5">
                <p className="font-bold text-slate-900 dark:text-white">{reg.user.name}</p>
                <p className="text-[11px] text-slate-400 font-mono">Roll: {reg.user.rollNo || "N/A"} • {reg.user.email}</p>
              </td>
              <td className="p-3.5">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{reg.event.title}</p>
                <p className="text-[11px] text-blue-600 font-bold">₹{Number(reg.event.fee)}</p>
              </td>
              <td className="p-3.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-700 uppercase">
                  {reg.paymentStatus}
                </span>
              </td>
              <td className="p-3.5 text-right space-x-1.5">
                <Button size="sm" onClick={() => handleUpdate(reg.id, "PAID")} disabled={isPending} className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs">
                  <Check className="w-3.5 h-3.5 mr-1" /> Approve
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleUpdate(reg.id, "REJECTED")} disabled={isPending} className="h-8 text-red-500 hover:bg-red-50 rounded-xl text-xs">
                  <X className="w-3.5 h-3.5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
