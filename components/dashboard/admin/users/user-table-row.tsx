import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Info, Shield, School, GraduationCap } from "lucide-react";
import { ModalUserData } from "./user-details-modal";

interface UserTableRowProps {
  user: ModalUserData;
  isPending: boolean;
  onToggleStatus: (id: string) => void;
  onRoleChange: (id: string, role: Role) => void;
  onViewDetails: (user: ModalUserData) => void;
}

export function UserTableRow({
  user,
  isPending,
  onToggleStatus,
  onRoleChange,
  onViewDetails,
}: UserTableRowProps) {
  const roleBadgeStyle = {
    ADMIN: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    FACULTY: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    STUDENT: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  }[user.role];

  return (
    <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
      <td className="p-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-xs">{user.name}</p>
            <p className="text-[11px] text-slate-400">{user.email} {user.rollNo && `• ${user.rollNo}`}</p>
          </div>
        </div>
      </td>

      <td className="p-3.5">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${roleBadgeStyle}`}>
            {user.role}
          </span>
          <select
            value={user.role}
            onChange={(e) => onRoleChange(user.id, e.target.value as Role)}
            disabled={isPending}
            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-800 dark:text-slate-200 font-medium focus:ring-1 focus:ring-blue-500"
          >
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </td>

      <td className="p-3.5">
        <Badge variant={user.isActive ? "default" : "destructive"} className="text-[10px]">
          {user.isActive ? "ACTIVE" : "INACTIVE"}
        </Badge>
      </td>

      <td className="p-3.5 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onViewDetails(user)}
            className="h-7 w-7 p-0 rounded-lg text-slate-500 hover:text-blue-500"
            title="View user details"
          >
            <Info className="w-3.5 h-3.5" />
          </Button>

          <Button
            size="sm"
            variant={user.isActive ? "outline" : "default"}
            onClick={() => onToggleStatus(user.id)}
            disabled={isPending}
            className="h-7 px-2.5 text-[11px] rounded-lg"
          >
            {user.isActive ? (
              <><UserX className="w-3 h-3 mr-1 text-red-500" /> Deactivate</>
            ) : (
              <><UserCheck className="w-3 h-3 mr-1" /> Activate</>
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
}
