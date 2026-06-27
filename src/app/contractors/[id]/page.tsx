import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Star,
  BadgeCheck,
  Shield,
  Briefcase,
  Users,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Award,
  CheckCircle2,
  Wrench,
} from 'lucide-react';
import PageLayout from '@/components/PageShell';
import { images } from '@/lib/images';

const DEMO_CONTRACTORS = [
  {
    id: 'buildcorp-engineering',
    name: 'BuildCorp Engineering',
    specialty: 'General Contractors',
    location: 'Nairobi · Multi-region',
    rating: 4.9,
    reviews: 120,
    yearsInOperation: 15,
    teamSize: '51-200',
    bonded: true,
    insured: true,
    projectMin: 2000000,
    projectMax: 50000000,
    image: images.contractor3,
    verified: true,
    description:
      'Full-service general contractor with 15 years of experience delivering residential and commercial projects across Kenya. Bonded, insured, and licensed with NCA.',
    services: [
      'General contracting',
      'Project management',
      'Design-build',
      'Renovation and remodeling',
      'Commercial construction',
    ],
    projects: [
      { name: 'Runda 6-Bed Villa', value: 'KES 45M', year: 2025, type: 'Residential' },
      { name: 'Karen Mixed-Use', value: 'KES 120M', year: 2024, type: 'Commercial' },
      { name: 'Mombasa Beach Resort', value: 'KES 280M', year: 2024, type: 'Hospitality' },
    ],
    certifications: ['NCA License #NCA-0042', 'ISO 9001:2015', 'OSHA Certified'],
  },
  {
    id: 'mastermason-co',
    name: 'MasterMason Co.',
    specialty: 'Stonework specialists',
    location: 'Karen, Nairobi',
    rating: 4.8,
    reviews: 94,
    yearsInOperation: 8,
    teamSize: '11-50',
    bonded: true,
    insured: true,
    projectMin: 500000,
    projectMax: 8000000,
    image: images.contractor2,
    verified: true,
    description:
      'Boutique stonework and masonry specialists. We bring 8 years of craftsmanship to custom stone facades, fireplaces, and architectural features.',
    services: ['Stone facade installation', 'Custom fireplaces', 'Architectural masonry', 'Restoration'],
    projects: [
      { name: 'Karen Stone Villa', value: 'KES 7M', year: 2025, type: 'Residential' },
      { name: 'Gigiri Estate Wall', value: 'KES 2.4M', year: 2024, type: 'Landscaping' },
    ],
    certifications: ['NCA Licensed', 'Bonded', 'Public Liability Insurance'],
  },
];

export function generateStaticParams() {
  return DEMO_CONTRACTORS.map((c) => ({ id: c.id }));
}

export default async function ContractorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contractor = DEMO_CONTRACTORS.find((c) => c.id === id);
  if (!contractor) notFound();

  return (
    <PageLayout>
      <section className="pt-[72px] bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={contractor.image} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-16 lg:py-20">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-gold-300">Home</Link>
            <span>/</span>
            <Link href="/contractors" className="hover:text-gold-300">Contractors</Link>
            <span>/</span>
            <span className="text-white font-medium">{contractor.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-gold-500/30 flex-shrink-0 bg-white">
              <Image src={contractor.image} alt={contractor.name} fill sizes="128px" className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-display font-semibold mb-3">
                <BadgeCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                Verified Pro
              </div>
              <h1 className="font-display font-extrabold text-4xl lg:text-5xl mb-3">{contractor.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/80 mb-4">
                <span className="font-display font-semibold">{contractor.specialty}</span>
                <span className="text-white/40">·</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{contractor.location}</span>
                <span className="text-white/40">·</span>
                <span>{contractor.yearsInOperation} years</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(contractor.rating) ? 'fill-gold-300 text-gold-300' : 'text-white/20'}`} />
                  ))}
                </div>
                <span className="font-display font-bold">{contractor.rating}</span>
                <span className="text-white/60">({contractor.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <button className="btn btn-primary btn-lg">
                <Mail className="w-4 h-4" />
                Request quote
              </button>
              <button className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </button>
              <button className="btn btn-ghost btn-lg" style={{ color: '#fff' }}>
                <Phone className="w-4 h-4" />
                Call
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">About</h2>
            <p className="text-navy-600 leading-relaxed mb-8">{contractor.description}</p>

            <h3 className="font-display font-bold text-xl text-navy-900 mb-4">Services offered</h3>
            <div className="flex flex-wrap gap-2 mb-10">
              {contractor.services.map((s) => (
                <span key={s} className="badge badge-gold">{s}</span>
              ))}
            </div>

            <h3 className="font-display font-bold text-xl text-navy-900 mb-4">Recent projects</h3>
            <div className="space-y-3 mb-10">
              {contractor.projects.map((p) => (
                <div key={p.name} className="card p-5 flex items-center justify-between">
                  <div>
                    <div className="font-display font-semibold text-navy-900">{p.name}</div>
                    <div className="text-sm text-navy-500">{p.type} · {p.year}</div>
                  </div>
                  <div className="font-display font-bold text-gold-700">{p.value}</div>
                </div>
              ))}
            </div>

            <h3 className="font-display font-bold text-xl text-navy-900 mb-4">Certifications & licensing</h3>
            <ul className="space-y-2">
              {contractor.certifications.map((c) => (
                <li key={c} className="flex items-center gap-2 text-navy-600">
                  <Award className="w-5 h-5 text-gold-700 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 card p-6 space-y-4">
              <h3 className="font-display font-bold text-lg text-navy-900">At a glance</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-navy-500">Experience</span>
                  <span className="font-display font-semibold text-navy-900">{contractor.yearsInOperation} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-navy-500">Team size</span>
                  <span className="font-display font-semibold text-navy-900">{contractor.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-navy-500">Bonded</span>
                  <span className={contractor.bonded ? 'text-emerald-700 font-semibold' : 'text-navy-500'}>
                    {contractor.bonded ? '✓ Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-navy-500">Insured</span>
                  <span className={contractor.insured ? 'text-emerald-700 font-semibold' : 'text-navy-500'}>
                    {contractor.insured ? '✓ Yes' : 'No'}
                  </span>
                </div>
                <div className="pt-3 border-t border-navy-200">
                  <div className="text-navy-500 mb-1">Typical project value</div>
                  <div className="font-display font-bold text-navy-900">
                    KES {(contractor.projectMin / 1000000).toFixed(1)}M — {(contractor.projectMax / 1000000).toFixed(0)}M
                  </div>
                </div>
              </div>

              <button className="btn btn-primary w-full">
                Request a quote
              </button>
              <button className="btn btn-outline w-full">
                Save to my projects
              </button>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
