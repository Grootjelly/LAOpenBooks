import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About | LA Open Books',
  description: 'Learn about Bookendbook — an independent publisher of puzzle-driven nonfiction and illustrated word search activity books.',
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0f0f0f]/80 to-[#0a0a0a]/80 backdrop-blur-sm py-20 px-6 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              About <span className="text-amber-500">Bookendbook</span>
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
                Bookendbook is an independent publisher based in Los Angeles, dedicated to crafting puzzle-driven nonfiction for readers who like to learn by doing. We specialize in illustrated word searches and interactive activity books that transform history, culture, and science into engaging, tactile challenges.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-stone-400 leading-relaxed">
                Every title in our catalog is created with meticulous care, merging rigorous research with high-fidelity visual design and custom layout structures. Rather than just offering dry text, we design puzzles that invite you to explore the world’s greatest breakthroughs, cultural milestones, and historical epochs one search at a time.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-stone-400 leading-relaxed">
                We believe that learning is most powerful when it is active, tactile, and fun. By blending puzzle design with rich educational storytelling, we create experiences that spark curiosity and keep minds active at any age.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-12 border-t border-white/[0.06]">
            <ScrollReveal delay={0.4} className="text-center">
              <p className="text-3xl md:text-4.5xl font-bold text-amber-500 font-serif">8+</p>
              <p className="text-sm text-stone-400 mt-1 uppercase tracking-wider text-[10px]">Publications</p>
            </ScrollReveal>
            <ScrollReveal delay={0.5} className="text-center">
              <p className="text-3xl md:text-4.5xl font-bold text-amber-500 font-serif">1000+</p>
              <p className="text-sm text-stone-400 mt-1 uppercase tracking-wider text-[10px]">Puzzles Designed</p>
            </ScrollReveal>
            <ScrollReveal delay={0.6} className="text-center col-span-2 md:col-span-1">
              <p className="text-3xl md:text-4.5xl font-bold text-amber-500 font-serif">LA</p>
              <p className="text-sm text-stone-400 mt-1 uppercase tracking-wider text-[10px]">Based Studio</p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
