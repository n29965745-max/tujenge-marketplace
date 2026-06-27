'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, Loader2, CheckCircle2 } from 'lucide-react';
import PageLayout, { PageHero, PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

const topics = [
  { id: 'general', label: 'General question' },
  { id: 'support', label: 'Account support' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'press', label: 'Press / media' },
  { id: 'trust', label: 'Trust & safety' },
  { id: 'careers', label: 'Careers' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    // Simulate network for demo — in production this hits a server action.
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <PageLayout>
      <PageHero
        eyebrow="Contact us"
        title="Talk to a real person. We'll get back to you within one business day."
        subtitle="Whether you have a question, partnership idea, or feedback — we read every message."
        image={images.contactHero}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="eyebrow mb-3">Get in touch</div>
                <h2 className="font-display font-bold text-3xl text-navy-900 mb-6">
                  Multiple ways to reach us.
                </h2>
              </div>

              {[
                {
                  Icon: Mail,
                  label: 'Email',
                  value: 'hello@tujenge.africa',
                  href: 'mailto:hello@tujenge.africa',
                },
                {
                  Icon: MessageSquare,
                  label: 'WhatsApp',
                  value: '+254 700 TUjenge',
                  href: 'https://wa.me/254700000000',
                },
                {
                  Icon: Phone,
                  label: 'Phone (Trust & Safety)',
                  value: '+254 700 000 000',
                  href: 'tel:+254700000000',
                },
                {
                  Icon: MapPin,
                  label: 'Office',
                  value: 'Westlands Square, Nairobi, Kenya',
                  href: null,
                },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-gold-500/10 ring-1 ring-gold-500/20 flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold-700" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold mb-1">
                      {label}
                    </div>
                    {href ? (
                      <a href={href} className="font-display font-semibold text-navy-900 hover:text-gold-700">
                        {value}
                      </a>
                    ) : (
                      <div className="font-display font-semibold text-navy-900">{value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="card p-6 mt-8">
                <h3 className="font-display font-semibold text-navy-900 mb-2">For urgent safety issues</h3>
                <p className="text-sm text-navy-600 leading-relaxed mb-3">
                  Suspected fraud or title forgery requires immediate attention.
                  Email <a href="mailto:trust@tujenge.africa" className="text-gold-700 font-semibold">trust@tujenge.africa</a>{' '}
                  and we'll respond within 2 hours during business days.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-7 lg:p-9 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" aria-hidden />

                <div className="relative">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 mb-5">
                        <CheckCircle2 className="w-7 h-7 text-emerald-600" strokeWidth={2} />
                      </div>
                      <h3 className="font-display font-bold text-xl text-navy-900 mb-2">
                        Message received.
                      </h3>
                      <p className="text-navy-600 max-w-md mx-auto">
                        Thanks for reaching out. Our team will get back to you within one
                        business day at the email you provided.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
                            Full name
                          </label>
                          <input type="text" required className="input" placeholder="Jane Wanjiku" />
                        </div>
                        <div>
                          <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
                            Email
                          </label>
                          <input type="email" required className="input" placeholder="you@example.com" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
                          Topic
                        </label>
                        <select className="input" defaultValue="general">
                          {topics.map((t) => (
                            <option key={t.id} value={t.id}>{t.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
                          Message
                        </label>
                        <textarea
                          required
                          rows={6}
                          className="input resize-none"
                          placeholder="Tell us what's on your mind..."
                        />
                      </div>

                      <button type="submit" disabled={pending} className="btn btn-primary btn-lg w-full">
                        {pending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message
                            <Send className="w-4 h-4" strokeWidth={2.5} />
                          </>
                        )}
                      </button>

                      <p className="text-xs text-navy-500 text-center">
                        By submitting, you agree to our{' '}
                        <a href="/privacy" className="underline hover:text-navy-700">Privacy Policy</a>.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Looking for answers first?"
        body="Most questions are already answered in our help center."
        primary={{ label: 'Visit Help Center', href: '/help' }}
        secondary={{ label: 'Read Trust & Safety', href: '/trust' }}
      />
    </PageLayout>
  );
}
