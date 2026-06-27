'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const productOptions = ['Cement', 'Steel', 'Timber', 'Sand & Aggregates', 'Roofing', 'Plumbing', 'Electrical', 'Paint & Finishes', 'Doors & Windows', 'Tiles', 'Hardware'];

export default function SupplierRegistrationPage() {
  const [form, setForm] = useState({ company: '', regNo: '', taxPin: '', location: '', delivery: '', contact: '', whatsapp: '', website: '' });
  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log('Supplier Registration:', form); alert('Registration submitted! We will verify your details within 48 hours.'); };

  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Become a Verified Supplier</h1><p>Join Africa&apos;s largest construction marketplace and reach thousands of buyers.</p></div></section>
      <section className={s.formSection}>
        <div className={s.formCard}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '32px' }}>Company Information</h2>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Company Name</label><input className={s.formInput} required value={form.company} onChange={e => update('company', e.target.value)} placeholder="e.g. ABC Hardware Ltd" /></div>
              <div className={s.formGroup}><label>Registration Number</label><input className={s.formInput} value={form.regNo} onChange={e => update('regNo', e.target.value)} placeholder="Company reg. number" /></div>
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Tax PIN / KRA PIN</label><input className={s.formInput} value={form.taxPin} onChange={e => update('taxPin', e.target.value)} placeholder="Tax identification" /></div>
              <div className={s.formGroup}><label>Location</label><input className={s.formInput} required value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, Area" /></div>
            </div>

            <h2 style={{ margin: '40px 0 24px' }}>Products Sold</h2>
            <div className={s.checkboxGrid}>
              {productOptions.map(p => (<label key={p} className={s.checkboxLabel}><input type="checkbox" /> {p}</label>))}
            </div>

            <h2 style={{ margin: '40px 0 24px' }}>Contact &amp; Delivery</h2>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Delivery Areas</label><input className={s.formInput} value={form.delivery} onChange={e => update('delivery', e.target.value)} placeholder="e.g. Nairobi, Mombasa, Kisumu" /></div>
              <div className={s.formGroup}><label>Phone / Contact</label><input className={s.formInput} required value={form.contact} onChange={e => update('contact', e.target.value)} /></div>
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>WhatsApp</label><input className={s.formInput} value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} /></div>
              <div className={s.formGroup}><label>Website (optional)</label><input className={s.formInput} value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://" /></div>
            </div>

            <h2 style={{ margin: '40px 0 24px' }}>Documents</h2>
            <div className={s.uploadArea}>📄 Upload business registration, tax certificate, and product catalog<br/><small>PDF, JPG, PNG up to 10MB</small></div>

            <div style={{ marginTop: '32px' }}>
              <label className={s.checkboxLabel} style={{ border: 'none', padding: '0' }}><input type="checkbox" required /> I agree to the Terms of Service and Privacy Policy</label>
            </div>
            <div className={s.btnRow}><button type="submit" className="btn btn-primary">Submit Registration</button></div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
