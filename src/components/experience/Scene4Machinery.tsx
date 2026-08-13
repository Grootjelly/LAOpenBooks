"use client";

import { motion } from "framer-motion";

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "Writing Support",
    subtitle: "Extracting what is in your head",
    description:
      "Transforming fragmented notes, lived experience, and complex thoughts into compelling prose through structured editorial partnerships.",
    deliverables: ["Ghostwriting & Collaboration", "Structural Outlining", "Voice Calibration", "Manuscript Development"],
  },
  {
    number: "02",
    title: "Editorial Direction",
    subtitle: "Honing the voice and structure",
    description:
      "Rigorous developmental critique and line-by-line refinement. Testing every argument, pacing every chapter, and ensuring every word earns its place.",
    deliverables: ["Developmental Editing", "Line-by-Line Craft", "Tone & Rhythm Refinement", "Proofreading & Fact Checking"],
  },
  {
    number: "03",
    title: "Design & Typography",
    subtitle: "Giving thought physical weight",
    description:
      "Bespoke book design that honors the text. Proportioned margins, custom typesetting, tactile cover finishes, and clothbound casing.",
    deliverables: ["Cover Architecture", "Interior Book Typesetting", "Binding & Material Selection", "Foil Debossing & Endpapers"],
  },
  {
    number: "04",
    title: "Publishing & Production",
    subtitle: "Crafting the permanent artifact",
    description:
      "Archival-grade print manufacturing using acid-free paper and durable binding. Complete ISBN cataloging and legal deposit compliance.",
    deliverables: ["ISBN & Metadata Cataloging", "Archival Hardcover & Softcover", "Global Print-on-Demand & Offset", "Library & Trade Distribution"],
  },
  {
    number: "05",
    title: "Launch & Placement",
    subtitle: "Reaching the hands that matter",
    description:
      "Strategic introduction of the book into the cultural ecosystem. Direct fulfillment to readers, bookstores, and keynote audiences.",
    deliverables: ["Direct-to-Reader Fulfillment", "Wholesale Retail Setup", "Private Collector Editions", "Author Presentation Materials"],
  },
];

export default function Scene4Machinery() {
  return (
    <section className="relative bg-[#080808] text-[#F5F0EB] py-24 md:py-36 px-6 border-t border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-3 text-amber-500 font-mono text-xs tracking-[0.3em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>The Studio Practice</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
            The machinery behind the story.
          </h2>

          <p className="font-sans text-stone-400 text-sm sm:text-base leading-relaxed font-light">
            We don’t lead with services because tools are not the identity. But once an idea is ready to exist outside your head, this is the quiet, meticulous craft that makes it real.
          </p>
        </div>

        {/* The 5 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-sm border border-white/[0.08] bg-[#101010]/80 p-8 flex flex-col justify-between hover:border-amber-500/40 transition-colors duration-300 group ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Pillar Number */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                <span className="font-mono text-xs text-amber-500/80 tracking-widest">
                  {pillar.number}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-stone-600 group-hover:text-stone-400 transition-colors">
                  PHASE {pillar.number}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 mb-8">
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-mono text-[11px] text-stone-400 uppercase tracking-wide">
                  {pillar.subtitle}
                </p>
                <p className="font-sans text-xs text-stone-400 leading-relaxed pt-2">
                  {pillar.description}
                </p>
              </div>

              {/* Deliverable Tags */}
              <div className="border-t border-white/[0.06] pt-4 space-y-1.5">
                {pillar.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[11px] font-mono text-stone-500"
                  >
                    <span className="text-amber-500/60 text-[9px]">↳</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Hover Accent Glow */}
              <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
