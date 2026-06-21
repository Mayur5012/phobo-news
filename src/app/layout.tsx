// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "ZAMBOTODAY | Premium News Network",
  description: "Real-time global insights and regional wire updates on Startups, Politics, and Sports.",
};

const NAV_LINKS = [
  { href: "/", label: "Home", emoji: null },
  { href: "/category/startups", label: "Startups", emoji: "🚀" },
  { href: "/category/politics", label: "Politics", emoji: "🏛️" },
  { href: "/category/sports", label: "Sports", emoji: "⚽" },
  { href: "/category/technology", label: "Technology", emoji: "💻" },
  { href: "/archives", label: "Archives", emoji: "🗄️" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#fcfcfc] text-neutral-950 antialiased min-h-screen flex flex-col`} suppressHydrationWarning>

        {/* ── LIVE DATA WIRE MATRIX BAR ── */}
        <div className="bg-[#CC0000] text-white py-1.5 px-4 font-mono select-none overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-x-3 text-[10px] font-bold tracking-wider">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span className="uppercase text-white">LIVE WIRE</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 uppercase text-white/90">
              <span>NIGERIA</span><span className="text-white/30">|</span>
              <span>INDIA</span><span className="text-white/30">|</span>
              <span>UK</span><span className="text-white/30">|</span>
              <span>AFRICA</span><span className="text-white/30">|</span>
              <span>ASIA</span>
            </div>

            <time className="text-white/80 uppercase tracking-widest text-[9px]" suppressHydrationWarning>
              {new Date().toUTCString().slice(5, 16)} GMT
            </time>
          </div>
        </div>

        {/* ── DENSE EDITORIAL MASTHEAD & ROUTING ENGINE ── */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 w-full shadow-xs">
          <div className="max-w-7xl mx-auto">
            
            {/* Dynamic Typography Brand Head */}
            <div className="flex items-center justify-center py-4 md:py-5 border-b border-neutral-100 px-4">
              <Link href="/" className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tighter text-neutral-900 hover:text-[#CC0000] transition-colors leading-none select-none">
                ZAMBOTODAY
              </Link>
            </div>

            {/* Seamless Horizontally Swipable Navigation Bar */}
            <nav aria-label="Primary Wire Desks" className="w-full bg-white overflow-x-auto scrollbar-none">
              <div className="flex justify-start md:justify-center items-center gap-x-6 sm:gap-x-8 px-4 py-2.5 min-w-max mx-auto text-neutral-600">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-[11px] sm:text-xs font-black uppercase tracking-wider hover:text-[#CC0000] transition-colors flex-shrink-0 flex items-center gap-1.5 py-0.5 border-b-2 border-transparent hover:border-[#CC0000]"
                  >
                    {link.emoji && <span aria-hidden="true" className="text-xs">{link.emoji}</span>}
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

          </div>
        </header>

        {/* ── CENTRAL MATRIX CANVAS ── */}
        <main className="max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 flex-grow overflow-x-hidden">
          {children}
        </main>

        {/* ── HIGH-DENSITY EDITORIAL FOOTER ── */}
        <footer className="bg-neutral-900 text-neutral-400 text-xs py-8 mt-auto border-t border-neutral-800 w-full font-sans">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            
            <p className="font-serif text-white font-black tracking-tight text-lg sm:text-xl select-none">
              ZAMBOTODAY
            </p>
            
            <div className="h-[2px] w-8 bg-[#CC0000] mx-auto" />
            
            {/* Clean dynamic segment loops */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] uppercase font-bold tracking-wider">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="text-neutral-600 text-[10px] tracking-wider uppercase font-mono" suppressHydrationWarning>
              © {new Date().getFullYear()} ZAMBOTODAY MEDIA GROUP. ALL RIGHTS RESERVED.
            </p>
            
          </div>
        </footer>

      </body>
    </html>
  );
}