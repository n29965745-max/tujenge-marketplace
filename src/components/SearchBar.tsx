'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';

const SUGGESTIONS = [
  { label: 'Buy Land in Nairobi', href: '/properties' },
  { label: 'Find a Contractor', href: '/contractors' },
  { label: 'Cement Prices', href: '/materials' },
  { label: 'Build My House Wizard', href: '/build' },
  { label: 'Rent an Excavator', href: '/equipment' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/properties?q=${encodeURIComponent(query)}`);
      setFocused(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`${styles.searchWrapper} ${focused ? styles.focused : ''}`}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <span className={styles.icon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input 
          type="text" 
          className={styles.searchInput}
          placeholder="Search for properties, materials, pros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        {query && (
          <button type="button" className={styles.clearBtn} onClick={() => setQuery('')}>
            ✕
          </button>
        )}
      </form>

      <div className={`${styles.dropdown} ${focused ? styles.showDropdown : ''}`}>
        <div className={styles.dropdownHeader}>Popular Searches</div>
        <ul className={styles.suggestions}>
          {SUGGESTIONS.filter(s => s.label.toLowerCase().includes(query.toLowerCase())).map((s, i) => (
            <li key={i}>
              <Link href={s.href} onClick={() => setFocused(false)}>
                <span className={styles.suggIcon}>🔍</span>
                {s.label}
              </Link>
            </li>
          ))}
          {query.trim() && (
             <li>
               <button type="button" onClick={handleSearch} className={styles.viewAllBtn}>
                 See all results for "{query}"
               </button>
             </li>
          )}
        </ul>
      </div>
    </div>
  );
}
