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

const badges = [
  {
    icon: BadgeCheck,
    title: 'Verified Suppliers',
    description: 'Business registration, tax PIN, and operations verified.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Contractors',
    description: 'Licensed, bonded, and insurance-verified.',
  },
  {
    icon: FileCheck,
    title: 'Verified Documents',
    description: 'Title deeds and legal documents cross-checked.',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'PCI-compliant, M-Pesa + Stripe + bank-grade security.',
  },
  {
    icon: PiggyBank,
    title: 'Escrow Protection',
    description: 'Funds held safely until milestones are completed.',
  },
  {
    icon: Building,
    title: 'Verified Properties',
    description: 'Title verified through official registries.',
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
              className="card card-interactive p-6 lg:p-7 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500 group-hover:ring-emerald-500 transition-all flex-shrink-0">
                  <badge.icon
                    className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-base text-navy-900 mb-1.5">
                    {badge.title}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats band */}
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
