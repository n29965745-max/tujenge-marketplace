'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const features = [
  { icon: '📅', title: 'Schedules', desc: 'Visual Gantt charts and milestone tracking to keep your project on time.' },
  { icon: '💰', title: 'Budgets', desc: 'Real-time budget tracking with alerts when costs approach your limits.' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Photo updates, percentage completion, and stage-by-stage progress reports.' },
  { icon: '📊', title: 'Reports', desc: 'Generate professional PDF reports to share with investors and stakeholders.' },
];

export default function ProjectsPage() {
  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Manage Your Construction Project</h1><p>Track schedules, budgets, and progress — all from one dashboard.</p></div></section>
      <section className={s.sectionContent}>
        <div className="container">
          <div className="grid grid-2">
            {features.map((f, i) => (
              <div key={i} className="card" style={{ padding: '40px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '3rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <h3 style={{ marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '60px' }}>
            <Link href="/build" className="btn btn-primary" style={{ marginRight: '16px' }}>Start Managing</Link>
            <Link href="/quote" className="btn btn-dark">Talk to an Expert</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
