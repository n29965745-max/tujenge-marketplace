'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const equipment = [
  { icon: '🚜', name: 'CAT Excavator 320', rate: '$250 / day', avail: 'Available' },
  { icon: '🏗️', name: 'Tower Crane TC6015', rate: '$800 / day', avail: 'Available' },
  { icon: '🚧', name: 'Bulldozer D6', rate: '$300 / day', avail: 'Booked' },
  { icon: '🔄', name: 'Concrete Mixer 350L', rate: '$45 / day', avail: 'Available' },
  { icon: '⚡', name: 'Generator 100KVA', rate: '$120 / day', avail: 'Available' },
  { icon: '🏗️', name: 'Scaffolding Set', rate: '$80 / week', avail: 'Available' },
];
const cats = ['All', 'Excavators', 'Bulldozers', 'Cranes', 'Concrete Mixers', 'Generators', 'Compactors', 'Forklifts', 'Scaffolding'];

export default function EquipmentPage() {
  const [active, setActive] = useState('All');
  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Heavy Equipment &amp; Plant Hire</h1><p>Rent verified, well-maintained equipment for your construction project.</p></div></section>
      <section className={s.sectionContent}>
        <div className="container">
          <div className={s.filterBar}>{cats.map(c => (<button key={c} className={`${s.filterPill} ${active === c ? s.active : ''}`} onClick={() => setActive(c)}>{c}</button>))}</div>
          <div className="grid grid-3">
            {equipment.map((eq, i) => (
              <div key={i} className={`card ${s.listingCard}`}>
                <div className={s.imgWrap} style={{ background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px' }}>
                  <span style={{ fontSize: '4rem' }}>{eq.icon}</span>
                  <span className={s.badge} style={{ background: eq.avail === 'Available' ? 'var(--accent)' : '#EF4444' }}>{eq.avail}</span>
                </div>
                <div className={s.cardBody}>
                  <h3>{eq.name}</h3>
                  <div className={s.price}>{eq.rate}</div>
                  <Link href="/equipment/rental" className="btn btn-primary" style={{ width: '100%' }}>Book Now</Link>
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
