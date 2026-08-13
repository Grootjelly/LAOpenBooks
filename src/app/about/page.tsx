import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About | LA Open Books',
  description: 'LA Open Books is an independent publishing studio for people who have something in their head that deserves to exist outside of it.',
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0f0f0f]/80 to-[#0a0a0a]/80 backdrop-blur-sm py-20 px-6 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-amber-500 font-mono text-xs tracking-[0.3em] uppercase mb-3">
              The Publishing Studio
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              About <span className="text-amber-500">LA Open Books</span>
            </h1>
            <div className="w-16 h-1 bg-amber-500 rounded-full mb-8" />
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="text-xl text-stone-200 leading-relaxed font-serif">
                LA Open Books is an independent publishing studio for people who have something in their head that deserves to exist outside of it.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-stone-400 leading-relaxed">
                Ideas are intangible until we give them form. We believe the identity is the book—a permanent, physical object crafted to outlive the mind that conceived it. From developmental writing support and editorial direction to bespoke typography, archival print production, and catalog placement, we provide the quiet precision craft that turns thought into artifact.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-stone-400 leading-relaxed">
                Through our imprint <strong className="text-stone-200">Bookendbook</strong>, we also craft illustrated word search and puzzle-driven nonfiction for readers who love to explore culture, history, and science through tactile challenges.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-12 border-t border-white/[0.06]">
            <ScrollReveal delay={0.4} className="text-center">
              <p className="text-3xl md:text-4.5xl font-bold text-amber-500 font-serif">100%</p>
              <p className="text-sm text-stone-400 mt-1 uppercase tracking-wider text-[10px]">Independent Craft</p>
            </ScrollReveal>
            <ScrollReveal delay={0.5} className="text-center">
              <p className="text-3xl md:text-4.5xl font-bold text-amber-500 font-serif">Archival</p>
              <p className="text-sm text-stone-400 mt-1 uppercase tracking-wider text-[10px]">Print & Materials</p>
            </ScrollReveal>
            <ScrollReveal delay={0.6} className="text-center col-span-2 md:col-span-1">
              <p className="text-3xl md:text-4.5xl font-bold text-amber-500 font-serif">Los Angeles</p>
              <p className="text-sm text-stone-400 mt-1 uppercase tracking-wider text-[10px]">Studio Location</p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
