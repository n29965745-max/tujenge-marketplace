import Link from 'next/link';
import { ArrowRight, TrendingUp, FileCheck, Calculator, ShieldCheck } from 'lucide-react';
import PageLayout, { PageHero, PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Property Valuation' };

const tiers = [
  {
    name: 'Standard',
    price: 'KES 7,500',
    turnaround: '48 hours',
    includes: [
      'Market comparison analysis (5 comps)',
      'Neighborhood price trend',
      'Title status check',
      'PDF report',
    ],
  },
  {
    name: 'Comprehensive',
    price: 'KES 18,000',
    turnaround: '72 hours',
    popular: true,
    includes: [
      'Everything in Standard',
      'Site visit by certified valuer',
      'Structural condition report',
      'Full legal opinion on title',
      'Insurance-grade report',
    ],
  },
  {
    name: 'Diaspora Concierge',
    price: 'USD 250',
    turnaround: '5 business days',
    includes: [
      'Comprehensive valuation',
      'Independent legal opinion',
      'Tax implications review',
      'Video walkthrough',
      'Direct relationship manager',
    ],
  },
];

export default function PropertyValuationPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Property Valuation"
        title="Know exactly what your property is worth."
        subtitle="Independent valuations backed by market data, certified valuers, and full legal review."
        image={images.propertyLuxury1}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
            <div>
              <div className="eyebrow mb-4">How it works</div>
              <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.5rem)] text-navy-900 mb-5">
                A certified valuer, on the ground, on your timeline.
              </h2>
              <p className="text-navy-600 leading-relaxed">
                Submit your property details. We assign a certified valuer in your area, schedule a
                site visit, and deliver a bank-grade valuation report — typically within 48 hours for
                standard valuations.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img src={images.africanHome} alt="African home" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-16">
            {[
              { Icon: Calculator, title: 'Market data', body: 'Pricing compared to 50+ similar properties in your area.' },
              { Icon: FileCheck, title: 'Title check', body: 'Independent verification of ownership status.' },
              { Icon: ShieldCheck, title: 'Legal review', body: 'Encumbrances, liens, and zoning flagged.' },
              { Icon: TrendingUp, title: 'Trend analysis', body: '12-month price trajectory and forecasts.' },
            ].map((f) => (
              <div key={f.title} className="card p-5">
                <f.Icon className="w-6 h-6 text-gold-700 mb-3" strokeWidth={2} />
                <h3 className="font-display font-semibold text-navy-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Pricing tiers */}
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Pricing</div>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-navy-900">
              Three tiers. One standard of excellence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative card p-7 ${
                  tier.popular ? 'ring-2 ring-gold-500 shadow-gold-sm' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold-500 text-navy-900 font-display font-bold text-xs uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display font-bold text-xl text-navy-900 mb-2">{tier.name}</h3>
                <div className="font-display font-extrabold text-3xl text-gradient-gold mb-1">
                  {tier.price}
                </div>
                <div className="text-sm text-navy-500 mb-5">Turnaround: {tier.turnaround}</div>
                <ul className="space-y-2.5 mb-6">
                  {tier.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-navy-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?topic=valuation" className="btn btn-dark w-full">
                  Request valuation
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Not sure which tier?"
        body="Talk to us about your property — we'll recommend the right level of valuation."
        primary={{ label: 'Get a recommendation', href: '/contact?topic=valuation' }}
      />
    </PageLayout>
  );
}
