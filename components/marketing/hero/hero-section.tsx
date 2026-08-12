import React from "react";
import { HeroLeftContent } from "./hero-left-content";
import { HeroPassCard } from "./hero-pass-card";
import { HeroStats } from "./hero-stats";

interface HeroSectionProps {
  user: any;
  totalEventsCount: number;
  totalStudentsCount: number;
}

export function HeroSection({ user, totalEventsCount, totalStudentsCount }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-12 lg:pb-16">
      <div className="absolute inset-0 bg-dot-grid opacity-60 dark:opacity-20 -z-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-140 bg-radial from-blue-600/20 via-indigo-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <HeroLeftContent user={user} />
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <HeroPassCard />
          </div>
        </div>

        <HeroStats totalEventsCount={totalEventsCount} totalStudentsCount={totalStudentsCount} />
      </div>
    </section>
  );
}
