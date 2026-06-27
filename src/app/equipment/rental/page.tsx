import Image from 'next/image';
import { Calendar, MapPin, User, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Equipment Rental Booking' };

export default function RentalPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.equipmentExcavator} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Book Equipment
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Book construction equipment.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Excavators, cranes, mixers, scaffolding — book online, get it delivered, pay through escrow.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="card p-7 lg:p-9">
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">Rental details</h2>

              <form className="space-y-5">
                <div>
                  <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Equipment</label>
                  <select className="input">
                    <option>CAT 320 Excavator — KES 35,000/day</option>
                    <option>Mobile Crane 50-ton — KES 85,000/day</option>
                    <option>350L Concrete Mixer — KES 4,500/day</option>
                    <option>CAT D6 Bulldozer — KES 65,000/day</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Start date</label>
                    <input type="date" className="input" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">End date</label>
                    <input type="date" className="input" />
                  </div>
                </div>

                <div>
                  <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Delivery address</label>
                  <input type="text" className="input" placeholder="Site address or location" />
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="operator" className="w-5 h-5 accent-gold-500" />
                  <label htmlFor="operator" className="text-sm text-navy-900">Add operator (+KES 5,000/day)</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="insurance" className="w-5 h-5 accent-gold-500" defaultChecked />
                  <label htmlFor="insurance" className="text-sm text-navy-900">Add damage insurance (+KES 2,000)</label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-full">
                  Book & pay securely <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 card p-6 space-y-4">
              <h3 className="font-display font-bold text-lg text-navy-900">Includes</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-navy-600">
                  <Truck className="w-4 h-4 text-emerald-600" /> Free delivery within 30km
                </div>
                <div className="flex items-center gap-2 text-navy-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Escrow protection
                </div>
                <div className="flex items-center gap-2 text-navy-600">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Backup machine guarantee
                </div>
                <div className="flex items-center gap-2 text-navy-600">
                  <User className="w-4 h-4 text-emerald-600" /> 24/7 support
                </div>
                <div className="flex items-center gap-2 text-navy-600">
                  <MapPin className="w-4 h-4 text-emerald-600" /> GPS tracking included
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <PageCTABanner
        title="Browse all equipment"
        primary={{ label: 'See equipment listings', href: '/equipment' }}
        secondary={{ label: 'Request quote', href: '/quote' }}
      />
    </PageLayout>
  );
}
