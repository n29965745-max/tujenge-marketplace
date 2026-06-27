'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { clsx } from 'clsx';

type Variant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: ElementType;
}

const variantClass: Record<Variant, string> = {
  'fade-up': 'reveal-fade-up',
  'fade-in': '',
  'slide-left': 'reveal-slide-left',
  'slide-right': 'reveal-slide-right',
  scale: 'reveal-scale',
};

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag;

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={clsx(
        'reveal',
        variantClass[variant],
        visible && 'reveal-visible',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
