import { Trophy, ShieldCheck, Flame } from "lucide-react";

export function HeroPassFloatingBadges() {
  return (
    <>
      <div className="absolute -top-3 -right-2 sm:-right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500 text-slate-950 text-xs font-black shadow-xl shadow-amber-500/25 animate-bounce">
        <Trophy className="w-3.5 h-3.5 fill-slate-950" />
        <span>₹1.5L+ Cash Prizes</span>
      </div>

      <div className="absolute -bottom-3.5 -left-2 sm:-left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-xl">
        <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
        <span>112 / 150 Slots Booked</span>
      </div>

      <div className="absolute -bottom-3.5 -right-2 sm:-right-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/25">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Live E-Ticket</span>
      </div>
    </>
  );
}
