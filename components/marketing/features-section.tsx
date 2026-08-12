import React from "react";
import { BENTO_FEATURES } from "./bento/bento-features-data";
import { BentoFeatureCard } from "./bento/bento-feature-card";
import { Sparkles } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" /> Built for DAV Campus Life
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Everything Engineered for Campus Events
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          An integrated platform engineered to simplify event registration, attendance tracking, and certificate distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {BENTO_FEATURES.map((feat) => (
          <BentoFeatureCard key={feat.id} {...feat} />
        ))}
      </div>
    </section>
  );
}
