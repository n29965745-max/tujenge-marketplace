import Image from 'next/image';
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
import MobileCarousel from './MobileCarousel';
import { images } from '@/lib/images';

const services = [
  {
    icon: Home,
    title: 'Properties',
    description:
      'Buy, rent, or lease verified land, homes, apartments, and commercial space.',
    href: '/properties',
    image: images.propertyLuxury1,
  },
  {
    icon: Layers,
    title: 'Building Materials',
    description:
      'Cement, steel, timber, paint — verified suppliers with live market prices.',
    href: '/materials',
    image: images.materialCement,
  },
  {
    icon: HardHat,
    title: 'Contractors',
    description:
      'General contractors and trade specialists, vetted and reviewed.',
    href: '/contractors',
    image: images.contractor3,
  },
  {
    icon: Compass,
    title: 'Professionals',
    description:
      'Architects, engineers, quantity surveyors, and project managers.',
    href: '/professionals',
    image: images.architectPortrait,
  },
  {
    icon: Wrench,
    title: 'Equipment Hire',
    description:
      'Excavators, cranes, mixers, scaffolding — booked with delivery included.',
    href: '/equipment',
    image: images.equipmentExcavator,
  },
  {
    icon: Truck,
    title: 'Logistics',
    description:
      'Tipper trucks, pickups, and crane transport for materials and equipment.',
    href: '/logistics',
    image: images.worker2,
  },
  {
    icon: Wallet,
    title: 'Financing',
    description:
      'Mortgages, construction loans, and insurance from partner institutions.',
    href: '/financing',
    image: images.africanConstruction,
  },
  {
    icon: BarChart3,
    title: 'Project Management',
    description:
      'Schedules, budgets, milestone tracking, and daily progress reports.',
    href: '/projects',
    image: images.siteAerial,
  },
];

export default function SolutionEcosystem() {
  return (
    <section className="section bg-white relative">
      <div className="container-x">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-10 lg:mb-16">
          <div className="eyebrow mb-3 lg:mb-4">The solution</div>
          <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-tight text-navy-900 mb-4 lg:mb-5">
            One Platform.{' '}
            <span className="text-gradient-gold">Every Construction Need.</span>
          </h2>
          <p className="text-base lg:text-lg text-navy-600 leading-relaxed">
            Tujenge is the verified marketplace where every side of African
            construction meets. Browse, compare, hire, and build — all in one
            trusted ecosystem.
          </p>
        </ScrollReveal>

        {/* Mobile carousel / Desktop 4-column grid */}
        <MobileCarousel
          autoAdvance={6500}
          mobileCardWidth="peek"
          showArrows
          dotCount={2}
          className="lg:grid lg:grid-cols-4 lg:gap-5"
        >
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="card card-interactive overflow-hidden group block h-full">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
                <div className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-lg bg-white/95 backdrop-blur-sm ring-1 ring-gold-500/30 group-hover:bg-gold-500 transition-all">
                  <service.icon
                    className="w-5 h-5 text-gold-700 group-hover:text-navy-900 transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="font-display font-bold text-lg text-white drop-shadow">
                    {service.title}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-navy-600 text-[0.875rem] leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-gold-700 font-display font-semibold text-sm group-hover:text-gold-900">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}
