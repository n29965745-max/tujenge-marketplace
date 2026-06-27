'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Lock,
  Globe,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { signUpWithPassword, type AuthState } from '../auth/actions';

const countries = [
  { code: 'KE', label: '🇰🇪 Kenya' },
  { code: 'UG', label: '🇺🇬 Uganda' },
  { code: 'TZ', label: '🇹🇿 Tanzania' },
  { code: 'NG', label: '🇳🇬 Nigeria' },
  { code: 'GH', label: '🇬🇭 Ghana' },
  { code: 'RW', label: '🇷🇼 Rwanda' },
  { code: 'ZA', label: '🇿🇦 South Africa' },
];

export default function SignupForm() {
  const [state, formAction, pending] = useActionState<AuthState | undefined, FormData>(
    signUpWithPassword,
    undefined
  );

  // Success state
  if (state?.ok) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 mb-5">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" strokeWidth={2} />
        </div>
        <h2 className="font-display font-bold text-xl text-navy-900 mb-2">
          Check your email
        </h2>
        <p className="text-navy-600 text-sm leading-relaxed mb-6">
          We've sent a confirmation link to your email address. Click it to
          activate your account and start exploring.
        </p>
        <Link href="/login" className="btn btn-outline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Full name */}
      <div>
        <label htmlFor="fullName" className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
          Full name
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Jane Wanjiku"
            required
            autoComplete="name"
            minLength={2}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            className="input pl-10"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            required
            autoComplete="new-password"
            minLength={8}
            className="input pl-10"
          />
        </div>
        <p className="text-xs text-navy-500 mt-1.5">
          Use 8+ characters with a mix of letters and numbers.
        </p>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="countryCode" className="block font-display font-semibold text-sm text-navy-900 mb-1.5">
          Country
        </label>
        <div className="relative">
          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />
          <select
            id="countryCode"
            name="countryCode"
            defaultValue="KE"
            className="input pl-10 appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] pr-10"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {state && !state.ok && (
        <div
          role="alert"
          className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
        >
          {state.error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary w-full btn-lg ripple-host"
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating your account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </>
        )}
      </button>

      <p className="text-[0.7rem] text-navy-500 text-center leading-relaxed">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="underline">Terms</Link> and{' '}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}
