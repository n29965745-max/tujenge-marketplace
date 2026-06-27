'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const services = [
  { icon: '🚛', title: 'Tipper Trucks', desc: 'Bulk transport for sand, ballast, hardcore, and excavated soil.' },
  { icon: '🛻', title: 'Pickup & Delivery', desc: 'Same-day delivery of materials from supplier to your construction site.' },
  { icon: '🏗️', title: 'Crane Transport', desc: 'Specialized flatbed and lowbed transport for heavy equipment and steel.' },
  { icon: '📦', title: 'Last-Mile Delivery', desc: 'Small-quantity material delivery to remote and rural project sites.' },
];

export default function LogisticsPage() {
  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Construction Logistics &amp; Transport</h1><p>Reliable, tracked delivery of materials and equipment to any site in Africa.</p></div></section>
      <section className={s.sectionContent}>
        <div className="container">
          <div className="grid grid-2">
            {services.map((svc, i) => (
              <div key={i} className="card" style={{ padding: '40px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '3rem', flexShrink: 0 }}>{svc.icon}</span>
                <div>
                  <h3 style={{ marginBottom: '8px' }}>{svc.title}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{svc.desc}</p>
                  <Link href="/quote" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>Request Transport</Link>
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
