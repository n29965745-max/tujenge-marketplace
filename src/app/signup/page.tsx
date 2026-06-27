import Link from 'next/link';
import { Suspense } from 'react';
import SignupForm from './SignupForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Create your account',
  description: 'Join Tujenge — Africa\'s verified construction and real estate marketplace.',
};

export default function SignupPage() {
  return (
    <>
      <Navigation />
      <main className="pt-[72px] min-h-screen flex flex-col bg-navy-50">
        <div className="flex-1 flex items-center justify-center py-12 px-5">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-display font-bold text-3xl text-navy-900 mb-2">
                Create your account
              </h1>
              <p className="text-navy-600">
                Join Africa's most trusted construction marketplace.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-navy-200 shadow-sm p-7 lg:p-8">
              <Suspense fallback={<div className="h-96 skeleton" />}>
                <SignupForm />
              </Suspense>
            </div>

            <p className="text-center text-xs text-navy-500 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-gold-700 font-semibold hover:underline">
                Sign in
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
