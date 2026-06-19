// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "ZAMBOTODAY | Premium News Network",
  description:
    "Real-time global insights and regional wire updates on Startups, Politics, and Sports.",
};

const NAV_LINKS = [
  { href: "/", label: "Home", emoji: null, hoverClass: "hover:text-red-600" },
  { href: "/?cat=startups", label: "Startups", emoji: "🚀", hoverClass: "hover:text-blue-600" },
  { href: "/?cat=politics", label: "Politics", emoji: "🏛️", hoverClass: "hover:text-amber-700" },
  { href: "/?cat=sports", label: "Sports", emoji: "⚽", hoverClass: "hover:text-emerald-700" },
  { href: "/?cat=other", label: "More", emoji: null, hoverClass: "hover:text-neutral-900" },
];

const REGIONS = ["Nigeria", "India", "United Kingdom", "Africa Hubs", "Asia Regions"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#f8f9fa] text-neutral-900 antialiased min-h-screen flex flex-col`}
      >

        {/* ── LIVE TICKER BAR ── */}
        <div className="bg-black text-white py-1.5 px-3 sm:px-6 border-b border-neutral-800 font-mono overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-x-3 flex-wrap min-h-[22px]">

            {/* Live badge */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 font-bold font-sans tracking-widest text-[9px] sm:text-[10px] uppercase">
                Live
              </span>
            </div>

            {/* Coverage regions */}
            <div className="flex items-center gap-2 sm:gap-3 font-semibold text-neutral-400 uppercase tracking-widest text-[9px] sm:text-[10px] flex-wrap">
              <span className="hover:text-white transition-colors cursor-default">Nigeria</span>
              <span className="text-neutral-700 hidden sm:inline" aria-hidden>·</span>
              <span className="hover:text-white transition-colors cursor-default">India</span>
              <span className="text-neutral-700 hidden sm:inline" aria-hidden>·</span>
              <span className="hidden sm:inline hover:text-white transition-colors cursor-default">United Kingdom</span>
              <span className="hidden md:inline text-neutral-700" aria-hidden>·</span>
              <span className="hidden md:inline hover:text-white transition-colors cursor-default">Africa Hubs</span>
              <span className="hidden lg:inline text-neutral-700" aria-hidden>·</span>
              <span className="hidden lg:inline hover:text-white transition-colors cursor-default">Asia Regions</span>
            </div>

            {/* Timestamp */}
            <time
              className="text-neutral-500 text-[9px] sm:text-[10px] uppercase font-sans font-semibold tracking-widest flex-shrink-0 ml-auto sm:ml-0"
              suppressHydrationWarning
            >
              {new Date().toUTCString().slice(5, 16)} GMT
            </time>

          </div>
        </div>

        {/* ── STICKY HEADER ── */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Masthead */}
            <div className="flex items-center justify-center py-3 sm:py-5 border-b border-neutral-100">
              <Link
                href="/"
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-900 font-serif hover:text-red-700 transition-colors duration-200 leading-none"
              >
                ZAMBOTODAY
              </Link>
            </div>

            {/* Navigation */}
          <nav aria-label="Main navigation" className="w-full border-t border-neutral-100">
  <div className="overflow-x-auto scrollbar-none">
    <div className="min-w-max flex items-center gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 py-3 whitespace-nowrap">
      <Link
        href="/"
        className="flex-shrink-0 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-600 hover:text-red-600 transition-colors py-1"
      >
        Home
      </Link>

      <Link
        href="/?cat=startups"
        className="flex items-center gap-1 flex-shrink-0 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-600 hover:text-blue-600 transition-colors py-1"
      >
        <span aria-hidden>🚀</span>
        Startups
      </Link>

      <Link
        href="/?cat=politics"
        className="flex items-center gap-1 flex-shrink-0 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-600 hover:text-amber-700 transition-colors py-1"
      >
        <span aria-hidden>🏛️</span>
        Politics
      </Link>

      <Link
        href="/?cat=sports"
        className="flex items-center gap-1 flex-shrink-0 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-600 hover:text-emerald-700 transition-colors py-1"
      >
        <span aria-hidden>⚽</span>
        Sports
      </Link>

      <Link
        href="/?cat=other"
        className="flex-shrink-0 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-neutral-600 hover:text-neutral-900 transition-colors py-1"
      >
        More
      </Link>
    </div>
  </div>
</nav>
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-5 sm:py-8 flex-grow">
          {children}
        </main>

        {/* ── FOOTER ── */}
        <footer className="bg-neutral-900 text-neutral-400 text-xs py-8 sm:py-10 mt-auto border-t border-neutral-800 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Brand + tagline */}
            <div className="text-center space-y-3 mb-6 sm:mb-8">
              <p className="font-serif text-white font-bold tracking-wider text-base sm:text-lg">
                ZAMBOTODAY WIRE AGENCY
              </p>
              <div className="h-px w-12 bg-neutral-700 mx-auto" />
              <p className="max-w-xs sm:max-w-md mx-auto text-[11px] sm:text-xs text-neutral-500 leading-relaxed">
                Real-time global insights and regional wire updates on Startups, Politics, and Sports.
              </p>
            </div>

            {/* Footer nav links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8 mb-6 sm:mb-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Region badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8">
              {REGIONS.map((region) => (
                <span
                  key={region}
                  className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-600 border border-neutral-700 rounded px-2 py-0.5"
                >
                  {region}
                </span>
              ))}
            </div>

            {/* Divider + copyright */}
            <div className="h-px bg-neutral-800 mb-4 sm:mb-5" />
            <p
              className="text-center text-[10px] sm:text-[11px] text-neutral-600 leading-relaxed"
              suppressHydrationWarning
            >
              © {new Date().getFullYear()} Zambotoday Media Group. All rights reserved.
            </p>

          </div>
        </footer>

      </body>
    </html>
  );
}