import React from "react";
import { getCurrentUser } from "@/lib/permissions/rbac";
import { TopBar } from "./nav/top-bar";
import { NavLogo } from "./nav/nav-logo";
import { NavLinks } from "./nav/nav-links";
import { NavSearchButton } from "./nav/nav-search-button";
import { NavActions } from "./nav/nav-actions";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      <TopBar />
      <nav className="glass-panel bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <NavLogo />
            <NavLinks />
          </div>

          <div className="flex items-center gap-3">
            <NavSearchButton />
            <NavActions user={user} />
          </div>
        </div>
      </nav>
    </header>
  );
}
