"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface BookDetailCoverProps {
  coverImage: string;
  title: string;
  subtitle?: string | null;
  featured?: boolean;
  slug: string;
}

export default function BookDetailCover({ 
  coverImage, 
  title, 
  subtitle, 
  featured = false,
  slug
}: BookDetailCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = containerRef.current;
    const cover = coverRef.current;
    if (!wrap || !cover) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      cover.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    };

    const onLeave = () => {
      cover.style.transform = '';
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[5/7] rounded-2xl shadow-2xl bg-neutral-900 border border-white/[0.08]"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={coverRef}
        className="w-full h-full relative rounded-2xl overflow-hidden shadow-xl transition-transform duration-200 ease-out"
        style={{ 
          transformStyle: "preserve-3d",
          viewTransitionName: `book-cover-${slug}` 
        } as React.CSSProperties}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`Book cover of ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
            priority={featured}
          />
        ) : (
          /* Placeholder cover matching BookCard styling */
          <div className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-br from-amber-950/35 via-neutral-950 to-amber-950/15 select-none">
            <div className="absolute inset-2 border border-dashed border-white/5 rounded-xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center pt-8">
              <span className="text-[10px] tracking-widest font-sans uppercase font-bold text-amber-500/80 mb-2">Cultures & Food</span>
              <div className="w-12 h-12 rounded-full bg-amber-500/5 flex items-center justify-center border border-amber-500/10 mb-4 text-amber-400">
                🍳
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-2">
              <h4 className="font-serif text-lg font-bold text-amber-100 tracking-tight leading-snug">
                {title}
              </h4>
              {subtitle && (
                <p className="text-xs text-stone-400 mt-2 italic">{subtitle}</p>
              )}
            </div>

            <div className="relative z-10 pb-6 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-wider uppercase">
                Coming Soon
              </span>
            </div>
          </div>
        )}
        
        {/* Spine shadow / edge lines */}
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none" />
        {/* Gloss overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
