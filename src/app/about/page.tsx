import { Target, Eye, Heart, Globe, Users, TrendingUp, MapPin } from 'lucide-react';
import PageLayout, { PageHero, PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'About Tujenge' };

const values = [
  { icon: Target, title: 'Trust first', body: 'Every decision starts with "does this build or erode trust?"' },
  { icon: Heart, title: 'Builder-grade', body: 'We ship things that work, not things that look good in slides.' },
  { icon: Globe, title: 'Africa-first', body: 'Designed for the continent, not adapted from elsewhere.' },
  { icon: Users, title: 'Customer-led', body: 'Our customers are our compass. We listen before we build.' },
  { icon: TrendingUp, title: 'Long-term', body: 'We optimize for 2030, not the next quarter.' },
];

const stats = [
  { value: '5M+', label: 'Target MAU by 2030' },
  { value: '15', label: 'African countries by Year 5' },
  { value: '500K', label: 'Verified listings target' },
  { value: '$2B', label: 'Annual GMV target' },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="About Tujenge"
        title="Building Africa's most trusted construction marketplace."
        subtitle="Tujenge — Swahili for 'let's build' — exists because Africa deserves better than fake agents, unreliable contractors, and endless supplier searches."
        image={images.aboutHero}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow mb-4">Our story</div>
              <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.5rem)] text-navy-900 mb-5">
                A continent is rising.{' '}
                <span className="text-gradient-gold">The marketplace doesn't exist.</span> Yet.
              </h2>
              <div className="space-y-4 text-navy-600 leading-relaxed">
                <p>
                  Africa needs $1.3 trillion in infrastructure investment by 2030. Residential
                  and commercial construction alone is a $500+ billion annual market —
                  growing faster than any other region on Earth.
                </p>
                <p>
                  Yet there is no Amazon, no Zillow, no Alibaba for African construction. Buyers
                  lose billions to fake land titles. Contractors wait 90 days to get paid. Suppliers
                  finance their customers' projects through crippling receivables.
                </p>
                <p>
                  We started Tujenge because Africa deserves better. We started by hand —
                  negotiating deals over WhatsApp, vetting suppliers one at a time, building
                  trust the slow way. Then we built software to scale what worked.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="card p-6">
                  <div className="font-display font-extrabold text-3xl text-gradient-gold mb-1">{s.value}</div>
                  <div className="text-sm text-navy-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-navy-50">
        <div className="container-x">
          <div className="max-w-3xl mb-12 text-center mx-auto">
            <div className="eyebrow mb-4">Mission · Vision · Values</div>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] text-navy-900 mb-5">
              What we believe. <span className="text-gradient-gold">Where we're going.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl" aria-hidden />
              <div className="relative">
                <Target className="w-8 h-8 text-gold-700 mb-4" strokeWidth={2} />
                <h3 className="font-display font-bold text-2xl text-navy-900 mb-3">Mission</h3>
                <p className="text-navy-600 leading-relaxed">
                  To make building, buying, and investing in African property as simple,
                  safe, and rewarding as ordering from Amazon.
                </p>
              </div>
            </div>

            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" aria-hidden />
              <div className="relative">
                <Eye className="w-8 h-8 text-emerald-600 mb-4" strokeWidth={2} />
                <h3 className="font-display font-bold text-2xl text-navy-900 mb-3">Vision</h3>
                <p className="text-navy-600 leading-relaxed">
                  To be the operating system for Africa's built environment — connecting
                  every property, professional, supplier, and financier on the continent.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {values.map((v) => (
              <div key={v.title} className="card p-5 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 mb-3 rounded-lg bg-gold-500/10">
                  <v.icon className="w-5 h-5 text-gold-700" strokeWidth={2} />
                </div>
                <h4 className="font-display font-semibold text-navy-900 text-sm mb-1.5">{v.title}</h4>
                <p className="text-xs text-navy-600 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="aspect-[21/9] md:aspect-[21/7] relative">
              <img src={images.africaSkyline} alt="African skyline" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/75 to-navy-900/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="container-x">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
                      <MapPin className="w-3 h-3" />
                      Where we operate
                    </div>
                    <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4">
                      Launching in Kenya. Expanding across Africa.
                    </h2>
                    <p className="text-white/80 leading-relaxed">
                      Kenya is our home market. Within 18 months we're live in Uganda,
                      Tanzania, Rwanda, Nigeria, and Ghana. By 2030, we serve all 15
                      major African construction markets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Build Africa's future with us."
        body="Whether you're a buyer, seller, professional, or supplier — there's a place for you on Tujenge."
        primary={{ label: 'Get Started', href: '/signup' }}
        secondary={{ label: 'Browse Properties', href: '/properties' }}
      />
    </PageLayout>
  );
}
