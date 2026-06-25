import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-auto">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-bold text-lg text-stone-100">
                LA Open<span className="text-amber-500">Books</span>
              </span>
            </Link>
            <p className="text-sm text-stone-500 leading-relaxed max-w-xs">
              Independent publisher based in Los Angeles. Creating books that educate, inspire, and entertain.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-200 font-semibold text-sm uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/books" className="text-sm hover:text-amber-400 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://gonzotyper.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                >
                  GonzoTyper
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h3 className="text-stone-200 font-semibold text-sm uppercase tracking-wider mb-4">
              Find Our Books
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-amber-400 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 4.27V19.73L6.5 16.5 12 19.5l5.5-3L23 19.73V4.27L17.5 7.5 12 4.5 6.5 7.5 1 4.27z" />
                  </svg>
                  Amazon
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} Bookendbook. All rights reserved.
          </p>
          <p className="text-xs text-stone-600">
            Made with ♥ in Los Angeles
          </p>
        </div>
      </div>
    </footer>
  );
}
