import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Calendar, MapPin, Trophy, ArrowRight } from "lucide-react";

export function HeroSpotlightCard() {
  return (
    <div className="relative group max-w-xl mx-auto w-full text-left rounded-3xl p-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-xl shadow-blue-500/10">
      <div className="rounded-[22px] bg-slate-950/90 backdrop-blur-xl p-5 text-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            FLAGSHIP ANNUAL EVENT
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
            <Trophy className="w-3.5 h-3.5" /> ₹1,00,000+ Prize Pool
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
            TechVishwa 2026: AI & Web3 National Hackathon
          </h3>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2">
            36-Hour continuous hackathon bringing together 150+ student teams to solve real-world industry AI challenges.
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-white/10">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-blue-400" /> In 5 Days</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-purple-400" /> Science Auditorium</span>
          <span className="font-bold text-white bg-blue-600/60 px-2 py-0.5 rounded-md">Pass ₹250</span>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>Registration Slots</span>
            <span className="text-amber-300">112 / 150 Filled (75%)</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-blue-500 to-amber-400 rounded-full w-3/4" />
          </div>
        </div>

        <Link href="/events/techvishwa-2026-ai-web3-hackathon" className="block pt-1">
          <Button size="sm" className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs h-9">
            Claim Your Hackathon Pass <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
