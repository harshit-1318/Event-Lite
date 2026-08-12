import React from "react";
import { Phone, Shield, ExternalLink } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800/80 flex justify-between items-center tracking-wide">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-bold text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          DAV COLLEGE JALANDHAR
        </span>
        <span className="hidden md:inline text-slate-400">• 106+ Years of Excellence</span>
        <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
          <Shield className="w-2.5 h-2.5" /> NAAC A+
        </span>
      </div>

      <div className="flex items-center gap-4 text-slate-400 text-[10px]">
        <a href="tel:+911812255641" className="hidden sm:flex items-center gap-1 hover:text-white transition-colors">
          <Phone className="w-3 h-3 text-blue-400" /> +91-181-2255641
        </a>
        <a href="https://www.davjalandhar.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
          <span>Official Portal</span> <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}
