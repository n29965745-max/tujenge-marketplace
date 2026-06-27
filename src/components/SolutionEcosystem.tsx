import Link from 'next/link';
import {
  Home,
  Layers,
  HardHat,
  Compass,
  Truck,
  Wallet,
  BarChart3,
  ArrowRight,
  Wrench,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    icon: Home,
    title: 'Properties',
    description:
      'Buy, rent, or lease verified land, homes, apartments, and commercial space.',
    href: '/properties',
  },
  {
    icon: Layers,
    title: 'Building Materials',
    description:
      'Cement, steel, timber, paint — verified suppliers with live market prices.',
    href: '/materials',
  },
  {
    icon: HardHat,
    title: 'Contractors',
    description:
      'General contractors and trade specialists, vetted and reviewed.',
    href: '/contractors',
  },
  {
    icon: Compass,
    title: 'Professionals',
    description:
      'Architects, engineers, quantity surveyors, and project managers.',
    href: '/professionals',
  },
  {
    icon: Wrench,
    title: 'Equipment Hire',
    description:
      'Excavators, cranes, mixers, scaffolding — booked with delivery included.',
    href: '/equipment',
  },
  {
    icon: Truck,
    title: 'Logistics',
    description:
      'Tipper trucks, pickups, and crane transport for materials and equipment.',
    href: '/logistics',
  },
  {
    icon: Wallet,
    title: 'Financing',
    description:
      'Mortgages, construction loans, and insurance from partner institutions.',
    href: '/financing',
  },
  {
    icon: BarChart3,
    title: 'Project Management',
    description:
      'Schedules, budgets, milestone tracking, and daily progress reports.',
    href: '/projects',
  },
];

export default function SolutionEcosystem() {
  return (
    <section className="section bg-white relative">
      <div className="container-x">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <div className="eyebrow mb-4">The solution</div>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-navy-900 mb-5">
            One Platform.{' '}
            <span className="text-gradient-gold">Every Construction Need.</span>
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            Tujenge is the verified marketplace where every side of African
            construction meets. Browse, compare, hire, and build — all in one
            trusted ecosystem.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {services.map((service, i) => (
            <ScrollReveal
              key={service.title}
              delay={(i % 4) * 80}
              className="card card-interactive p-6 group"
            >
              <Link href={service.href} className="flex flex-col h-full">
                <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-gold-500/10 ring-1 ring-gold-500/20 group-hover:bg-gold-500 group-hover:ring-gold-500 transition-all">
                  <service.icon
                    className="w-6 h-6 text-gold-700 group-hover:text-navy-900 transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="font-display font-semibold text-[1.05rem] text-navy-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-navy-600 text-[0.875rem] leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-gold-700 font-display font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
