import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Star,
  BadgeCheck,
  Award,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Briefcase,
} from 'lucide-react';
import PageLayout from '@/components/PageShell';
import { images } from '@/lib/images';

const DEMO_PROFESSIONALS = [
  {
    id: 'brian-ochieng',
    name: 'Brian Ochieng',
    role: 'Architect',
    specialty: 'Modern residential and mixed-use design',
    location: 'Kilimani, Nairobi',
    rating: 4.9,
    reviews: 87,
    yearsExperience: 12,
    licenseNumber: 'BORAQS-A-1247',
    languages: ['English', 'Swahili'],
    image: images.architectPortrait,
    verified: true,
    description:
      'Award-winning architect with 12 years designing modern homes, apartments, and mixed-use developments across East Africa. Featured in Architectural Digest Africa (2024).',
    services: [
      'Architectural design',
      'Master planning',
      '3D visualization',
      'Permit drawings',
      'Interior coordination',
    ],
    rateCard: [
      { service: 'Residential design', price: 'From KES 150,000' },
      { service: 'Master plan', price: 'From KES 500,000' },
      { service: '3D visualization', price: 'From KES 75,000' },
    ],
    portfolio: [
      { name: 'Karen Contemporary', type: '5-Bed Villa', year: 2025, image: images.propertyLuxury1 },
      { name: 'Runda Estate', type: '8-Bed Mansion', year: 2024, image: images.propertyModern1 },
      { name: 'Westlands Mixed-Use', type: 'Commercial', year: 2024, image: images.propertyApartment1 },
    ],
    certifications: ['BORAQS Licensed', 'ARB Registered', 'LEED AP'],
  },
];

export function generateStaticParams() {
  return DEMO_PROFESSIONALS.map((p) => ({ id: p.id }));
}

export default async function ProfessionalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const professional = DEMO_PROFESSIONALS.find((p) => p.id === id);
  if (!professional) notFound();

  return (
    <PageLayout>
      <section className="pt-[72px] bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={images.architectPortrait} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-16 lg:py-20">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-gold-300">Home</Link>
            <span>/</span>
            <Link href="/professionals" className="hover:text-gold-300">Professionals</Link>
            <span>/</span>
            <span className="text-white font-medium">{professional.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-gold-500/30 flex-shrink-0">
              <Image src={professional.image} alt={professional.name} fill sizes="128px" className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-display font-semibold mb-3">
                <BadgeCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                Verified Professional
              </div>
              <h1 className="font-display font-extrabold text-4xl lg:text-5xl mb-2">{professional.name}</h1>
              <div className="text-xl text-gold-300 font-display font-semibold mb-3">{professional.role}</div>
              <p className="text-white/80 mb-4 max-w-2xl">{professional.specialty}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/70 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{professional.location}</span>
                <span className="text-white/40">·</span>
                <span>{professional.yearsExperience} years experience</span>
                <span className="text-white/40">·</span>
                <span>Speaks {professional.languages.join(', ')}</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(professional.rating) ? 'fill-gold-300 text-gold-300' : 'text-white/20'}`} />
                  ))}
                </div>
                <span className="font-display font-bold">{professional.rating}</span>
                <span className="text-white/60">({professional.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <button className="btn btn-primary btn-lg">
                <Mail className="w-4 h-4" />
                Request consultation
              </button>
              <button className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>
                <Calendar className="w-4 h-4" />
                Book a call
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">About</h2>
            <p className="text-navy-600 leading-relaxed mb-8">{professional.description}</p>

            <h3 className="font-display font-bold text-xl text-navy-900 mb-4">Services</h3>
            <div className="flex flex-wrap gap-2 mb-10">
              {professional.services.map((s) => (
                <span key={s} className="badge badge-gold">{s}</span>
              ))}
            </div>

            <h3 className="font-display font-bold text-xl text-navy-900 mb-4">Selected projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {professional.portfolio.map((p) => (
                <div key={p.name} className="card card-interactive overflow-hidden group">
                  <div className="relative aspect-[4/3] bg-navy-100">
                    <Image src={p.image} alt={p.name} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <div className="font-display font-semibold text-navy-900">{p.name}</div>
                    <div className="text-sm text-navy-500">{p.type} · {p.year}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-display font-bold text-xl text-navy-900 mb-4">Certifications</h3>
            <ul className="space-y-2">
              {professional.certifications.map((c) => (
                <li key={c} className="flex items-center gap-2 text-navy-600">
                  <Award className="w-5 h-5 text-gold-700 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 card p-6">
              <h3 className="font-display font-bold text-lg text-navy-900 mb-4">Rate card</h3>
              <div className="space-y-3 mb-6">
                {professional.rateCard.map((r) => (
                  <div key={r.service} className="flex items-center justify-between text-sm pb-3 border-b border-navy-200 last:border-0">
                    <span className="text-navy-600">{r.service}</span>
                    <span className="font-display font-bold text-navy-900">{r.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-navy-500 mb-4">
                Final pricing depends on project scope. Free initial consultation.
              </p>
              <button className="btn btn-primary w-full mb-2">
                Request consultation
              </button>
              <button className="btn btn-outline w-full">
                <MessageSquare className="w-4 h-4" />
                Send message
              </button>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
