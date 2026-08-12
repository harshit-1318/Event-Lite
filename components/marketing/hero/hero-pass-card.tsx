"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroPassFloatingBadges } from "./hero-pass-floating-badges";
import { PASS_PRESETS } from "./hero-pass-types";
import { QrCode, Calendar, MapPin, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function HeroPassCard() {
  const [activeTab, setActiveTab] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ d: "04", h: "18", m: "32", s: "45" });
  const current = PASS_PRESETS[activeTab];

  useEffect(() => {
    const timer = setInterval(() => {
      const sec = Math.floor((Date.now() / 1000) % 60);
      setTimeLeft({ d: "04", h: "18", m: "32", s: String(59 - sec).padStart(2, "0") });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative group w-full max-w-md mx-auto">
      <HeroPassFloatingBadges />
      <div className="flex justify-center gap-1.5 mb-2.5 bg-slate-200/60 dark:bg-slate-900/60 backdrop-blur-md p-1 rounded-2xl border border-slate-300/40 dark:border-white/10 w-fit mx-auto">
        {PASS_PRESETS.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
              activeTab === idx
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm scale-105"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {p.id.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="relative rounded-3xl p-0.5 bg-linear-to-tr from-blue-600 via-indigo-500 to-purple-600 shadow-2xl shadow-blue-500/20 transition-all duration-300 group-hover:scale-[1.01]">
        <div className="rounded-[23px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl p-6 text-slate-900 dark:text-white space-y-3.5 text-left border border-slate-200/60 dark:border-white/10">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-600/30 border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-black tracking-wider text-slate-800 dark:text-slate-200">DAV SMART PASS</div>
                <div className="text-[9px] text-slate-500 font-mono">{current.code}</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              {current.badge}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">{current.category}</span>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white transition-colors">{current.title}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-2.5 rounded-2xl border border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-1.5 truncate"><Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" /> {current.date}</div>
            <div className="flex items-center gap-1.5 truncate"><MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" /> {current.venue}</div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 border border-blue-200/80 dark:border-blue-800/40">
            <div className="space-y-0.5">
              <div className="text-[9px] text-slate-500 uppercase font-semibold">Live Gate Opens In</div>
              <div className="font-mono text-xs sm:text-sm font-black text-blue-600 dark:text-amber-300">
                {timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm border border-slate-200/80 dark:border-none relative overflow-hidden">
              <QrCode className="w-full h-full text-slate-950" />
              <div className="absolute inset-x-0 h-0.5 bg-blue-500 animate-pulse top-1/2" />
            </div>
          </div>

          <Link href={`/events/${current.slug}`} className="block pt-0.5">
            <Button size="sm" className={`w-full bg-linear-to-r ${current.color} text-white font-bold rounded-xl text-xs h-10 shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all`}>
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Claim E-Pass ({current.fee}) <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
