import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BadgeCheck,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Truck,
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import PageLayout from '@/components/PageShell';
import { images } from '@/lib/images';

const DEMO_EQUIPMENT = [
  {
    id: 'cat-320-excavator',
    name: 'CAT 320 Hydraulic Excavator',
    category: 'Excavator',
    location: 'Mlolongo, Machakos',
    distance: 18,
    dailyRate: 35000,
    weeklyRate: 200000,
    monthlyRate: 650000,
    operatorRate: 5000,
    deliveryRate: 8000,
    image: images.equipmentExcavator,
    verified: true,
    description:
      'CAT 320 — the workhorse of mid-size construction sites. 22-ton operating weight, 1.2 m³ bucket, recent service history. Insurance and delivery included.',
    specs: [
      { label: 'Make / Model', value: 'CAT 320 GC (2022)' },
      { label: 'Operating weight', value: '22,500 kg' },
      { label: 'Engine power', value: '162 hp' },
      { label: 'Bucket capacity', value: '1.2 m³' },
      { label: 'Max dig depth', value: '6.7 m' },
      { label: 'Hours used', value: '1,200 hrs' },
      { label: 'Fuel type', value: 'Diesel' },
      { label: 'Operator license', value: 'Required (Category B+)' },
    ],
    features: [
      'Recent service (Feb 2026)',
      'GPS tracking included',
      'Full insurance available',
      'Free delivery within 30km',
      'Backup machine guarantee',
    ],
    availability: 'Available today',
  },
  {
    id: 'concrete-mixer-350l',
    name: '350L Concrete Mixer',
    category: 'Concrete Mixer',
    location: 'Industrial Area, Nairobi',
    distance: 12,
    dailyRate: 4500,
    weeklyRate: 22000,
    monthlyRate: null,
    operatorRate: null,
    deliveryRate: 2000,
    image: images.equipmentMixer,
    verified: true,
    description:
      'Reliable 350-litre concrete mixer. Drum capacity handles typical foundation pours. Electric + diesel options. Operator optional.',
    specs: [
      { label: 'Capacity', value: '350 L' },
      { label: 'Power', value: 'Electric 3-phase or Diesel' },
      { label: 'Drum speed', value: '28 rpm' },
      { label: 'Weight', value: '180 kg' },
    ],
    features: ['Clean and serviced', 'Free delivery within 20km', 'Quick setup'],
    availability: 'Available today',
  },
];

export function generateStaticParams() {
  return DEMO_EQUIPMENT.map((e) => ({ id: e.id }));
}

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const equipment = DEMO_EQUIPMENT.find((e) => e.id === id);
  if (!equipment) notFound();

  return (
    <PageLayout>
      <section className="pt-[72px] bg-navy-50">
        <div className="container-x py-8">
          <div className="flex items-center gap-2 text-sm text-navy-500 mb-4">
            <Link href="/" className="hover:text-gold-700">Home</Link>
            <span>/</span>
            <Link href="/equipment" className="hover:text-gold-700">Equipment</Link>
            <span>/</span>
            <span className="text-navy-900 font-medium">{equipment.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-navy-200 mb-4">
                <Image src={equipment.image} alt={equipment.name} fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
                {equipment.verified && (
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white shadow-lg">
                    <BadgeCheck className="w-4 h-4" strokeWidth={2.5} />
                    <span className="text-sm font-display font-semibold">Verified Owner</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[images.contractor1, images.worker2, images.contractor2].map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-navy-100">
                    <Image src={img} alt="" fill sizes="25vw" className="object-cover" />
                  </div>
                ))}
                <div className="relative aspect-[4/3] rounded-lg bg-navy-900 flex items-center justify-center text-white text-xs font-display font-semibold">
                  +5 photos
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-gold-700 font-display font-semibold mb-2">
                {equipment.category}
              </div>
              <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-navy-900 mb-3">
                {equipment.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-navy-500 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{equipment.location} · {equipment.distance}km away</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-emerald-700 text-sm font-semibold mb-6">
                <CheckCircle2 className="w-4 h-4" />
                {equipment.availability}
              </div>

              <div className="card p-6 mb-5">
                <div className="text-sm text-navy-500 mb-2">Daily rate</div>
                <div className="font-display font-extrabold text-3xl text-navy-900 mb-4">
                  KES {equipment.dailyRate.toLocaleString()}
                  <span className="text-base font-normal text-navy-500"> / day</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                  {equipment.weeklyRate && (
                    <div className="bg-navy-50 rounded-lg p-3">
                      <div className="text-[0.65rem] uppercase tracking-wider text-navy-500">Weekly</div>
                      <div className="font-display font-bold text-navy-900 text-sm">KES {(equipment.weeklyRate / 1000)}K</div>
                    </div>
                  )}
                  {equipment.monthlyRate && (
                    <div className="bg-navy-50 rounded-lg p-3">
                      <div className="text-[0.65rem] uppercase tracking-wider text-navy-500">Monthly</div>
                      <div className="font-display font-bold text-navy-900 text-sm">KES {(equipment.monthlyRate / 1000)}K</div>
                    </div>
                  )}
                  {equipment.operatorRate && (
                    <div className="bg-navy-50 rounded-lg p-3">
                      <div className="text-[0.65rem] uppercase tracking-wider text-navy-500">Operator</div>
                      <div className="font-display font-bold text-navy-900 text-sm">+KES {equipment.operatorRate / 1000}K/d</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <button className="btn btn-primary w-full btn-lg">
                    <Calendar className="w-4 h-4" />
                    Book now
                  </button>
                  <button className="btn btn-outline w-full">
                    <Mail className="w-4 h-4" />
                    Message owner
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-navy-600">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Free delivery within {equipment.deliveryRate / 1000}km radius
                </div>
                <div className="flex items-center gap-2 text-navy-600">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  Insurance add-on available
                </div>
                <div className="flex items-center gap-2 text-navy-600">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Backup machine guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Specifications</h2>
            <div className="card divide-y divide-navy-200 mb-8">
              {equipment.specs.map((s) => (
                <div key={s.label} className="flex items-center justify-between p-4">
                  <span className="text-navy-500 text-sm">{s.label}</span>
                  <span className="font-display font-semibold text-navy-900 text-sm">{s.value}</span>
                </div>
              ))}
            </div>

            <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Includes</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {equipment.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-navy-600">
                  <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 card p-6">
              <h3 className="font-display font-bold text-lg text-navy-900 mb-4">Owner</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-navy-900 font-display font-bold">
                  PE
                </div>
                <div>
                  <div className="font-display font-semibold text-navy-900">Peter Equipment Hire</div>
                  <div className="text-xs text-navy-500">Verified · 4.8★ · 156 rentals</div>
                </div>
              </div>
              <div className="space-y-2">
                <button className="btn btn-outline btn-sm w-full">
                  <Phone className="w-4 h-4" />
                  Call owner
                </button>
                <button className="btn btn-outline btn-sm w-full">
                  <Mail className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
