import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | LA Open Books',
  description: "Get in touch with Bookendbook. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] py-20 px-6 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in <span className="text-amber-500">Touch</span>
          </h1>
          <p className="text-xl text-stone-400 max-w-xl">
            Have a question, feedback, or just want to say hello? We'd love to hear from you.
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
