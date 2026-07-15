"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "py-2 bg-[#0a0a0a]/90 backdrop-blur-md border-white/[0.08] shadow-lg shadow-black/40" 
          : "py-4 bg-[#0a0a0a]/40 backdrop-blur-sm border-white/[0.04]"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300">
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-sm shadow-amber-900/40 group-hover:shadow-amber-600/40 transition-shadow">
            <svg className="w-4.5 h-4.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            LA Open<span className="text-amber-500">Books</span>
          </span>
        </Link>

        {/* Links Center */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors py-1 select-none",
                  "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-[0%] hover:after:w-[100%] after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 after:origin-left",
                  isActive 
                    ? "text-white after:w-full" 
                    : "text-stone-400 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Explore CTA Right */}
        <div className="hidden md:flex items-center">
          <Link
            href="/books"
            className="px-4 py-2 rounded-lg text-xs font-semibold text-black bg-amber-500 hover:bg-amber-400 transition-all duration-200 flex items-center gap-1.5 shadow-sm shadow-amber-900/40"
          >
            Explore Collection
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <MobileMenuButton pathname={pathname} />
      </nav>
    </header>
  );
}

function MobileMenuButton({ pathname }: { pathname: string }) {
  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors">
          <svg className="w-6 h-6 text-stone-300 group-open:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg className="w-6 h-6 text-stone-300 hidden group-open:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-56 bg-[#111] rounded-xl shadow-2xl shadow-black/60 border border-white/10 py-2 z-50">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-2.5 text-sm transition-colors",
                  isActive ? "text-amber-500 font-semibold bg-white/5" : "text-stone-400 hover:text-amber-400 hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="border-t border-white/10 my-1" />
          <Link
            href="/books"
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-amber-400 hover:bg-white/5 transition-colors font-medium"
          >
            Explore Collection
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </details>
    </div>
  );
}
