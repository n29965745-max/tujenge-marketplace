'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const cats = ['All', 'Architects', 'Engineers', 'Quantity Surveyors', 'Interior Designers', 'Project Managers', 'Surveyors'];
const pros = [
  { initials: 'AK', name: 'Arch. Amina Kariuki', spec: 'Architect', exp: '12 Years', rating: '⭐ 4.9', loc: 'Nairobi', color: '#10B981' },
  { initials: 'JM', name: 'Eng. James Mwangi', spec: 'Structural Engineer', exp: '18 Years', rating: '⭐ 4.8', loc: 'Nairobi', color: '#3B82F6' },
  { initials: 'SO', name: 'QS. Sarah Odhiambo', spec: 'Quantity Surveyor', exp: '10 Years', rating: '⭐ 4.9', loc: 'Mombasa', color: '#8B5CF6' },
  { initials: 'DW', name: 'David Wanjiku', spec: 'Interior Designer', exp: '8 Years', rating: '⭐ 4.7', loc: 'Nairobi', color: '#EC4899' },
  { initials: 'PM', name: 'Eng. Peter Mutua', spec: 'Project Manager', exp: '15 Years', rating: '⭐ 4.8', loc: 'Kisumu', color: '#F59E0B' },
  { initials: 'LN', name: 'Lucy Njeri', spec: 'Landscape Designer', exp: '7 Years', rating: '⭐ 4.6', loc: 'Nairobi', color: '#14B8A6' },
];

export default function ProfessionalsPage() {
  const [active, setActive] = useState('All');
  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Find Verified Professionals</h1><p>Connect with licensed architects, engineers, and specialists for your project.</p></div></section>
      <section className={s.sectionContent}>
        <div className="container">
          <div className={s.filterBar}>{cats.map(c => (<button key={c} className={`${s.filterPill} ${active === c ? s.active : ''}`} onClick={() => setActive(c)}>{c}</button>))}</div>
          <div className="grid grid-3">
            {pros.map((p, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '32px' }}>
                <div className={s.avatarCircle} style={{ background: p.color, margin: '0 auto 16px' }}>{p.initials}</div>
                <h3 style={{ marginBottom: '4px' }}>{p.name}</h3>
                <p className={s.meta}>{p.spec} • {p.exp}</p>
                <div className={s.rating}>{p.rating}</div>
                <p className={s.meta}>{p.loc}</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <Link href="#" className="btn btn-dark" style={{ flex: 1, fontSize: '0.9rem', padding: '10px' }}>View Profile</Link>
                  <Link href="/quote" className="btn btn-primary" style={{ flex: 1, fontSize: '0.9rem', padding: '10px' }}>Get Quote</Link>
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
