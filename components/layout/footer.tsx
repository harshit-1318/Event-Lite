import React from "react";
import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white">Event<span className="text-blue-500">Elite</span></span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">Official event ecosystem for DAV College Jalandhar.</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              {NAV_LINKS.map((l) => (<li key={l.name}><Link href={l.href} className="hover:text-blue-400">{l.name}</Link></li>))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Categories</h4>
            <ul className="space-y-1.5 text-xs">
              {CATEGORIES.slice(0, 4).map((c) => (<li key={c.slug}><Link href={`/events?category=${c.slug}`} className="hover:text-blue-400">{c.name}</Link></li>))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Contact</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" /><span>GT Road, Jalandhar 144008</span></li>
              <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" /><span>+91-181-2255641</span></li>
              <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" /><a href="mailto:principal@davjalandhar.com" className="hover:text-white">principal@davjalandhar.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 DAV College Jalandhar. All rights reserved.</p>
          <a href="https://www.davjalandhar.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 inline-flex items-center gap-1">
            Official Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
