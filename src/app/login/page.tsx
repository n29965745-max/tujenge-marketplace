import Link from 'next/link';
import { Suspense } from 'react';
import LoginForm from './LoginForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Sign in',
  description: 'Sign in to your Tujenge account.',
};

export default function LoginPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px] min-h-screen flex flex-col bg-navy-50">
        <div className="flex-1 flex items-center justify-center py-12 px-5">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-display font-bold text-3xl text-navy-900 mb-2">
                Welcome back
              </h1>
              <p className="text-navy-600">
                Sign in to access your dashboard, listings, and projects.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-navy-200 shadow-sm p-7 lg:p-8">
              <Suspense fallback={<div className="h-72 skeleton" />}>
                <LoginForm />
              </Suspense>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden>
                  <div className="w-full border-t border-navy-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-navy-500 font-medium">
                    or
                  </span>
                </div>
              </div>

              <Link
                href="/signup"
                className="btn btn-outline w-full"
              >
                Create an account
              </Link>
            </div>

            <p className="text-center text-xs text-navy-500 mt-6">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-navy-700">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-navy-700">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
