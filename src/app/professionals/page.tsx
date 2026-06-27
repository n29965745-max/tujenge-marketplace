import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Star, MapPin, Briefcase, ArrowRight, Award } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Professionals' };

const PROS = [
  { id: 'brian-ochieng', name: 'Brian Ochieng', role: 'Architect', specialty: 'Modern residential and mixed-use', location: 'Kilimani, Nairobi', rating: 4.9, reviews: 87, years: 12, image: images.architectPortrait, verified: true },
  { id: 'esther-kamau', name: 'Esther Kamau', role: 'Quantity Surveyor', specialty: 'Commercial and residential QS', location: 'Westlands, Nairobi', rating: 4.8, reviews: 64, years: 15, image: images.engineerPortrait, verified: true },
  { id: 'samuel-mwangi', name: 'Samuel Mwangi', role: 'Civil Engineer', specialty: 'Structural design & site supervision', location: 'Karen, Nairobi', rating: 4.9, reviews: 102, years: 18, image: images.engineerPortrait, verified: true },
  { id: 'linda-achieng', name: 'Linda Achieng', role: 'Interior Designer', specialty: 'Luxury home interiors', location: 'Runda, Nairobi', rating: 4.7, reviews: 56, years: 9, image: images.architectPortrait, verified: true },
  { id: 'tom-odhiambo', name: 'Tom Odhiambo', role: 'Project Manager', specialty: 'End-to-end construction PM', location: 'Nairobi', rating: 4.8, reviews: 78, years: 14, image: images.engineerPortrait, verified: true },
  { id: 'mary-wanjala', name: 'Mary Wanjala', role: 'Landscape Designer', specialty: 'Estate & commercial landscapes', location: 'Karen, Nairobi', rating: 4.9, reviews: 41, years: 11, image: images.architectPortrait, verified: true },
];

export default function ProfessionalsPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.architectPortrait} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Professionals Network
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Hire Africa's best professionals.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Licensed architects, engineers, QSs, and project managers. Browse portfolios, read reviews, hire with confidence.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-navy-200">
        <div className="container-x py-4 flex flex-wrap items-center gap-2">
          {['All', 'Architects', 'Engineers', 'Quantity Surveyors', 'Project Managers', 'Interior Designers', 'Surveyors'].map((c, i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROS.map((p) => (
              <Link key={p.id} href={`/professionals/${p.id}`} className="card card-interactive p-6 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 ring-gold-500/20 flex-shrink-0">
                    <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold text-navy-900 truncate">{p.name}</h3>
                        <p className="text-sm text-gold-700 font-display font-semibold">{p.role}</p>
                      </div>
                      {p.verified && (
                        <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" strokeWidth={2} />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-navy-600 mb-4 line-clamp-2">{p.specialty}</p>
                <div className="space-y-2 text-xs text-navy-500 mb-4">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{p.location}</div>
                  <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{p.years} years · {p.reviews} reviews</div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-navy-200">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                    <span className="font-display font-bold text-navy-900">{p.rating}</span>
                  </div>
                  <span className="text-sm text-gold-700 font-display font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View profile <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Are you a licensed professional?"
        body="Get verified, build a portfolio, and win new clients on Tujenge."
        primary={{ label: 'Join the network', href: '/register/contractor' }}
        secondary={{ label: 'Learn more', href: '/about' }}
      />
    </PageLayout>
  );
}
