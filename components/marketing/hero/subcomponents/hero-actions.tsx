import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, QrCode, LayoutDashboard } from "lucide-react";

interface HeroActionsProps {
  user: any;
}

export function HeroActions({ user }: HeroActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
      <Link href="/events">
        <Button size="lg" className="w-full sm:w-auto h-12 px-7 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] cursor-pointer">
          <Compass className="w-4 h-4 mr-2" />
          Explore Events <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </Link>
      {!user ? (
        <Link href="/register">
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-7 rounded-2xl font-bold border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
            <QrCode className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
            Get Smart Pass
          </Button>
        </Link>
      ) : (
        <Link href="/dashboard/student">
          <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 px-7 rounded-2xl font-bold border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer">
            <LayoutDashboard className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
            Access Dashboard
          </Button>
        </Link>
      )}
    </div>
  );
}
