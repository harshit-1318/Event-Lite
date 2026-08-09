import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/permissions/rbac";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/layout/user-menu";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sparkles, Search } from "lucide-react";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-slate-950 text-slate-300 text-[10px] py-1 px-4 sm:px-6 border-b border-slate-800 flex justify-between items-center">
        <span>DAV COLLEGE JALANDHAR • 106+ Years of Academic Excellence</span>
        <span className="hidden sm:inline text-slate-400">Principal Office: +91-181-2255641</span>
      </div>

      <nav className="glass-panel bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Event<span className="text-blue-600">Elite</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/events"
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl"
            >
              <Search className="w-3.5 h-3.5" /><span>Search...</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <NotificationBell />
                <UserMenu user={user as any} />
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login"><Button variant="ghost" size="sm" className="h-8 text-xs font-semibold">Sign In</Button></Link>
                <Link href="/register"><Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold">Register</Button></Link>
              </div>
            )}

            <MobileNav user={user} />
          </div>
        </div>
      </nav>
    </header>
  );
}
