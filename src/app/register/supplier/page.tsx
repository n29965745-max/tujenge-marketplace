import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package, TrendingUp, ShieldCheck, Globe } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Become a Supplier' };

export default function SupplierRegisterPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.materialCement} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            <Package className="w-3.5 h-3.5" />
            For Suppliers
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Sell more. Get paid faster. Grow your business.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            List your inventory on Tujenge and reach 50K+ monthly buyers — contractors, developers, homeowners. Escrow-protected payments.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { Icon: TrendingUp, title: 'More sales', body: 'Reach thousands of serious buyers searching for exactly what you sell.' },
              { Icon: ShieldCheck, title: 'No bad debt', body: 'Escrow-protected payments. Funds released on confirmed delivery — no more 90-day receivables.' },
              { Icon: Globe, title: 'Pan-African reach', body: 'Start local, sell across borders. We are launching in 6 countries by end of Year 2.' },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="card p-6 text-center">
                <Icon className="w-8 h-8 text-gold-700 mx-auto mb-3" strokeWidth={2} />
                <h3 className="font-display font-bold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-navy-600">{body}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card p-7 lg:p-9">
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-1">Apply as a supplier</h2>
              <p className="text-sm text-navy-600 mb-6">Free to apply. Verification in 24-72 hours.</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Business name</label>
                    <input type="text" className="input" placeholder="Your business name" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Tax PIN</label>
                    <input type="text" className="input" placeholder="P00XXXXXX" />
                  </div>
                </div>
                <div>
                  <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Categories you supply</label>
                  <select multiple className="input min-h-32">
                    <option>Cement & concrete</option>
                    <option>Steel & rebar</option>
                    <option>Sand, ballast, hardcore</option>
                    <option>Bricks & blocks</option>
                    <option>Timber</option>
                    <option>Roofing</option>
                    <option>Doors & windows</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Finishes (paint, tiles)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Phone</label>
                  <input type="tel" className="input" placeholder="+254 7XX XXX XXX" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-full">
                  Submit application <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Already a supplier?"
        primary={{ label: 'Sign in to manage inventory', href: '/login' }}
        secondary={{ label: 'Learn about Tujenge', href: '/about' }}
      />
    </PageLayout>
  );
}
