"use client";

import React, { useTransition } from "react";
import { toggleUserStatusAction, changeUserRoleAction } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UserCheck, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";

interface UserTableProps {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: Role;
    rollNo?: string | null;
    isActive: boolean;
  }>;
}

export function UserTable({ users }: UserTableProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = (id: string) => {
    startTransition(async () => {
      const res = await toggleUserStatusAction(id);
      if (res.success) { toast.success(res.message); router.refresh(); }
      else toast.error(res.message);
    });
  };

  const handleRole = (id: string, role: Role) => {
    startTransition(async () => {
      const res = await changeUserRoleAction(id, role);
      if (res.success) { toast.success(res.message); router.refresh(); }
      else toast.error(res.message);
    });
  };

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-xs text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="p-3.5">User Identity</th>
            <th className="p-3.5">Role</th>
            <th className="p-3.5">Status</th>
            <th className="p-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50/50">
              <td className="p-3.5">
                <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                <p className="text-[11px] text-slate-400">{u.email} {u.rollNo && `• ${u.rollNo}`}</p>
              </td>
              <td className="p-3.5">
                <select value={u.role} onChange={(e) => handleRole(u.id, e.target.value as Role)} disabled={isPending} className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px]">
                  <option value="STUDENT">STUDENT</option>
                  <option value="FACULTY">FACULTY</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
              <td className="p-3.5"><Badge variant={u.isActive ? "default" : "destructive"} className="text-[10px]">{u.isActive ? "ACTIVE" : "INACTIVE"}</Badge></td>
              <td className="p-3.5 text-right">
                <Button size="sm" variant={u.isActive ? "outline" : "default"} onClick={() => handleToggle(u.id)} disabled={isPending} className="h-8 text-xs rounded-xl">
                  {u.isActive ? <><UserX className="w-3.5 h-3.5 mr-1 text-red-500" /> Deactivate</> : <><UserCheck className="w-3.5 h-3.5 mr-1" /> Activate</>}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
