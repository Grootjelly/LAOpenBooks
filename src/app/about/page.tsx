import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import PageHero from '@/components/PageHero';
import AboutTimeline from '@/components/AboutTimeline';
import CountUp from '@/components/CountUp';

export const metadata: Metadata = {
  title: 'About | LA Open Books',
  description: 'Learn about Bookendbook — an independent publisher of puzzle-driven nonfiction and illustrated word search activity books.',
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Independent Publisher — Los Angeles"
        title="About"
        accent="Bookendbook"
        subtitle="Puzzle-driven nonfiction for readers who like to learn by doing."
      />

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <ScrollReveal blur delay={0.05}>
              <p className="text-xl text-stone-200 leading-relaxed font-serif">
                Bookendbook is an independent publisher based in Los Angeles, dedicated to crafting puzzle-driven nonfiction for readers who like to learn by doing. We specialize in illustrated word searches and interactive activity books that transform history, culture, and science into engaging, tactile challenges.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg text-stone-400 leading-relaxed">
                Every title in our catalog is created with meticulous care, merging rigorous research with high-fidelity visual design and custom layout structures. Rather than just offering dry text, we design puzzles that invite you to explore the world&rsquo;s greatest breakthroughs, cultural milestones, and historical epochs one search at a time.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-lg text-stone-400 leading-relaxed">
                We believe that learning is most powerful when it is active, tactile, and fun. By blending puzzle design with rich educational storytelling, we create experiences that spark curiosity and keep minds active at any age.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats Grid — counts up as it scrolls into view */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-14 border-t border-white/[0.06]">
            <ScrollReveal delay={0.1} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-amber-500 font-serif">
                <CountUp to={8} suffix="+" />
              </p>
              <p className="text-stone-400 mt-2 uppercase tracking-wider text-[10px]">Publications</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-amber-500 font-serif">
                <CountUp to={1000} suffix="+" duration={2.2} />
              </p>
              <p className="text-stone-400 mt-2 uppercase tracking-wider text-[10px]">Puzzles Designed</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="text-center col-span-2 md:col-span-1">
              <p className="text-4xl md:text-5xl font-bold text-amber-500 font-serif">LA</p>
              <p className="text-stone-400 mt-2 uppercase tracking-wider text-[10px]">Based Studio</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process timeline — line draws itself as you scroll */}
      <section className="py-20 px-6 dark-section">
        <div className="max-w-3xl mx-auto">
          <AboutTimeline />
        </div>
      </section>
    </main>
  );
}
