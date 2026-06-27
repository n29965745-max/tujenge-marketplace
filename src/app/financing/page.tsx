import Image from 'next/image';
import Link from 'next/link';
import { Banknote, ShieldCheck, FileCheck, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Financing & Insurance' };

const PRODUCTS = [
  {
    icon: Banknote,
    title: 'Mortgages',
    rate: 'From 12.5% APR',
    body: 'Competitive rates from leading banks. Get pre-approved in 48 hours and find your dream home with confidence.',
    features: ['Up to 80% financing', '15-25 year terms', 'No prepayment penalties', 'Pre-approval in 48 hours'],
  },
  {
    icon: Calculator,
    title: 'Construction Loans',
    rate: 'From 14% APR',
    body: 'Stage-tied disbursement tied to verified construction milestones. We track progress; you draw down safely.',
    features: ['Milestone-based drawdown', 'Up to 70% financing', 'Project tracking included', 'Insurance bundled'],
  },
  {
    icon: ShieldCheck,
    title: 'Property Insurance',
    rate: 'From 0.3%/year',
    body: 'Comprehensive property insurance from leading underwriters. Quote, bind, and pay online in minutes.',
    features: ['Fire, theft, flood', 'Replacement value cover', 'Loss of rent add-on', '24/7 claims hotline'],
  },
  {
    icon: FileCheck,
    title: 'Title Insurance',
    rate: 'One-time 0.5%',
    body: 'Protect against title fraud, undisclosed liens, and forgery. Mandatory for transactions above KES 5M.',
    features: ['Fraud protection', 'Forgery coverage', 'Lien defence', 'Free title search included'],
  },
];

export default function FinancingPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.africanConstruction} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Financing & Insurance
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Fund your build. Insure your investment.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Mortgages, construction loans, and insurance from leading African financial institutions. All from one place.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.title} className="card p-7 lg:p-8">
                <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-gold-500/10 ring-1 ring-gold-500/20">
                  <p.icon className="w-6 h-6 text-gold-700" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-2xl text-navy-900 mb-2">{p.title}</h3>
                <div className="text-gold-700 font-display font-semibold text-sm mb-4">{p.rate}</div>
                <p className="text-navy-600 leading-relaxed mb-5">{p.body}</p>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-navy-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?topic=financing" className="btn btn-outline w-full">
                  Check eligibility <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy-50">
        <div className="container-x">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Partner institutions</div>
            <h2 className="font-display font-bold text-3xl text-navy-900">Backed by Africa's leading banks and insurers</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['KCB Bank', 'Equity', 'Co-op Bank', 'Jubilee Insurance', 'Britam', 'UAP Old Mutual'].map((name) => (
              <div key={name} className="card p-4 text-center text-sm font-display font-semibold text-navy-700">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Ready to apply?"
        body="Get pre-qualified for a mortgage in under 10 minutes. No impact on your credit score."
        primary={{ label: 'Check eligibility', href: '/contact?topic=mortgage' }}
        secondary={{ label: 'Talk to an advisor', href: '/contact' }}
      />
    </PageLayout>
  );
}
