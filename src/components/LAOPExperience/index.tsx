"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Act1Whisper from "./Act1Whisper";
import Act2Notebook from "./Act2Notebook";
import Act3Metamorphosis from "./Act3Metamorphosis";
import Act4Intention from "./Act4Intention";
import Act5Toolkit from "./Act5Toolkit";
import Act6Signature from "./Act6Signature";
import AtmosphereParticles from "./AtmosphereParticles";

// Register ScrollTrigger client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LAOPExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Act Refs
  const whisper1Ref = useRef<HTMLDivElement | null>(null);
  const whisper2Ref = useRef<HTMLDivElement | null>(null);
  const whisper3Ref = useRef<HTMLDivElement | null>(null);
  const whisper4Ref = useRef<HTMLDivElement | null>(null);
  
  const notebookRef = useRef<HTMLDivElement | null>(null);
  const notebookCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const imagineRef = useRef<HTMLDivElement | null>(null);
  const realityRef = useRef<HTMLDivElement | null>(null);
  
  const toolkitRef = useRef<HTMLDivElement | null>(null);
  
  const signaturePageRef = useRef<HTMLDivElement | null>(null);

  // States to coordinate active views and sub-progresses
  const [activeScene, setActiveScene] = useState(1);
  const [metaProgress, setMetaProgress] = useState(0);
  const [sigProgress, setSigProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preloader trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    // Make sure ScrollTrigger is clean before running
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      // 1. Master timeline tied to the container scroll depth
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrolling catch-up
          onUpdate: (self) => {
            const prog = self.progress;

            // Determine active scene based on progress
            if (prog < 0.12) {
              setActiveScene(1);
            } else if (prog < 0.32) {
              setActiveScene(2);
            } else if (prog < 0.58) {
              setActiveScene(3);
              // Map 0.32-0.58 range to 0-1 for Act 3 metamorphosis progress
              const range = 0.58 - 0.32;
              const localProg = (prog - 0.32) / range;
              setMetaProgress(localProg);
            } else if (prog < 0.75) {
              setActiveScene(4);
            } else if (prog < 0.90) {
              setActiveScene(5);
            } else {
              setActiveScene(6);
              // Map 0.90-1.00 range to 0-1 for Act 6 signature progress
              const range = 1.00 - 0.90;
              const localProg = (prog - 0.90) / range;
              setSigProgress(localProg);
            }
          },
        },
      });

      // --- ANIMATIONS CHOREOGRAPHY ---

      // Act 1: Whisper text fading
      masterTl
        .to(whisper4Ref.current, { opacity: 0.8, duration: 0.1 })
        .to(whisper1Ref.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(whisper1Ref.current, { opacity: 0, y: -30, duration: 0.8 }, "+=0.3")
        .to(whisper2Ref.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(whisper2Ref.current, { opacity: 0, y: -30, duration: 0.8 }, "+=0.3")
        .to(whisper3Ref.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(whisper4Ref.current, { opacity: 0, duration: 0.3 }, "-=0.3")
        .to(whisper3Ref.current, { opacity: 0, y: -30, duration: 0.8 }, "+=0.3");

      // Act 2: Notebook fade-in & scaling
      masterTl
        .to(notebookRef.current, { opacity: 1, scale: 1, y: 0, duration: 1 })
        .to({}, { duration: 1.5 }) // Hold frame for writing
        .to(notebookRef.current, { opacity: 0, scale: 1.05, y: -30, duration: 1 });

      // Act 3: Metamorphosis
      // This is driven interactively by the `metaProgress` state updated in the ScrollTrigger onUpdate,
      // so we just add a timeline spacer to reserve scroll height for this scene.
      masterTl.to({}, { duration: 3 });

      // Act 4: Intention reflections fading
      masterTl
        .to(imagineRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(imagineRef.current, { opacity: 0, y: -20, duration: 1 }, "+=0.5")
        .to(realityRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(realityRef.current, { opacity: 0, y: -20, duration: 1 }, "+=0.5");

      // Act 5: Toolkit Grid rise & fade
      masterTl
        .to(toolkitRef.current, { opacity: 1, y: 0, duration: 1.2 })
        .to({}, { duration: 2.0 }) // Hold for user hover interaction
        .to(toolkitRef.current, { opacity: 0, y: -30, duration: 1.0 });

      // Act 6: Signature Page fades in (changes background color to cream)
      masterTl.to(signaturePageRef.current, { opacity: 1, duration: 1 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isLoaded]);

  // Loading screen overlay
  if (!isLoaded) {
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-center">
        {/* Soft pulsing loading text */}
        <div className="text-amber-100/40 text-xs uppercase tracking-[0.3em] font-sans animate-gentle-pulse">
          Entering LAOP Experience
        </div>
        <div className="w-24 h-px bg-amber-500/20 mt-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/80 animate-[progress-fill_1.5s_ease-in-out_infinite] origin-left" 
               style={{ transformOrigin: "left" }} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600vh] bg-black text-white"
    >
      {/* Pinned viewport viewport container */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Ambient floating dust particles (Creative Studio Vibes) */}
        <AtmosphereParticles />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)]" />
        
        {/* ACT 1: Whisper */}
        <Act1Whisper
          whisper1Ref={whisper1Ref}
          whisper2Ref={whisper2Ref}
          whisper3Ref={whisper3Ref}
          whisper4Ref={whisper4Ref}
          active={activeScene === 1}
        />

        {/* ACT 2: Notebook & Canvas */}
        <Act2Notebook
          notebookRef={notebookRef}
          canvasRef={notebookCanvasRef}
          active={activeScene === 2 || activeScene === 1} // Keep loaded slightly early/late to prevent clipping
          isActiveScene={activeScene === 2}
        />

        {/* ACT 3: Metamorphosis */}
        <Act3Metamorphosis
          active={activeScene === 3}
          progress={metaProgress}
        />

        {/* ACT 4: Intention */}
        <Act4Intention
          imagineRef={imagineRef}
          realityRef={realityRef}
          active={activeScene === 4}
        />

        {/* ACT 5: Authority Toolkit */}
        <Act5Toolkit
          toolkitRef={toolkitRef}
          active={activeScene === 5}
        />

        {/* ACT 6: Signature Blank Page */}
        <Act6Signature
          signaturePageRef={signaturePageRef}
          active={activeScene === 6 || activeScene === 5} // Keep ready early
          localScrollProgress={sigProgress}
        />

      </div>
    </div>
  );
}
