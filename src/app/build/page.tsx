'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';
import styles from './build.module.css';

const houseTypes = [
  { icon: '🏠', label: 'Bungalow', baseRate: 60, multiplier: 1.0 },
  { icon: '🏘️', label: 'Maisonette', baseRate: 80, multiplier: 1.25 },
  { icon: '🏢', label: 'Apartment', baseRate: 55, multiplier: 1.1 },
  { icon: '🏡', label: 'Villa', baseRate: 110, multiplier: 1.6 },
  { icon: '🏗️', label: 'Commercial', baseRate: 95, multiplier: 1.75 },
];

const budgetRanges = ['$10K – $50K', '$50K – $150K', '$150K – $500K', '$500K+'];
const finishLevels = [
  { label: 'Standard', multiplier: 1.0, desc: 'Quality local finishes at an affordable price point.' },
  { label: 'Premium', multiplier: 1.4, desc: 'High-end fittings, imported tiling, custom cabinetry.' },
  { label: 'Luxury', multiplier: 1.9, desc: 'Bespoke designs, smart home systems, premium marble & hardwood.' },
];

const locations = [
  { name: 'Nairobi (Karen/Runda/Westlands)', multiplier: 1.15, landCost: 60000 },
  { name: 'Nairobi (Other)', multiplier: 1.05, landCost: 35000 },
  { name: 'Mombasa', multiplier: 1.0, landCost: 25000 },
  { name: 'Kisumu', multiplier: 0.95, landCost: 20000 },
  { name: 'Eldoret', multiplier: 0.9, landCost: 15000 },
  { name: 'Other Regions', multiplier: 0.85, landCost: 10000 }
];

const timelines = ['Immediately', '1–3 Months', '3–6 Months', '6–12 Months'];

export default function BuildPage() {
  const [step, setStep] = useState(1);
  const [ownsLand, setOwnsLand] = useState<string>('yes');
  const [selectedLocation, setSelectedLocation] = useState(locations[0].name);
  const [plotSize, setPlotSize] = useState('2500'); // sqft of house built-up area
  const [houseType, setHouseType] = useState('Bungalow');
  const [budget, setBudget] = useState('$50K – $150K');
  const [finish, setFinish] = useState('Standard');
  const [timeline, setTimeline] = useState('1–3 Months');

  // Extra add-ons
  const [addons, setAddons] = useState({
    solar: false,
    borehole: false,
    wall: false,
    landscaping: false,
  });

  const [estimate, setEstimate] = useState({
    materials: 0,
    labor: 0,
    equipment: 0,
    professional: 0,
    permits: 0,
    land: 0,
    addons: 0,
    total: 0,
    monthlyMortgage: 0
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const next = () => { if (step < totalSteps) setStep(step + 1); };
  const back = () => { if (step > 1) setStep(step - 1); };

  // Calculate dynamic estimate
  useEffect(() => {
    const typeObj = houseTypes.find(h => h.label === houseType) || houseTypes[0];
    const finishObj = finishLevels.find(f => f.label === finish) || finishLevels[0];
    const locObj = locations.find(l => l.name === selectedLocation) || locations[0];

    const size = parseFloat(plotSize) || 1500;
    
    // Core base cost calculation
    let coreCost = size * typeObj.baseRate * finishObj.multiplier * locObj.multiplier;
    
    // Addons cost
    let addonsCost = 0;
    if (addons.solar) addonsCost += 6000;
    if (addons.borehole) addonsCost += 8500;
    if (addons.wall) addonsCost += 4500;
    if (addons.landscaping) addonsCost += 3500;

    // Land search cost if doesn't own land
    let landCost = ownsLand === 'no' ? locObj.landCost : 0;

    // Split estimates
    const materials = coreCost * 0.45;
    const labor = coreCost * 0.30;
    const equipment = coreCost * 0.10;
    const professional = coreCost * 0.08;
    const permits = coreCost * 0.07;
    const total = coreCost + addonsCost + landCost;

    // Mortgage calculator: 10 year term at 12% annual interest rate
    // r = 12% / 12 months = 0.01 per month
    // n = 10 years * 12 months = 120 payments
    const r = 0.12 / 12;
    const n = 120;
    const monthlyMortgage = total * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setEstimate({
      materials,
      labor,
      equipment,
      professional,
      permits,
      land: landCost,
      addons: addonsCost,
      total,
      monthlyMortgage
    });
  }, [houseType, finish, selectedLocation, plotSize, ownsLand, addons]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const [showResults, setShowResults] = useState(false);

  return (
    <main>
      <Navigation />
      <section className={s.pageHero}>
        <div className="container">
          <h1>Build My House</h1>
          <p>Configure your dream construction project and get a detailed dynamic cost estimate instantly.</p>
        </div>
      </section>

      <section className={s.sectionContent}>
        <div className="container" style={{ maxWidth: showResults ? '1000px' : '800px', margin: '0 auto' }}>
          
          {!showResults ? (
            <>
              {/* Progress Tracker */}
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
              </div>
              <div className={styles.stepLabel} style={{ fontWeight: 600 }}>Step {step} of {totalSteps}</div>

              {/* Steps */}
              {step === 1 && (
                <div className={styles.stepContent}>
                  <h2>1. Land & Location Info</h2>
                  <p className={styles.stepDesc}>Do you already own the land for your project?</p>
                  
                  <div className={styles.optionGrid}>
                    <button 
                      className={`${styles.optionCard} ${ownsLand === 'yes' ? styles.selected : ''}`} 
                      onClick={() => setOwnsLand('yes')}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌳</div>
                      Yes, I already own land
                    </button>
                    <button 
                      className={`${styles.optionCard} ${ownsLand === 'no' ? styles.selected : ''}`} 
                      onClick={() => setOwnsLand('no')}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
                      No, I need land estimate
                    </button>
                  </div>

                  <div className={s.formRow} style={{ marginTop: '32px' }}>
                    <div className={s.formGroup}>
                      <label>Project Location</label>
                      <select 
                        className={s.formInput} 
                        value={selectedLocation} 
                        onChange={e => setSelectedLocation(e.target.value)}
                      >
                        {locations.map(l => (
                          <option key={l.name} value={l.name}>{l.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className={s.formGroup}>
                      <label>Desired Build-up Area (Sq. Ft.)</label>
                      <input 
                        type="number" 
                        className={s.formInput} 
                        placeholder="e.g. 2000" 
                        value={plotSize} 
                        onChange={e => setPlotSize(e.target.value)} 
                      />
                      <small style={{ color: 'var(--text-muted)' }}>Average 3BR house is ~1,500 to 2,500 sq ft.</small>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className={styles.stepContent}>
                  <h2>2. Architectural House Type</h2>
                  <p className={styles.stepDesc}>What type of building are you planning to construct?</p>
                  
                  <div className={styles.optionGrid}>
                    {houseTypes.map(ht => (
                      <button 
                        key={ht.label} 
                        className={`${styles.optionCard} ${houseType === ht.label ? styles.selected : ''}`} 
                        onClick={() => setHouseType(ht.label)}
                      >
                        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>{ht.icon}</span>
                        <strong>{ht.label}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Base Rate: ${ht.baseRate}/sqft
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.stepContent}>
                  <h2>3. Budget Range Preference</h2>
                  <p className={styles.stepDesc}>Specify your approximate budget range for planning.</p>
                  
                  <div className={styles.optionGrid}>
                    {budgetRanges.map(b => (
                      <button 
                        key={b} 
                        className={`${styles.optionCard} ${budget === b ? styles.selected : ''}`} 
                        onClick={() => setBudget(b)}
                      >
                        <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>💰</div>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className={styles.stepContent}>
                  <h2>4. Quality & Finish Level</h2>
                  <p className={styles.stepDesc}>Select the material specification and finishing grade.</p>
                  
                  <div className={styles.optionGrid}>
                    {finishLevels.map(f => (
                      <button 
                        key={f.label} 
                        className={`${styles.optionCard} ${finish === f.label ? styles.selected : ''}`} 
                        onClick={() => setFinish(f.label)}
                        style={{ textAlign: 'left', padding: '20px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{f.label}</span>
                          <span className={s.badge} style={{ position: 'relative', top: 0, left: 0, background: 'var(--primary)', marginLeft: 'auto' }}>
                            {f.multiplier}x cost
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{f.desc}</p>
                      </button>
                    ))}
                  </div>

                  <h3 style={{ marginTop: '40px', marginBottom: '16px' }}>Project Add-ons</h3>
                  <div className={s.checkboxGrid}>
                    <label className={s.checkboxLabel}>
                      <input 
                        type="checkbox" 
                        checked={addons.solar} 
                        onChange={e => setAddons(p => ({ ...p, solar: e.target.checked }))} 
                      />
                      ☀️ Grid-Tie Solar System (+$6,000)
                    </label>
                    <label className={s.checkboxLabel}>
                      <input 
                        type="checkbox" 
                        checked={addons.borehole} 
                        onChange={e => setAddons(p => ({ ...p, borehole: e.target.checked }))} 
                      />
                      💧 Borehole & Water Tank (+$8,500)
                    </label>
                    <label className={s.checkboxLabel}>
                      <input 
                        type="checkbox" 
                        checked={addons.wall} 
                        onChange={e => setAddons(p => ({ ...p, wall: e.target.checked }))} 
                      />
                      🧱 Perimeter Stone Wall (+$4,500)
                    </label>
                    <label className={s.checkboxLabel}>
                      <input 
                        type="checkbox" 
                        checked={addons.landscaping} 
                        onChange={e => setAddons(p => ({ ...p, landscaping: e.target.checked }))} 
                      />
                      🏡 Landscaping & Driveway (+$3,500)
                    </label>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className={styles.stepContent}>
                  <h2>5. Project Timeline</h2>
                  <p className={styles.stepDesc}>When do you intend to break ground?</p>
                  
                  <div className={styles.optionGrid}>
                    {timelines.map(t => (
                      <button 
                        key={t} 
                        className={`${styles.optionCard} ${timeline === t ? styles.selected : ''}`} 
                        onClick={() => setTimeline(t)}
                      >
                        <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🗓️</div>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className={styles.navButtons}>
                <button 
                  className={s.btnOutline} 
                  onClick={back} 
                  disabled={step === 1}
                  style={{ opacity: step === 1 ? 0.4 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
                >
                  ← Back
                </button>
                <div style={{ flex: 1 }}></div>
                {step < totalSteps ? (
                  <button className="btn btn-primary" onClick={next}>Next Step →</button>
                ) : (
                  <button className="btn btn-primary" onClick={() => setShowResults(true)}>Calculate Estimate</button>
                )}
              </div>
            </>
          ) : (
            /* Detailed Estimations Results Screen */
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2>Your Preliminary Construction Estimate</h2>
                <button className={s.btnOutline} onClick={() => setShowResults(false)}>← Modify Config</button>
              </div>

              <div className={styles.resultsPanel} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '32px' }}>
                <div className={styles.resultItem} style={{ borderLeft: '5px solid var(--accent)' }}>
                  <div className={styles.resultLabel}>Total Estimated Cost</div>
                  <div className={styles.resultValue}>{formatCurrency(estimate.total)}</div>
                  <small style={{ color: 'var(--text-muted)' }}>+/- 10% market variance</small>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.resultLabel}>Est. Monthly Mortgage</div>
                  <div className={styles.resultValue}>{formatCurrency(estimate.monthlyMortgage)}</div>
                  <small style={{ color: 'var(--text-muted)' }}>10 Yrs @ 12% APR</small>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.resultLabel}>Build Duration</div>
                  <div className={styles.resultValue}>8–12 Months</div>
                  <small style={{ color: 'var(--text-muted)' }}>Based on {timeline} start</small>
                </div>
              </div>

              <div className="grid grid-2" style={{ gap: '32px', marginBottom: '40px' }}>
                {/* Cost Breakdown Table */}
                <div className="card" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>Cost Breakdown</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px 0', color: 'var(--text-main)', fontWeight: 500 }}>🧱 Materials (45%)</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(estimate.materials)}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px 0', color: 'var(--text-main)', fontWeight: 500 }}>👷 Labor & Supervision (30%)</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(estimate.labor)}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px 0', color: 'var(--text-main)', fontWeight: 500 }}>🏗️ Equipment & Mobilization (10%)</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(estimate.equipment)}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px 0', color: 'var(--text-main)', fontWeight: 500 }}>📐 Professional Fees (Architects/QS) (8%)</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(estimate.professional)}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px 0', color: 'var(--text-main)', fontWeight: 500 }}>📋 Municipal Permits & Approvals (7%)</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(estimate.permits)}</td>
                      </tr>
                      {estimate.addons > 0 && (
                        <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '12px 0', color: 'var(--accent)', fontWeight: 600 }}>➕ Selected Add-ons</td>
                          <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--accent)' }}>{formatCurrency(estimate.addons)}</td>
                        </tr>
                      )}
                      {estimate.land > 0 && (
                        <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '12px 0', color: 'var(--primary)', fontWeight: 600 }}>🗺️ Land Search Estimate</td>
                          <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--primary)' }}>{formatCurrency(estimate.land)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Next Steps Card */}
                <div className="card" style={{ padding: '24px', background: 'var(--primary)', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', marginBottom: '12px' }}>Start Your Build Process</h3>
                    <p style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                      Ready to turn this estimate into reality? Get a detailed Bill of Quantities (BOQ) and professional consultation tailored for your project.
                    </p>
                    <ul style={{ color: '#e5e7eb', fontSize: '0.9rem', paddingLeft: '20px', marginBottom: '24px' }}>
                      <li style={{ marginBottom: '8px' }}>Free matching with 3 vetted local Architects.</li>
                      <li style={{ marginBottom: '8px' }}>Customized structural drawing review.</li>
                      <li style={{ marginBottom: '8px' }}>Escrow-protected milestone payments.</li>
                    </ul>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Link href={`/quote?projectType=New%20Construction&location=${encodeURIComponent(selectedLocation)}&budget=${encodeURIComponent(budget)}&timeline=${encodeURIComponent(timeline)}`} className="btn btn-primary" style={{ background: 'var(--accent)', border: 'none', flex: 1, textAlign: 'center' }}>
                      Get Detailed BOQ
                    </Link>
                    <Link href="/professionals" className="btn btn-dark" style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                      Browse Pros
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recommended Matches Section */}
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ marginBottom: '20px' }}>Recommended Contractors for your project</h3>
                <div className="grid grid-3">
                  <div className="card" style={{ padding: '24px' }}>
                    <div className={s.avatarCircle} style={{ background: '#111827' }}>BC</div>
                    <h4>BuildCorp Engineering</h4>
                    <p className={s.meta} style={{ fontSize: '0.85rem' }}>NCA Grade 1 General Contractor</p>
                    <p style={{ fontSize: '0.9rem', margin: '8px 0' }}>⭐ 4.9 (120 reviews)</p>
                    <Link href="/quote" className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem', padding: '10px' }}>Invite to Quote</Link>
                  </div>
                  <div className="card" style={{ padding: '24px' }}>
                    <div className={s.avatarCircle} style={{ background: '#3B82F6' }}>EW</div>
                    <h4>ElectroWorks Ltd</h4>
                    <p className={s.meta} style={{ fontSize: '0.85rem' }}>NCA Grade 2 Electrical Contractor</p>
                    <p style={{ fontSize: '0.9rem', margin: '8px 0' }}>⭐ 4.8 (95 reviews)</p>
                    <Link href="/quote" className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem', padding: '10px' }}>Invite to Quote</Link>
                  </div>
                  <div className="card" style={{ padding: '24px' }}>
                    <div className={s.avatarCircle} style={{ background: '#06B6D4' }}>PP</div>
                    <h4>PrimePlumb Services</h4>
                    <p className={s.meta} style={{ fontSize: '0.85rem' }}>NCA Grade 3 Plumbing & HVAC</p>
                    <p style={{ fontSize: '0.9rem', margin: '8px 0' }}>⭐ 4.7 (78 reviews)</p>
                    <Link href="/quote" className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem', padding: '10px' }}>Invite to Quote</Link>
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

