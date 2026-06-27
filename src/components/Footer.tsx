import Link from 'next/link';
import {
  Mail,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Send,
} from 'lucide-react';

const columns = [
  {
    title: 'For Buyers',
    links: [
      { label: 'Browse Properties', href: '/properties' },
      { label: 'Buy Land', href: '/properties?type=land' },
      { label: 'Buy a House', href: '/properties?type=house' },
      { label: 'Rentals', href: '/properties?intent=rent' },
      { label: 'Property Valuation', href: '/properties/value' },
      { label: 'Title Verification', href: '/properties/due-diligence' },
    ],
  },
  {
    title: 'For Sellers',
    links: [
      { label: 'List a Property', href: '/properties/add' },
      { label: 'List Materials', href: '/register/supplier' },
      { label: 'List Equipment', href: '/equipment' },
      { label: 'Become a Supplier', href: '/register/supplier' },
      { label: 'Join as Contractor', href: '/register/contractor' },
    ],
  },
  {
    title: 'For Pros',
    links: [
      { label: 'Architects', href: '/professionals?type=architect' },
      { label: 'Engineers', href: '/professionals?type=engineer' },
      { label: 'Quantity Surveyors', href: '/professionals?type=qs' },
      { label: 'Project Managers', href: '/professionals?type=pm' },
      { label: 'Contractors', href: '/contractors' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Trust & Safety', href: '/trust' },
      { label: 'Press', href: '/press' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative gold accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="container-x py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 mb-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold-500 text-navy-900 font-display font-extrabold text-lg">
                T
              </span>
              <span className="font-display font-extrabold text-xl">Tujenge</span>
            </Link>
            <p className="text-white/65 leading-relaxed mb-6 max-w-md">
              The verified marketplace for African construction and real estate.
              Building Africa's future, one verified transaction at a time.
            </p>

            {/* Newsletter */}
            <form className="mb-6">
              <label
                htmlFor="footer-newsletter"
                className="block font-display font-semibold text-sm mb-2"
              >
                Get market prices and investment tips
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500"
                  />
                  <input
                    id="footer-newsletter"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500/50 focus:bg-white/8 transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="mt-2 text-xs text-white/40">
                Weekly insights. No spam. Unsubscribe anytime.
              </p>
            </form>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {[
                { Icon: Twitter, label: 'X / Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-gold-500 border border-white/10 hover:border-gold-500 text-white/70 hover:text-navy-900 transition-all"
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display font-semibold text-sm mb-4 text-white">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-gold-300 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA strip */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold-500 to-gold-700 text-navy-900 p-8 lg:p-10 mb-12">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-extrabold text-2xl lg:text-3xl mb-2">
                Ready to start building?
              </h3>
              <p className="text-navy-900/80 max-w-xl">
                Whether you're buying land, building a home, or hiring
                contractors — Tujenge makes it safe, simple, and fast.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="btn btn-dark"
              >
                Get Started
              </Link>
              <Link
                href="/quote"
                className="btn"
                style={{
                  background: 'rgba(15, 23, 42, 0.08)',
                  color: '#0F172A',
                  border: '1.5px solid rgba(15, 23, 42, 0.2)',
                }}
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-white/50">
          <div>
            © {new Date().getFullYear()} Tujenge. Building Africa's future.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/terms" className="hover:text-white/80 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white/80 transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-white/80 transition-colors">
              Cookies
            </Link>
            <Link href="/trust" className="hover:text-white/80 transition-colors">
              Trust
            </Link>
            <span className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              🇰🇪 Kenya
              <span className="text-white/30">|</span>
              English
              <span className="text-white/30">|</span>
              KES
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
