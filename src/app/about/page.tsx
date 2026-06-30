import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | LA Open Books',
  description: 'Learn about Bookendbook — an independent publisher creating books that educate, inspire, and entertain.',
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0f0f0f]/80 to-[#0a0a0a]/80 backdrop-blur-sm py-20 px-6 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-amber-500">Bookendbook</span>
          </h1>
          <div className="w-16 h-1 bg-amber-500 rounded-full mb-8" />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-stone-300 leading-relaxed">
              Bookendbook is an independent publisher based in Los Angeles, dedicated to creating books that educate, inspire, and entertain. From coloring books that spark creativity to non-fiction works that illuminate history, our catalog spans a diverse range of genres and interests.
            </p>
            <p className="text-lg text-stone-400 leading-relaxed">
              Every book we publish is crafted with care, combining compelling content with thoughtful design. Whether you're looking for a creative outlet, a deep dive into history, or a thought-provoking read, there's something in our collection for you.
            </p>
            <p className="text-lg text-stone-400 leading-relaxed">
              We believe that books have the power to transform perspectives, ignite curiosity, and bring people together. That belief drives everything we do.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-12 border-t border-white/[0.06]">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">8+</p>
              <p className="text-sm text-stone-400 mt-1">Published Titles</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">6+</p>
              <p className="text-sm text-stone-400 mt-1">Genres</p>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <p className="text-3xl font-bold text-amber-500">LA</p>
              <p className="text-sm text-stone-400 mt-1">Based</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
