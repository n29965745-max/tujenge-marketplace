'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const faqs = [
  {
    q: 'What is Tujenge?',
    a: 'Tujenge is Africa\'s verified marketplace for construction and real estate. We connect property buyers, contractors, material suppliers, equipment owners, and professionals in one trusted platform — with verification, escrow, and project management built in.',
  },
  {
    q: 'Where is Tujenge available?',
    a: 'Tujenge launches in Kenya, with planned expansion to Uganda, Tanzania, Rwanda, Nigeria, and Ghana within 18 months. We\'re building for all of Africa.',
  },
  {
    q: 'Is Tujenge free to use?',
    a: 'Browsing, searching, and contacting verified professionals is free. We charge small fees on completed transactions, premium listings, and value-added services like escrow and concierge. The full pricing is on our Pricing page.',
  },
  {
    q: 'How does Tujenge verify listings?',
    a: 'Property listings require title documents verified against official registries (Ardhisasa in Kenya, equivalent agencies elsewhere). Businesses require registration and tax documents. Professionals require license numbers cross-checked with their licensing bodies.',
  },
  {
    q: 'How does Tujenge escrow work?',
    a: 'When you pay through Tujenge, funds are held by a licensed escrow partner. The seller delivers goods or services. Once you confirm satisfaction, funds are released. If there\'s a dispute, Tujenge mediates within 48 hours.',
  },
  {
    q: 'Can I buy property remotely (from outside Africa)?',
    a: 'Yes. Tujenge Concierge is designed for diaspora investors. We verify titles, vet agents, support virtual viewings via video, manage offers, handle escrow, and (if you choose) oversee the build. We have clients building homes from London, Dallas, Dubai, and Toronto.',
  },
  {
    q: 'How much does it cost to build a house in Kenya?',
    a: 'It depends on location, size, and finish level. As of 2026, a standard 3-bedroom bungalow in Nairobi (120 sqm, mid-range finish) costs KES 7–10 million to build. Our Build My Project wizard gives you a personalized estimate in 5 minutes.',
  },
  {
    q: 'What does it cost to be on Tujenge as a contractor or professional?',
    a: 'Free plan: profile + 5 leads per month. Pro plan: KES 5,000–15,000/month with unlimited leads, premium placement, analytics, and CRM. Enterprise: custom pricing for large firms.',
  },
  {
    q: 'How does Tujenge help me get paid faster as a contractor?',
    a: 'When clients pay through Tujenge escrow, you get paid within 48 hours of completing and getting approval on a milestone — instead of waiting 60–90 days for traditional "pay on completion." Your cash flow becomes predictable.',
  },
  {
    q: 'How does Tujenge Concierge work for diaspora investors?',
    a: 'We assign you a dedicated relationship manager. For property purchases: we verify the title, vet the agent, coordinate legal opinion, manage escrow, and handle transfer. For builds: we match you with architects and contractors, run milestone escrow, send weekly photo/video updates, and provide a project dashboard. Our fee is 5–8% of project value, with full transparency.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-navy-50 relative">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="eyebrow mb-4">FAQ</div>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-navy-900 mb-5">
              Questions,{' '}
              <span className="text-gradient-gold">answered.</span>
            </h2>
            <p className="text-lg text-navy-600 leading-relaxed mb-6">
              Everything you need to know about Tujenge. Can't find what you're
              looking for?{' '}
              <a
                href="/contact"
                className="text-gold-700 font-semibold hover:underline"
              >
                Contact our team
              </a>
              .
            </p>
          </ScrollReveal>

          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <ScrollReveal key={faq.q} delay={i * 40}>
                  <div
                    className={`bg-white rounded-xl border transition-all duration-200 ${
                      isOpen
                        ? 'border-gold-500/40 shadow-sm'
                        : 'border-navy-200 hover:border-navy-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex items-center justify-between w-full text-left px-5 lg:px-6 py-4 lg:py-5 gap-4"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display font-semibold text-navy-900 text-[1.05rem] leading-snug">
                        {faq.q}
                      </span>
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-all duration-200 ${
                          isOpen
                            ? 'bg-gold-500 text-navy-900 rotate-180'
                            : 'bg-navy-100 text-navy-700'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" strokeWidth={2.5} />
                        ) : (
                          <Plus className="w-4 h-4" strokeWidth={2.5} />
                        )}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-premium ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-navy-600 leading-relaxed text-[0.95rem] px-5 lg:px-6 pb-5">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
