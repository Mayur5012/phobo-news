// src/app/archives/page.tsx
import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historical Archives & Document Registry | ZamboToday Archive",
  description: "Browse the newspaper archives and historical registries of ZamboToday. Access legacy reports, political chronicles, and local genealogies.",
  alternates: {
    canonical: "https://www.zambotoday.com/archives",
  },
  openGraph: {
    title: "Historical Archives & Document Registry | ZamboToday Archive",
    description: "Browse the newspaper archives and historical registries of ZamboToday. Access legacy reports, political chronicles, and local genealogies.",
    url: "https://www.zambotoday.com/archives",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Historical Archives & Document Registry | ZamboToday Archive",
    description: "Browse the newspaper archives and historical registries of ZamboToday. Access legacy reports, political chronicles, and local genealogies.",
  },
};

export default function ArchivesPage() {
  const canonicalUrl = "https://www.zambotoday.com/archives";

  // Breadcrumb schema for Archive Index
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.zambotoday.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Archives",
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="space-y-8 max-w-5xl mx-auto font-serif">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-sans">
          <Link href="/" className="hover:text-black transition-colors">HOME</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="text-neutral-900 font-bold">ARCHIVES</span>
        </nav>

        {/* Vintage Header */}
        <div className="text-center border-double border-y-4 border-neutral-900 py-6 space-y-2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tighter uppercase text-neutral-900">
            THE CHRONICLE ARCHIVE
          </h1>
          <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase font-sans">
            EST. 2012 — HISTORICAL PRESERVATION DIVISION — RETRIEVED BACKLINK PROFILE
          </p>
        </div>

        {/* Vintage Newspaper Layout Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Main Column - Primary Archives (8 columns) */}
          <div className="md:col-span-8 space-y-6 md:border-r border-neutral-200 md:pr-8">
            
            <div className="border-b border-neutral-900 pb-1">
              <h2 className="text-lg font-serif font-bold text-neutral-900 uppercase">
                Featured Documents
              </h2>
            </div>

            {/* Primary Document - Sulu Sultanate (Preserves key backlink) */}
            <article className="space-y-3 group border-b border-neutral-200 pb-6">
              <span className="bg-[#CC0000] text-white px-2 py-0.5 text-[8px] font-sans font-black uppercase tracking-widest block w-fit">
                Document #7439
              </span>
              <Link href="/archives/7439-Genealogy-of-Sultan-Sharif-Ul-Hashim-of-Sulu-Sultanate.html">
                <h3 className="text-2xl font-black text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-tight">
                  Genealogy of Sultan Sharif Ul-Hashim and the Origins of the Sulu Sultanate
                </h3>
              </Link>
              <p className="text-neutral-600 font-sans text-xs leading-relaxed">
                A historical study tracing the royal lineage of Sultan Sharif Ul-Hashim, founder of the Sulu Sultanate.
                Documents maritime diplomatic alliances and trade networks in 15th-century Southeast Asia.
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 font-sans">
                <span>Subject: Regional Genealogy</span>
                <span>Type: Full Text (HTML)</span>
              </div>
            </article>

            {/* Placeholder/Scalable Archives */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-900 uppercase tracking-tight">
                Chronological Newspaper Microfilms
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                
                <div className="border border-neutral-200 p-3 bg-neutral-50 hover:border-neutral-400 transition-colors">
                  <span className="font-mono text-[9px] text-[#CC0000] font-bold block">1998 - 2005 CATALOGUE</span>
                  <h4 className="font-bold text-neutral-800 mt-1">Pre-Digital Local Bulletins</h4>
                  <p className="text-neutral-500 text-[11px] mt-1 leading-normal">
                    Microfilm index logs representing weekly pamphlets printed in Zamboanga and regional offices.
                  </p>
                  <span className="text-[10px] text-neutral-400 font-mono mt-2 block">Pending Digital Reconstruction</span>
                </div>

                <div className="border border-neutral-200 p-3 bg-neutral-50 hover:border-neutral-400 transition-colors">
                  <span className="font-mono text-[9px] text-[#CC0000] font-bold block">2006 - 2012 CATALOGUE</span>
                  <h4 className="font-bold text-neutral-800 mt-1">Early Editorial Web Registers</h4>
                  <p className="text-neutral-500 text-[11px] mt-1 leading-normal">
                    Database backup of the initial blogging engine. Contains local political events and early sports wire briefs.
                  </p>
                  <span className="text-[10px] text-neutral-400 font-mono mt-2 block">Restructuring Ongoing</span>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column - Sidebar Context (4 columns) */}
          <aside className="md:col-span-4 space-y-6">
            
            <div className="border border-neutral-900 p-4 space-y-4 bg-[#fbfbf9]">
              <div className="border-b border-neutral-900 pb-1">
                <h3 className="text-xs font-sans font-black uppercase tracking-wider text-neutral-900">
                  ARCHIVAL RECORDS DIVISION
                </h3>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">
                The ZamboToday Archives project aims to recover and publish all historical records, newspaper columns, 
                and genealogies previously stored under legacy URLs of our domain.
              </p>
              <p className="text-[11px] text-neutral-600 leading-relaxed font-sans font-bold">
                If you hold backlink references or microfilms pointing to lost URLs, please report them to our webmaster desk.
              </p>
              <div className="pt-2 border-t border-neutral-200 font-mono text-[9px] text-neutral-400 font-sans">
                SYSTEM REGISTER STATUS: 100% OPERATIONAL
              </div>
            </div>

            <div className="border border-neutral-200 p-4 space-y-3 font-sans text-xs">
              <h4 className="font-bold text-neutral-900 uppercase">Crawl Index Status</h4>
              <ul className="space-y-1.5 text-neutral-500 font-mono text-[10px]">
                <li className="flex justify-between"><span>Indexed Pages:</span> <span className="text-green-700">76</span></li>
                <li className="flex justify-between"><span>Legacy Redirects:</span> <span className="text-blue-700">12</span></li>
                <li className="flex justify-between"><span>Excluded Spam:</span> <span className="text-red-700">849</span></li>
              </ul>
            </div>

          </aside>

        </div>

      </div>
    </>
  );
}
