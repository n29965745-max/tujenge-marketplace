import Image from 'next/image';
import Link from 'next/link';
import { Star, BadgeCheck, MapPin, Briefcase, Shield, ArrowRight } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Contractors' };

const CONTRACTORS = [
  { id: 'buildcorp-engineering', name: 'BuildCorp Engineering', specialty: 'General Contractors', location: 'Nairobi · Multi-region', rating: 4.9, reviews: 120, years: 15, image: images.contractor3, bonded: true, insured: true, verified: true },
  { id: 'mastermason-co', name: 'MasterMason Co.', specialty: 'Stonework specialists', location: 'Karen, Nairobi', rating: 4.8, reviews: 94, years: 8, image: images.contractor2, bonded: true, insured: true, verified: true },
  { id: 'foundation-experts', name: 'Foundation Experts Ltd.', specialty: 'Foundation & earthworks', location: 'Athi River', rating: 4.7, reviews: 76, years: 12, image: images.contractor1, bonded: true, insured: true, verified: true },
  { id: 'elite-finishes', name: 'Elite Finishes', specialty: 'Painting & finishing', location: 'Westlands, Nairobi', rating: 4.9, reviews: 142, years: 10, image: images.contractor2, bonded: true, insured: true, verified: true },
  { id: 'roofmasters', name: 'Roofmasters Kenya', specialty: 'Roofing specialists', location: 'Industrial Area', rating: 4.6, reviews: 58, years: 6, image: images.contractor3, bonded: true, insured: false, verified: true },
  { id: 'spark-electric', name: 'Spark Electric', specialty: 'Electrical contractors', location: 'Nairobi', rating: 4.8, reviews: 201, years: 14, image: images.contractor1, bonded: true, insured: true, verified: true },
];

export default function ContractorsPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.contractor3} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Contractors Network
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Hire verified contractors.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            1,200+ licensed, bonded, and insured contractors across every trade. Compare quotes, review portfolios, hire with confidence.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-navy-200">
        <div className="container-x py-4 flex flex-wrap items-center gap-2">
          {['All', 'General', 'Electrical', 'Plumbing', 'Masonry', 'Roofing', 'Painting', 'Bonded & Insured'].map((c, i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {CONTRACTORS.map((c) => (
              <Link key={c.id} href={`/contractors/${c.id}`} className="card card-interactive overflow-hidden group">
                <div className="relative aspect-[16/9] bg-navy-100">
                  <Image src={c.image} alt={c.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                    <BadgeCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                    <span className="text-xs font-display font-semibold">Verified Pro</span>
                  </div>
                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gold-500 text-navy-900">
                    <Star className="w-3 h-3 fill-navy-900" />
                    <span className="text-xs font-display font-bold">{c.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-navy-900 mb-1">{c.name}</h3>
                  <p className="text-sm text-navy-600 mb-3">{c.specialty}</p>
                  <div className="space-y-2 text-xs text-navy-500 mb-4">
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{c.location}</div>
                    <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{c.years} years · {c.reviews} reviews</div>
                  </div>
                  <div className="flex gap-2">
                    {c.bonded && <span className="badge badge-outline text-[0.65rem]">Bonded</span>}
                    {c.insured && <span className="badge badge-outline text-[0.65rem]">Insured</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Are you a contractor?"
        body="Get verified, receive qualified leads, and grow your business."
        primary={{ label: 'Join the network', href: '/register/contractor' }}
        secondary={{ label: 'Learn more', href: '/trust' }}
      />
    </PageLayout>
  );
}
