'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel({ children, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const total = children.length;

  const goTo = useCallback((idx: number) => {
    let next = idx;
    if (next < 0) next = total - 1;
    if (next >= total) next = 0;
    setCurrent(next);
    setTranslateX(0);
  }, [total]);

  useEffect(() => {
    if (!autoPlay || isDragging) return;
    timerRef.current = setInterval(() => goTo(current + 1), interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay, current, isDragging, interval, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => { setIsDragging(true); setStartX(e.touches[0].clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { if (!isDragging) return; setTranslateX(e.touches[0].clientX - startX); };
  const handleTouchEnd = () => {
    setIsDragging(false);
    if (translateX > 60) goTo(current - 1);
    else if (translateX < -60) goTo(current + 1);
    else setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setStartX(e.clientX); };
  const handleMouseMove = (e: React.MouseEvent) => { if (!isDragging) return; setTranslateX(e.clientX - startX); };
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (translateX > 60) goTo(current - 1);
    else if (translateX < -60) goTo(current + 1);
    else setTranslateX(0);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            transform: `translateX(calc(-${current * 100}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {children.map((child, i) => (
            <div key={i} className={styles.slide}>{child}</div>
          ))}
        </div>
      </div>

      <button className={`${styles.arrow} ${styles.prev}`} onClick={() => goTo(current - 1)} aria-label="Previous">‹</button>
      <button className={`${styles.arrow} ${styles.next}`} onClick={() => goTo(current + 1)} aria-label="Next">›</button>

      <div className={styles.dots}>
        {children.map((_, i) => (
          <button key={i} className={`${styles.dot} ${i === current ? styles.activeDot : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
