import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Home, Wallet, Sparkles, Calendar, ArrowRight, CheckCircle2, ClipboardList } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Build My Project' };

const STEPS = [
  { n: 1, icon: MapPin, title: 'Land', desc: 'Tell us about your plot.' },
  { n: 2, icon: Home, title: 'Design', desc: 'What do you want to build?' },
  { n: 3, icon: Wallet, title: 'Budget', desc: 'How much can you spend?' },
  { n: 4, icon: Sparkles, title: 'Finish', desc: 'Basic, standard, or premium?' },
  { n: 5, icon: Calendar, title: 'Timeline', desc: 'When do you want to finish?' },
];

export default function BuildPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.blueprint} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Build My Project Wizard
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Plan your build in 5 minutes.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Answer five simple questions. Get a personalized cost estimate, recommended team, and project plan.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {STEPS.map((s) => (
              <div key={s.n} className="card card-interactive p-5 text-center">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gold-500/10 ring-2 ring-gold-500/20 mx-auto mb-3 flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-gold-700" strokeWidth={2} />
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold-500 text-navy-900 font-display font-extrabold text-xs flex items-center justify-center shadow-gold-md">
                    {s.n}
                  </div>
                </div>
                <h3 className="font-display font-semibold text-navy-900 mb-1">{s.title}</h3>
                <p className="text-xs text-navy-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src={images.handShakeBusiness} alt="Planning" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <div className="eyebrow mb-3">What you get</div>
              <h2 className="font-display font-bold text-3xl text-navy-900 mb-5">A complete build plan in 5 minutes.</h2>
              <ul className="space-y-3">
                {[
                  'Detailed cost estimate (construction + professional fees + permits + contingency)',
                  'Matched architects, engineers, QSs and contractors in your area',
                  'Recommended suppliers with bulk-buy pricing',
                  'Permit checklist and timeline estimate',
                  'Financing options if you need them',
                  'A project dashboard to manage everything',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-navy-600">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card p-8 lg:p-10 text-center bg-gradient-to-br from-navy-900 to-navy-800 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] bg-hero-pattern" aria-hidden />
            <ClipboardList className="w-12 h-12 text-gold-300 mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="font-display font-bold text-3xl mb-3">Ready to start?</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              The wizard takes 5 minutes and saves weeks of research.
            </p>
            <Link href="/quote" className="btn btn-primary btn-lg">
              Start the wizard <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Need help deciding?"
        body="Talk to a Tujenge expert — free consultation, no commitment."
        primary={{ label: 'Talk to an expert', href: '/contact' }}
      />
    </PageLayout>
  );
}
