import Image from 'next/image';
import Link from 'next/link';
import { Package, BadgeCheck, MapPin, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Materials Marketplace' };

const MATERIALS = [
  { id: 'dangote-cement-50kg', title: 'Dangote Cement 50kg', category: 'Foundation', price: 'KES 750', unit: 'bag', image: images.materialCement, supplier: 'Aisha Hardware', rating: 4.8, location: 'Industrial Area, 12km', inStock: true },
  { id: 'y16-steel-rebar', title: 'Y16 Steel Rebar', category: 'Structural', price: 'KES 1,250', unit: 'bar', image: images.materialSteel, supplier: 'Devki Steel', rating: 4.9, location: 'Mombasa Road, 15km', inStock: true },
  { id: 'river-sand-ton', title: 'River Sand (washed)', category: 'Foundation', price: 'KES 2,800', unit: 'ton', image: images.materialSand, supplier: 'Nairobi Quarries', rating: 4.6, location: 'Athi River, 22km', inStock: true },
  { id: 'cypress-timber', title: 'Cypress Timber 2x4', category: 'Structural', price: 'KES 450', unit: 'piece', image: images.materialTimber, supplier: 'Timber World', rating: 4.7, location: 'Industrial Area, 8km', inStock: true },
  { id: 'premium-paint-20l', title: 'Crown Premium Paint 20L', category: 'Finishes', price: 'KES 4,500', unit: 'bucket', image: images.materialPaint, supplier: 'Crown Paints', rating: 4.8, location: 'Industrial Area, 10km', inStock: true },
  { id: 'roofing-sheets', title: 'Roofing Sheets 3m', category: 'Roofing', price: 'KES 1,800', unit: 'sheet', image: images.materialRoofing, supplier: 'Mabati Rolling', rating: 4.7, location: 'Mlolongo, 16km', inStock: true },
  { id: 'porcelain-tiles', title: 'Porcelain Floor Tiles 60x60', category: 'Finishes', price: 'KES 1,650', unit: 'sqm', image: images.materialTiles, supplier: 'Tile & Stone', rating: 4.6, location: 'Industrial Area, 14km', inStock: true },
  { id: 'ballast-ton', title: 'Ballast (machine-cut)', category: 'Foundation', price: 'KES 3,200', unit: 'ton', image: images.materialSand, supplier: 'Quarry Direct', rating: 4.7, location: 'Athi River, 25km', inStock: true },
];

export default function MaterialsPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.materialCement} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Materials Marketplace
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Source materials at fair prices.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            {MATERIALS.length}+ verified materials from {MATERIALS.length}+ suppliers. Live prices.
            Bulk discounts. Escrow on every order.
          </p>
          <Link href="/quote" className="btn btn-primary btn-lg">
            Request bulk quote <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <section className="bg-white border-b border-navy-200">
        <div className="container-x py-4 flex flex-wrap items-center gap-2">
          {['All', 'Foundation', 'Masonry', 'Structural', 'Roofing', 'Plumbing', 'Electrical', 'Finishes', 'In Stock Only'].map((c, i) => (
            <button
              key={c}
              className={`px-4 py-2 rounded-full text-sm font-display font-semibold transition-colors ${
                i === 0 ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MATERIALS.map((m) => (
              <Link key={m.id} href={`/materials/${m.id}`} className="card card-interactive overflow-hidden group">
                <div className="relative aspect-[4/3] bg-navy-100">
                  <Image src={m.image} alt={m.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                  {m.inStock && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="text-xs font-display font-semibold">In Stock</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="badge badge-gold">{m.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-navy-900 mb-2 leading-tight">{m.title}</h3>
                  <div className="text-sm text-navy-500 mb-3">
                    <div className="font-display font-semibold text-navy-700">{m.supplier}</div>
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3" />{m.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3 text-xs">
                    <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                    <span className="font-semibold text-navy-700">{m.rating}</span>
                    <span className="text-navy-400">verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-lg text-navy-900">{m.price}</div>
                      <div className="text-xs text-navy-500">per {m.unit}</div>
                    </div>
                    <span className="text-gold-700">
                      <ShoppingCart className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Need bulk materials?"
        body="Submit a quote request — we will match you with up to 5 verified suppliers within 24 hours."
        primary={{ label: 'Request quote', href: '/quote' }}
        secondary={{ label: 'Become a supplier', href: '/register/supplier' }}
      />
    </PageLayout>
  );
}
