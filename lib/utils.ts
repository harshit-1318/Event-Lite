import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely with clsx and twMerge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in INR (₹)
 */
export function formatCurrency(amount: number | string | { toString(): string }): string {
  const num = typeof amount === "number" ? amount : parseFloat(amount.toString());
  if (isNaN(num) || num === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format date in readable format (e.g. "Oct 15, 2026")
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

/**
 * Format date range (e.g. "Oct 15, 2026 - Oct 17, 2026")
 */
export function formatDateRange(startDate: Date | string, endDate: Date | string): string {
  const s = typeof startDate === "string" ? new Date(startDate) : startDate;
  const e = typeof endDate === "string" ? new Date(endDate) : endDate;
  
  if (s.toDateString() === e.toDateString()) {
    return formatDate(s);
  }
  return `${formatDate(s)} – ${formatDate(e)}`;
}

/**
 * Generate slug from string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
