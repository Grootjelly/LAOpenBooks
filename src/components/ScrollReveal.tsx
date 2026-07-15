"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children,
  delay = 0,
  y = 20,
  className
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Set translation vertical offset to 0 if accessibility mode is on
  const yVal = shouldReduceMotion ? 0 : y;

  return (
    <motion.div
      initial={{ opacity: 0, y: yVal }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
