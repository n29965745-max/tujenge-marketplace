'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  BadgeCheck,
  Star,
  ArrowRight,
  Wrench,
  Layers,
  Truck,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

type Filter = 'All' | 'Properties' | 'Contractors' | 'Materials' | 'Equipment';

interface Listing {
  type: 'Properties' | 'Contractors' | 'Materials' | 'Equipment';
  title: string;
  location: string;
  price: string;
  badge: string;
  badgeIcon: typeof BadgeCheck | typeof Star;
  image: string | null;
  emoji?: string;
  meta?: string;
}

const listings: Listing[] = [
  {
    type: 'Properties',
    title: 'Modern 4BR Villa in Karen',
    location: 'Karen, Nairobi',
    price: 'KES 65M',
    badge: 'Verified Title',
    badgeIcon: BadgeCheck,
    image: '/project_modern.png',
  },
  {
    type: 'Contractors',
    title: 'BuildCorp Engineering',
    location: '15 years experience · Bonded',
    price: '★ 4.9 (120 reviews)',
    badge: 'Top Rated',
    badgeIcon: Star,
    image: '/contractor_working.png',
  },
  {
    type: 'Materials',
    title: 'Dangote Portland Cement 50kg',
    location: 'Bamburi · In stock',
    price: 'KES 750 / bag',
    badge: 'Bulk Discount',
    badgeIcon: BadgeCheck,
    image: null,
    emoji: '🧱',
  },
  {
    type: 'Equipment',
    title: 'CAT 320 Excavator',
    location: 'Mlolongo · Available today',
    price: 'KES 35K / day',
    badge: 'Insurance Included',
    badgeIcon: BadgeCheck,
    image: null,
    emoji: '🚜',
  },
  {
    type: 'Properties',
    title: '1/8 Acre Plot in Kitengela',
    location: 'Kitengela, Kajiado',
    price: 'KES 2.4M',
    badge: 'Title Verified',
    badgeIcon: BadgeCheck,
    image: null,
    emoji: '🏞️',
  },
  {
    type: 'Contractors',
    title: 'MasterMason Co.',
    location: 'Specialists in stonework',
    price: '★ 4.8 (94 reviews)',
    badge: 'Verified Pro',
    badgeIcon: BadgeCheck,
    image: null,
    emoji: '👷',
  },
];

const filters: Filter[] = ['All', 'Properties', 'Contractors', 'Materials', 'Equipment'];

export default function MarketplaceShowcase() {
  const [active, setActive] = useState<Filter>('All');
  const filtered = active === 'All' ? listings : listings.filter((l) => l.type === active);

  return (
    <section className="section bg-white relative">
      <div className="container-x">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
          <div className="eyebrow mb-4">Marketplace</div>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-navy-900 mb-5">
            Explore <span className="text-gradient-gold">verified</span> listings.
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            Every listing on Tujenge is checked. Compare side-by-side, request quotes,
            and build with confidence.
          </p>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 bg-navy-50 rounded-2xl max-w-2xl mx-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`flex-1 px-4 py-2.5 rounded-xl font-display font-semibold text-sm transition-all duration-200 ${
                  active === filter
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Listings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filtered.map((listing, i) => (
            <ScrollReveal key={listing.title} delay={i * 80} className="card card-interactive overflow-hidden group img-zoom">
              <div className="relative aspect-[4/3] bg-navy-100 overflow-hidden">
                {listing.image ? (
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover img-zoom-target"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-navy-100 to-navy-200">
                    {listing.emoji}
                  </div>
                )}

                {/* Badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-sm">
                  <listing.badgeIcon className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2.5} />
                  <span className="text-xs font-display font-semibold text-navy-900">
                    {listing.badge}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display font-semibold text-[1.05rem] text-navy-900 mb-2 leading-tight">
                  {listing.title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-navy-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{listing.location}</span>
                </div>
                <div className="font-display font-bold text-lg text-navy-900 mb-4">
                  {listing.price}
                </div>

                <Link
                  href={listing.type === 'Properties' ? '/properties' :
                        listing.type === 'Contractors' ? '/contractors' :
                        listing.type === 'Materials' ? '/materials' : '/equipment'}
                  className="btn btn-outline btn-sm w-full group/btn"
                >
                  {listing.type === 'Contractors' ? 'Request Quote' :
                   listing.type === 'Materials' ? 'Buy Bulk' :
                   listing.type === 'Equipment' ? 'Book Now' : 'View Details'}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/properties" className="btn btn-dark btn-lg">
            Browse All Listings
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
