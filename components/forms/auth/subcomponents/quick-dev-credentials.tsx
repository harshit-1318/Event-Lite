"use client";

import { Key, Sparkles, Shield, User, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface QuickDevCredentialsProps {
  onSelect: (email: string, pass: string, roleName: string) => void;
}

export function QuickDevCredentials({ onSelect }: QuickDevCredentialsProps) {
  const roles = [
    { label: "Admin", email: "admin@eventelite.com", pass: "Admin@12345", icon: Shield, color: "text-rose-500 hover:border-rose-500/40 hover:bg-rose-500/10 dark:hover:bg-rose-500/15" },
    { label: "Faculty", email: "faculty@eventelite.com", pass: "Faculty@12345", icon: User, color: "text-purple-500 hover:border-purple-500/40 hover:bg-purple-500/10 dark:hover:bg-purple-500/15" },
    { label: "Student", email: "student@eventelite.com", pass: "Student@12345", icon: GraduationCap, color: "text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/10 dark:hover:bg-blue-500/15" },
  ];

  const handleSelect = (email: string, pass: string, label: string) => {
    onSelect(email, pass, label);
    toast.success(`Demo ${label} Account Loaded!`, {
      description: `Loaded: ${email}`,
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    });
  };

  return (
    <div className="p-2.5 rounded-2xl bg-slate-100/70 dark:bg-slate-850/60 border border-slate-200/90 dark:border-slate-800 backdrop-blur-md space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Key className="w-3 h-3 text-blue-500" /> 1-Click Fast Demo Login
        </span>
        <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Auto Fill
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.label}
              type="button"
              onClick={() => handleSelect(r.email, r.pass, r.label)}
              className={`py-1.5 px-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs cursor-pointer ${r.color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
