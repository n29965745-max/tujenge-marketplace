'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const categories = ['All', 'Foundation', 'Masonry', 'Structural', 'Roofing', 'Doors & Windows', 'Plumbing', 'Electrical', 'Finishes', 'Safety'];
const materials = [
  { icon: '🧱', name: 'Portland Cement 50kg', supplier: 'Bamburi Cement', price: '$6.50 / bag', badge: 'In Stock' },
  { icon: '🪨', name: 'River Sand (per ton)', supplier: 'Nairobi Quarries', price: '$28.00 / ton', badge: 'In Stock' },
  { icon: '🔩', name: 'Steel Rebar Y16', supplier: 'Kenya Steel', price: '$12.00 / bar', badge: 'Bulk Available' },
  { icon: '🪵', name: 'Cypress Timber 2x4', supplier: 'Timber World', price: '$4.50 / piece', badge: 'In Stock' },
  { icon: '🏗️', name: 'Roofing Sheets 3m', supplier: 'Mabati Rolling', price: '$18.00 / sheet', badge: 'New Price' },
  { icon: '🎨', name: 'Crown Paint 20L', supplier: 'Crown Paints', price: '$45.00 / tin', badge: 'Premium' },
];

export default function MaterialsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  return (
    <main>
      <Navigation />
      <section className={s.pageHero}>
        <div className="container"><h1>Construction Materials Marketplace</h1><p>Source quality materials from verified suppliers at transparent prices.</p></div>
      </section>
      <section className={s.sectionContent}>
        <div className="container">
          <div className={s.filterBar}>
            {categories.map(c => (<button key={c} className={`${s.filterPill} ${activeFilter === c ? s.active : ''}`} onClick={() => setActiveFilter(c)}>{c}</button>))}
          </div>
          <div className="grid grid-3">
            {materials.map((m, i) => (
              <div key={i} className={`card ${s.listingCard}`}>
                <div className={s.imgWrap} style={{ background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px' }}>
                  <span style={{ fontSize: '4rem' }}>{m.icon}</span>
                  <span className={s.badge}>{m.badge}</span>
                </div>
                <div className={s.cardBody}>
                  <h3>{m.name}</h3>
                  <p className={s.meta}>{m.supplier}</p>
                  <div className={s.price}>{m.price}</div>
                  <Link href="/quote" className="btn btn-primary" style={{ width: '100%' }}>Add to Quote</Link>
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
