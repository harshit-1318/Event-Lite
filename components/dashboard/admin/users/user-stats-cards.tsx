import { Users, GraduationCap, School, ShieldCheck, UserCheck } from "lucide-react";
import { Role } from "@prisma/client";

interface UserStatsProps {
  users: Array<{ role: Role; isActive: boolean }>;
}

export function UserStatsCards({ users }: UserStatsProps) {
  const total = users.length;
  const active = users.filter((u) => u.isActive).length;
  const students = users.filter((u) => u.role === "STUDENT").length;
  const faculty = users.filter((u) => u.role === "FACULTY").length;
  const admins = users.filter((u) => u.role === "ADMIN").length;

  const stats = [
    { label: "Total Accounts", value: total, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Active Users", value: active, icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Students", value: students, icon: GraduationCap, color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/20" },
    { label: "Faculty Organizers", value: faculty, icon: School, color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20" },
    { label: "Administrators", value: admins, icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{s.label}</span>
              <div className={`p-1.5 rounded-lg border ${s.bg}`}>
                <Icon className={`w-3.5 h-3.5 ${s.color}`} />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{s.value}</div>
          </div>
        );
      })}
    </div>
  );
}
