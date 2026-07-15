"use client";

import React, { useRef, useState, useEffect } from "react";

interface Act2NotebookProps {
  notebookRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  active: boolean;
  isActiveScene: boolean;
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  age: number;
  maxAge: number;
}

export default function Act2Notebook({
  notebookRef,
  canvasRef,
  active,
  isActiveScene,
}: Act2NotebookProps) {
  const pointsRef = useRef<Point[]>([]);
  const isDrawingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Resize canvas to match notebook container size
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      // Use device pixel ratio for sharp drawing on retina screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [active, canvasRef]);

  // Animation loop to fade and draw ink strokes
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Clear canvas (it's transparent so the notebook background shows through)
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);

      // Update point ages
      const points = pointsRef.current;
      for (let i = 0; i < points.length; i++) {
        points[i].age += 16.67; // approx ms per frame
      }

      // Filter out old points
      pointsRef.current = points.filter((p) => p.age < p.maxAge);

      // Draw points as fading lines
      const activePoints = pointsRef.current;
      if (activePoints.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Group points into continuous segments to avoid gaps
        ctx.beginPath();
        for (let i = 1; i < activePoints.length; i++) {
          const p1 = activePoints[i - 1];
          const p2 = activePoints[i];

          // Don't connect points if they are too far apart (e.g. mouse teleport)
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          if (dist > 150) {
            ctx.stroke();
            ctx.beginPath();
            continue;
          }

          // Calculate average opacity for this line segment based on age
          const life1 = 1 - p1.age / p1.maxAge;
          const life2 = 1 - p2.age / p2.maxAge;
          const avgLife = (life1 + life2) / 2;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          // Use quadratic curve for smoothing
          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);

          ctx.strokeStyle = `rgba(28, 26, 23, ${avgLife * 0.85})`;
          ctx.lineWidth = (p1.width + p2.width) / 2 * avgLife;
          ctx.stroke();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, canvasRef]);

  // Handle pointer events
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isActiveScene) return;
    isDrawingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastMousePosRef.current = { x, y };
    lastTimeRef.current = performance.now();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update local cursor position
    setMousePos({ x: e.clientX, y: e.clientY });

    if (!isDrawingRef.current || !isActiveScene) return;

    const currentTime = performance.now();
    const dt = currentTime - lastTimeRef.current || 1;
    const lastPos = lastMousePosRef.current;

    const dx = x - lastPos.x;
    const dy = y - lastPos.y;
    const dist = Math.hypot(dx, dy);
    
    // Calculate velocity (pixels per ms)
    const velocity = dist / dt;
    
    // Width is inversely proportional to velocity
    const targetWidth = Math.max(1.5, 6 - velocity * 1.5);
    
    // Add point to refs
    pointsRef.current.push({
      x,
      y,
      vx: dx / dt,
      vy: dy / dt,
      width: targetWidth,
      age: 0,
      maxAge: 3000, // fade out over 3 seconds
    });

    lastMousePosRef.current = { x, y };
    lastTimeRef.current = currentTime;
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handlePointerLeave = () => {
    isDrawingRef.current = false;
    setIsHovering(false);
  };

  const handlePointerEnter = () => {
    if (isActiveScene) {
      setIsHovering(true);
    }
  };

  return (
    <div
      ref={notebookRef}
      className={`absolute inset-0 flex flex-col justify-center items-center px-4 bg-black/40 opacity-0 scale-[0.8] translate-y-12 will-change-[transform,opacity] ${
        active ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Visual prompt above notebook */}
      <div className="text-amber-100/50 font-sans text-xs uppercase tracking-[0.2em] mb-6 select-none animate-gentle-pulse">
        {isActiveScene ? "Move your cursor to write your thoughts" : ""}
      </div>

      {/* The 3D Notebook Container */}
      <div 
        className="relative w-full max-w-4xl aspect-[4/3] max-h-[70vh] rounded-lg shadow-2xl overflow-hidden bg-[#F5F4F0] border border-amber-900/10 cursor-none flex"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(0, 0, 0, 0.05)"
        }}
      >
        {/* Subtle lined paper texture background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{
               backgroundImage: "linear-gradient(#1c1a17 1px, transparent 1px)",
               backgroundSize: "100% 28px"
             }} 
        />
        
        {/* Notebook crease & binding shadow */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-r from-black/10 via-black/20 to-black/10 z-10 border-l border-r border-black/5" />

        {/* Lefthand Page */}
        <div className="flex-1 border-r border-black/[0.03] p-8 md:p-12 relative flex flex-col justify-between select-none">
          <div className="w-8 h-px bg-amber-800/20" />
          <div className="font-serif text-sm italic text-amber-950/40 max-w-xs self-end">
            &ldquo;Every book starts as a stroke of ink.&rdquo;
          </div>
        </div>

        {/* Righthand Page */}
        <div className="flex-1 p-8 md:p-12 relative flex flex-col justify-between select-none">
          <div className="w-8 h-px bg-amber-800/20 self-end" />
          <div className="font-serif text-sm italic text-amber-950/40 max-w-xs">
            &ldquo;Your story starts here.&rdquo;
          </div>
        </div>

        {/* Canvas overlay for drawing */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerEnter={handlePointerEnter}
          className="absolute inset-0 z-20 w-full h-full touch-none"
        />
      </div>

      {/* Custom Ink Pen Nib Cursor */}
      {isHovering && isActiveScene && (
        <div
          className="fixed pointer-events-none z-50 mix-blend-difference"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-2px, -30px)" // Offset to make tip of nib match click point
          }}
        >
          <svg
            width="24"
            height="32"
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ink pen nib SVG */}
            <path
              d="M12 2L4 16C4 16 2 24 2 28C2 30.2 3.8 32 6 32H18C20.2 32 22 30.2 22 28C22 24 20 16 20 16L12 2Z"
              fill="#F5F4F0"
              stroke="#1C1A17"
              strokeWidth="2"
            />
            {/* Seam line down center of nib */}
            <path
              d="M12 12V24"
              stroke="#1C1A17"
              strokeWidth="1.5"
            />
            {/* Nib hole */}
            <circle cx="12" cy="11" r="2.5" fill="#1C1A17" />
          </svg>
        </div>
      )}
    </div>
  );
}
