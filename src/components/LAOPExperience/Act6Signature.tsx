"use client";

import React, { useRef, useState, useEffect } from "react";

interface Act6SignatureProps {
  signaturePageRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
  localScrollProgress: number; // 0 to 1 representing the scroll progress within Act VI
}

interface Point {
  x: number;
  y: number;
}

export default function Act6Signature({
  signaturePageRef,
  active,
  localScrollProgress,
}: Act6SignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);
  
  const [hasSigned, setHasSigned] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Setup canvas size
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = "#1C1A17";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [active]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointsRef.current = [{ x, y }];

    const ctx = e.currentTarget.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update cursor position
    setMousePos({ x: e.clientX, y: e.clientY });

    if (!isDrawingRef.current) return;

    const ctx = e.currentTarget.getContext("2d");
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    pointsRef.current.push({ x, y });
    
    if (pointsRef.current.length > 5 && !hasSigned) {
      setHasSigned(true);
    }
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handlePointerLeave = () => {
    isDrawingRef.current = false;
    setIsHovering(false);
  };

  const handlePointerEnter = () => {
    setIsHovering(true);
  };

  // Scroll-typewriter mapping
  const fullText = "The next chapter has always been yours to write.";
  // We write the text between 0% and 50% of the local scroll progress
  const typewriterProgress = Math.min(1, Math.max(0, localScrollProgress / 0.5));
  const charsToShow = Math.floor(typewriterProgress * fullText.length);
  const currentText = fullText.substring(0, charsToShow);

  return (
    <div
      ref={signaturePageRef}
      className={`absolute inset-0 flex flex-col justify-center items-center px-6 select-none bg-[#F7F6F2] text-[#1C1A17] opacity-0 ${
        active ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Paper Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="w-full max-w-2xl flex flex-col items-center text-center relative z-10">
        
        {/* Typewriter Line */}
        <h3 className="font-serif text-2xl md:text-4xl text-[#1C1A17] font-light leading-relaxed min-h-[3.5rem] tracking-wide">
          {currentText}
          <span className="w-px h-6 md:h-8 bg-amber-600 inline-block align-middle ml-1 animate-[gentle-pulse_1s_infinite]" />
        </h3>

        {/* Signature Line Section */}
        {localScrollProgress > 0.45 && (
          <div className="mt-12 w-full flex flex-col items-center animate-fade-in">
            <span className="font-sans text-[10px] text-neutral-400 uppercase tracking-[0.2em] mb-4">
              Sign below to claim your legacy
            </span>
            <div className="relative w-80 h-24 border-b border-[#1C1A17]/30 cursor-none">
              {/* Signature label */}
              <span className="absolute left-2 bottom-2 font-serif text-lg text-neutral-300">X</span>
              
              {/* Canvas Overlay for signing */}
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                onPointerEnter={handlePointerEnter}
                className="absolute inset-0 w-full h-full z-20 touch-none"
              />
            </div>
          </div>
        )}

        {/* Dynamic Legacy taglines that reveal itself AFTER signature is created */}
        <div
          className={`mt-12 flex flex-col items-center gap-6 transition-all duration-1000 ${
            hasSigned ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          {/* Main Tagline */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-400">LAOP</span>
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-[#1C1A17] tracking-wider">
              Ideas become identities.
            </h1>
          </div>

          {/* Core transformations list */}
          <div className="flex flex-col gap-2 font-serif text-sm md:text-base text-neutral-500 italic">
            <p className="animate-fade-in delay-200">A business idea becomes a company.</p>
            <p className="animate-fade-in delay-500">A story becomes a published work.</p>
            <p className="animate-fade-in delay-800">Knowledge becomes authority.</p>
            <p className="animate-fade-in delay-1100">A person becomes a brand.</p>
            <p className="animate-fade-in delay-1400">A dream becomes a legacy.</p>
          </div>

          {/* Letterpress tactile button CTA */}
          <button
            onClick={() => window.location.href = "/contact"}
            className="mt-8 relative px-8 py-3.5 rounded bg-[#FAF9F6] border border-[#1C1A17]/10 text-xs font-sans uppercase tracking-[0.25em] text-[#1C1A17] font-semibold transition-all duration-300 active:translate-y-px hover:border-[#1C1A17]/30"
            style={{
              boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)"
            }}
          >
            Begin Your Legacy
          </button>
        </div>

      </div>

      {/* Custom Ink Pen Nib Cursor */}
      {isHovering && !hasSigned && (
        <div
          className="fixed pointer-events-none z-50 mix-blend-darken"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-2px, -30px)"
          }}
        >
          <svg
            width="24"
            height="32"
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L4 16C4 16 2 24 2 28C2 30.2 3.8 32 6 32H18C20.2 32 22 30.2 22 28C22 24 20 16 20 16L12 2Z"
              fill="#FAF9F6"
              stroke="#1C1A17"
              strokeWidth="2"
            />
            <path
              d="M12 12V24"
              stroke="#1C1A17"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="11" r="2.5" fill="#1C1A17" />
          </svg>
        </div>
      )}
    </div>
  );
}
