import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Package,
  MapPin,
  BadgeCheck,
  Truck,
  Shield,
  Star,
  Phone,
  Mail,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import PageLayout from '@/components/PageShell';
import { images } from '@/lib/images';

const DEMO_MATERIALS = [
  {
    id: 'dangote-cement-50kg',
    title: 'Dangote Portland Cement 50kg',
    brand: 'Dangote',
    category: 'Foundation',
    unit: 'Bag (50kg)',
    price: 750,
    minOrder: 50,
    inStock: 5000,
    image: images.materialCement,
    verified: true,
    description:
      'Premium Portland cement suitable for foundations, structural elements, and general construction. Genuine Dangote quality with full batch traceability.',
    features: [
      'High early strength',
      'Sulfate resistant',
      'Genuine Dangote batch',
      'Full quality certificate',
      'Manufacturer warranty',
      'Bulk delivery available',
    ],
    suppliers: [
      { name: 'Aisha Hardware', location: 'Industrial Area, 12km', rating: 4.8, reviews: 320 },
      { name: 'MegaBuild Supplies', location: 'Mlolongo, 18km', rating: 4.7, reviews: 184 },
    ],
  },
  {
    id: 'y16-steel-rebar',
    title: 'Y16 Steel Rebar (per bar)',
    brand: 'Devki',
    category: 'Structural',
    unit: 'Bar (12m)',
    price: 1250,
    minOrder: 20,
    inStock: 2500,
    image: images.materialSteel,
    verified: true,
    description:
      'High-tensile Y16 deformed steel rebar, 12m length. Ideal for reinforced concrete columns, beams, and slabs. Devki quality, factory-tested.',
    features: [
      'Y16 high-tensile',
      '12m standard length',
      'Factory-tested',
      'Anti-corrosion coating available',
      'Bulk pricing tiered',
    ],
    suppliers: [
      { name: 'Devki Steel', location: 'Mombasa Road, 15km', rating: 4.9, reviews: 412 },
    ],
  },
  {
    id: 'river-sand-ton',
    title: 'River Sand (washed, per ton)',
    brand: 'Multiple',
    category: 'Foundation',
    unit: 'Ton',
    price: 2800,
    minOrder: 5,
    inStock: 800,
    image: images.materialSand,
    verified: true,
    description:
      'Clean washed river sand, ideal for plastering, concrete mixing, and block laying. Free of clay, silt, and organic matter.',
    features: ['Washed and screened', 'Clay-free', 'Consistent grading', 'Free delivery in Nairobi'],
    suppliers: [
      { name: 'Nairobi Quarries', location: 'Athi River, 22km', rating: 4.6, reviews: 156 },
    ],
  },
];

export function generateStaticParams() {
  return DEMO_MATERIALS.map((m) => ({ id: m.id }));
}

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const material = DEMO_MATERIALS.find((m) => m.id === id);
  if (!material) notFound();

  return (
    <PageLayout>
      <section className="pt-[72px] bg-navy-50">
        <div className="container-x py-8">
          <div className="flex items-center gap-2 text-sm text-navy-500 mb-4">
            <Link href="/" className="hover:text-gold-700">Home</Link>
            <span>/</span>
            <Link href="/materials" className="hover:text-gold-700">Materials</Link>
            <span>/</span>
            <span className="text-navy-900 font-medium">{material.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-navy-200">
              <Image src={material.image} alt={material.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              {material.verified && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white shadow-lg">
                  <BadgeCheck className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-sm font-display font-semibold">Verified Supplier</span>
                </div>
              )}
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-gold-700 font-display font-semibold mb-2">
                {material.brand} · {material.category}
              </div>
              <h1 className="font-display font-extrabold text-3xl lg:text-4xl text-navy-900 mb-3">
                {material.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-navy-500 mb-6">
                <Package className="w-4 h-4" />
                <span>{material.unit}</span>
                <span className="text-navy-300">·</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-700">{material.inStock.toLocaleString()} in stock</span>
              </div>

              <div className="card p-6 mb-5">
                <div className="flex items-baseline justify-between mb-1">
                  <div className="font-display font-extrabold text-3xl text-navy-900">
                    KES {material.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-navy-500">per {material.unit.toLowerCase()}</div>
                </div>
                <div className="text-sm text-navy-600 mb-5">
                  Bulk pricing available · Min. order {material.minOrder} units
                </div>

                <div className="space-y-2">
                  <button className="btn btn-primary w-full btn-lg">
                    <ShoppingCart className="w-4 h-4" />
                    Add to BOQ
                  </button>
                  <button className="btn btn-outline w-full">
                    <Mail className="w-4 h-4" />
                    Request bulk quote
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-navy-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Delivery in 24-48 hours
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  Escrow protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">About this product</h2>
            <p className="text-navy-600 leading-relaxed mb-8">{material.description}</p>

            <h3 className="font-display font-bold text-lg text-navy-900 mb-4">Specifications</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {material.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-navy-600">
                  <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-navy-900 mb-4">Live price trend</h3>
            <div className="card p-5 mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-navy-500">Last 30 days</span>
                <span className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +0.5%
                </span>
              </div>
              <div className="text-xs text-navy-400 italic">Price chart visualization · live data</div>
            </div>

            <h3 className="font-display font-bold text-lg text-navy-900 mb-4">Suppliers near you</h3>
            <div className="space-y-3">
              {material.suppliers.map((s) => (
                <div key={s.name} className="card p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-display font-semibold text-navy-900">{s.name}</div>
                      <div className="text-xs text-navy-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{s.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end text-sm">
                        <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                        <span className="font-display font-bold text-navy-900">{s.rating}</span>
                      </div>
                      <div className="text-xs text-navy-500">{s.reviews} reviews</div>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm w-full mt-2">Contact supplier</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
