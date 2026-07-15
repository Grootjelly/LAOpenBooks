"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import AppsShowcase from "@/components/AppsShowcase";
import TwistingRibbon from "@/components/TwistingRibbon";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // Sequence the intro loading fade-out
    const fadeTimer = setTimeout(() => {
      setFadeOutIntro(true);
    }, 1800);

    const endTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <main className="flex-grow min-h-screen relative overflow-hidden bg-black">
      {/* 1. Branded Loading Intro Sequence */}
      {showIntro && (
        <div 
          className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            fadeOutIntro ? "opacity-0 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          {/* Glowing Aura Accent */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

          {/* Letterpress/Metallic textured logo accent */}
          <div className="relative mb-6 flex flex-col items-center">
            {/* Animated Draw Rings */}
            <div className="w-16 h-16 rounded-full border border-amber-500/20 flex items-center justify-center mb-4 relative">
              <span className="w-8 h-8 rounded-full border border-amber-500/40 border-t-transparent animate-spin" style={{ animationDuration: "1.5s" }} />
              <span className="absolute text-amber-500 font-serif text-sm font-semibold select-none">L</span>
            </div>
            
            {/* Branded loading header */}
            <h2 className="text-amber-100/90 text-sm font-sans tracking-[0.4em] uppercase select-none animate-pulse">
              Entering LAOP Experience
            </h2>
            <p className="text-[10px] text-stone-500 tracking-widest uppercase mt-2 font-mono">
              CURIOUS MINDS • EST. 2026
            </p>
          </div>

          {/* Staggered progress track line */}
          <div className="w-36 h-px bg-white/[0.06] relative overflow-hidden rounded-full">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
              style={{
                width: fadeOutIntro ? "100%" : "0%",
                transition: "width 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              }}
            />
          </div>
        </div>
      )}

      {/* 2. Main Page Content (Reveals after loading sequence finishes) */}
      <div 
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showIntro ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
        }`}
      >
        <Hero />
        
        {/* Dynamic Ribbon Divider */}
        <div className="relative w-full h-[60px] bg-transparent overflow-visible">
          {/* Horizontal border line */}
          <div className="absolute inset-x-0 top-[30px] h-px bg-white/[0.06] z-10" />
          
          {/* Twisting Ribbon centered over the line */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <TwistingRibbon 
              className="w-full h-[120px] -translate-y-[30px]" 
              waveAmplitude={0.15} 
              waveSpeed={0.012}
              twistCycles={4}
              darkColors={{
                face: "#ea580c",    // Orange
                foldA: "#f59e0b",   // Amber
                foldB: "#b45309",   // Dark Amber
                foldC: "#0a0a0a"    // Blends completely with the page background!
              }}
            />
          </div>
        </div>

        <AppsShowcase />
        
        <GetInTouch />
      </div>
    </main>
  );
}
