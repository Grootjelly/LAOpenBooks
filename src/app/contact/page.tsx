import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | LA Open Books',
  description: "Get in touch with LA Open Books. Tell us about your idea or manuscript.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0f0f0f]/80 to-[#0a0a0a]/80 backdrop-blur-sm py-20 px-6 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-500 font-mono text-xs tracking-[0.3em] uppercase mb-3">
            Start the Conversation
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Begin Your <span className="text-amber-500">Book</span>
          </h1>
          <p className="text-xl text-stone-300 max-w-xl font-light">
            Have an idea, draft, or manuscript that deserves to exist outside your head? Tell us about your project.
          </p>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-8" />
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
