"use client";

import React from "react";

interface Act4IntentionProps {
  imagineRef: React.RefObject<HTMLDivElement | null>;
  realityRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
}

export default function Act4Intention({
  imagineRef,
  realityRef,
  active,
}: Act4IntentionProps) {
  return (
    <div className={`absolute inset-0 flex flex-col justify-center items-center px-6 text-center select-none bg-[#050505] overflow-hidden ${
      active ? "pointer-events-auto opacity-100 z-10" : "pointer-events-none opacity-0 z-0"
    } transition-opacity duration-500`}>
      {/* Background aurora glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[150px] pointer-events-none" />

      {/* Narrative block: Discovering work 20 years from now */}
      <div
        ref={imagineRef}
        className="absolute flex flex-col items-center gap-6 max-w-2xl opacity-0 translate-y-8 will-change-transform"
      >
        <p className="font-serif text-2xl md:text-4xl text-amber-50/90 leading-relaxed font-light">
          &ldquo;Imagine someone discovering your work twenty years from now.&rdquo;
        </p>
        <div className="w-12 h-px bg-amber-500/30 my-2" />
        <p className="font-sans text-sm md:text-base text-amber-100/50 uppercase tracking-[0.25em] leading-loose max-w-lg">
          They don&apos;t just find a book. <br />
          They find your ideas. Your story. <br />
          Your voice. Your legacy.
        </p>
      </div>

      {/* Intention statement */}
      <div
        ref={realityRef}
        className="absolute flex flex-col items-center gap-6 max-w-xl opacity-0 translate-y-8 will-change-transform"
      >
        <p className="font-serif text-3xl md:text-5xl text-amber-50/90 leading-tight">
          Ideas don&apos;t become reality by accident.
        </p>
        <p className="font-serif text-3xl md:text-5xl text-amber-50 leading-tight italic">
          They become reality through intention.
        </p>
      </div>
    </div>
  );
}
