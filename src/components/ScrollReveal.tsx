"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 20,
  blur = false,
  className
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // Set translation vertical offset to 0 if accessibility mode is on
  const yVal = shouldReduceMotion ? 0 : y;
  const useBlur = blur && !shouldReduceMotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: yVal, ...(useBlur && { filter: "blur(8px)" }) }}
      whileInView={{ opacity: 1, y: 0, ...(useBlur && { filter: "blur(0px)" }) }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
