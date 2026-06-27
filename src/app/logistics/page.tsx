import Image from 'next/image';
import Link from 'next/link';
import { Truck, BadgeCheck, MapPin, ArrowRight, Phone } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Transport & Logistics' };

const SERVICES = [
  { icon: '🚛', title: 'Tipper Trucks', desc: 'Bulk transport for sand, ballast, hardcore, and excavated soil. 7-25 ton options.', image: images.worker2 },
  { icon: '🛻', title: 'Pickup Trucks', desc: 'Fast small-load delivery for materials, tools, and equipment across the region.', image: images.contractor2 },
  { icon: '🏗️', title: 'Crane Transport', desc: 'Heavy haulage and rigging for large equipment and prefabricated structures.', image: images.equipmentCrane },
  { icon: '🚚', title: 'Flatbed Trucks', desc: 'Open-bed transport for steel, timber, roofing sheets, and oversized loads.', image: images.equipmentForklift },
];

export default function LogisticsPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.worker2} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Transport & Logistics
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Move materials. Hire equipment. On time.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Verified transport providers across East Africa. Book a delivery in 60 seconds, pay through escrow, track in real time.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="card card-interactive overflow-hidden group">
                <div className="relative aspect-[4/3] bg-navy-100">
                  <Image src={s.image} alt={s.title} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-3xl">{s.icon}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-navy-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed mb-4">{s.desc}</p>
                  <Link href="/quote" className="btn btn-outline btn-sm w-full">
                    Request service <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Need a delivery?"
        body="Tell us what you need to move and where. We will match you with verified providers."
        primary={{ label: 'Request transport', href: '/quote' }}
        secondary={{ label: 'Become a driver', href: '/register/supplier' }}
      />
    </PageLayout>
  );
}
