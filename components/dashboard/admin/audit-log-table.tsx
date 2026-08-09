import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ShieldCheck } from "lucide-react";

interface AuditLogTableProps {
  logs: Array<{
    id: string;
    action: string;
    entity: string;
    entityId?: string | null;
    createdAt: Date | string;
    user?: { name: string; email: string } | null;
  }>;
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  if (logs.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
        No audit log records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-xs text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="p-3.5">Timestamp</th>
            <th className="p-3.5">Actor</th>
            <th className="p-3.5">Action Executed</th>
            <th className="p-3.5">Entity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
              <td className="p-3.5 text-slate-400">
                {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
              </td>
              <td className="p-3.5 font-sans font-semibold text-slate-800 dark:text-slate-200">
                {log.user?.name || "System"} ({log.user?.email || "internal"})
              </td>
              <td className="p-3.5">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold">
                  {log.action}
                </span>
              </td>
              <td className="p-3.5 text-slate-500">{log.entity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
