"use client";

import React from "react";

interface Act1WhisperProps {
  whisper1Ref: React.RefObject<HTMLDivElement | null>;
  whisper2Ref: React.RefObject<HTMLDivElement | null>;
  whisper3Ref: React.RefObject<HTMLDivElement | null>;
  whisper4Ref: React.RefObject<HTMLDivElement | null>;
  active: boolean;
}

export default function Act1Whisper({
  whisper1Ref,
  whisper2Ref,
  whisper3Ref,
  whisper4Ref,
  active,
}: Act1WhisperProps) {
  return (
    <div className={`absolute inset-0 flex flex-col justify-center items-center px-6 text-center select-none bg-black ${
      active ? "pointer-events-auto opacity-100 z-10" : "pointer-events-none opacity-0 z-0"
    } transition-opacity duration-500`}>
      {/* Dynamic Ambient Pinpoint of Light in Background */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none animate-float" />

      {/* Whisper 1 */}
      <div
        ref={whisper1Ref}
        className="absolute text-3xl md:text-5xl font-serif text-amber-50/90 leading-relaxed max-w-3xl opacity-0 translate-y-8 will-change-transform"
      >
        Every idea begins as a whisper.
      </div>

      {/* Whisper 2 */}
      <div
        ref={whisper2Ref}
        className="absolute flex flex-col gap-4 text-2xl md:text-4xl font-serif text-amber-50/80 leading-relaxed max-w-3xl opacity-0 translate-y-8 will-change-transform"
      >
        <span>Some become businesses.</span>
        <span>Some become books.</span>
        <span>Some change lives.</span>
      </div>

      {/* Whisper 3 */}
      <div
        ref={whisper3Ref}
        className="absolute text-4xl md:text-6xl font-serif text-amber-50 leading-relaxed max-w-3xl opacity-0 translate-y-8 will-change-transform"
      >
        Which one is yours?
      </div>

      {/* Whisper 4 (Helper text for scrolling) */}
      <div
        ref={whisper4Ref}
        className="absolute bottom-12 text-sm font-sans text-amber-200/30 uppercase tracking-[0.2em] opacity-0 flex flex-col items-center gap-2"
      >
        <span>Scroll to listen</span>
        <div className="w-px h-8 bg-amber-500/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-amber-500 animate-[bounce_2s_infinite]" />
        </div>
      </div>
    </div>
  );
}
