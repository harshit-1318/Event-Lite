import { HeroBadge } from "./hero-badge";
import { HeroHeading } from "./hero-heading";
import { HeroActions } from "./hero-actions";
import { HeroSearch } from "./hero-search";
import { Star } from "lucide-react";

interface HeroLeftContentProps {
  user: any;
}

export function HeroLeftContent({ user }: HeroLeftContentProps) {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
  ];

  return (
    <div className="space-y-6 text-left max-w-2xl">
      <HeroBadge />
      <HeroHeading />
      <HeroActions user={user} />
      <HeroSearch />

      <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex -space-x-2">
          {avatars.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="DAV Student"
              className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-xs"
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span>
            <strong className="text-slate-900 dark:text-white font-bold">5,000+</strong> active campus participants
          </span>
        </div>
      </div>
    </div>
  );
}
