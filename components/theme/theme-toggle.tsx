"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, ThemeMode } from "./theme-utils";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const val = (e.newValue as ThemeMode) || "light";
        setTheme(val);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme, e);
  };

  if (!mounted) {
    return <div className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800" />;
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 group focus:outline-hidden"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme mode"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 text-amber-500 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 text-indigo-400 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
