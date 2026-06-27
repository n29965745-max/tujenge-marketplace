'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const specialties = ['General Contractor', 'Electrical', 'Plumbing', 'Carpentry & Joinery', 'Welding & Fabrication', 'Painting', 'Tiling', 'Roofing', 'Landscaping', 'Interior Fit-out', 'HVAC', 'Demolition'];

export default function ContractorRegistrationPage() {
  const [form, setForm] = useState({ company: '', contact: '', experience: '', license: '', portfolio: '', references: '' });
  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log('Contractor Registration:', form); alert('Registration submitted! We will review and verify within 48 hours.'); };

  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Join as a Contractor</h1><p>Get access to verified project leads and grow your construction business.</p></div></section>
      <section className={s.formSection}>
        <div className={s.formCard}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '32px' }}>Company Details</h2>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Company / Business Name</label><input className={s.formInput} required value={form.company} onChange={e => update('company', e.target.value)} placeholder="e.g. BuildCorp Engineering" /></div>
              <div className={s.formGroup}><label>Contact Phone</label><input className={s.formInput} required value={form.contact} onChange={e => update('contact', e.target.value)} /></div>
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Years of Experience</label><input className={s.formInput} type="number" required value={form.experience} onChange={e => update('experience', e.target.value)} placeholder="e.g. 10" /></div>
              <div className={s.formGroup}><label>License / NCA Number</label><input className={s.formInput} value={form.license} onChange={e => update('license', e.target.value)} placeholder="e.g. NCA/2024/XXXX" /></div>
            </div>

            <h2 style={{ margin: '40px 0 24px' }}>Specialties</h2>
            <div className={s.checkboxGrid}>
              {specialties.map(sp => (<label key={sp} className={s.checkboxLabel}><input type="checkbox" /> {sp}</label>))}
            </div>

            <h2 style={{ margin: '40px 0 24px' }}>Portfolio</h2>
            <div className={s.formGroup}><label>Brief Portfolio Description</label><textarea className={s.formInput} rows={4} value={form.portfolio} onChange={e => update('portfolio', e.target.value)} placeholder="Describe your notable projects, specializations, and achievements..." /></div>
            <div className={s.uploadArea}>📸 Upload portfolio images and license documents<br/><small>JPG, PNG, PDF up to 10MB each</small></div>

            <h2 style={{ margin: '40px 0 24px' }}>References</h2>
            <div className={s.formGroup}><label>Client References</label><textarea className={s.formInput} rows={3} value={form.references} onChange={e => update('references', e.target.value)} placeholder="Name, phone, and project for 2-3 past clients..." /></div>

            <div style={{ marginTop: '32px' }}>
              <label className={s.checkboxLabel} style={{ border: 'none', padding: '0' }}><input type="checkbox" required /> I agree to the Terms of Service and the Contractor Code of Conduct</label>
            </div>
            <div className={s.btnRow}><button type="submit" className="btn btn-primary">Submit Registration</button></div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
