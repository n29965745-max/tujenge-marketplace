'use client';

import { useEffect } from 'react';

/**
 * Scroll progress bar — fixed at top of viewport.
 * Scales from 0 → 1 based on scroll position.
 * Pure CSS animation, 60fps, GPU-accelerated.
 */
export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${pct})`;
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      id="scroll-progress"
      className="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-hidden="true"
    />
  );
}
