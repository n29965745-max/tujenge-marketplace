import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Home, Upload, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'List Your Property' };

export default function AddPropertyPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.propertyLuxury1} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            List Your Property
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Reach 50,000+ verified buyers.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            List your property on Tujenge. Free basic listing · Verified badge · Escrow-protected transactions.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
            {[
              { n: '01', title: 'Tell us about it', desc: 'Property type, location, price, features.' },
              { n: '02', title: 'Upload photos', desc: 'High-quality photos sell 5x faster.' },
              { n: '03', title: 'Get verified', desc: 'We verify your title within 24 hours.' },
              { n: '04', title: 'Receive offers', desc: 'Inquiries and offers land in your inbox.' },
            ].map((s) => (
              <div key={s.n} className="card p-5 text-center">
                <div className="font-display font-extrabold text-3xl text-gradient-gold mb-1">{s.n}</div>
                <h3 className="font-display font-semibold text-navy-900 mb-1">{s.title}</h3>
                <p className="text-xs text-navy-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card p-7 lg:p-9">
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-6">Property basics</h2>
              <form className="space-y-5">
                <div>
                  <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Listing title</label>
                  <input type="text" placeholder="e.g. 3-Bedroom Villa in Karen" className="input" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Property type</label>
                    <select className="input">
                      <option>Land</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Listing intent</label>
                    <select className="input">
                      <option>For sale</option>
                      <option>For rent</option>
                      <option>For lease</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Price (KES)</label>
                    <input type="text" placeholder="e.g. 8,000,000" className="input" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Location</label>
                    <input type="text" placeholder="e.g. Karen, Nairobi" className="input" />
                  </div>
                </div>
                <div>
                  <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Description</label>
                  <textarea rows={5} placeholder="What makes this property special?" className="input resize-none" />
                </div>

                <div className="border-2 border-dashed border-navy-200 rounded-xl p-6 text-center">
                  <Upload className="w-8 h-8 text-navy-400 mx-auto mb-2" />
                  <p className="text-sm font-display font-semibold text-navy-900 mb-1">Upload photos</p>
                  <p className="text-xs text-navy-500">JPG, PNG or WebP. Max 10MB each. First photo is the cover.</p>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-full">
                  Publish listing <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Need help listing?"
        body="Our team can photograph your property and write the listing for you."
        primary={{ label: 'Get concierge help', href: '/contact?topic=listing' }}
        secondary={{ label: 'See pricing', href: '/properties/value' }}
      />
    </PageLayout>
  );
}
