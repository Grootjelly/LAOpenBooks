"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const EXPERIENCE_ROUTES = ["/"];

function ExperienceNav() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
    >
      {/* Logo — minimal, just wordmark */}
      <Link
        href="/"
        className="flex items-center gap-2 group"
        aria-label="LA OpenBooks home"
      >
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-sm shadow-amber-900/30">
          <svg
            className="w-3.5 h-3.5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <span className="text-white/70 text-sm font-semibold tracking-tight group-hover:text-white/90 transition-colors">
          LA Open<span className="text-amber-500">Books</span>
        </span>
      </Link>

      {/* Skip link — small, unobtrusive escape hatch */}
      <Link
        href="/books"
        className="text-stone-500 text-xs tracking-widest uppercase font-medium hover:text-stone-300 transition-colors duration-300 flex items-center gap-1.5 group"
      >
        Explore catalog
        <svg
          className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </motion.header>
  );
}

export default function ConditionalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isExperience = EXPERIENCE_ROUTES.includes(pathname);

  if (isExperience) {
    return (
      <>
        <ExperienceNav />
        {children}
      </>
    );
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
