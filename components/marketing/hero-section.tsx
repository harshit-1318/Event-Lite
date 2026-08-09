import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  user: any;
  totalEventsCount: number;
  totalStudentsCount: number;
}

export function HeroSection({ user, totalEventsCount, totalStudentsCount }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-linear-to-tr from-blue-600/15 via-indigo-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>The Official Event Ecosystem of DAV College Jalandhar</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
          Where Campus Excellence Meets{" "}
          <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Extraordinary Events
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Discover hackathons, AI bootcamps, cultural fests, research seminars, and athletic championships. Seamlessly register and manage student passes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/events">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25">
              Explore Upcoming Events <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          {!user ? (
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold">
                Create Student Account
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard/student">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold">
                Access Dashboard
              </Button>
            </Link>
          )}
        </div>

        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left">
            <div className="text-2xl font-black text-slate-900 dark:text-white">{totalEventsCount}+</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Campus Events</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left">
            <div className="text-2xl font-black text-blue-600">{totalStudentsCount}+</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Active Students</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left">
            <div className="text-2xl font-black text-emerald-600">98%</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Participation Rate</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left">
            <div className="text-2xl font-black text-purple-600">106+</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Years of Heritage</div>
          </div>
        </div>
      </div>
    </section>
  );
}
