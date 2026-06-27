'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { images } from '@/lib/images';

const testimonials = [
  {
    quote:
      'I bought a plot in Ngong from London. Within six months I had a verified title, a vetted contractor, and my foundation poured. Tujenge turned what used to be a nightmare into a project I could finally trust.',
    name: 'David K.',
    role: 'IT Project Manager',
    location: 'Dallas, Texas',
    rating: 5,
    project: '3-Bedroom Bungalow Build',
    avatar: 'DK',
    image: images.buyerPortrait,
  },
  {
    quote:
      'The Build My Project wizard showed me a 3-bed bungalow in my budget was actually possible. I had been told by brokers I needed twice as much.',
    name: 'Wanjiku N.',
    role: 'Accountant',
    location: 'Nairobi, Kenya',
    rating: 5,
    project: 'First-time Home Buyer',
    avatar: 'WN',
    image: images.homeownerPortrait,
  },
  {
    quote:
      'I went from chasing payments to getting paid within 48 hours of completing a milestone. Tujenge escrow changed my business.',
    name: 'Joseph M.',
    role: 'General Contractor',
    location: 'Ruai, Kenya',
    rating: 5,
    project: '15+ projects managed',
    avatar: 'JM',
    image: images.contractorPortrait,
  },
  {
    quote:
      'The escrow payments eliminated 100% of my contractor bad debt. I can finally grow without fear.',
    name: 'Aisha K.',
    role: 'Hardware Owner',
    location: 'Industrial Area, Nairobi',
    rating: 5,
    project: 'Supplies to 30+ contractors',
    avatar: 'AK',
    image: images.supplierPortrait,
  },
  {
    quote:
      'I have tripled my freelance leads since joining Tujenge. The portfolio feature lets my work speak for itself.',
    name: 'Brian O.',
    role: 'Architect',
    location: 'Kilimani, Nairobi',
    rating: 5,
    project: 'Featured Professional',
    avatar: 'BO',
    image: images.architectPortrait,
  },
  {
    quote:
      'The market intelligence helped me identify two corridors I would have missed. We acquired and broke ground in 90 days.',
    name: 'Fatima A.',
    role: 'Real Estate Developer',
    location: 'Lagos, Nigeria',
    rating: 5,
    project: '40-unit Estate',
    avatar: 'FA',
    image: images.engineerPortrait,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setPerPage(1);
      else if (window.innerWidth < 1024) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perPage);

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    const tick = () => {
      if (pausedRef.current) return;
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    };
    timer = setInterval(tick, 6000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [maxIndex]);

  return (
    <section className="section bg-navy-900 text-white relative overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" aria-hidden />

      <div className="container-x relative">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-14">
          <div className="eyebrow text-gold-300 mb-4">
            <span style={{ background: '#F4D58D' }} />
            Real projects. Real people.
          </div>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-white mb-5">
            Trusted by Africans everywhere.
          </h2>
          <div className="flex items-center justify-center gap-3 text-white/80 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-300 fill-gold-300" />
              ))}
            </div>
            <span className="font-display font-semibold">4.9 / 5 average</span>
            <span className="text-white/40">·</span>
            <span>2,400+ reviews</span>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div
            ref={trackRef}
            className="overflow-hidden"
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
          >
            <div
              className="flex transition-transform duration-500 ease-premium"
              style={{ transform: `translateX(-${index * (100 / perPage)}%)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / perPage}%` }}
                >
                  <article className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-gold-300/30 transition-all duration-300">
                    <Quote className="w-8 h-8 text-gold-300/40 mb-4" strokeWidth={1.5} />

                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-gold-300 fill-gold-300"
                        />
                      ))}
                    </div>

                    <blockquote className="text-white/90 text-[0.95rem] leading-relaxed mb-6">
                      "{t.quote}"
                    </blockquote>

                    <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold-500/40">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-white">
                          {t.name}
                        </div>
                        <div className="text-white/60 text-xs truncate">
                          {t.role} · {t.location}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gold-300 font-display font-medium">
                      {t.project}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-gold-500' : 'w-1.5 bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
