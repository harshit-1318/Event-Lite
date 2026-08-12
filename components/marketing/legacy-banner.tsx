import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, Award, Sparkles } from "lucide-react";

export function LegacyBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-950 via-indigo-950 to-slate-900 border border-slate-800/80 p-8 sm:p-12 text-white shadow-2xl space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/15 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>DAV College Jalandhar • Established 1918 • NAAC A+</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Award className="w-4 h-4 text-amber-400" /> 106+ Years of Academic Excellence
          </div>
        </div>

        <div className="space-y-3 max-w-3xl text-left">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Building Leaders, Innovators & Champions Since 1918
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            From historic national symposiums to AI hackathons and cultural youth festivals, DAV College continues to pioneer educational excellence across Northern India.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/about">
            <Button className="bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-2xl h-11 px-6 text-xs shadow-xl cursor-pointer">
              Explore DAV Legacy <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
          <Link href="/past-events">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl h-11 px-6 text-xs font-bold backdrop-blur-sm cursor-pointer shadow-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              Browse Flashback Archive
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
