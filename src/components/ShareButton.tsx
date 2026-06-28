"use client";

import React, { useState, useRef } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    // No relative/overflow here — panel escapes via portal
    <div onClick={(e) => e.stopPropagation()}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((v) => !v)}
        className={`text-neutral-400 hover:text-[#CC0000] transition-colors flex items-center gap-1.5
                    text-[10px] uppercase font-mono font-bold tracking-wider cursor-pointer ${className}`}
        aria-expanded={isOpen}
        aria-label="Share article"
      >
        <Share2 size={11} className="flex-shrink-0" />
        {!iconOnly && <span>Share Wire</span>}
      </button>

      {isOpen && (
        <SharePanel
          article={article}
          onClose={() => setIsOpen(false)}
          anchorRef={buttonRef}
        />
      )}
    </div>
  );
}