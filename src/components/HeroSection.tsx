import Image from 'next/image';
import Link from 'next/link';
import {
  BadgeCheck,
  FileCheck,
  Lock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { images } from '@/lib/images';

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
        <Image
          src={images.heroConstruction}
          alt="Modern African construction site with workers and materials"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
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

        {/* Floating stat card with construction image */}
        <div
          className="hidden lg:block absolute right-[8%] top-[22%] w-[280px] animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/30 backdrop-blur-md bg-white/95">
            <div className="relative h-32">
              <Image
                src={images.safetyGear}
                alt="Construction worker in safety gear"
                fill
                sizes="280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[0.65rem] uppercase tracking-wide font-semibold text-navy-500">
                  Escrow Protected
                </span>
              </div>
              <div className="font-display font-bold text-2xl text-navy-900 mb-1">
                $2.4M
              </div>
              <div className="text-xs text-navy-500">
                1,247 milestones protected this month
              </div>
            </div>
          </div>
        </div>

        {/* Secondary floating card */}
        <div
          className="hidden xl:block absolute right-[3%] bottom-[18%] w-[260px] animate-fade-up"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-white/95 backdrop-blur-md p-3">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={images.materialCement}
                  alt="Cement bags"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[0.65rem] uppercase tracking-wide font-semibold text-gold-700">
                  Live price
                </div>
                <div className="font-display font-bold text-sm text-navy-900 truncate">
                  Dangote 50kg
                </div>
                <div className="text-xs text-navy-500">KES 750 · +0.5% this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-fade-up"
        style={{ animationDelay: '0.9s' }}
      >
        <span className="text-xs uppercase tracking-[0.2em] font-semibold">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
