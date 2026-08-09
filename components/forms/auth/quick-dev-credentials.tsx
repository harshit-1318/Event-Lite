import React from "react";
import { Key } from "lucide-react";

interface QuickDevCredentialsProps {
  onSelect: (email: string, pass: string) => void;
}

export function QuickDevCredentials({ onSelect }: QuickDevCredentialsProps) {
  return (
    <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
          <Key className="w-3 h-3 text-blue-400" /> Dev Quick Fill:
        </span>
        <span className="text-[10px] text-slate-400">1-Click credentials</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <button
          type="button"
          onClick={() => onSelect("admin@eventelite.com", "Admin@12345")}
          className="px-2 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-[11px] font-medium text-red-300 transition-colors text-center"
        >
          👑 Admin
        </button>
        <button
          type="button"
          onClick={() => onSelect("faculty@eventelite.com", "Faculty@12345")}
          className="px-2 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-[11px] font-medium text-purple-300 transition-colors text-center"
        >
          👨‍🏫 Faculty
        </button>
        <button
          type="button"
          onClick={() => onSelect("student@eventelite.com", "Student@12345")}
          className="px-2 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-[11px] font-medium text-blue-300 transition-colors text-center"
        >
          🎓 Student
        </button>
      </div>
    </div>
  );
}
