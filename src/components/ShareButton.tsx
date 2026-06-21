"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { Article } from "../lib/newsStore";
import SharePanel from "./SharePanel";

interface ShareButtonProps {
  article: Article;
  className?: string;
  iconOnly?: boolean;
}

export default function ShareButton({ article, className = "", iconOnly = false }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block w-full" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-neutral-400 hover:text-[#CC0000] transition-colors flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold tracking-wider cursor-pointer ${className}`}
        aria-expanded={isOpen}
        aria-label="Share article"
      >
        <Share2 size={11} className="flex-shrink-0" />
        {!iconOnly && <span>Share Wire</span>}
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1">
          <SharePanel article={article} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
