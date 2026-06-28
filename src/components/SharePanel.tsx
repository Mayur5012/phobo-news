"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Link2, Code2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Article, generateSlug } from "../lib/newsStore";

function XBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153Zm-1.29 19.493h2.039L6.486 3.24H4.298L17.61 20.646Z" />
    </svg>
  );
}

function LinkedInBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.028-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9H7.12v11.452Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.847L.057 23.57a.75.75 0 0 0 .93.908l5.99-1.57A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.952 9.952 0 0 1-5.093-1.404l-.361-.216-3.767.988.999-3.646-.236-.374A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

type EmbedTab = "html" | "nextjs" | "react" | "flutter";

interface SharePanelProps {
  article: Article;
  onClose: () => void;
  /** The trigger button ref — used to position the panel below it */
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

export default function SharePanel({ article, onClose, anchorRef }: SharePanelProps) {
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const [showEmbed, setShowEmbed] = useState(false);
  const [activeTab, setActiveTab] = useState<EmbedTab>("html");
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Position the panel below the anchor button, clamped to viewport
  useEffect(() => {
    function computePosition() {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const PANEL_WIDTH = Math.min(window.innerWidth - 16, 500); // 8px margin each side
      const top = rect.bottom + window.scrollY + 6;

      // Try to right-align with anchor; clamp so it never goes off left/right
      let left = rect.right + window.scrollX - PANEL_WIDTH;
      left = Math.max(8, Math.min(left, window.innerWidth - PANEL_WIDTH - 8));

      setPanelStyle({ position: "absolute", top, left, width: PANEL_WIDTH });
    }

    computePosition();
    window.addEventListener("resize", computePosition);
    window.addEventListener("scroll", computePosition, true);
    return () => {
      window.removeEventListener("resize", computePosition);
      window.removeEventListener("scroll", computePosition, true);
    };
  }, [anchorRef]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  const slug = generateSlug(article.title);
  const url = origin ? `${origin}/news/${slug}` : `https://www.zambotoday.com/news/${slug}`;
  const shareText = encodeURIComponent(`${article.title} — ZamboToday`);
  const encodedUrl = encodeURIComponent(url);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  };

  const embedCodes: Record<EmbedTab, string> = {
    html: `<!-- ZamboToday Article Card -->
<div style="font-family:sans-serif;border:1px solid #e5e5e5;max-width:400px;border-radius:4px;overflow:hidden;">
  <a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">
    <img src="${article.image_url}" alt="${article.title.replace(/"/g, "&quot;")}"
         style="width:100%;height:200px;object-fit:cover;display:block;" />
    <div style="padding:12px 16px;">
      <span style="font-size:10px;font-weight:900;letter-spacing:.1em;color:#CC0000;text-transform:uppercase;">
        ZamboToday · ${article.category.toUpperCase()}
      </span>
      <p style="margin:6px 0 0;font-size:15px;font-weight:700;line-height:1.35;color:#111;">
        ${article.title}
      </p>
      <p style="margin:6px 0 0;font-size:12px;color:#888;">
        ${new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </p>
    </div>
  </a>
</div>`,

    nextjs: `// ZamboToday Article Card — Next.js
import Image from "next/image";
import Link from "next/link";

export function ZamboArticleCard() {
  return (
    <Link href="${url}" target="_blank"
      className="block border border-neutral-200 max-w-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-video">
        <Image src="${article.image_url}"
          alt="${article.title.replace(/"/g, '\\"')}" fill className="object-cover" />
      </div>
      <div className="p-4 space-y-1">
        <span className="text-[10px] font-black tracking-widest text-[#CC0000] uppercase">
          ZamboToday · ${article.category.toUpperCase()}
        </span>
        <p className="text-sm font-bold leading-snug text-neutral-900">
          ${article.title.replace(/"/g, '\\"')}
        </p>
        <p className="text-xs text-neutral-400">
          ${new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </Link>
  );
}`,

    react: `// ZamboToday Article Card — React
export function ZamboArticleCard() {
  return (
    <a href="${url}" target="_blank" rel="noopener noreferrer"
      style={{ display:"block", textDecoration:"none",
               border:"1px solid #e5e5e5", maxWidth:400,
               overflow:"hidden", borderRadius:4 }}>
      <img src="${article.image_url}"
        alt="${article.title.replace(/"/g, '\\"')}"
        style={{ width:"100%", height:200, objectFit:"cover", display:"block" }} />
      <div style={{ padding:"12px 16px" }}>
        <span style={{ fontSize:10, fontWeight:900, letterSpacing:".1em",
                       color:"#CC0000", textTransform:"uppercase" }}>
          ZamboToday · ${article.category.toUpperCase()}
        </span>
        <p style={{ margin:"6px 0 0", fontSize:15, fontWeight:700,
                    lineHeight:1.35, color:"#111" }}>
          ${article.title.replace(/"/g, '\\"')}
        </p>
        <p style={{ margin:"6px 0 0", fontSize:12, color:"#888" }}>
          ${new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </a>
  );
}`,

    flutter: `// ZamboToday Article Card — Flutter
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ZamboArticleCard extends StatelessWidget {
  const ZamboArticleCard({super.key});

  static const _url = '${url}';
  static const _img = '${article.image_url}';
  static const _title = '${article.title.replace(/'/g, "\\'")}';
  static const _cat = '${article.category.toUpperCase()}';
  static const _date = '${new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}';

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => launchUrl(Uri.parse(_url)),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 400),
        decoration: BoxDecoration(
          border: Border.all(color: const Color(0xFFE5E5E5)),
          borderRadius: BorderRadius.circular(4),
        ),
        clipBehavior: Clip.hardEdge,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.network(_img, width: double.infinity,
              height: 200, fit: BoxFit.cover),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('ZamboToday · \$_cat',
                    style: const TextStyle(fontSize: 10,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 1.5, color: Color(0xFFCC0000))),
                  const SizedBox(height: 6),
                  Text(_title,
                    style: const TextStyle(fontSize: 15,
                      fontWeight: FontWeight.w700,
                      height: 1.35, color: Color(0xFF111111))),
                  const SizedBox(height: 4),
                  Text(_date,
                    style: const TextStyle(
                      fontSize: 12, color: Color(0xFF888888))),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
  };

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCodes[activeTab]);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch { /* silent */ }
  };

  const TABS: { key: EmbedTab; label: string }[] = [
    { key: "html", label: "HTML" },
    { key: "nextjs", label: "Next.js" },
    { key: "react", label: "React" },
    { key: "flutter", label: "Flutter" },
  ];

  if (!mounted) return null;

  const panel = (
    <div
      ref={panelRef}
      style={{ ...panelStyle, zIndex: 9999 }}
      className="bg-white border border-neutral-200 shadow-2xl font-mono text-[10px] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100 bg-neutral-50">
        <span className="font-black text-[#CC0000] uppercase tracking-wider text-[9px]">
          WIRE SYNDICATION
        </span>
        <button onClick={onClose} className="text-neutral-400 hover:text-black" aria-label="Close">
          <X size={13} />
        </button>
      </div>

      {/* Social buttons — wraps naturally, never overflows */}
      <div className="px-3 py-2.5 flex flex-wrap gap-1.5">
        <a href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${shareText}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 bg-black text-white px-2 py-1.5 font-bold hover:opacity-80 transition-opacity">
          <XBrandIcon /> X
        </a>

        <a href={`https://wa.me/?text=${shareText}%20${encodedUrl}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 bg-[#25D366] text-white px-2 py-1.5 font-bold hover:opacity-80 transition-opacity">
          <WhatsAppIcon /> WhatsApp
        </a>

        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
          title="Copies link — paste in your Instagram story or bio"
          className="flex items-center gap-1 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743] text-white px-2 py-1.5 font-bold hover:opacity-80 transition-opacity"
          onClick={() => navigator.clipboard.writeText(url).catch(() => {})}>
          <InstagramIcon /> Instagram
        </a>

        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 bg-[#0A66C2] text-white px-2 py-1.5 font-bold hover:opacity-80 transition-opacity">
          <LinkedInBrandIcon /> LinkedIn
        </a>

        <button onClick={handleCopyLink}
          className="flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2 py-1.5 font-bold hover:bg-neutral-200 border border-neutral-200">
          {copied ? <Check size={10} className="text-green-600" /> : <Link2 size={10} />}
          {copied ? "Copied!" : "Copy Link"}
        </button>

        <button onClick={() => setShowEmbed((v) => !v)}
          className="flex items-center gap-1 bg-neutral-800 text-white px-2 py-1.5 font-bold hover:bg-neutral-900">
          <Code2 size={10} />
          Embed
          {showEmbed ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </button>
      </div>

      {/* URL strip */}
      <div className="px-3 pb-2 flex items-center gap-2 text-neutral-400 border-b border-neutral-100 min-w-0">
        <span className="text-[#CC0000] font-black text-[9px] uppercase tracking-wider shrink-0">URL:</span>
        <span className="truncate min-w-0">{url}</span>
      </div>

      {/* Embed section */}
      {showEmbed && (
        <div>
          <div className="flex border-b border-neutral-200 bg-neutral-50">
            {TABS.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-2.5 py-2 text-[10px] font-black uppercase tracking-wider transition-colors
                  ${activeTab === tab.key
                    ? "border-b-2 border-[#CC0000] text-[#CC0000] bg-white"
                    : "text-neutral-400 hover:text-neutral-700"}`}>
                {tab.label}
              </button>
            ))}
            <button onClick={handleCopyEmbed}
              className="ml-auto flex items-center gap-1 px-2.5 py-2 text-[10px] font-black uppercase
                         bg-neutral-800 text-white hover:bg-neutral-900">
              {embedCopied ? <Check size={9} className="text-green-400" /> : <Code2 size={9} />}
              {embedCopied ? "Copied!" : "Copy"}
            </button>
          </div>

          <pre className="text-[10px] leading-relaxed overflow-x-auto p-3 bg-neutral-950 text-green-400 max-h-48 font-mono whitespace-pre">
            {embedCodes[activeTab]}
          </pre>

          {activeTab === "html" && (
            <p className="px-3 py-1.5 text-[9px] text-neutral-400 bg-neutral-50 border-t border-neutral-100">
              💡 Instagram has no share URL — the button copies the link so you can paste it in your story or bio.
            </p>
          )}
        </div>
      )}
    </div>
  );

  return createPortal(panel, document.body);
}