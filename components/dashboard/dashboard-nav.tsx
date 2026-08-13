import Link from "next/link";
import { getCurrentUser } from "@/lib/permissions/rbac";
import { UserMenu } from "@/components/layout/user-menu";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { Sparkles, ArrowLeft } from "lucide-react";

export async function DashboardNav() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              Event<span className="text-blue-600">Elite</span>
            </span>
          </Link>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/events"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Public Events Portal
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <NotificationBell />
              <UserMenu user={user as any} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
