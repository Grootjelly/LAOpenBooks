import React from 'react';
import InstagramTooltip from './InstagramTooltip';

export default function SocialMediaSection() {
  return (
    <section className="w-full py-16 flex justify-center items-center bg-[#0a0a0a] relative z-40 border-t border-white/[0.06]">
      <div className="flex gap-8 items-center max-w-6xl mx-auto px-6 w-full justify-center">
        <InstagramTooltip />
        {/* Placeholder for future links */}
      </div>
    </section>
  );
}
