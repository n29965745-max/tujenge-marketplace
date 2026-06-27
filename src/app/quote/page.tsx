'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const availableMaterials = [
  { id: 'mat1', name: 'Portland Cement (50kg)', price: 6.50, icon: '🧱', supplier: 'Bamburi Cement' },
  { id: 'mat2', name: 'Steel Rebar Y16 (per bar)', price: 12.00, icon: '🔩', supplier: 'Kenya Steel' },
  { id: 'mat3', name: 'River Sand (per ton)', price: 28.00, icon: '🪨', supplier: 'Nairobi Quarries' },
  { id: 'mat4', name: 'Cypress Timber 2x4 (per pc)', price: 4.50, icon: '🪵', supplier: 'Timber World' },
  { id: 'mat5', name: 'Premium Crown Paint (20L)', price: 45.00, icon: '🎨', supplier: 'Crown Paints' },
  { id: 'mat6', name: 'Roofing Sheets (3m)', price: 18.00, icon: '🏗️', supplier: 'Mabati Rolling' }
];

export default function QuotePage() {
  const [form, setForm] = useState({ 
    projectType: 'New Construction', 
    location: '', 
    budget: '$50,000 – $150,000', 
    timeline: '1–3 Months', 
    suppliers: '', 
    notes: '' 
  });
  
  // Quote materials basket
  const [basket, setBasket] = useState<{ [key: string]: number }>({});
  const [fileDrawing, setFileDrawing] = useState<string | null>(null);
  const [fileBOQ, setFileBOQ] = useState<string | null>(null);

  // Success state matching simulator
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState(0);

  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));

  const toggleMaterial = (id: string) => {
    setBasket(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 10; // default quantity
      }
      return next;
    });
  };

  const updateQty = (id: string, qty: number) => {
    setBasket(prev => ({
      ...prev,
      [id]: Math.max(1, qty)
    }));
  };

  // Calculate material subtotal
  const materialSubtotal = Object.entries(basket).reduce((sum, [id, qty]) => {
    const mat = availableMaterials.find(m => m.id === id);
    return sum + (mat ? mat.price * qty : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStage(1);
  };

  // Simulate verification and match stages
  useEffect(() => {
    if (submitStage > 0 && submitStage < 4) {
      const timer = setTimeout(() => {
        setSubmitStage(prev => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [submitStage]);

  const handleReset = () => {
    setIsSubmitting(false);
    setSubmitStage(0);
    setBasket({});
    setForm({ projectType: 'New Construction', location: '', budget: '$50,000 – $150,000', timeline: '1–3 Months', suppliers: '', notes: '' });
  };

  return (
    <main>
      <Navigation />
      <section className={s.pageHero}>
        <div className="container">
          <h1>Request a Quote</h1>
          <p>Request quotes directly from qualified engineers, contractors, and suppliers on Msingi's escrow network.</p>
        </div>
      </section>

      <section className={s.formSection}>
        <div className="container">
          
          {isSubmitting ? (
            /* Match Simulator Success Screen */
            <div className="card" style={{ maxWidth: '700px', margin: '0 auto', padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '24px' }}>
                {submitStage === 1 && '📡'}
                {submitStage === 2 && '🔍'}
                {submitStage === 3 && '🚛'}
                {submitStage === 4 && '✅'}
              </div>

              {submitStage === 1 && (
                <div>
                  <h2 className="pulse">Broadcasting Quote Request</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Publishing your BOQ parameters to verified partners in {form.location || 'your region'}...</p>
                </div>
              )}
              {submitStage === 2 && (
                <div>
                  <h2 className="pulse">Matching Vetted Contractors & Professionals</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Scanning qualifications, NCA grades, and recent reviews matching your {form.projectType} project...</p>
                </div>
              )}
              {submitStage === 3 && (
                <div>
                  <h2 className="pulse">Aggregating Supplier Bulk Pricing</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Calculating delivery schedules and volume discounts for your {Object.keys(basket).length} selected materials...</p>
                </div>
              )}
              {submitStage === 4 && (
                <div>
                  <h2 style={{ color: 'var(--accent)' }}>Quotes Successfully Requested!</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                    Your request was verified by Msingi. 3 matching contractors and suppliers have been notified and will send quotes to your dashboard.
                  </p>
                  
                  <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', textAlign: 'left', marginBottom: '32px' }}>
                    <h4 style={{ marginBottom: '12px' }}>Request Reference: #MSI-{Math.floor(Math.random() * 90000) + 10000}</h4>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'grid', gap: '8px' }}>
                      <div>🔹 <strong>Type:</strong> {form.projectType}</div>
                      <div>🔹 <strong>Location:</strong> {form.location || 'Not Specified'}</div>
                      <div>🔹 <strong>Target Budget:</strong> {form.budget}</div>
                      {Object.keys(basket).length > 0 && (
                        <div>
                          🔹 <strong>Materials Requested:</strong> {Object.keys(basket).length} item types (Est. Subtotal: ${materialSubtotal.toFixed(2)})
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={handleReset}>New Request</button>
                    <Link href="/projects" className="btn btn-dark">View Projects Dashboard</Link>
                  </div>
                </div>
              )}

              {/* Progress Pipeline */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '15px', left: 0, right: 0, height: '4px', background: '#e5e7eb', zIndex: 1 }}></div>
                <div style={{ position: 'absolute', top: '15px', left: 0, width: `${((submitStage - 1) / 3) * 100}%`, height: '4px', background: 'var(--accent)', zIndex: 2, transition: 'width 0.4s' }}></div>

                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: submitStage >= idx ? 'var(--accent)' : '#fff', 
                    border: `4px solid ${submitStage >= idx ? 'var(--accent)' : '#e5e7eb'}`,
                    color: submitStage >= idx ? '#fff' : 'var(--text-muted)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    zIndex: 3
                  }}>
                    {idx}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Quote Request Form Layout */
            <div className="grid" style={{ gridTemplateColumns: '3fr 2fr', gap: '32px' }}>
              
              {/* Form Input Side */}
              <div className={s.formCard} style={{ margin: 0, maxWidth: 'none' }}>
                <form onSubmit={handleSubmit}>
                  <h2 style={{ marginBottom: '32px' }}>Project Parameters</h2>
                  
                  <div className={s.formRow}>
                    <div className={s.formGroup}>
                      <label>Project Type</label>
                      <select 
                        className={s.formInput} 
                        required 
                        value={form.projectType} 
                        onChange={e => update('projectType', e.target.value)}
                      >
                        <option>New Construction</option>
                        <option>Renovation</option>
                        <option>Interior Design</option>
                        <option>Landscaping</option>
                        <option>Plumbing</option>
                        <option>Electrical</option>
                        <option>Roofing</option>
                        <option>Civil Works</option>
                      </select>
                    </div>

                    <div className={s.formGroup}>
                      <label>Project Location</label>
                      <input 
                        className={s.formInput} 
                        required 
                        value={form.location} 
                        onChange={e => update('location', e.target.value)} 
                        placeholder="e.g. Karen, Nairobi" 
                      />
                    </div>
                  </div>

                  <div className={s.formRow}>
                    <div className={s.formGroup}>
                      <label>Target Budget Limit</label>
                      <select 
                        className={s.formInput} 
                        value={form.budget} 
                        onChange={e => update('budget', e.target.value)}
                      >
                        <option>$10,000 – $50,000</option>
                        <option>$50,000 – $150,000</option>
                        <option>$150,000 – $500,000</option>
                        <option>$500,000+</option>
                      </select>
                    </div>

                    <div className={s.formGroup}>
                      <label>Desired Start Timeline</label>
                      <select 
                        className={s.formInput} 
                        value={form.timeline} 
                        onChange={e => update('timeline', e.target.value)}
                      >
                        <option>Immediately</option>
                        <option>1–3 Months</option>
                        <option>3–6 Months</option>
                        <option>6–12 Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Material Multi-select list */}
                  <h3 style={{ margin: '40px 0 16px' }}>Select Materials to Include in Quote</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                    Adding materials will request consolidated volume offers directly from verified local suppliers.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                    {availableMaterials.map(mat => {
                      const selected = !!basket[mat.id];
                      return (
                        <div 
                          key={mat.id} 
                          onClick={() => toggleMaterial(mat.id)}
                          style={{
                            padding: '12px 16px',
                            border: `2.5px solid ${selected ? 'var(--accent)' : '#e5e7eb'}`,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: selected ? 'rgba(16, 185, 129, 0.05)' : '#fff',
                            transition: 'all 0.2s',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{ fontSize: '1.8rem' }}>{mat.icon}</span>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{mat.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>${mat.price.toFixed(2)} unit</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Document upload fields */}
                  <h3 style={{ margin: '40px 0 20px' }}>Upload Design Files & BOQ</h3>
                  <div className={s.formRow}>
                    <div 
                      className={s.uploadArea} 
                      onClick={() => setFileDrawing(fileDrawing ? null : 'Floor_Plan_v2.pdf')}
                      style={{ border: fileDrawing ? '2px solid var(--accent)' : '2px dashed #E5E7EB', background: fileDrawing ? 'rgba(16, 185, 129, 0.02)' : 'none' }}
                    >
                      📐 {fileDrawing ? `Selected: ${fileDrawing}` : 'Upload Drawings / Architectural Plans'}<br/>
                      <small style={{ color: 'var(--text-muted)' }}>{fileDrawing ? 'Click to remove file' : 'Drag & Drop PDF, DWG, or JPG'}</small>
                    </div>
                    <div 
                      className={s.uploadArea}
                      onClick={() => setFileBOQ(fileBOQ ? null : 'Bill_Of_Quantities.xlsx')}
                      style={{ border: fileBOQ ? '2px solid var(--accent)' : '2px dashed #E5E7EB', background: fileBOQ ? 'rgba(16, 185, 129, 0.02)' : 'none' }}
                    >
                      📋 {fileBOQ ? `Selected: ${fileBOQ}` : 'Upload Bill of Quantities (BOQ)'}<br/>
                      <small style={{ color: 'var(--text-muted)' }}>{fileBOQ ? 'Click to remove file' : 'Drag & Drop PDF or Excel'}</small>
                    </div>
                  </div>

                  <div className={s.formGroup} style={{ marginTop: '32px' }}>
                    <label>Additional Explanatory Notes</label>
                    <textarea 
                      className={s.formInput} 
                      rows={4} 
                      value={form.notes} 
                      onChange={e => update('notes', e.target.value)} 
                      placeholder="Outline any special instructions, site restrictions, or access conditions..." 
                    />
                  </div>

                  <div className={s.btnRow}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                      Transmit Quote Request
                    </button>
                  </div>
                </form>
              </div>

              {/* Sidebar Quote Summary basket list */}
              <div>
                <div className="card" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
                  <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Request Summary</h3>
                  
                  <div style={{ marginBottom: '24px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Project:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{form.projectType}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Location:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{form.location || 'Not specified'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Timeline:</span>
                      <strong style={{ color: 'var(--text-main)' }}>{form.timeline}</strong>
                    </div>
                  </div>

                  <h4 style={{ marginBottom: '12px' }}>Materials Basket</h4>
                  {Object.keys(basket).length > 0 ? (
                    <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '20px' }}>
                      {Object.entries(basket).map(([id, qty]) => {
                        const mat = availableMaterials.find(m => m.id === id);
                        if (!mat) return null;
                        return (
                          <div 
                            key={id} 
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              padding: '10px 0', 
                              borderBottom: '1px solid #f3f4f6' 
                            }}
                          >
                            <div>
                              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                                {mat.icon} {mat.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                Supplier: {mat.supplier}
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="number" 
                                className={s.formInput} 
                                style={{ width: '60px', padding: '6px', fontSize: '0.8rem', textAlign: 'center', margin: 0 }}
                                value={qty}
                                onChange={e => updateQty(id, Number(e.target.value))}
                                min={1}
                              />
                              <button 
                                onClick={() => toggleMaterial(id)}
                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem' }}
                              >
                                &times;
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
                      No materials selected. Suppliers will quote based solely on your BOQ attachment.
                    </p>
                  )}

                  {Object.keys(basket).length > 0 && (
                    <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Estimated Materials Subtotal</span>
                      <strong style={{ fontSize: '1.25rem', color: 'var(--accent)' }}>
                        ${materialSubtotal.toFixed(2)}
                      </strong>
                    </div>
                  )}

                  <div style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--surface)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                    🛡️ All transactions are routed through Msingi's escrow network. Funds are released only upon milestone verification by certified surveyors.
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>
      <Footer />
    </main>
  );
}
