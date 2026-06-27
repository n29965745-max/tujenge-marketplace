import { ShieldCheck, BadgeCheck, FileCheck, Lock, PiggyBank, Users, Scale, Phone } from 'lucide-react';
import PageLayout, { PageHero, PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Trust & Safety' };

const pillars = [
  {
    icon: BadgeCheck,
    title: 'Identity Verification',
    body: 'Every user verifies their phone, national ID, and (for businesses) tax PIN before publishing listings. We cross-check business registrations against national registries.',
  },
  {
    icon: FileCheck,
    title: 'Title Verification',
    body: 'Property listings require title documents. We verify against official registries (Ardhisasa in Kenya, state land bureaus in Nigeria). A Verified badge appears only after confirmation.',
  },
  {
    icon: ShieldCheck,
    title: 'License Checks',
    body: 'Architects, engineers, quantity surveyors, and contractors must hold valid licenses. We cross-check with BORAQS, IEK, IQSK, NCA and equivalent bodies across Africa.',
  },
  {
    icon: Lock,
    title: 'Escrow-Backed Payments',
    body: 'Funds for transactions above KES 5,000 sit in a licensed escrow account until work is delivered and approved. Disputes are mediated within 48 hours.',
  },
  {
    icon: PiggyBank,
    title: 'Insurance Reserve',
    body: '1% of every GMV flows into a $5M insurance reserve, used to refund verified users in the rare case of platform-level fraud.',
  },
  {
    icon: Scale,
    title: 'Fair Dispute Resolution',
    body: 'A dedicated Trust & Safety team reviews disputes with documented evidence. Both parties have a public rating and review trail that follows them across the platform.',
  },
];

export default function TrustPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Trust & Safety"
        title="Built on verification. Backed by escrow. Inspected by humans."
        subtitle="Trust is the single most important thing we sell. Here's exactly how we earn it — and how we keep it."
        image={images.trustHero}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow mb-4">The trust stack</div>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-navy-900 mb-5">
              Six layers of protection between{' '}
              <span className="text-gradient-gold">your money and risk.</span>
            </h2>
            <p className="text-lg text-navy-600 leading-relaxed">
              Every Tujenge interaction flows through these layers. If any one fails,
              the rest are designed to contain the damage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <div key={p.title} className="card card-interactive p-6 lg:p-7 group">
                <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500 transition-all">
                  <p.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-navy-600 leading-relaxed text-[0.95rem]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-navy-50">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <div className="eyebrow mb-4">How escrow works</div>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.5rem)] text-navy-900 mb-5">
              Your money sits safely until work is delivered.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { n: '1', title: 'Buyer pays', body: 'Funds are deposited into a licensed escrow account, not the seller.' },
              { n: '2', title: 'Seller delivers', body: 'Goods are shipped or work begins. Seller can see funds are secured.' },
              { n: '3', title: 'Buyer confirms', body: 'On receipt, buyer marks the milestone complete. Funds are released.' },
              { n: '4', title: 'Dispute fallback', body: 'If anything goes wrong, Tujenge mediates within 48 hours with full evidence trail.' },
            ].map((s) => (
              <div key={s.n} className="card p-6 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-gold-500 text-navy-900 font-display font-extrabold">
                  {s.n}
                </div>
                <h3 className="font-display font-semibold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-navy-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img src={images.handShakeBusiness} alt="Trust handshake" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="eyebrow mb-4">Reporting a problem</div>
              <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.5rem)] text-navy-900 mb-5">
                Something feel off? Tell us in 30 seconds.
              </h2>
              <p className="text-navy-600 leading-relaxed mb-6">
                Every listing and profile has a Report button. Reports go directly to our
                Trust & Safety team, who investigate within 24 hours. Critical issues
                (suspected fraud, title forgery) trigger same-day account suspension
                while we investigate.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:trust@tujenge.africa" className="btn btn-primary">
                  <Phone className="w-4 h-4" /> Report an issue
                </a>
                <a href="/help" className="btn btn-outline">Read FAQs</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Questions about a specific transaction?"
        body="Our Trust & Safety team is reachable 7 days a week."
        primary={{ label: 'Contact Trust Team', href: '/contact' }}
        secondary={{ label: 'Read Help Center', href: '/help' }}
      />
    </PageLayout>
  );
}
