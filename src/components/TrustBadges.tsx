import Image from 'next/image';
import {
  ShieldCheck,
  BadgeCheck,
  FileCheck,
  Lock,
  PiggyBank,
  Building,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';
import { images } from '@/lib/images';

const badges = [
  {
    icon: BadgeCheck,
    title: 'Verified Suppliers',
    description: 'Business registration, tax PIN, and operations verified.',
    image: images.handShakeBusiness,
  },
  {
    icon: ShieldCheck,
    title: 'Verified Contractors',
    description: 'Licensed, bonded, and insurance-verified.',
    image: images.safetyGear,
  },
  {
    icon: FileCheck,
    title: 'Verified Documents',
    description: 'Title deeds and legal documents cross-checked.',
    image: images.blueprint,
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'PCI-compliant, M-Pesa + Stripe + bank-grade security.',
    image: images.siteAerial,
  },
  {
    icon: PiggyBank,
    title: 'Escrow Protection',
    description: 'Funds held safely until milestones are completed.',
    image: images.contractor3,
  },
  {
    icon: Building,
    title: 'Verified Properties',
    description: 'Title verified through official registries.',
    image: images.africanConstruction,
  },
];

const stats = [
  { value: 15000, suffix: '+', label: 'Verified Projects Completed' },
  { value: 1200, suffix: '+', label: 'Professionals on Platform' },
  { value: 220, prefix: '$', suffix: 'M', label: 'Project Value Managed' },
  { value: 99, suffix: '%', label: 'Dispute Resolution Rate' },
];

export default function TrustBadges() {
  return (
    <section className="section bg-white relative">
      <div className="container-x">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <div className="eyebrow mb-4">Trust is the foundation</div>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-navy-900 mb-5">
            Every transaction is{' '}
            <span className="text-gradient-gold">protected.</span>
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            Six layers of verification. Backed by licensed escrow partners and
            a $5M insurance reserve.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {badges.map((badge, i) => (
            <ScrollReveal
              key={badge.title}
              delay={i * 80}
              className="card card-interactive overflow-hidden group"
            >
              {/* Image header */}
              <div className="relative aspect-[16/9] overflow-hidden bg-navy-100">
                <Image
                  src={badge.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
                <div className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-lg bg-white/95 backdrop-blur-sm ring-1 ring-emerald-500/30 group-hover:bg-emerald-500 transition-all">
                  <badge.icon
                    className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="font-display font-semibold text-base text-navy-900 mb-1.5">
                  {badge.title}
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="relative rounded-3xl bg-navy-900 text-white p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-[0.05]" aria-hidden />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display font-extrabold text-3xl lg:text-4xl text-gold-300 mb-2 tabular-nums">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/70 text-sm leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
