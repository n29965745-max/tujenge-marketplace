'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/properties', label: 'Properties' },
  { href: '/materials', label: 'Materials' },
  { href: '/professionals', label: 'Professionals' },
  { href: '/contractors', label: 'Contractors' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/financing', label: 'Financing' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || !isHome
            ? 'glass shadow-sm'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <nav className="container-x flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-extrabold text-[1.4rem] tracking-tight"
          >
            <span
              className={clsx(
                'flex items-center justify-center w-9 h-9 rounded-lg font-display font-extrabold text-lg transition-colors',
                scrolled || !isHome
                  ? 'bg-primary text-white'
                  : 'bg-gold-500 text-primary'
              )}
              aria-hidden
            >
              T
            </span>
            <span
              className={clsx(
                'transition-colors',
                scrolled || !isHome ? 'text-navy-900' : 'text-white'
              )}
            >
              Tujenge
            </span>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'font-display font-medium text-[0.95rem] transition-colors hover:text-gold-500',
                    scrolled || !isHome
                      ? 'text-navy-900'
                      : 'text-white/90 hover:text-gold-300'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-full transition-colors',
                scrolled || !isHome
                  ? 'text-navy-700 hover:bg-navy-100'
                  : 'text-white hover:bg-white/10'
              )}
            >
              <Search className="w-5 h-5" strokeWidth={2} />
            </button>
            <Link
              href="/login"
              className={clsx(
                'font-display font-semibold text-[0.95rem] px-4 py-2 rounded-lg transition-colors',
                scrolled || !isHome
                  ? 'text-navy-900 hover:bg-navy-100'
                  : 'text-white hover:bg-white/10'
              )}
            >
              Sign In
            </Link>
            <Link href="/build" className="btn btn-primary btn-sm">
              Get Started
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={clsx(
              'lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors',
              scrolled || !isHome
                ? 'text-navy-900 hover:bg-navy-100'
                : 'text-white hover:bg-white/10'
            )}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={clsx(
          'lg:hidden fixed inset-0 z-40 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={clsx(
            'absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-premium flex flex-col',
            open ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="h-[72px] flex items-center justify-between px-5 border-b border-navy-200">
            <span className="font-display font-extrabold text-lg text-navy-900">
              Tujenge
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-navy-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-navy-900" />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto p-5 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between font-display font-medium text-navy-900 text-lg px-3 py-3 rounded-lg hover:bg-navy-100 transition-colors"
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4 -rotate-90 text-navy-400" />
                </Link>
              </li>
            ))}
            <li className="pt-4 space-y-3">
              <Link
                href="/login"
                className="btn btn-outline w-full"
              >
                Sign In
              </Link>
              <Link href="/build" className="btn btn-primary w-full">
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
