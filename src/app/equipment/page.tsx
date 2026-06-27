import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, MapPin, Calendar, Truck, ArrowRight } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Equipment Hire' };

const EQUIPMENT = [
  { id: 'cat-320-excavator', name: 'CAT 320 Excavator', category: 'Excavator', rate: 'KES 35K', period: 'day', location: 'Mlolongo, 18km', image: images.equipmentExcavator, available: true },
  { id: 'mobile-crane-50t', name: 'Mobile Crane 50-ton', category: 'Crane', rate: 'KES 85K', period: 'day', location: 'Industrial Area, 12km', image: images.equipmentCrane, available: true },
  { id: 'concrete-mixer-350l', name: '350L Concrete Mixer', category: 'Mixer', rate: 'KES 4.5K', period: 'day', location: 'Industrial Area, 10km', image: images.equipmentMixer, available: true },
  { id: 'bulldozer-d6', name: 'CAT D6 Bulldozer', category: 'Bulldozer', rate: 'KES 65K', period: 'day', location: 'Athi River, 28km', image: images.equipmentExcavator, available: false },
  { id: 'generator-100kva', name: '100kVA Diesel Generator', category: 'Generator', rate: 'KES 8K', period: 'day', location: 'Industrial Area, 8km', image: images.equipmentGenerator, available: true },
  { id: 'scaffolding-kit', name: 'Scaffolding Kit (100m)', category: 'Scaffolding', rate: 'KES 12K', period: 'day', location: 'Industrial Area, 14km', image: images.equipmentMixer, available: true },
  { id: 'forklift-3t', name: '3-ton Forklift', category: 'Forklift', rate: 'KES 18K', period: 'day', location: 'Mlolongo, 20km', image: images.equipmentForklift, available: true },
  { id: 'compactor-plate', name: 'Plate Compactor', category: 'Compactor', rate: 'KES 3.5K', period: 'day', location: 'Industrial Area, 10km', image: images.equipmentMixer, available: true },
];

export default function EquipmentPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.equipmentExcavator} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Equipment Hire
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Book heavy equipment, delivered.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Excavators, cranes, mixers, generators — book online, get it delivered. Insurance and operator available.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-navy-200">
        <div className="container-x py-4 flex flex-wrap items-center gap-2">
          {['All', 'Excavator', 'Crane', 'Mixer', 'Bulldozer', 'Generator', 'Scaffolding', 'Available Today'].map((c, i) => (
            <button
              key={c}
              className={`px-4 py-2 rounded-full text-sm font-display font-semibold transition-colors ${
                i === 0 ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {EQUIPMENT.map((e) => (
              <Link key={e.id} href={`/equipment/${e.id}`} className="card card-interactive overflow-hidden group">
                <div className="relative aspect-[4/3] bg-navy-100">
                  <Image src={e.image} alt={e.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    {e.available ? (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500 text-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-xs font-display font-semibold">Available</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-navy-900/80 text-white">
                        <span className="text-xs font-display font-semibold">Booked</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <span className="badge badge-gold mb-2">{e.category}</span>
                  <h3 className="font-display font-semibold text-navy-900 mb-2 leading-tight">{e.name}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-navy-500 mb-3">
                    <MapPin className="w-3.5 h-3.5" />{e.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-lg text-navy-900">{e.rate}</div>
                      <div className="text-xs text-navy-500">per {e.period}</div>
                    </div>
                    <span className="text-gold-700">
                      <Calendar className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Own construction equipment?"
        body="List your fleet on Tujenge and earn from idle days. We handle bookings, payments, and insurance."
        primary={{ label: 'List your equipment', href: '/equipment' }}
        secondary={{ label: 'How it works', href: '/trust' }}
      />
    </PageLayout>
  );
}
