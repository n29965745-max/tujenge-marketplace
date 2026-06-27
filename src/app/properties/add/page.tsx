'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

export default function AddPropertyPage() {
  const [form, setForm] = useState({ title: '', type: '', location: '', price: '', description: '', name: '', email: '', phone: '', whatsapp: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log('Property Listing:', form); alert('Property submitted for review!'); };
  const update = (field: string, val: string) => setForm(prev => ({ ...prev, [field]: val }));

  return (
    <main>
      <Navigation />
      <section className={s.pageHero}>
        <div className="container"><h1>List Your Property</h1><p>Reach thousands of verified buyers and investors across Africa.</p></div>
      </section>
      <section className={s.formSection}>
        <div className={s.formCard}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '32px' }}>Property Details</h2>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Property Title</label><input className={s.formInput} required value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Modern 4BR Villa" /></div>
              <div className={s.formGroup}><label>Property Type</label><select className={s.formInput} required value={form.type} onChange={e => update('type', e.target.value)}><option value="">Select type</option><option>Residential</option><option>Commercial</option><option>Land</option><option>Apartment</option></select></div>
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Location</label><input className={s.formInput} required value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, Area" /></div>
              <div className={s.formGroup}><label>Price (USD)</label><input className={s.formInput} required type="number" value={form.price} onChange={e => update('price', e.target.value)} placeholder="450000" /></div>
            </div>
            <div className={s.formGroup}><label>Description</label><textarea className={s.formInput} rows={4} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Describe the property..." /></div>

            <h2 style={{ margin: '40px 0 24px' }}>Amenities</h2>
            <div className={s.checkboxGrid}>
              {['Parking', 'Swimming Pool', 'Garden', 'Security', 'CCTV', 'Gym', 'Backup Water', 'Generator'].map(a => (
                <label key={a} className={s.checkboxLabel}><input type="checkbox" /> {a}</label>
              ))}
            </div>

            <h2 style={{ margin: '40px 0 24px' }}>Media</h2>
            <div className={s.uploadArea}>📁 Drag and drop images or click to upload<br/><small>JPG, PNG up to 10MB each</small></div>

            <h2 style={{ margin: '40px 0 24px' }}>Contact Information</h2>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Full Name</label><input className={s.formInput} required value={form.name} onChange={e => update('name', e.target.value)} /></div>
              <div className={s.formGroup}><label>Email</label><input className={s.formInput} required type="email" value={form.email} onChange={e => update('email', e.target.value)} /></div>
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Phone</label><input className={s.formInput} value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
              <div className={s.formGroup}><label>WhatsApp</label><input className={s.formInput} value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} /></div>
            </div>

            <div className={s.btnRow}>
              <button type="button" className={s.btnOutline}>Save Draft</button>
              <button type="button" className={`btn btn-dark`}>Preview</button>
              <button type="submit" className="btn btn-primary">Publish Listing</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
