import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function LegacyBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-linear-to-r from-slate-950 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white shadow-2xl space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-slate-200 border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>DAV College Jalandhar • Established 1918</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug max-w-2xl">
          A 106-Year Legacy of Academic Excellence & Student Leadership
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          From historic national symposiums to AI hackathons and cultural youth festivals, DAV College has nurtured generations of scholars and innovators.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/about">
            <Button className="bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl h-10 px-5 text-xs">
              Learn About Our Legacy
            </Button>
          </Link>
          <Link href="/past-events">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-xl h-10 px-5 text-xs">
              Past Flashbacks
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
