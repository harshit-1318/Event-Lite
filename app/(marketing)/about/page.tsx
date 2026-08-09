import React from "react";
import { ShieldCheck, Award, GraduationCap, Building2, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About EventElite & DAV College Jalandhar",
  description: "Learn about DAV College Jalandhar's 106-year educational legacy and EventElite ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <ShieldCheck className="w-3.5 h-3.5" /> Founded in 1918 • 106+ Years of Heritage
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          About DAV College & EventElite
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Nurturing intellect, leadership, athletic excellence, and cultural vibrancy across Punjab and Northern India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Academic Pioneer</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Ranked consistently among top collegiate institutions with NAAC A+ accreditation.</p>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <Award className="w-8 h-8 text-purple-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Youth Development</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Over 100+ annual championships, national hackathons, and youth festivals.</p>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <Building2 className="w-8 h-8 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">World-Class Campus</h3>
          <p className="text-xs text-slate-500 leading-relaxed">State-of-the-art auditoriums, tech incubation labs, and sports complexes.</p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-3 text-center">
        <h2 className="text-2xl font-bold">Empowering Student Engagement</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          EventElite V2 bridges faculty coordinators and thousands of eager student participants with transparent registration and real-time pass management.
        </p>
      </div>
    </div>
  );
}
