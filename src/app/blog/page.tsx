'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const posts = [
  { cat: 'Building Guide', title: 'How Much Does It Cost to Build a 3-Bedroom House in Kenya (2026)?', excerpt: 'A complete breakdown of construction costs from foundation to finishes, with real quotes from verified suppliers.', date: 'June 20, 2026' },
  { cat: 'Market Prices', title: 'Cement Price Tracker: June 2026 Update', excerpt: 'Monthly price comparison across all major cement brands. See who offers the best value this month.', date: 'June 18, 2026' },
  { cat: 'Investment Tips', title: '5 Locations in Nairobi With the Highest ROI for Land Investment', excerpt: 'Data-driven analysis of land appreciation rates across 15 Nairobi suburbs over the past 5 years.', date: 'June 15, 2026' },
  { cat: 'News', title: 'Msingi Partners with KCB Bank to Offer Construction Loans', excerpt: 'Developers and homeowners can now access pre-approved construction financing directly through the platform.', date: 'June 12, 2026' },
];
const categories = ['All', 'Construction Costs', 'Building Guides', 'Market Prices', 'Investment Tips', 'News'];

export default function BlogPage() {
  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Construction Insights &amp; Resources</h1><p>Expert guides, market data, and the latest news from Africa&apos;s construction industry.</p></div></section>
      <section className={s.sectionContent}>
        <div className="container">
          <div className={s.filterBar}>{categories.map(c => (<button key={c} className={s.filterPill}>{c}</button>))}</div>
          <div className="grid grid-2">
            {posts.map((p, i) => (
              <div key={i} className="card" style={{ padding: '32px' }}>
                <span style={{ background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' as const }}>{p.cat}</span>
                <h3 style={{ margin: '16px 0 8px', fontSize: '1.3rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>{p.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{p.date}</span>
                  <Link href="#" style={{ color: 'var(--accent)', fontWeight: 600 }}>Read More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
