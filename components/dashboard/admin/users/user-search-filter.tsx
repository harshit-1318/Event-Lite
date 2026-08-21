import { Search, Filter, ShieldCheck, School, GraduationCap, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Role } from "@prisma/client";

interface UserSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: "ALL" | Role;
  onRoleFilterChange: (role: "ALL" | Role) => void;
  statusFilter: "ALL" | "ACTIVE" | "INACTIVE";
  onStatusFilterChange: (status: "ALL" | "ACTIVE" | "INACTIVE") => void;
}

export function UserSearchFilter({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
}: UserSearchFilterProps) {
  const roleTabs: Array<{ id: "ALL" | Role; label: string; icon: any }> = [
    { id: "ALL", label: "All Roles", icon: Users },
    { id: "STUDENT", label: "Students", icon: GraduationCap },
    { id: "FACULTY", label: "Faculty", icon: School },
    { id: "ADMIN", label: "Admins", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          placeholder="Search by name, email, roll no, department..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 text-xs bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 rounded-xl"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
          {roleTabs.map((tab) => {
            const Icon = tab.icon;
            const active = roleFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onRoleFilterChange(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  active
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-3 h-3" /> {tab.label}
              </button>
            );
          })}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as any)}
          className="h-8 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active Only</option>
          <option value="INACTIVE">Deactivated</option>
        </select>
      </div>
    </div>
  );
}
