"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  speedX: number;
  speedY: number;
  angle: number;
  angleSpeed: number;
}

export default function AtmosphereParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 30000));
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const baseOpacity = Math.random() * 0.25 + 0.05;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          baseOpacity,
          opacity: baseOpacity,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Dynamic drift movement
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angleSpeed;

        // Float oscillation wave
        p.x += Math.sin(p.angle) * 0.05;
        p.y += Math.cos(p.angle) * 0.05;

        // Boundary wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction (gentle repulsion)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150; // 0 to 1
          const angle = Math.atan2(dy, dx);
          // Gently push particle away
          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
          // Temporarily glow/brighten particle
          p.opacity = Math.min(0.6, p.baseOpacity + force * 0.35);
        } else {
          // Fade back to baseline opacity
          p.opacity += (p.baseOpacity - p.opacity) * 0.02;
        }

        // Draw particle
        ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-40 w-full h-full"
    />
  );
}
