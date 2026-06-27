'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

export default function EquipmentRentalPage() {
  const [form, setForm] = useState({ type: '', duration: '', location: '', operator: 'no', delivery: 'no' });
  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log('Equipment Rental:', form); alert('Rental request submitted!'); };

  return (
    <main>
      <Navigation />
      <section className={s.pageHero}><div className="container"><h1>Equipment Rental Request</h1><p>Fill in the details and we will connect you with verified equipment owners.</p></div></section>
      <section className={s.formSection}>
        <div className={s.formCard}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '32px' }}>Rental Details</h2>
            <div className={s.formGroup}><label>Equipment Type</label>
              <select className={s.formInput} required value={form.type} onChange={e => update('type', e.target.value)}>
                <option value="">Select equipment</option><option>Excavator</option><option>Bulldozer</option><option>Crane</option><option>Concrete Mixer</option><option>Generator</option><option>Compactor</option><option>Forklift</option><option>Scaffolding</option>
              </select>
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Duration (days)</label><input className={s.formInput} type="number" required min={1} value={form.duration} onChange={e => update('duration', e.target.value)} placeholder="e.g. 14" /></div>
              <div className={s.formGroup}><label>Project Location</label><input className={s.formInput} required value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, Area" /></div>
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}><label>Operator Needed?</label>
                <select className={s.formInput} value={form.operator} onChange={e => update('operator', e.target.value)}><option value="no">No</option><option value="yes">Yes</option></select>
              </div>
              <div className={s.formGroup}><label>Delivery Required?</label>
                <select className={s.formInput} value={form.delivery} onChange={e => update('delivery', e.target.value)}><option value="no">No – I will arrange pickup</option><option value="yes">Yes – Deliver to site</option></select>
              </div>
            </div>
            <div className={s.btnRow}><button type="submit" className="btn btn-primary">Submit Rental Request</button></div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
