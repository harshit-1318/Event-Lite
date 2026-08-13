import Link from "next/link";
import { Bell, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NotificationListProps {
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    link?: string | null;
    isRead: boolean;
    createdAt: Date | string;
  }>;
}

export function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No notifications yet</h4>
        <p className="text-xs text-slate-400 mt-1">You will receive updates on registrations and event approvals here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
            notif.isRead
              ? "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600"
              : "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/80"
          }`}
        >
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white">{notif.title}</h5>
              {!notif.isRead && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">{notif.message}</p>
            <span className="text-[10px] text-slate-400">
              {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
            </span>
          </div>

          {notif.link && (
            <Link href={notif.link} className="shrink-0 text-blue-600 hover:text-blue-700">
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
