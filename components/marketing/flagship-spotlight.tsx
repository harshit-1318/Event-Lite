import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, Trophy, Calendar, ArrowRight, Sparkles, Music2, Users } from "lucide-react";

export function FlagshipSpotlight() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-950 via-indigo-950 to-slate-950 border border-blue-800/40 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                ANNUAL CULTURAL MEGA-FEST
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                <Trophy className="w-3.5 h-3.5" /> ₹1,50,000+ Prize Pool
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              DAV Virasat 2026: Youth Cultural Fest & Championship
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-normal">
              Experience 25+ inter-college competitions in Bhangra, Giddha, Classical Drama, Visual Arts, and live celebrity concerts at the Open Air Theatre.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-2">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-400" /> 3-Day Grand Festival (Sep 2026)</span>
              <span className="flex items-center gap-1.5"><Music2 className="w-4 h-4 text-purple-400" /> Live Star Night Concert</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> 500+ Inter-College Teams</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link href="/events/dav-virasat-2026-youth-cultural-fest" className="w-full">
              <Button size="lg" className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl h-12 shadow-xl shadow-amber-500/20 cursor-pointer">
                <Sparkles className="w-4 h-4 mr-1.5" />
                Claim Fest Pass (₹100) <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/past-events" className="w-full">
              <Button size="lg" className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl h-12 text-xs font-bold backdrop-blur-sm cursor-pointer shadow-sm">
                Explore Fest Archives
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
