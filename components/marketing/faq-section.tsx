"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

const FAQS = [
  {
    q: "How do I register for an event and receive my entry pass?",
    a: "Browse upcoming events, select your desired event, and click Register. Upon confirmation, a unique encrypted QR smart pass is instantly generated in your Student Dashboard.",
  },
  {
    q: "Are DAV events open to external college students?",
    a: "Yes! Flagship events like TechVishwa Hackathon and DAV Virasat welcome participants from across Punjab and northern India universities.",
  },
  {
    q: "How do I claim my verified digital certificate?",
    a: "Once faculty coordinators mark your attendance at the venue via the scanner, your tamper-proof e-certificate will automatically appear in your portal under 'My Certificates'.",
  },
  {
    q: "Can I register as a team for hackathons and athletic meets?",
    a: "Yes! Team leads can register the squad and generate an invite code that teammates can join from their own student accounts.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 shadow-xs">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">Got Questions? We Have Answers</h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center text-xs text-slate-500">
        Have more questions?{" "}
        <Link href="/about" className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
          Contact Campus Helpdesk <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
}
