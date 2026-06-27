import Image from 'next/image';
import { ArrowRight, FileText, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Request a Quote' };

export default function QuotePage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.contractor3} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Request a Quote
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Get 3-5 verified quotes in 24 hours.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Tell us what you need. We match you with the best contractors, suppliers, and professionals in your area — completely free.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="card p-7 lg:p-9">
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-1">Tell us about your project</h2>
              <p className="text-sm text-navy-600 mb-6">The more detail you provide, the more accurate your quotes.</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Project type</label>
                    <select className="input">
                      <option>New construction</option>
                      <option>Renovation</option>
                      <option>Extension</option>
                      <option>Commercial</option>
                      <option>Materials supply</option>
                      <option>Equipment rental</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Location</label>
                    <input type="text" placeholder="e.g. Kitengela, Kajiado" className="input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Budget (KES)</label>
                    <input type="text" placeholder="e.g. 8,000,000" className="input" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Start date</label>
                    <input type="date" className="input" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Timeline</label>
                    <select className="input">
                      <option>ASAP</option>
                      <option>1-3 months</option>
                      <option>3-6 months</option>
                      <option>6-12 months</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Project details</label>
                  <textarea rows={5} placeholder="Tell us about your project — size, style, special requirements…" className="input resize-none" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Your name</label>
                    <input type="text" placeholder="Full name" className="input" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Phone</label>
                    <input type="tel" placeholder="+254 7XX XXX XXX" className="input" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-full">
                  Get my quotes <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <p className="text-xs text-navy-500 text-center">
                  Free service · No spam · Quotes arrive within 24 hours
                </p>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-2 space-y-5">
            {[
              { Icon: Clock, title: 'Fast', body: 'Quotes arrive in 24 hours, not weeks.' },
              { Icon: ShieldCheck, title: 'Verified only', body: 'Every pro is license-checked and reviewed.' },
              { Icon: Sparkles, title: 'Matched to your needs', body: 'Our matching engine uses your location, budget, and timeline.' },
              { Icon: FileText, title: 'Side-by-side compare', body: 'See quotes, profiles, and reviews in one view.' },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="card p-5 flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold-500/10 ring-1 ring-gold-500/20 flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold-700" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-navy-900 mb-1">{title}</h3>
                  <p className="text-sm text-navy-600">{body}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <PageCTABanner
        title="Ready to start?"
        body="Try the Build My Project wizard for a complete cost estimate and team."
        primary={{ label: 'Start the wizard', href: '/build' }}
        secondary={{ label: 'Browse Properties', href: '/properties' }}
      />
    </PageLayout>
  );
}
