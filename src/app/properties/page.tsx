import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BedDouble, Bath, Maximize2, BadgeCheck, ArrowRight, Search } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Browse Properties' };

const PROPERTIES = [
  { id: 'villa-karen', title: 'Modern 4-Bed Villa', location: 'Karen, Nairobi', price: 'KES 65M', beds: 4, baths: 5, sqm: 380, image: images.propertyLuxury1, tag: 'For Sale', verified: true },
  { id: 'plot-kitengela', title: '1/8 Acre Plot', location: 'Kitengela, Kajiado', price: 'KES 2.4M', beds: 0, baths: 0, sqm: 506, image: images.propertyPlot1, tag: 'For Sale', verified: true },
  { id: 'apartment-westlands', title: '3-Bed Apartment', location: 'Westlands, Nairobi', price: 'KES 18.5M', beds: 3, baths: 3, sqm: 165, image: images.propertyApartment1, tag: 'For Sale', verified: true },
  { id: 'villa-runda', title: '5-Bed Villa with Pool', location: 'Runda, Nairobi', price: 'KES 95M', beds: 5, baths: 6, sqm: 520, image: images.propertyModern1, tag: 'For Sale', verified: true },
  { id: 'plot-ngong', title: '2-Acre Plot', location: 'Ngong Hills', price: 'KES 8.5M', beds: 0, baths: 0, sqm: 8094, image: images.propertyPlot2, tag: 'For Sale', verified: true },
  { id: 'apartment-kileleshwa', title: '2-Bed Furnished Apt', location: 'Kileleshwa, Nairobi', price: 'KES 95K/mo', beds: 2, baths: 2, sqm: 95, image: images.propertyApartment2, tag: 'For Rent', verified: true },
  { id: 'commercial-westlands', title: 'Commercial Office Space', location: 'Westlands, Nairobi', price: 'KES 250K/mo', beds: 0, baths: 2, sqm: 320, image: images.propertyCommercial, tag: 'For Lease', verified: true },
  { id: 'townhouse-kilimani', title: '3-Bed Townhouse', location: 'Kilimani, Nairobi', price: 'KES 32M', beds: 3, baths: 4, sqm: 210, image: images.propertyInterior1, tag: 'For Sale', verified: true },
];

export default function PropertiesPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.propertyLuxury1} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Properties Marketplace
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Find your next property.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            {PROPERTIES.length}+ verified properties across Kenya. Every listing title-checked
            against official registries.
          </p>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="search"
                placeholder="Search location, property type, or price…"
                className="w-full pl-10 pr-4 py-3 text-navy-900 placeholder:text-navy-400 bg-transparent border-0 focus:outline-none"
              />
            </div>
            <select className="px-3 py-3 text-navy-900 bg-navy-50 rounded-xl border-0">
              <option>All types</option>
              <option>Land</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Commercial</option>
            </select>
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-navy-200">
        <div className="container-x py-4 flex flex-wrap items-center gap-2">
          {['All', 'For Sale', 'For Rent', 'For Lease', 'Land', 'Houses', 'Apartments', 'Commercial', 'Verified only'].map((f, i) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-full text-sm font-display font-semibold transition-colors ${
                i === 0 ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {PROPERTIES.map((p) => (
              <Link key={p.id} href={`/properties/${p.id}`} className="card card-interactive overflow-hidden group">
                <div className="relative aspect-[4/3] bg-navy-100">
                  <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2.5} />
                    <span className="text-xs font-display font-semibold text-navy-900">{p.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">{p.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-navy-500 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {p.location}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-navy-600 mb-3">
                    {p.beds > 0 && <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{p.beds} beds</span>}
                    {p.baths > 0 && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{p.baths} baths</span>}
                    <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" />{p.sqm} sqm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-display font-bold text-lg text-navy-900">{p.price}</div>
                    <span className="text-sm text-gold-700 font-display font-semibold flex items-center gap-1">
                      View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn btn-dark btn-lg">Load more properties</button>
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Have a property to sell?"
        body="List on Tujenge — verified title, escrow-protected payments, and access to 50K+ monthly buyers."
        primary={{ label: 'List your property', href: '/properties/add' }}
        secondary={{ label: 'Get a valuation', href: '/properties/value' }}
      />
    </PageLayout>
  );
}
