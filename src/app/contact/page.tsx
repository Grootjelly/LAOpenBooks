import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Contact | LA Open Books',
  description: "Get in touch with Bookendbook. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Say hello"
        title="Get in"
        accent="Touch"
        subtitle="Have a question, feedback, or just want to say hello? We'd love to hear from you."
      />

      {/* Form */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_280px] gap-12 items-start">
          <ScrollReveal>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500/80 mb-3">
                Based in
              </p>
              <p className="text-stone-200 font-serif text-lg">Los Angeles, CA</p>
              <p className="text-stone-500 text-sm mt-1">Independent publishing studio</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500/80 mb-3">
                Response time
              </p>
              <p className="text-stone-200 font-serif text-lg">1–2 business days</p>
              <p className="text-stone-500 text-sm mt-1">We read every message.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
