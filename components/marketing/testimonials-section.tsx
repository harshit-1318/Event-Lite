import React from "react";
import { Star, ShieldCheck, Sparkles } from "lucide-react";

const REVIEWS = [
  {
    quote: "EventElite made enrolling in TechVishwa and accessing our team badges completely seamless. No paperwork, just instant QR check-in!",
    name: "Rohan Sharma",
    role: "B.Tech CSE '26",
    badge: "Hackathon Winner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  },
  {
    quote: "Managing 500+ registrations for DAV Virasat youth festival was effortlessly coordinated. Real-time capacity tracking saved our team days of work.",
    name: "Dr. Ananya Verma",
    role: "Faculty Coordinator",
    badge: "Cultural Affairs Dept.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  },
  {
    quote: "Receiving verified digital certificates directly on my student portal helped me build my portfolio for campus placements.",
    name: "Simran Kaur",
    role: "B.Sc IT '25",
    badge: "Student Council Member",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
  },
];

export function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" /> Campus Voices
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">Loved by Students & Faculty</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 text-left"
          >
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                &ldquo;{rev.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/30" />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.name}</h4>
                  <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-[11px] text-slate-500">{rev.role} • <span className="text-blue-600 dark:text-blue-400 font-medium">{rev.badge}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
