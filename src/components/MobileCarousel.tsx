'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface MobileCarouselProps {
  children: ReactNode;
  /** Number of dots = number of "pages". If omitted, dots are hidden. */
  dotCount?: number;
  /** Currently active dot index (controlled). */
  activeIndex?: number;
  /** Callback fired when active dot changes (user swipes or auto-advance). */
  onIndexChange?: (i: number) => void;
  /** Auto-advance interval in ms. 0 = no auto-advance. Default 5500. */
  autoAdvance?: number;
  /** Whether to show prev/next chevron buttons. Default true on desktop. */
  showArrows?: boolean;
  /** Card width on mobile. Use `peek` for the "side-by-side with next card" look. */
  mobileCardWidth?: 'peek' | 'full';
  /** Optional class on the inner track. */
  className?: string;
  /** Optional class on the outer wrapper. */
  wrapperClassName?: string;
  /** Pause auto-advance on hover/focus (desktop) and on touch (mobile). */
  pauseOnInteraction?: boolean;
}

/**
 * MobileCarousel — premium horizontal carousel that:
 *  - Uses CSS scroll-snap for native-feeling momentum scrolling on mobile
 *  - Shows ~1.2 cards on mobile (with peek of the next card) by default,
 *    full grid on desktop (via outer-grid styling when used inside a grid)
 *  - Has visible dot indicators
 *  - Auto-advances every `autoAdvance` ms (default 5.5s) and pauses on
 *    hover / touch / focus-within
 *  - Has fade-edge gradient on the right (mobile) hinting at more content
 *  - Has optional chevron arrows on desktop
 */
export default function MobileCarousel({
  children,
  dotCount,
  activeIndex,
  onIndexChange,
  autoAdvance = 5500,
  showArrows = true,
  mobileCardWidth = 'peek',
  className = '',
  wrapperClassName = '',
  pauseOnInteraction = true,
}: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [internalIndex, setInternalIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pageCount = dotCount ?? 1;
  const currentIndex = activeIndex ?? internalIndex;

  const updateIndex = useCallback(
    (i: number) => {
      const next = (i + pageCount) % pageCount;
      if (onIndexChange) onIndexChange(next);
      if (activeIndex === undefined) setInternalIndex(next);
      // Scroll to the corresponding page.
      const track = trackRef.current;
      if (track) {
        const child = track.children[next] as HTMLElement | undefined;
        if (child) {
          track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: 'smooth' });
        }
      }
    },
    [pageCount, onIndexChange, activeIndex]
  );

  // Auto-advance
  useEffect(() => {
    if (!autoAdvance || paused || pageCount <= 1) return;
    const id = setInterval(() => updateIndex(currentIndex + 1), autoAdvance);
    return () => clearInterval(id);
  }, [autoAdvance, paused, pageCount, currentIndex, updateIndex]);

  // Keep internal state in sync with scroll position (for swipe-driven updates)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !dotCount) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const childWidth = track.children[0]?.clientWidth ?? 0;
        const idx = Math.round(track.scrollLeft / Math.max(childWidth, 1));
        const clamped = Math.max(0, Math.min(idx, pageCount - 1));
        if (clamped !== currentIndex) {
          if (onIndexChange) onIndexChange(clamped);
          if (activeIndex === undefined) setInternalIndex(clamped);
        }
        raf = 0;
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [dotCount, pageCount, currentIndex, onIndexChange, activeIndex]);

  const cardWidthClass = mobileCardWidth === 'full' ? 'min-w-[85%]' : 'min-w-[78%] sm:min-w-[48%] lg:min-w-0';

  return (
    <div
      className={clsx('relative', wrapperClassName)}
      onMouseEnter={() => pauseOnInteraction && setPaused(true)}
      onMouseLeave={() => pauseOnInteraction && setPaused(false)}
      onTouchStart={() => pauseOnInteraction && setPaused(true)}
      onTouchEnd={() => pauseOnInteraction && setPaused(false)}
      onFocusCapture={() => pauseOnInteraction && setPaused(true)}
      onBlurCapture={() => pauseOnInteraction && setPaused(false)}
    >
      <div
        ref={trackRef}
        className={clsx(
          // Mobile: snap carousel
          'snap-carousel',
          // Tablet: 2-up grid feel (still scrollable but wider cards)
          'sm:snap-x sm:snap-mandatory',
          // Desktop: switch to a wrapping grid layout (handled by parent grid)
          'lg:flex lg:flex-wrap lg:gap-5 lg:overflow-visible lg:scroll-snap-none lg:m-0 lg:p-0',
          className
        )}
        role="region"
        aria-roledescription="carousel"
      >
        {/* Wrap each child so we can target it for scroll-snap without forcing
            every consumer to add the right classes. */}
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div
                key={i}
                className={clsx('snap-start', cardWidthClass, 'lg:flex-shrink lg:w-auto')}
                style={{ flexBasis: mobileCardWidth === 'peek' && typeof window !== 'undefined' && window.innerWidth < 640 ? '78%' : undefined }}
              >
                {child}
              </div>
            ))
          : <div className={clsx('snap-start', cardWidthClass, 'lg:flex-shrink lg:w-auto')}>{children}</div>}
      </div>

      {/* Right-edge fade on mobile only */}
      <div className="lg:hidden pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-[1]" />

      {/* Dots */}
      {dotCount && dotCount > 1 && (
        <div className="carousel-dots lg:hidden mt-2">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => updateIndex(i)}
              className={clsx('carousel-dot', i === currentIndex && 'is-active')}
            />
          ))}
        </div>
      )}

      {/* Desktop arrows */}
      {showArrows && pageCount > 1 && (
        <>
          <button
            type="button"
            onClick={() => updateIndex(currentIndex - 1)}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white border border-navy-200 shadow-md hover:bg-navy-50 hover:border-gold-500 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-navy-900" />
          </button>
          <button
            type="button"
            onClick={() => updateIndex(currentIndex + 1)}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white border border-navy-200 shadow-md hover:bg-navy-50 hover:border-gold-500 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-navy-900" />
          </button>
        </>
      )}
    </div>
  );
}
