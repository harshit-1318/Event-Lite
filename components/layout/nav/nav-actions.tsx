import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/layout/user-menu";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sparkles } from "lucide-react";

interface NavActionsProps {
  user: any;
}

export function NavActions({ user }: NavActionsProps) {
  return (
    <div className="flex items-center gap-2.5">
      <ThemeToggle />
      {user ? (
        <div className="flex items-center gap-2">
          <NotificationBell />
          <UserMenu user={user as any} />
        </div>
      ) : (
        <div className="hidden sm:flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="h-9 text-xs font-bold rounded-xl px-3.5 hover:bg-slate-100 dark:hover:bg-slate-800">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="h-9 text-xs font-bold rounded-xl px-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02]">
              <Sparkles className="w-3 h-3 mr-1" />
              Register Pass
            </Button>
          </Link>
        </div>
      )}
      <MobileNav user={user} />
    </div>
  );
}
