// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShieldAlert, Radio } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHRONICLE | Premium News Agency",
  description: "Real-time global insights on Startups, Politics, and Sports.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f8f9fa] text-neutral-900 antialiased`}>
        {/* Top Ticker Bar */}
        <div className="bg-black text-white text-xs py-2 px-4 border-b border-neutral-800 tracking-wider font-semibold uppercase flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-red-500 font-bold">LIVE</span>
            <span className="text-neutral-400">Market Indexes Normalizing Across Global Desks</span>
          </div>
          <Link href="/admin" className="flex items-center gap-1 text-neutral-400 hover:text-white transition">
            <ShieldAlert size={14} /> Admin Terminal
          </Link>
        </div>

        {/* Main Editorial Header */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-5 border-b border-neutral-100">
              <Link href="/" className="text-3xl font-black tracking-tighter text-neutral-900 md:text-4xl mx-auto font-serif">
                THE CHRONICLE
              </Link>
            </div>
            
            {/* 80% Heavily Weighted Editorial Categories */}
            <nav className="flex justify-center space-x-8 py-3 text-xs font-bold tracking-widest uppercase text-neutral-600 overflow-x-auto">
              <Link href="/" className="hover:text-red-600 transition">Home</Link>
              <Link href="/?cat=startups" className="hover:text-red-600 transition text-blue-600">🚀 Startups</Link>
              <Link href="/?cat=politics" className="hover:text-red-600 transition text-amber-700">🏛️ Politics</Link>
              <Link href="/?cat=sports" className="hover:text-red-600 transition text-emerald-700">⚽ Sports</Link>
              <Link href="/?cat=other" className="hover:text-red-600 transition text-neutral-400">More</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

        <footer className="bg-neutral-900 text-neutral-400 text-xs py-8 mt-12 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
            <p className="font-serif text-white font-bold tracking-wider">THE CHRONICLE AGENCY</p>
            <p>© {new Date().getFullYear()} Chronicle Media Group. Non-commercial layout mimicking international wire standards.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}