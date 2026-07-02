import Hero from "@/components/Hero";
import AppsShowcase from "@/components/AppsShowcase";
import TwistingRibbon from "@/components/TwistingRibbon";
import GetInTouch from "@/components/GetInTouch";

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
      
      <GetInTouch />
    </main>
  );
}
