"use client";

import React, { useState, useEffect } from "react";
import { Share2, X, Link2, Code2, Check } from "lucide-react";
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

interface SharePanelProps {
  article: Article;
  onClose: () => void;
}

export default function SharePanel({ article, onClose }: SharePanelProps) {
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const slug = generateSlug(article.title);
  const url = origin ? `${origin}/news/${slug}` : "";
  const text = encodeURIComponent(`Breaking: ${article.title} - ZamboToday`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy path: ", err);
    }
  };

  const handleCopyEmbed = async () => {
    try {
      const iframeCode = `<iframe src="${url}" width="100%" height="450" frameborder="0"></iframe>`;
      await navigator.clipboard.writeText(iframeCode);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy embed code: ", err);
    }
  };

  return (
    <div 
      className="bg-neutral-50 border border-neutral-200 p-3 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-none select-none font-mono text-[10px] shadow-sm animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        <span className="font-sans font-black text-[#CC0000] uppercase text-[9px] tracking-wider">
          WIRE SYNDICATION:
        </span>
        <span className="text-neutral-500 truncate max-w-[180px] sm:max-w-xs">{url}</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <a 
          href={url ? `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}` : "#"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 bg-black text-white px-2 py-1 font-bold hover:opacity-85 transition-opacity"
        >
          <XBrandIcon /> X
        </a>
        <a 
          href={url ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` : "#"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 bg-[#0A66C2] text-white px-2 py-1 font-bold hover:opacity-85 transition-opacity"
        >
          <LinkedInBrandIcon /> LinkedIn
        </a>
        <button 
          onClick={handleCopyLink} 
          className="bg-neutral-200 text-neutral-800 px-2 py-1 font-bold hover:bg-neutral-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {copied ? <Check size={10} className="text-green-600" /> : <Link2 size={10} />}
          {copied ? "Copied" : "Copy Link"}
        </button>
        <button 
          onClick={handleCopyEmbed} 
          className="bg-neutral-800 text-white px-2 py-1 font-bold hover:bg-neutral-900 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {embedCopied ? <Check size={10} className="text-green-400" /> : <Code2 size={10} />}
          {embedCopied ? "Embed Copied" : "Embed"}
        </button>
        <button 
          onClick={onClose} 
          className="text-neutral-400 hover:text-black pl-1 border-l border-neutral-300 cursor-pointer"
          aria-label="Close Share Panel"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
