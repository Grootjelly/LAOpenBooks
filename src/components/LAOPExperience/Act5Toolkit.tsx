"use client";

import React, { useState } from "react";

interface ToolkitCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

interface Act5ToolkitProps {
  toolkitRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
}

export default function Act5Toolkit({ toolkitRef, active }: Act5ToolkitProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const cards: ToolkitCard[] = [
    {
      id: "publish",
      icon: "📚",
      title: "Publish",
      subtitle: "Every story deserves its cover.",
      description: "Professional developmental editing, interior layout typesetting, custom dust-jacket design, and global distribution logistics.",
      features: ["Developmental Editing", "Fine-press Typesetting", "Jacket Design", "Global Distribution"],
    },
    {
      id: "build",
      icon: "🌐",
      title: "Build",
      subtitle: "Your digital flagship.",
      description: "Custom high-performance Next.js portfolios, authority landing pages, and interactive dashboards tailored to host your intellectual assets.",
      features: ["Next.js Architecture", "Premium Portfolios", "Interactive Dashboards", "SEO Optimization"],
    },
    {
      id: "launch",
      icon: "📣",
      title: "Launch",
      subtitle: "Broadcast your arrival.",
      description: "Curated media campaigns, press release distribution, podcast booking tours, and search positioning to ensure your voice rises above the noise.",
      features: ["Press Campaigns", "Podcast Booking", "SEO Outreach", "PR Distribution"],
    },
    {
      id: "automate",
      icon: "🤖",
      title: "Automate",
      subtitle: "Leverage machine intelligence.",
      description: "AI-assisted drafting assistants like GonzoTyper, personalized content search engines, and smart automation pipelines to multiply your output.",
      features: ["GonzoTyper Integration", "AI Drafting Tools", "Custom RAG Pipelines", "Content Workflows"],
    },
    {
      id: "grow",
      icon: "📈",
      title: "Grow",
      subtitle: "Extend your authority.",
      description: "Strategic newsletter monetization, audience funnel optimization, premium membership design, and community scaling blueprints.",
      features: ["Newsletter Strategy", "Audience Funnels", "Paid Memberships", "Community Blueprints"],
    },
    {
      id: "speak",
      icon: "🎤",
      title: "Speak",
      subtitle: "Command the stage.",
      description: "Stunning keynote deck architecture, speaker reels, booking pipelines, and authority scripts to place you on the stages that matter.",
      features: ["Keynote Design", "Speaker Portals", "Booking Automations", "Speech Architecture"],
    },
  ];

  return (
    <div
      ref={toolkitRef}
      className={`absolute inset-0 flex flex-col justify-center items-center px-6 bg-[#080808] overflow-y-auto md:overflow-hidden select-none py-16 opacity-0 translate-y-8 ${
        active ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Background Lights */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-amber-500/[0.015] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-orange-600/[0.015] blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mb-10 md:mb-12">
        <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide">
          Your Authority Toolkit
        </h2>
        <p className="mt-4 font-sans text-xs md:text-sm text-neutral-400 uppercase tracking-[0.2em] leading-relaxed">
          Six pillars built to shape your ideas into an identity.
        </p>
      </div>

      {/* Toolkit Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 px-2">
        {cards.map((card) => {
          const isSelected = expandedCard === card.id;

          return (
            <div
              key={card.id}
              onClick={() => setExpandedCard(isSelected ? null : card.id)}
              className={`group relative rounded-xl border border-white/[0.06] bg-neutral-950/60 p-6 backdrop-blur-xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[220px] ${
                isSelected
                  ? "border-amber-500/40 ring-1 ring-amber-500/20 bg-neutral-900/80 shadow-2xl scale-[1.02]"
                  : "hover:border-white/[0.12] hover:bg-neutral-900/30 hover:shadow-lg"
              }`}
            >
              {/* Subtle ambient hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* CARD TOP (Icon + Interactive Animation Panel) */}
              <div className="flex justify-between items-start">
                <span className="text-3xl filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.2)]">{card.icon}</span>

                {/* DYNAMIC HOVER ANIMATIONS */}
                <div className="w-16 h-16 flex items-center justify-center relative overflow-visible">
                  
                  {/* 📚 PUBLISH ANIMATION: 3D Book Opens */}
                  {card.id === "publish" && (
                    <div className="perspective-500 w-8 h-12 relative flex items-center justify-center">
                      {/* Left cover (spines) */}
                      <div className="absolute left-[3px] top-[2px] bottom-[2px] w-[3px] bg-amber-800 rounded-l z-20" />
                      {/* Opening cover */}
                      <div className="w-full h-full origin-left bg-gradient-to-r from-amber-700 to-amber-600 rounded-r border-r border-amber-800/20 shadow-md absolute inset-0 z-30 transition-transform duration-500 group-hover:[transform:rotateY(-110deg)]" />
                      {/* Pages beneath */}
                      <div className="w-[88%] h-[88%] bg-[#FAF9F5] border border-neutral-300 rounded-r absolute top-[6%] right-0 z-10 shadow flex flex-col gap-1 p-1">
                        <div className="h-0.5 bg-neutral-300 w-full rounded-full" />
                        <div className="h-0.5 bg-neutral-300 w-4/5 rounded-full" />
                        <div className="h-0.5 bg-neutral-300 w-5/6 rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* 🌐 BUILD ANIMATION: Website Loads */}
                  {card.id === "build" && (
                    <div className="w-12 h-10 border border-white/10 rounded-md bg-black/40 overflow-hidden flex flex-col">
                      <div className="h-2 border-b border-white/5 bg-white/5 px-1 flex gap-0.5 items-center">
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                      </div>
                      <div className="flex-grow p-1 flex flex-col gap-1 relative">
                        <div className="w-full h-0.5 bg-amber-500/30 rounded scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                        <div className="w-2/3 h-1 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                        <div className="w-full h-2 bg-white/5 rounded border border-dashed border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-400" />
                      </div>
                    </div>
                  )}

                  {/* 📣 LAUNCH ANIMATION: Concentric Waves */}
                  {card.id === "launch" && (
                    <div className="w-12 h-12 relative flex items-center justify-center">
                      <div className="absolute w-2 h-2 rounded-full bg-amber-500" />
                      <div className="absolute w-6 h-6 rounded-full border border-amber-500/20 scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-1000 ease-out" />
                      <div className="absolute w-10 h-10 rounded-full border border-amber-500/25 scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-1000 delay-300 ease-out" />
                    </div>
                  )}

                  {/* 🤖 AUTOMATE ANIMATION: Orbiting Particles */}
                  {card.id === "automate" && (
                    <div className="w-12 h-12 relative flex items-center justify-center">
                      {/* Central core */}
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      {/* Orbiting ring */}
                      <div className="absolute w-8 h-8 rounded-full border border-dashed border-amber-500/20 animate-spin group-hover:border-amber-500/50 group-hover:scale-115 transition-all duration-500" style={{ animationDuration: "8s" }} />
                      {/* Orbiting particle */}
                      <div className="absolute w-1 h-1 rounded-full bg-amber-400 top-1.5 left-1.5 group-hover:bg-amber-300 transition-colors" />
                    </div>
                  )}

                  {/* 📈 GROW ANIMATION: Chart Bar Grow */}
                  {card.id === "grow" && (
                    <div className="w-10 h-8 flex gap-1 items-end justify-center">
                      <div className="w-1.5 h-2 bg-white/20 rounded-t group-hover:h-3 group-hover:bg-amber-500/60 transition-all duration-300" />
                      <div className="w-1.5 h-4 bg-white/20 rounded-t group-hover:h-7 group-hover:bg-amber-500/80 transition-all duration-300 delay-75" />
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-t group-hover:h-5 group-hover:bg-amber-500 transition-all duration-300 delay-150" />
                    </div>
                  )}

                  {/* 🎤 SPEAK ANIMATION: Audio Wave lines bouncing */}
                  {card.id === "speak" && (
                    <div className="w-12 h-8 flex gap-0.5 items-center justify-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-[2px] bg-white/30 rounded-full transition-all duration-300"
                          style={{
                            height: "6px",
                            animation: active ? `bounce 1.5s ease-in-out infinite` : "none",
                            animationDelay: `${i * 0.15}s`,
                            animationPlayState: "paused" // only play on hover
                          }}
                          // Add local styles dynamically for hover play
                        />
                      ))}
                      {/* Add custom styling for speak hover bounce */}
                      <style jsx>{`
                        .group:hover div[class*="bg-white/30"] {
                          animation-play-state: running !important;
                          background-color: rgb(245, 158, 11) !important;
                        }
                        @keyframes bounce {
                          0%, 100% { height: 6px; }
                          50% { height: 24px; }
                        }
                      `}</style>
                    </div>
                  )}

                </div>
              </div>

              {/* CARD INFO */}
              <div className="mt-6">
                <h3 className="font-serif text-lg text-white group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h3>
                <p className="mt-1 font-sans text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  {card.subtitle}
                </p>
              </div>

              {/* EXPANDABLE SECTION */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isSelected ? "max-h-[220px] mt-4 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] font-mono bg-white/5 border border-white/5 text-amber-200/90 py-0.5 px-2 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expand Toggle Chevron */}
              <div className="mt-4 flex justify-end text-neutral-600 group-hover:text-amber-500/70 transition-colors">
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    isSelected ? "rotate-180 text-amber-500" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
