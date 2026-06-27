import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  BadgeCheck,
  Star,
  Phone,
  Mail,
  MessageSquare,
  Share2,
  Heart,
  ArrowRight,
  Shield,
} from 'lucide-react';
import PageLayout from '@/components/PageShell';
import { images } from '@/lib/images';

const DEMO_PROPERTIES = [
  {
    id: 'villa-karen',
    title: 'Modern 4-Bedroom Villa in Karen',
    location: 'Karen, Nairobi',
    price: 'KES 65,000,000',
    priceLabel: 'KES 65M',
    bedrooms: 4,
    bathrooms: 5,
    sqm: 380,
    land: '1/4 acre',
    yearBuilt: 2024,
    tenure: 'Freehold',
    parking: 3,
    images: [images.propertyLuxury1, images.propertyInterior1, images.propertyInterior2],
    verified: true,
    badge: 'Verified Title',
    description:
      'A masterclass in contemporary African design — this 4-bedroom villa in Karen blends clean lines with warm materials, generous entertaining spaces with quiet family retreats, and premium finishes throughout.',
    features: [
      'Solar power with grid backup',
      'Heated infinity pool',
      'Smart home automation',
      'CCTV + 24/7 security',
      'Mature landscaped garden',
      'Double garage',
      'Borehole + water storage',
      'High-speed fiber ready',
    ],
    amenities: ['Pool', 'Garden', 'Garage', 'Solar', 'Security', 'Smart Home'],
  },
  {
    id: 'plot-kitengela',
    title: '1/8 Acre Plot — Kitengela',
    location: 'Kitengela, Kajiado County',
    price: 'KES 2,400,000',
    priceLabel: 'KES 2.4M',
    bedrooms: 0,
    bathrooms: 0,
    sqm: 506,
    land: '1/8 acre',
    yearBuilt: null,
    tenure: 'Freehold',
    parking: 0,
    images: [images.propertyPlot1],
    verified: true,
    badge: 'Title Verified',
    description:
      'A perfect starter plot in one of Nairobi\'s fastest-growing peri-urban corridors. Title is clean and verified through Ardhisasa. Access road is graded; water and electricity connections are within 200m.',
    features: [
      'Clean freehold title',
      'Graded access road',
      'Water connection nearby',
      'Electricity connection nearby',
      'Surveyed and beaconed',
      'Ready for immediate development',
    ],
    amenities: ['Title Verified', 'Road Access', 'Utilities Nearby'],
  },
  {
    id: 'apartment-westlands',
    title: '3-Bed Apartment — Westlands',
    location: 'Westlands, Nairobi',
    price: 'KES 18,500,000',
    priceLabel: 'KES 18.5M',
    bedrooms: 3,
    bathrooms: 3,
    sqm: 165,
    land: null,
    yearBuilt: 2023,
    tenure: 'Leasehold',
    parking: 2,
    images: [images.propertyApartment1, images.propertyInterior2],
    verified: true,
    badge: 'Verified',
    description:
      'Bright, modern 3-bedroom apartment in a secure Westlands complex. Floor-to-ceiling windows, open-plan living, and access to a rooftop pool and gym.',
    features: [
      'Open-plan living + dining',
      'Fitted kitchen with island',
      'Master ensuite with walk-in closet',
      'Two balconies',
      'Two dedicated parking bays',
      'Rooftop pool + gym access',
      '24/7 concierge + security',
      'Backup generator',
    ],
    amenities: ['Pool', 'Gym', 'Concierge', 'Generator', 'Secure'],
  },
];

export function generateStaticParams() {
  return DEMO_PROPERTIES.map((p) => ({ id: p.id }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = DEMO_PROPERTIES.find((p) => p.id === id);
  if (!property) notFound();

  return (
    <PageLayout>
      {/* Gallery */}
      <section className="pt-[72px] bg-navy-50">
        <div className="container-x py-8">
          <div className="flex items-center gap-2 text-sm text-navy-500 mb-4">
            <Link href="/" className="hover:text-gold-700">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-gold-700">Properties</Link>
            <span>/</span>
            <span className="text-navy-900 font-medium">{property.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden bg-navy-100">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
              {property.verified && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white shadow-lg">
                  <BadgeCheck className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-sm font-display font-semibold">{property.badge}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {(property.images[1] ? [property.images[1]] : [property.images[0]]).slice(0, 1).map((img, i) => (
                <div key={i} className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-navy-100">
                  <Image src={img} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                </div>
              ))}
              <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-navy-900 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-gold-300" />
                  <div className="font-display font-semibold text-sm">Verified title</div>
                  <div className="text-xs text-white/60 mt-1">Check on Ardhisasa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-navy-900 mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-navy-600">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-sm" aria-label="Save">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="btn btn-outline btn-sm" aria-label="Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {property.amenities.map((a) => (
                  <span key={a} className="badge badge-outline">{a}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {property.bedrooms > 0 && (
                  <div className="card p-4 text-center">
                    <BedDouble className="w-5 h-5 mx-auto mb-1 text-gold-700" />
                    <div className="font-display font-bold text-lg text-navy-900">{property.bedrooms}</div>
                    <div className="text-xs text-navy-500">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="card p-4 text-center">
                    <Bath className="w-5 h-5 mx-auto mb-1 text-gold-700" />
                    <div className="font-display font-bold text-lg text-navy-900">{property.bathrooms}</div>
                    <div className="text-xs text-navy-500">Bathrooms</div>
                  </div>
                )}
                <div className="card p-4 text-center">
                  <Maximize2 className="w-5 h-5 mx-auto mb-1 text-gold-700" />
                  <div className="font-display font-bold text-lg text-navy-900">{property.sqm}</div>
                  <div className="text-xs text-navy-500">sqm</div>
                </div>
                {property.yearBuilt && (
                  <div className="card p-4 text-center">
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-gold-700" />
                    <div className="font-display font-bold text-lg text-navy-900">{property.yearBuilt}</div>
                    <div className="text-xs text-navy-500">Built</div>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">About this property</h2>
                <p className="text-navy-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-4">Features & amenities</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-navy-600">
                      <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="card p-6">
                  <div className="text-sm text-navy-500 mb-1">Asking price</div>
                  <div className="font-display font-extrabold text-3xl text-navy-900 mb-1">
                    {property.priceLabel}
                  </div>
                  <div className="text-xs text-navy-500 mb-5">Negotiable · Subject to title verification</div>

                  <div className="space-y-2 mb-5">
                    <button className="btn btn-primary w-full">
                      <Calendar className="w-4 h-4" />
                      Schedule viewing
                    </button>
                    <button className="btn btn-dark w-full">
                      <Mail className="w-4 h-4" />
                      Make offer
                    </button>
                  </div>

                  <div className="border-t border-navy-200 pt-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-navy-900 font-display font-bold">
                        SK
                      </div>
                      <div>
                        <div className="font-display font-semibold text-navy-900">Sarah Kimani</div>
                        <div className="flex items-center gap-1 text-xs text-navy-500">
                          <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                          <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                          <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                          <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                          <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                          <span className="ml-1">4.9 · 87 reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-outline btn-sm flex-1">
                        <Phone className="w-4 h-4" />
                        Call
                      </button>
                      <button className="btn btn-outline btn-sm flex-1">
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card p-5 bg-navy-900 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <Image src={images.handShakeBusiness} alt="" fill className="object-cover" />
                  </div>
                  <div className="relative">
                    <Shield className="w-6 h-6 text-gold-300 mb-2" />
                    <div className="font-display font-semibold mb-1">Buy with escrow</div>
                    <p className="text-sm text-white/70 mb-3">
                      Funds stay in a trusted account until the title transfers to you.
                    </p>
                    <Link href="/trust" className="text-sm text-gold-300 font-semibold hover:text-gold-100 inline-flex items-center gap-1">
                      How escrow works <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight bg-navy-50">
        <div className="container-x">
          <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">Similar properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DEMO_PROPERTIES.filter(p => p.id !== property.id).slice(0, 3).map((p) => (
              <Link key={p.id} href={`/properties/${p.id}`} className="card card-interactive overflow-hidden group">
                <div className="relative aspect-[4/3] bg-navy-100">
                  <Image src={p.images[0]} alt={p.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-navy-900 mb-1">{p.title}</h3>
                  <div className="text-sm text-navy-500 mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{p.location}
                  </div>
                  <div className="font-display font-bold text-navy-900">{p.priceLabel}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
