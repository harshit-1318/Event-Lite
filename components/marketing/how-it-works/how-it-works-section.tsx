import React from "react";
import { HOW_IT_WORKS_STEPS } from "./how-it-works-data";
import { HowItWorksCard } from "./how-it-works-card";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HowItWorksSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" /> Frictionless Campus Experience
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          How EventElite Powers Your Campus Life
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          From discovery to gate check-in and certificate collection — zero queues, zero paperwork.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <HowItWorksCard key={step.step} {...step} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Explore all upcoming campus events <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
