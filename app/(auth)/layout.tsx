import type { ReactNode } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen h-dvh max-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-between py-3 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 selection:bg-blue-500/30">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-112.5 h-112.5 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-112.5 h-112.5 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none opacity-70" />

      {/* Top Header Bar */}
      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="flex justify-between items-center mb-1.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </span>
          </div>
        </div>

        <div className="text-center mb-1.5">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-8.5 h-8.5 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-all">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Event<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Elite</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Main Glass Card Container */}
      <div className="w-full max-w-md mx-auto relative z-10 my-auto py-1">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 via-indigo-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />
          <div className="relative bg-white/90 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 p-5 sm:p-5.5 shadow-2xl rounded-2xl">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-t-2xl" />
            {children}
          </div>
        </div>
      </div>

      {/* Bottom Footer Trust Indicators */}
      <div className="w-full max-w-md mx-auto text-center space-y-1 relative z-10 pt-0.5 pb-1">
        <div className="flex items-center justify-center gap-3 text-[10.5px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> DAV RBAC Verified
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-blue-500" /> 256-Bit SSL Encrypted
          </span>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          © 2026 EventElite — DAV College Jalandhar. All rights reserved.
        </p>
      </div>
    </div>
  );
}
