import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/apps', label: 'Apps' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/[0.06]">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-stone-400 hover:text-amber-400 hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-6 bg-white/10 mx-2" />
          <a
            href="https://gonzotyper.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-black bg-amber-500 hover:bg-amber-400 transition-all duration-200 flex items-center gap-1.5 shadow-sm shadow-amber-900/40"
          >
            Try GonzoTyper
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <MobileMenuButton />
      </nav>
    </header>
  );
}

function MobileMenuButton() {
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
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-sm text-stone-400 hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/10 my-1" />
          <a
            href="https://gonzotyper.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-amber-400 hover:bg-white/5 transition-colors"
          >
            GonzoTyper
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </details>
    </div>
  );
}
