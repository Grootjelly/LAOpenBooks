"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

interface HeroCover {
  src: string;
  alt: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  covers?: HeroCover[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

function FloatingCover({
  cover,
  y,
  rotate,
  className,
  delay,
}: {
  cover: HeroCover;
  y: MotionValue<number> | number;
  rotate: number;
  className: string;
  delay: number;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <motion.div
      className={`absolute rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 ${className}`}
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        className="object-cover"
        sizes="200px"
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </motion.div>
  );
}

export default function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  covers = [],
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  // Content lifts and fades as the hero scrolls out of view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);

  // Floating covers drift at different speeds
  const coverY0 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -110]);
  const coverY1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const coverY2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -160]);
  const coverYs = [coverY0, coverY1, coverY2];
  const coverLayouts = [
    { className: "w-[170px] aspect-[5/7] right-[16%] top-[12%] z-[2]", rotate: 6 },
    { className: "w-[140px] aspect-[5/7] right-[5%] top-[38%] z-[1]", rotate: -8 },
    { className: "w-[120px] aspect-[5/7] right-[27%] top-[48%] z-[3]", rotate: -3 },
  ];

  const words = title.split(" ");
  const initialWord = reduced
    ? undefined
    : { opacity: 0, y: 28, filter: "blur(8px)" };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]"
    >
      {/* Dotted grid texture */}
      <div className="absolute inset-0 hero-grid-bg opacity-60 pointer-events-none" />

      {/* Parallax glow blobs */}
      <motion.div
        className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          y: glowY,
          background:
            "radial-gradient(circle, rgba(217,119,6,0.14) 0%, transparent 65%)",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          y: glowY,
          background:
            "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Floating parallax covers (desktop only) */}
      {covers.length > 0 && (
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          {covers.slice(0, 3).map((cover, i) => (
            <FloatingCover
              key={cover.src}
              cover={cover}
              y={coverYs[i]}
              rotate={coverLayouts[i].rotate}
              className={coverLayouts[i].className}
              delay={0.3 + i * 0.15}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative max-w-6xl mx-auto px-6 py-24 md:py-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {eyebrow && (
          <motion.p
            className="text-[11px] font-mono uppercase tracking-[0.35em] text-amber-500/80 mb-6"
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
        )}

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.08] max-w-3xl">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block mr-[0.26em]"
              initial={initialWord}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease: EASE }}
            >
              {word}
            </motion.span>
          ))}
          {accent &&
            accent.split(" ").map((word, i) => (
              <motion.span
                key={`accent-${word}-${i}`}
                className="inline-block mr-[0.26em] text-amber-500"
                initial={initialWord}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + (words.length + i) * 0.09,
                  ease: EASE,
                }}
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-stone-400 max-w-xl mt-6 leading-relaxed"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          className="w-16 h-1 bg-amber-500 rounded-full mt-8 origin-left"
          initial={reduced ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
        />
      </motion.div>
    </section>
  );
}
