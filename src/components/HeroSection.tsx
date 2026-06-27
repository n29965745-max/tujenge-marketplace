import Link from 'next/link';
import {
  ShieldCheck,
  BadgeCheck,
  FileCheck,
  Lock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const trustItems = [
  { icon: BadgeCheck, label: 'Verified Suppliers' },
  { icon: BadgeCheck, label: 'Verified Contractors' },
  { icon: FileCheck, label: 'Verified Properties' },
  { icon: Lock, label: 'Secure Transactions' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-navy-900 text-white pt-[72px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero_background.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
        {/* Multi-layer gradient overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-navy-900/40" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-hero-pattern" />
      </div>

      {/* Floating gold orbs */}
      <div
        className="absolute top-1/4 right-[10%] w-72 h-72 rounded-full bg-gold-500/10 blur-3xl animate-float"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 left-[5%] w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
        aria-hidden
      />

      <div className="container-x relative z-10 py-20 lg:py-28">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold tracking-wide uppercase animate-fade-up"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-300" strokeWidth={2.5} />
            Building the future of Africa
          </div>

          {/* Main headline */}
          <h1
            className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05] tracking-[-0.025em] mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Everything You Need to{' '}
            <span className="text-gradient-gold">Build, Buy, Rent</span>{' '}
            or Invest in Property.
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mb-10 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Find land, hire contractors, buy materials and complete your project with
            trusted professionals. One verified marketplace for all of Africa.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4 mb-12 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link
              href="/build"
              className="btn btn-primary btn-lg ripple-host"
            >
              Build My Project
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
            <Link
              href="/properties"
              className="btn btn-secondary-on-dark btn-lg"
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Browse Properties
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap items-center gap-x-7 gap-y-3 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-white/85 text-sm font-medium"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
                  <Icon className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Floating stat card */}
        <div
          className="hidden lg:flex absolute right-[8%] top-[28%] bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/30 max-w-[260px] animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gold-500/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-gold-500" strokeWidth={2} />
            </div>
            <div>
              <div className="text-xs text-navy-600 font-semibold uppercase tracking-wide">
                Escrow Protected
              </div>
              <div className="text-[0.7rem] text-navy-500">Active transactions</div>
            </div>
          </div>
          <div className="font-display font-bold text-2xl text-navy-900 mb-1">
            $2.4M
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            1,247 milestones protected this month
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-fade-up"
        style={{ animationDelay: '0.8s' }}
      >
        <span className="text-xs uppercase tracking-[0.2em] font-semibold">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
