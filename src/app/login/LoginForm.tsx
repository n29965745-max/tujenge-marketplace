'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { signInWithPassword, type AuthState } from '../auth/actions';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const [state, formAction, pending] = useActionState<AuthState | undefined, FormData>(
    signInWithPassword,
    undefined
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block font-display font-semibold text-sm text-navy-900 mb-1.5"
        >
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
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="font-display font-semibold text-sm text-navy-900"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-display font-semibold text-gold-700 hover:text-gold-900"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            minLength={8}
            className="input pl-10"
          />
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
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </>
        )}
      </button>
    </form>
  );
}
