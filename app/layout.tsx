import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://eventelite.davjalandhar.com"),
  title: {
    default: "EventElite — Campus Event Management Platform",
    template: "%s | EventElite DAV College",
  },
  description: "Official event discovery, registration & management portal for DAV College Jalandhar.",
  openGraph: {
    title: "EventElite — Campus Event Platform",
    description: "Discover workshops, hackathons, sports & cultural fests at DAV College.",
    url: "/",
    siteName: "EventElite",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventElite — Campus Event Platform",
    description: "Discover workshops, hackathons & fests at DAV College.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
