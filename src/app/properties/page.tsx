'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import s from '@/app/shared.module.css';

const propertiesList = [
  { 
    id: 1,
    title: 'Modern 4BR Villa', 
    category: 'Buy Homes',
    location: 'Nairobi, Karen', 
    price: 450000, 
    beds: 4, 
    baths: 3, 
    sqft: '3,200', 
    badge: 'Verified Title',
    image: '/project_modern.png',
    features: ['Solar Water Heating', 'Perimeter Wall', 'Borehole Connection', '24/7 Security Council', 'DSQ Included'],
    registryNumber: 'LR. No. 12903/44',
    status: 'Ready for transfer'
  },
  { 
    id: 2,
    title: 'Luxury Penthouse', 
    category: 'Apartments',
    location: 'Nairobi, Westlands', 
    price: 320000, 
    beds: 3, 
    baths: 2, 
    sqft: '2,100', 
    badge: 'New',
    image: '/project_modern.png',
    features: ['High-speed Elevators', 'Rooftop Gym & Pool', 'Backup Generator', 'Smart Door Lock', 'Fitted Kitchen'],
    registryNumber: 'LR. No. 892/219/A2',
    status: 'Occupied (Lease transfer)'
  },
  { 
    id: 3,
    title: 'Half Acre Plot', 
    category: 'Buy Land',
    location: 'Nairobi, Runda', 
    price: 180000, 
    beds: 0, 
    baths: 0, 
    sqft: '21,780', 
    badge: 'Verified Title',
    image: '/project_modern.png',
    features: ['Red soil', 'Beacons placed', 'Piped Water on site', 'Three-phase Power', 'Tarmac road access'],
    registryNumber: 'LR. No. 7731/8',
    status: 'Ready for transfer'
  },
  { 
    id: 4,
    title: 'Commercial Building', 
    category: 'Commercial',
    location: 'Mombasa, CBD', 
    price: 1200000, 
    beds: 0, 
    baths: 0, 
    sqft: '8,500', 
    badge: 'Exclusive',
    image: '/project_modern.png',
    features: ['5 Stories', 'Fiber optic internet', 'Basement parking', 'Fire safety cert', 'Fitted generator'],
    registryNumber: 'LR. No. Msa/Block XI/49',
    status: 'Fully tenanted'
  },
  { 
    id: 5,
    title: '3BR Apartment', 
    category: 'Apartments',
    location: 'Kilimani, Nairobi', 
    price: 950000, 
    beds: 3, 
    baths: 2, 
    sqft: '1,400', 
    badge: 'Hot Deal',
    image: '/project_modern.png',
    features: ['Kids play area', 'City council water', 'CCTV surveillance', 'Balcony view', 'Intercom system'],
    registryNumber: 'LR. No. 209/18260',
    status: 'Ready for transfer'
  },
  { 
    id: 6,
    title: 'Beach Villa', 
    category: 'Rentals',
    location: 'Diani, Mombasa', 
    price: 680000, 
    beds: 5, 
    baths: 4, 
    sqft: '4,800', 
    badge: 'Premium',
    image: '/project_modern.png',
    features: ['Beachfront access', 'Private swimming pool', 'Fully furnished', 'DSQ for 2', 'Air Conditioning'],
    registryNumber: 'LR. No. Kwl/Diani/2044',
    status: 'Ready for transfer'
  },
];

const categories = ['All', 'Buy Land', 'Buy Homes', 'Apartments', 'Commercial', 'Rentals'];

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [selectedProperty, setSelectedProperty] = useState<typeof propertiesList[0] | null>(null);
  
  // Modal contact form states
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', visitDate: '', offer: '', requestDocs: false });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return propertiesList.filter(p => {
      const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (p.registryNumber && p.registryNumber.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = p.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [activeFilter, searchQuery, maxPrice]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // close modal or reset state after a visual confirmation delay
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', phone: '', visitDate: '', offer: '', requestDocs: false });
      setSelectedProperty(null);
      alert('Thank you! Your request has been logged. Our escrow and title verification agents will contact you within 2 hours with the verified registry documents.');
    }, 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <main>
      <Navigation />
      <section className={s.pageHero}>
        <div className="container">
          <h1>Find Your Perfect Property</h1>
          <p>Browse verified land plots and properties. Every single listing is independently verified with the Ministry of Lands registry.</p>
        </div>
      </section>

      <section className={s.sectionContent}>
        <div className="container">
          
          {/* Search and Price Slider Bar */}
          <div className="card" style={{ padding: '24px', marginBottom: '40px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', alignItems: 'center' }}>
            <div className={s.formGroup} style={{ margin: 0 }}>
              <label style={{ marginBottom: '6px' }}>Search Title, Location, or Registry Number</label>
              <input 
                type="text" 
                className={s.formInput} 
                placeholder="🔍 Try 'Karen', 'Runda', or 'LR. No'..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className={s.formGroup} style={{ margin: 0 }}>
              <label style={{ marginBottom: '6px' }}>Max Price: <strong style={{ color: 'var(--accent)' }}>{formatCurrency(maxPrice)}</strong></label>
              <input 
                type="range" 
                min={50000} 
                max={1500000} 
                step={50000} 
                className={s.formInput} 
                style={{ height: 'auto', padding: 0 }}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', height: '100%', alignItems: 'flex-end' }}>
              <button 
                className={s.btnOutline} 
                style={{ width: '100%', padding: '14px' }} 
                onClick={() => { setSearchQuery(''); setMaxPrice(1500000); setActiveFilter('All'); }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className={s.filterBar}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`${s.filterPill} ${activeFilter === cat ? s.active : ''}`} 
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Listings Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-3">
              {filteredProperties.map((p) => (
                <div key={p.id} className={`card ${s.listingCard}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className={s.imgWrap} style={{ cursor: 'pointer' }} onClick={() => setSelectedProperty(p)}>
                    <img src={p.image} alt={p.title} className={s.cardImg} style={{ minHeight: '220px' }} />
                    <span className={s.badge} style={{ background: 'var(--primary)' }}>{p.badge}</span>
                  </div>
                  <div className={s.cardBody} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{p.title}</h3>
                      <span style={{ fontSize: '0.8rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                        {p.category}
                      </span>
                    </div>
                    <p className={s.meta} style={{ marginBottom: '12px' }}>📍 {p.location}</p>
                    
                    {p.beds > 0 ? (
                      <div className={s.tags} style={{ marginBottom: '16px' }}>
                        <span>🛏️ {p.beds} Beds</span>
                        <span>🛁 {p.baths} Baths</span>
                        <span>📐 {p.sqft} sqft</span>
                      </div>
                    ) : (
                      <div className={s.tags} style={{ marginBottom: '16px' }}>
                        <span>🗺️ Land Parcel</span>
                        <span>📐 {p.sqft} sqft</span>
                        <span>🚗 Road Access</span>
                      </div>
                    )}
                    
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>registry verified</span>
                        <div className={s.price} style={{ margin: 0 }}>{formatCurrency(p.price)}</div>
                      </div>
                      <button 
                        className="btn btn-primary" 
                        style={{ width: '100%' }}
                        onClick={() => setSelectedProperty(p)}
                      >
                        Inspect Title & Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '60px 24px', backgroundColor: 'var(--surface)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <h3>No properties match your filter criteria</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try adjusting your price slider or entering a different search query.</p>
              <button 
                className="btn btn-primary" 
                style={{ marginTop: '16px' }}
                onClick={() => { setSearchQuery(''); setMaxPrice(1500000); setActiveFilter('All'); }}
              >
                Clear Search Filters
              </button>
            </div>
          )}

          <div className="text-center" style={{ marginTop: '60px' }}>
            <Link href="/properties/add" className="btn btn-dark">List Your Property</Link>
          </div>
        </div>
      </section>

      {/* Property Details & Verification Modal */}
      {selectedProperty && (
        <>
          {/* Backdrop */}
          <div 
            className="modal-backdrop modal-backdrop-visible" 
            onClick={() => setSelectedProperty(null)}
          ></div>

          {/* Modal Container */}
          <div 
            className="modal-content modal-content-visible card" 
            style={{ 
              position: 'fixed', 
              width: '90%', 
              maxWidth: '850px', 
              maxHeight: '90vh', 
              overflowY: 'auto', 
              background: '#fff', 
              padding: '32px', 
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <span className={s.badge} style={{ position: 'relative', top: 0, left: 0, background: 'var(--accent)', marginBottom: '8px', display: 'inline-block' }}>
                  🛡️ Registry Verified Title
                </span>
                <h2 style={{ fontSize: '2rem', marginTop: '4px', marginBottom: '4px' }}>{selectedProperty.title}</h2>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>📍 {selectedProperty.location} • {selectedProperty.category}</p>
              </div>
              <button 
                onClick={() => setSelectedProperty(null)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '2rem', 
                  cursor: 'pointer', 
                  color: 'var(--text-muted)',
                  padding: '4px'
                }}
              >
                &times;
              </button>
            </div>

            <div className="grid grid-2" style={{ gap: '32px' }}>
              {/* Left Side: Property Specs and verification details */}
              <div>
                <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
                  <img src={selectedProperty.image} alt={selectedProperty.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                </div>

                <h3 style={{ marginBottom: '12px' }}>Official Registry Data</h3>
                <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Land Registry ID:</span>
                    <strong style={{ fontFamily: 'monospace' }}>{selectedProperty.registryNumber}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                    <span style={{ color: '#047857', fontWeight: 600 }}>⚡ {selectedProperty.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Encumbrances:</span>
                    <span style={{ color: '#047857', fontWeight: 600 }}>None (Clear Title)</span>
                  </div>
                </div>

                <h3 style={{ marginBottom: '12px' }}>Key Specifications</h3>
                <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
                  {selectedProperty.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Contact Form and Booking */}
              <div style={{ borderLeft: '1px solid #e5e7eb', paddingLeft: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>List Price</span>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {formatCurrency(selectedProperty.price)}
                  </div>
                </div>

                <form onSubmit={handleContactSubmit}>
                  <h4 style={{ marginBottom: '16px' }}>Schedule Consultation / Request Documents</h4>
                  
                  <div className={s.formGroup}>
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      className={s.formInput} 
                      required 
                      value={contactForm.name} 
                      onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className={s.formRow}>
                    <div className={s.formGroup}>
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        className={s.formInput} 
                        required 
                        value={contactForm.email} 
                        onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className={s.formGroup}>
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        className={s.formInput} 
                        required 
                        value={contactForm.phone} 
                        onChange={e => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+254 700 000 000"
                      />
                    </div>
                  </div>

                  <div className={s.formGroup}>
                    <label>Schedule Physical Site Visit</label>
                    <input 
                      type="date" 
                      className={s.formInput} 
                      value={contactForm.visitDate} 
                      onChange={e => setContactForm(prev => ({ ...prev, visitDate: e.target.value }))}
                    />
                  </div>

                  <div className={s.formGroup}>
                    <label>Submit Official Offer (Optional)</label>
                    <input 
                      type="text" 
                      className={s.formInput} 
                      placeholder="e.g. $420,000" 
                      value={contactForm.offer} 
                      onChange={e => setContactForm(prev => ({ ...prev, offer: e.target.value }))}
                    />
                  </div>

                  <div className={s.formGroup}>
                    <label className={s.checkboxLabel} style={{ border: 'none', padding: 0 }}>
                      <input 
                        type="checkbox" 
                        checked={contactForm.requestDocs} 
                        onChange={e => setContactForm(prev => ({ ...prev, requestDocs: e.target.checked }))}
                      />
                      Request official digital copies of title search registry deeds
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '16px' }}
                    disabled={formSubmitted}
                  >
                    {formSubmitted ? 'Submitting details...' : 'Submit Inquiries'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </main>
  );
}
