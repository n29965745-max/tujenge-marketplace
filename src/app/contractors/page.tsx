'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const contractorsList = [
  { 
    id: 'c1',
    initials: 'BC', 
    name: 'BuildCorp Engineering', 
    spec: 'General Contractor', 
    projects: 87, 
    ratingVal: 4.9, 
    reviewCount: 120,
    color: '#111827',
    ncaLicense: 'NCA-1/G/29302',
    ncaClass: 'Grade 1 (Unlimited)',
    location: 'Nairobi',
    projectsList: [
      { name: 'Karen Heights Residential (12 luxury houses)', year: '2025' },
      { name: 'Riverside Office Plaza (6 Storey Shell & Core)', year: '2024' }
    ]
  },
  { 
    id: 'c2',
    initials: 'EW', 
    name: 'ElectroWorks Ltd', 
    spec: 'Electrical Contractor', 
    projects: 142, 
    ratingVal: 4.8, 
    reviewCount: 95,
    color: '#3B82F6',
    ncaLicense: 'NCA-2/E/10928',
    ncaClass: 'Grade 2 (Up to $5M)',
    location: 'Nairobi',
    projectsList: [
      { name: 'Westlands Mall Smart Power Grid', year: '2025' },
      { name: 'Diani Beach Resort solar installation', year: '2024' }
    ]
  },
  { 
    id: 'c3',
    initials: 'PP', 
    name: 'PrimePlumb Services', 
    spec: 'Plumbing Contractor', 
    projects: 63, 
    ratingVal: 4.7, 
    reviewCount: 78,
    color: '#06B6D4',
    ncaLicense: 'NCA-3/W/8920',
    ncaClass: 'Grade 3 (Up to $2.5M)',
    location: 'Mombasa',
    projectsList: [
      { name: 'Kileleshwa Luxury Apartments drainage infrastructure', year: '2025' },
      { name: 'Nyali Golf Estate borehole integration', year: '2023' }
    ]
  },
  { 
    id: 'c4',
    initials: 'MW', 
    name: 'MasterWood Carpentry', 
    spec: 'Carpentry & Joinery', 
    projects: 55, 
    ratingVal: 4.9, 
    reviewCount: 64,
    color: '#D97706',
    ncaLicense: 'NCA-4/C/4420',
    ncaClass: 'Grade 4 (Up to $1.2M)',
    location: 'Nairobi',
    projectsList: [
      { name: 'Lavington Villa hardwood cabinetry and deck', year: '2025' }
    ]
  },
  { 
    id: 'c5',
    initials: 'SF', 
    name: 'SteelForge Fabricators', 
    spec: 'Metal & Welding', 
    projects: 91, 
    ratingVal: 4.8, 
    reviewCount: 110,
    color: '#6B7280',
    ncaLicense: 'NCA-2/M/11094',
    ncaClass: 'Grade 2 (Up to $5M)',
    location: 'Eldoret',
    projectsList: [
      { name: 'Eldoret Grain Silos structural steel erection', year: '2024' },
      { name: 'Industrial Area warehouse roofing trusses', year: '2024' }
    ]
  },
  { 
    id: 'c6',
    initials: 'CP', 
    name: 'Crown Painters', 
    spec: 'Painting & Finishing', 
    projects: 203, 
    ratingVal: 4.6, 
    reviewCount: 156,
    color: '#EC4899',
    ncaLicense: 'NCA-5/P/7721',
    ncaClass: 'Grade 5 (Up to $500K)',
    location: 'Nairobi',
    projectsList: [
      { name: 'Gigiri Diplomatic Residence painting', year: '2025' },
      { name: 'Runda Meadows estate external texture coating', year: '2024' }
    ]
  },
];

const categories = ['All', 'General', 'Electrical', 'Plumbing', 'Carpenters', 'Welders', 'Painters'];

export default function ContractorsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContractor, setSelectedContractor] = useState<typeof contractorsList[0] | null>(null);

  // Filter list
  const filteredContractors = useMemo(() => {
    return contractorsList.filter(c => {
      const matchesCategory = activeCategory === 'All' || 
                              c.spec.toLowerCase().includes(activeCategory.toLowerCase()) ||
                              (activeCategory === 'General' && c.spec.includes('General')) ||
                              (activeCategory === 'Electrical' && c.spec.includes('Electrical')) ||
                              (activeCategory === 'Plumbing' && c.spec.includes('Plumbing')) ||
                              (activeCategory === 'Carpenters' && c.spec.includes('Carpentry')) ||
                              (activeCategory === 'Welders' && c.spec.includes('Metal')) ||
                              (activeCategory === 'Painters' && c.spec.includes('Painting'));
                              
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main>
      <Navigation />
      <section className={s.pageHero}>
        <div className="container">
          <h1>Hire Trusted Contractors</h1>
          <p>Every contractor on our panel is licensed by the National Construction Authority (NCA) and backed by our escrow system.</p>
        </div>
      </section>

      <section className={s.sectionContent}>
        <div className="container">
          
          {/* Search bar */}
          <div className="card" style={{ padding: '20px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            <input 
              type="text" 
              className={s.formInput} 
              placeholder="🔍 Search contractors by name, specialty, or city..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className={s.filterBar}>
            {categories.map(c => (
              <button 
                key={c} 
                className={`${s.filterPill} ${activeCategory === c ? s.active : ''}`} 
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Contractors Cards Grid */}
          {filteredContractors.length > 0 ? (
            <div className="grid grid-3">
              {filteredContractors.map((c) => (
                <div key={c.id} className="card" style={{ textAlign: 'center', padding: '32px', display: 'flex', flexDirection: 'column' }}>
                  <div className={s.avatarCircle} style={{ background: c.color, margin: '0 auto 16px' }}>{c.initials}</div>
                  <h3 style={{ marginBottom: '4px' }}>{c.name}</h3>
                  <p className={s.meta} style={{ marginBottom: '8px' }}>{c.spec}</p>
                  
                  <div className={s.rating} style={{ marginBottom: '4px' }}>⭐ {c.ratingVal} ({c.reviewCount} reviews)</div>
                  <p className={s.meta} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 {c.location} • NCA {c.ncaClass.split(' ')[0]}</p>
                  
                  <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className={s.btnOutline} 
                        style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                        onClick={() => setSelectedContractor(c)}
                      >
                        Inspect Profile
                      </button>
                      <Link 
                        href={`/quote?projectType=${encodeURIComponent(c.spec)}&suppliers=${encodeURIComponent(c.name)}`}
                        className="btn btn-primary" 
                        style={{ flex: 1, padding: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        Invite to Quote
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '40px', backgroundColor: 'var(--surface)' }}>
              <h3>No contractors match your filters</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try expanding your search parameters or selecting another category.</p>
            </div>
          )}

          {/* Contractor Signup banner */}
          <div style={{ textAlign: 'center', marginTop: '60px', padding: '40px', background: 'var(--primary)', borderRadius: '16px', color: '#fff' }}>
            <h3 style={{ color: '#fff', marginBottom: '12px' }}>Are you a contractor?</h3>
            <p style={{ color: '#d1d5db', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
              Join our escrow network and access direct construction bids and volume discounts on premium materials.
            </p>
            <Link href="/register/contractor" className="btn btn-primary">Join Our Network</Link>
          </div>
        </div>
      </section>

      {/* Contractor Details Modal */}
      {selectedContractor && (
        <>
          <div className="modal-backdrop modal-backdrop-visible" onClick={() => setSelectedContractor(null)}></div>
          <div 
            className="modal-content modal-content-visible card" 
            style={{ 
              position: 'fixed', 
              width: '90%', 
              maxWidth: '650px', 
              maxHeight: '90vh', 
              overflowY: 'auto', 
              background: '#fff', 
              padding: '32px', 
              borderRadius: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div className={s.avatarCircle} style={{ background: selectedContractor.color, margin: 0, width: '56px', height: '56px', fontSize: '1.2rem' }}>
                  {selectedContractor.initials}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.7rem', margin: 0 }}>{selectedContractor.name}</h2>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>📍 {selectedContractor.location} • {selectedContractor.spec}</p>
                </div>
              </div>
              <button onClick={() => setSelectedContractor(null)} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
            </div>

            <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: '10px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>🛡️ National Construction Authority (NCA) License</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.95rem' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>NCA License No:</span> <strong style={{ fontFamily: 'monospace' }}>{selectedContractor.ncaLicense}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Registration Class:</span> <strong>{selectedContractor.ncaClass}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Liability Insurance:</span> <span style={{ color: '#047857', fontWeight: 600 }}>Active ($2,000,000)</span></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Tax Compliance:</span> <span style={{ color: '#047857', fontWeight: 600 }}>KRA Compliant</span></div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Completed Projects ({selectedContractor.projects})</h3>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
              {selectedContractor.projectsList.map((proj, idx) => (
                <div key={idx} style={{ padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{proj.name}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Completed {proj.year}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className={s.btnOutline} style={{ flex: 1 }} onClick={() => setSelectedContractor(null)}>Close</button>
              <Link 
                href={`/quote?projectType=${encodeURIComponent(selectedContractor.spec)}&suppliers=${encodeURIComponent(selectedContractor.name)}`}
                className="btn btn-primary" 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Hire Contractor
              </Link>
            </div>
          </div>
        </>
      )}

      <Footer />
    </main>
  );
}
