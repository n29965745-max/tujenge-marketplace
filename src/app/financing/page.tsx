'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const products = [
  { icon: '🏦', title: 'Mortgages', desc: 'Competitive rates from leading banks. Get pre-approved in 48 hours and find your dream home with confidence.', cta: 'Check Eligibility' },
  { icon: '🏗️', title: 'Construction Loans', desc: 'Staged disbursement loans designed for builders. Funds released as your project progresses.', cta: 'Apply Now' },
  { icon: '🛡️', title: 'Insurance', desc: 'Comprehensive construction insurance, property insurance, and professional indemnity cover.', cta: 'Get a Quote' },
];

export default function FinancingPage() {
  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Construction Financing &amp; Insurance</h1><p>Access the capital and protection you need to build with confidence.</p></div></section>
      <section className={s.sectionContent}>
        <div className="container">
          <div className="grid grid-3">
            {products.map((p, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '24px' }}>{p.icon}</span>
                <h3 style={{ marginBottom: '12px' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>{p.desc}</p>
                <Link href="/quote" className="btn btn-primary" style={{ width: '100%' }}>{p.cta}</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <h2 style={{ marginBottom: '16px' }}>Trusted Financial Partners</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>We work with leading banks and insurance providers across Africa.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 600 }}>
              <span>KCB Bank</span><span>Equity Bank</span><span>Stanbic</span><span>Jubilee Insurance</span><span>Britam</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
