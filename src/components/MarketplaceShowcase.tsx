'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BadgeCheck, Star, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { images } from '@/lib/images';

type Filter = 'All' | 'Properties' | 'Contractors' | 'Materials' | 'Equipment';

interface Listing {
  type: 'Properties' | 'Contractors' | 'Materials' | 'Equipment';
  title: string;
  location: string;
  price: string;
  badge: string;
  badgeIcon: typeof BadgeCheck | typeof Star;
  image: string;
  href: string;
}

const listings: Listing[] = [
  {
    type: 'Properties',
    title: 'Modern 4-Bed Villa in Karen',
    location: 'Karen, Nairobi',
    price: 'KES 65M',
    badge: 'Verified Title',
    badgeIcon: BadgeCheck,
    image: images.propertyLuxury1,
    href: '/properties',
  },
  {
    type: 'Properties',
    title: '1/8-Acre Plot — Kitengela',
    location: 'Kitengela, Kajiado',
    price: 'KES 2.4M',
    badge: 'Title Verified',
    badgeIcon: BadgeCheck,
    image: images.propertyPlot1,
    href: '/properties',
  },
  {
    type: 'Properties',
    title: '3-Bed Apartment — Westlands',
    location: 'Westlands, Nairobi',
    price: 'KES 18.5M',
    badge: 'Verified',
    badgeIcon: BadgeCheck,
    image: images.propertyApartment1,
    href: '/properties',
  },
  {
    type: 'Contractors',
    title: 'BuildCorp Engineering',
    location: '15 years experience · Bonded',
    price: '★ 4.9 (120 reviews)',
    badge: 'Top Rated',
    badgeIcon: Star,
    image: images.contractor3,
    href: '/contractors',
  },
  {
    type: 'Contractors',
    title: 'MasterMason Co.',
    location: 'Stonework specialists',
    price: '★ 4.8 (94 reviews)',
    badge: 'Verified Pro',
    badgeIcon: BadgeCheck,
    image: images.contractor2,
    href: '/contractors',
  },
  {
    type: 'Materials',
    title: 'Dangote Portland Cement 50kg',
    location: 'In stock · Bulk discount',
    price: 'KES 750 / bag',
    badge: 'Bulk Discount',
    badgeIcon: BadgeCheck,
    image: images.materialCement,
    href: '/materials',
  },
  {
    type: 'Materials',
    title: 'Y16 Steel Rebar',
    location: 'Verified · Delivery available',
    price: 'KES 1,250 / bar',
    badge: 'In Stock',
    badgeIcon: BadgeCheck,
    image: images.materialSteel,
    href: '/materials',
  },
  {
    type: 'Equipment',
    title: 'CAT 320 Excavator',
    location: 'Mlolongo · Available today',
    price: 'KES 35K / day',
    badge: 'Insurance Included',
    badgeIcon: BadgeCheck,
    image: images.equipmentExcavator,
    href: '/equipment',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {filtered.map((listing, i) => (
            <ScrollReveal key={listing.title} delay={i * 60} className="card card-interactive overflow-hidden group">
              <Link href={listing.href} className="block">
                <div className="relative aspect-[4/3] bg-navy-100 overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />

                  {/* Type badge */}
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
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{listing.location}</span>
                  </div>
                  <div className="font-display font-bold text-lg text-navy-900 mb-4">
                    {listing.price}
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-gold-700 font-display font-semibold text-sm group-hover:text-gold-900">
                    {listing.type === 'Contractors' ? 'Request Quote' :
                     listing.type === 'Materials' ? 'Buy Bulk' :
                     listing.type === 'Equipment' ? 'Book Now' : 'View Details'}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
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
