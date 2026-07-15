"use client";

import React, { useMemo } from "react";

interface Act3MetamorphosisProps {
  active: boolean;
  progress: number; // 0 to 1 representing the scroll progress of Act III
}

export default function Act3Metamorphosis({
  active,
  progress,
}: Act3MetamorphosisProps) {
  // Determine which sub-stage is active based on progress (0 to 1)
  // Stages:
  // 0.00 - 0.16: Notebook
  // 0.16 - 0.32: Blueprint
  // 0.32 - 0.48: Logo
  // 0.48 - 0.64: Domain
  // 0.64 - 0.80: Website
  // 0.80 - 1.00: Community & Legacy
  
  const stageWeights = useMemo(() => {
    return [
      { id: "notebook", start: 0, end: 0.16 },
      { id: "blueprint", start: 0.16, end: 0.32 },
      { id: "logo", start: 0.32, end: 0.48 },
      { id: "domain", start: 0.48, end: 0.64 },
      { id: "website", start: 0.64, end: 0.80 },
      { id: "legacy", start: 0.80, end: 1.00 },
    ];
  }, []);

  const getStageStyle = (index: number) => {
    const stage = stageWeights[index];
    let opacity = 0;
    let scale = 0.9;
    let y = 20;

    if (progress >= stage.start && progress <= stage.end) {
      // Fade in and peak in center, fade out at end
      const range = stage.end - stage.start;
      const localProgress = (progress - stage.start) / range; // 0 to 1
      
      // Sine wave peak shape
      opacity = Math.sin(localProgress * Math.PI);
      scale = 0.95 + 0.05 * Math.sin(localProgress * Math.PI);
      y = 15 * (1 - Math.sin(localProgress * Math.PI));
    } else if (progress > stage.end && index < stageWeights.length - 1) {
      // Past stage (fade out completely)
      opacity = 0;
      scale = 1.05;
      y = -20;
    } else if (progress < stage.start && index > 0) {
      // Future stage (not yet visible)
      opacity = 0;
      scale = 0.9;
      y = 20;
    }

    // Special case for final stage: keep it visible at the end of the scene
    if (index === stageWeights.length - 1 && progress >= stage.start) {
      const range = stage.end - stage.start;
      const localProgress = Math.min(1, (progress - stage.start) / range);
      opacity = localProgress;
      scale = 0.95 + 0.05 * localProgress;
      y = 15 * (1 - localProgress);
    }

    return {
      opacity,
      transform: `scale(${scale}) translateY(${y}px)`,
      transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
    };
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center items-center px-6 bg-black ${
        active ? "pointer-events-auto opacity-100 z-10" : "pointer-events-none opacity-0 z-0"
      } transition-opacity duration-500`}
    >
      <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
        
        {/* STAGE 0: Notebook Line Drawing */}
        <div
          style={getStageStyle(0)}
          className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none"
        >
          <svg className="w-64 h-64 text-amber-500/80" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="1.5">
            {/* Book outlines */}
            <path d="M10 20 L50 25 L90 20 L90 75 L50 80 L10 75 Z" />
            <path d="M50 25 L50 80" />
            {/* Faint writing lines inside book */}
            <path d="M18 32 L44 34 M18 42 L44 44 M18 52 L44 54 M18 62 L44 64" strokeOpacity="0.4" />
            <path d="M56 34 L82 32 M56 44 L82 42 M56 54 L82 52 M56 64 L82 62" strokeOpacity="0.4" />
          </svg>
          <div className="mt-8 font-serif text-xl text-amber-50">It starts as a private thought.</div>
        </div>

        {/* STAGE 1: Blueprint Vector */}
        <div
          style={getStageStyle(1)}
          className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none"
        >
          <svg className="w-72 h-72 text-cyan-400/80" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.8">
            {/* Blueprint Grid */}
            <path d="M 0,20 L 100,20 M 0,40 L 100,40 M 0,60 L 100,60 M 0,80 L 100,80" strokeDasharray="2 2" strokeOpacity="0.3" />
            <path d="M 20,0 L 20,100 M 40,0 L 40,100 M 60,0 L 60,100 M 80,0 L 80,100" strokeDasharray="2 2" strokeOpacity="0.3" />
            {/* Drafting Geometry */}
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
            <rect x="20" y="20" width="60" height="60" />
            <line x1="10" y1="10" x2="90" y2="90" strokeOpacity="0.5" />
            <line x1="90" y1="10" x2="10" y2="90" strokeOpacity="0.5" />
            <circle cx="50" cy="50" r="1.5" fill="currentColor" />
          </svg>
          <div className="mt-8 font-serif text-xl text-cyan-100">Drafted with architectural intent.</div>
        </div>

        {/* STAGE 2: Geometric Logo */}
        <div
          style={getStageStyle(2)}
          className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none"
        >
          <svg className="w-64 h-64 text-amber-500" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="1.2">
            {/* Morphing geometric crystal/logo */}
            <polygon points="50,10 85,35 85,75 50,90 15,75 15,35" />
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="15" y1="35" x2="85" y2="35" />
            <line x1="15" y1="75" x2="85" y2="75" />
            <line x1="15" y1="35" x2="50" y2="90" />
            <line x1="85" y1="35" x2="50" y2="90" />
            <line x1="15" y1="75" x2="50" y2="10" />
            <line x1="85" y1="75" x2="50" y2="10" />
          </svg>
          <div className="mt-8 font-serif text-xl text-amber-100">Shaped into a timeless identity.</div>
        </div>

        {/* STAGE 3: Address Bar / Domain */}
        <div
          style={getStageStyle(3)}
          className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none"
        >
          <div className="w-80 p-3 bg-neutral-900 border border-white/10 rounded-lg shadow-xl flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-grow bg-black/40 border border-white/5 py-1 px-3 rounded text-left text-xs font-mono text-amber-200/90 tracking-wide flex items-center justify-between">
              <span>https://youridea.com</span>
              <svg className="w-3.5 h-3.5 text-amber-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="mt-8 font-serif text-xl text-amber-100/90">Claimed as a spot in the world.</div>
        </div>

        {/* STAGE 4: Website Interface Mockup */}
        <div
          style={getStageStyle(4)}
          className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none"
        >
          <div className="w-96 aspect-[1.618] bg-neutral-950 border border-white/10 rounded-lg shadow-2xl p-4 flex flex-col gap-3">
            {/* Mock website header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div className="w-16 h-2 bg-amber-500/50 rounded" />
              <div className="flex gap-2">
                <div className="w-8 h-2 bg-white/20 rounded" />
                <div className="w-8 h-2 bg-white/20 rounded" />
              </div>
            </div>
            {/* Mock website layout body */}
            <div className="flex-grow flex gap-3">
              <div className="w-1/3 border border-white/5 bg-white/[0.02] rounded p-2 flex flex-col gap-1.5">
                <div className="w-full h-8 bg-amber-500/10 rounded" />
                <div className="w-10 h-1.5 bg-white/15 rounded" />
              </div>
              <div className="flex-grow flex flex-col gap-2">
                <div className="w-3/4 h-3 bg-white/20 rounded" />
                <div className="w-full h-1.5 bg-white/10 rounded" />
                <div className="w-full h-1.5 bg-white/10 rounded" />
                <div className="w-1/2 h-1.5 bg-white/10 rounded" />
                <div className="flex-grow bg-white/[0.01] border border-dashed border-white/10 rounded" />
              </div>
            </div>
          </div>
          <div className="mt-8 font-serif text-xl text-amber-100">Built to share with the universe.</div>
        </div>

        {/* STAGE 5: Constellation of Nodes & Glowing Aura (Community & Legacy) */}
        <div
          style={getStageStyle(5)}
          className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none"
        >
          {/* Radial ambient glow in center */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-transparent blur-[80px]" />
          
          <svg className="w-80 h-80 text-amber-400" viewBox="0 0 100 100">
            {/* Pulsing connected lines */}
            <line x1="20" y1="30" x2="50" y2="20" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.4" />
            <line x1="50" y1="20" x2="80" y2="35" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.4" />
            <line x1="80" y1="35" x2="70" y2="70" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.4" />
            <line x1="70" y1="70" x2="40" y2="80" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.4" />
            <line x1="40" y1="80" x2="15" y2="60" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.4" />
            <line x1="15" y1="60" x2="20" y2="30" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.4" />
            
            <line x1="50" y1="50" x2="20" y2="30" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.6" />
            <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.6" />
            <line x1="50" y1="50" x2="80" y2="35" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.6" />
            <line x1="50" y1="50" x2="70" y2="70" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.6" />
            <line x1="50" y1="50" x2="40" y2="80" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.6" />
            <line x1="50" y1="50" x2="15" y2="60" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.6" />

            {/* Nodes */}
            <circle cx="20" cy="30" r="2.5" fill="#f59e0b" className="animate-pulse" />
            <circle cx="50" cy="20" r="3" fill="#f59e0b" />
            <circle cx="80" cy="35" r="2" fill="#d97706" />
            <circle cx="70" cy="70" r="3.5" fill="#f59e0b" />
            <circle cx="40" cy="80" r="2" fill="#b45309" />
            <circle cx="15" cy="60" r="3" fill="#f59e0b" />
            
            {/* Center Supernova Node */}
            <circle cx="50" cy="50" r="6" fill="#f59e0b" />
            <circle cx="50" cy="50" r="10" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" style={{ transformOrigin: "50px 50px", animationDuration: "12s" }} />
          </svg>
          <div className="mt-8 font-serif text-xl text-amber-100">Evolving into a community, and a legacy.</div>
        </div>

      </div>
    </div>
  );
}
