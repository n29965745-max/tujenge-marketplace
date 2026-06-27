'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import PageLayout, { PageHero } from '@/components/PageShell';
import { images } from '@/lib/images';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <PageLayout>
      <PageHero
        eyebrow="Account recovery"
        title="Forgot your password?"
        subtitle="Enter the email you use to sign in. We'll send you a secure link to reset it."
        image={images.heroConstruction}
      />

      <section className="section bg-navy-50">
        <div className="container-x max-w-md">
          <div className="card p-7 lg:p-9 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" aria-hidden />

            <div className="relative">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 mb-5">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" strokeWidth={2} />
                  </div>
                  <h2 className="font-display font-bold text-xl text-navy-900 mb-2">
                    Check your inbox.
                  </h2>
                  <p className="text-navy-600 text-sm leading-relaxed mb-6">
                    If an account exists for that email, you'll receive a password
                    reset link within a few minutes.
                  </p>
                  <Link href="/login" className="btn btn-outline w-full">
                    <ArrowLeft className="w-4 h-4" />
                    Back to sign in
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-2xl text-navy-900 mb-1">
                    Reset password
                  </h2>
                  <p className="text-sm text-navy-600 mb-6">
                    We'll email you a secure link to choose a new password.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="input pl-10"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={pending} className="btn btn-primary w-full btn-lg">
                      {pending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending link...
                        </>
                      ) : (
                        'Send reset link'
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <Link href="/login" className="text-sm text-navy-600 hover:text-gold-700 inline-flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to sign in
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
