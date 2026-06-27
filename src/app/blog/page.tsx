import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Insights' };

const FEATURED = {
  cat: 'Construction Costs',
  title: 'How much does it really cost to build a 3-bedroom house in Kenya (2026)?',
  excerpt: 'A complete breakdown of construction costs from foundation to finishes — land, labor, materials, professional fees — with current market prices and a downloadable BOQ.',
  date: 'June 20, 2026',
  readTime: '12 min',
  image: images.blogHero1,
};

const POSTS = [
  { cat: 'Investment', title: 'The diaspora investor\'s complete guide to buying property in Kenya from abroad', excerpt: 'Title verification, currency transfers, tax considerations, building remotely — the complete playbook.', date: 'June 12, 2026', readTime: '18 min', image: images.propertyModern1 },
  { cat: 'Building Guide', title: 'Hardcore vs ballast vs sand: what you actually need for your foundation', excerpt: 'The materials guide every first-time builder wishes they had.', date: 'June 5, 2026', readTime: '8 min', image: images.materialSand },
  { cat: 'Market Prices', title: 'Cement prices 2026: weekly index across East Africa', excerpt: 'Live data on cement, steel, timber, and finishing materials with week-over-week trends.', date: 'May 30, 2026', readTime: '6 min', image: images.materialCement },
  { cat: 'How-To', title: 'How to verify a land title in Kenya — without losing your money', excerpt: 'The complete verification workflow, from Ardhisasa searches to spotting red flags in title deeds.', date: 'May 24, 2026', readTime: '15 min', image: images.blueprint },
  { cat: 'Professional', title: 'How to choose an architect in Kenya — and what they actually do', excerpt: 'A practical guide to hiring the right professional for your project, with cost benchmarks.', date: 'May 18, 2026', readTime: '10 min', image: images.architectPortrait },
  { cat: 'Investment', title: 'Why Nairobi\'s peri-urban corridors are the next big land play', excerpt: 'Analyzing 12-month price trends, infrastructure projects, and demographic shifts across 8 corridors.', date: 'May 10, 2026', readTime: '14 min', image: images.propertyPlot1 },
];

export default function BlogPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.blogHero1} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            Insights
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Building knowledge. Building Africa.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Practical guides, market intelligence, and professional advice for every African building, buying, or investing.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="section-tight bg-white">
        <div className="container-x">
          <Link href="#" className="group block card card-interactive overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-navy-100">
                <Image src={FEATURED.image} alt={FEATURED.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-gold">Featured</span>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="text-xs uppercase tracking-wider text-gold-700 font-display font-semibold mb-3">{FEATURED.cat}</div>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-navy-900 mb-4 leading-tight">{FEATURED.title}</h2>
                <p className="text-navy-600 leading-relaxed mb-5">{FEATURED.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-navy-500">
                  <span>{FEATURED.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{FEATURED.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest */}
      <section className="section bg-white">
        <div className="container-x">
          <h2 className="font-display font-bold text-2xl text-navy-900 mb-8">Latest articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {POSTS.map((p, i) => (
              <Link key={i} href="#" className="card card-interactive overflow-hidden group">
                <div className="relative aspect-[16/10] bg-navy-100">
                  <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-outline backdrop-blur-sm bg-white/90">{p.cat}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-navy-900 mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-navy-600 leading-relaxed mb-4 line-clamp-2">{p.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-navy-500">
                    <span>{p.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Get weekly insights"
        body="Market prices, construction tips, and investment analysis — straight to your inbox."
        primary={{ label: 'Subscribe', href: '/signup' }}
        secondary={{ label: 'Browse archive', href: '/blog' }}
      />
    </PageLayout>
  );
}
