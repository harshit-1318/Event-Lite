import React from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Campus Desk — EventElite",
  description: "Contact the DAV College Jalandhar event management team and support desk.",
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Contact & Support</h1>
        <p className="text-xs sm:text-sm text-slate-500">Need assistance with event registration or departmental coordination? We are here to help.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Send an Inquiry</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Your Name</Label>
              <Input placeholder="Aarav Patel" className="h-10 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Email Address</Label>
              <Input type="email" placeholder="student@eventelite.com" className="h-10 text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Message</Label>
              <Textarea placeholder="How can we assist you with event participation?" className="text-xs min-h-[80px]" />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 text-xs">
              <Send className="w-3.5 h-3.5 mr-1" /> Send Message
            </Button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Campus Information</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Mahatma Hans Raj Marg, GT Road, Jalandhar, Punjab 144008</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91-181-2255641, 42, 43</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>principal@davjalandhar.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Monday – Saturday: 09:00 AM – 05:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-300">
            For urgent event enrollment verification, visit the Student Affairs Office (Admin Block, 1st Floor).
          </div>
        </div>
      </div>
    </div>
  );
}
