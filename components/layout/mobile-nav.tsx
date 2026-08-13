"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        className="rounded-xl"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 animate-in slide-in-from-top-4 duration-200 z-50">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  {link.name}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {!user ? (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white">
                    Register as Student <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </>
            ) : (
              <Link
                href={
                  user.role === "ADMIN"
                    ? "/dashboard/admin"
                    : user.role === "FACULTY"
                    ? "/dashboard/faculty"
                    : "/dashboard/student"
                }
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full justify-center bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                  <Sparkles className="w-4 h-4 mr-1.5" /> Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
