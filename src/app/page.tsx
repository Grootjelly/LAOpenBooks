import Hero from "@/components/Hero";
import AppsShowcase from "@/components/AppsShowcase";
import TwistingRibbon from "@/components/TwistingRibbon";
import PopButton from "@/components/PopButton";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      
      {/* Dynamic Ribbon Divider */}
      <div className="relative w-full h-[60px] bg-transparent overflow-visible">
        {/* Horizontal border line */}
        <div className="absolute inset-x-0 top-[30px] h-px bg-white/[0.06] z-10" />
        
        {/* Twisting Ribbon centered over the line */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <TwistingRibbon 
            className="w-full h-[120px] -translate-y-[30px]" 
            waveAmplitude={0.15} 
            waveSpeed={0.012}
            twistCycles={4}
            darkColors={{
              face: "#ea580c",    // Orange
              foldA: "#f59e0b",   // Amber
              foldB: "#b45309",   // Dark Amber
              foldC: "#0a0a0a"    // Blends completely with the page background!
            }}
          />
        </div>
      </div>

      <AppsShowcase />
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#111]/90 backdrop-blur-sm border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to say hello?
          </h2>
          <p className="text-lg text-stone-400 mb-10 max-w-md mx-auto leading-relaxed">
            Whether you have questions, feedback, or just want to connect — we&apos;d love to hear from you.
          </p>
          <PopButton
            href="/contact"
            className="inline-flex items-center gap-2"
          >
            Send a Message
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </PopButton>
        </div>
      </section>
    </main>
  );
}
