import { Search, MessageSquare, BookOpen, Users, CreditCard, FileCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageLayout, { PageHero, PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Help Center' };

const categories = [
  {
    icon: BookOpen,
    title: 'Getting started',
    articles: [
      'How to create an account',
      'Verifying your phone and email',
      'Setting up your profile',
      'Browsing the marketplace',
    ],
  },
  {
    icon: FileCheck,
    title: 'Property & verification',
    articles: [
      'How title verification works',
      'Listing your property',
      'Scheduling a viewing',
      'Understanding escrow',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payments & escrow',
    articles: [
      'Paying with M-Pesa',
      'Adding a bank account',
      'Releasing escrow funds',
      'Refund policy',
    ],
  },
  {
    icon: Users,
    title: 'For professionals',
    articles: [
      'Becoming a verified contractor',
      'Receiving leads',
      'Submitting quotes',
      'Building your portfolio',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Account & security',
    articles: [
      'Resetting your password',
      'Two-factor authentication',
      'Deleting your account',
      'Privacy controls',
    ],
  },
  {
    icon: Search,
    title: 'For suppliers',
    articles: [
      'Listing materials',
      'Bulk pricing tools',
      'Order management',
      'Shipping & delivery',
    ],
  },
];

export default function HelpPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Help Center"
        title="How can we help?"
        subtitle="Search articles, browse categories, or contact our support team."
        image={images.heroConstruction}
      />

      <section className="section bg-white">
        <div className="container-x">
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
              <input
                type="search"
                placeholder="Search articles, e.g. 'how does escrow work?'"
                className="w-full bg-white border border-navy-200 rounded-2xl pl-12 pr-4 py-4 text-base focus:outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div key={cat.title} className="card card-interactive p-6 lg:p-7 group">
                <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-gold-500/10 ring-1 ring-gold-500/20 group-hover:bg-gold-500 transition-all">
                  <cat.icon className="w-6 h-6 text-gold-700 group-hover:text-navy-900 transition-colors" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-lg text-navy-900 mb-4">{cat.title}</h3>
                <ul className="space-y-2.5">
                  {cat.articles.map((article) => (
                    <li key={article}>
                      <a href="#" className="text-sm text-navy-600 hover:text-gold-700 flex items-center gap-2 group/link">
                        <span className="w-1 h-1 rounded-full bg-gold-500" />
                        {article}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Still need help?"
        body="Our team replies within one business day — usually faster."
        primary={{ label: 'Contact Support', href: '/contact' }}
        secondary={{ label: 'Read Trust & Safety', href: '/trust' }}
      />
    </PageLayout>
  );
}
