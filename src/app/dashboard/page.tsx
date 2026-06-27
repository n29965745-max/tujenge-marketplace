import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SignOutButton from './SignOutButton';
import {
  Building2,
  Layers,
  HardHat,
  Wallet,
  ArrowRight,
  Compass,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirectTo=/dashboard');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const firstName = (profile?.full_name as string | null)?.split(' ')[0] || 'there';

  return (
    <>
      <Navigation />
      <main className="pt-[72px] min-h-screen bg-navy-50">
        <div className="container-x py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow mb-2">Your account</div>
              <h1 className="font-display font-bold text-3xl lg:text-4xl text-navy-900">
                Welcome back, {firstName}.
              </h1>
              <p className="text-navy-600 mt-1.5">
                {profile?.email || user.email}
              </p>
            </div>
            <SignOutButton />
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Building2, label: 'Browse Properties', href: '/properties', count: '5,420' },
              { icon: Layers, label: 'Find Materials', href: '/materials', count: '8,150' },
              { icon: HardHat, label: 'Hire Contractors', href: '/contractors', count: '1,200' },
              { icon: Compass, label: 'Find Professionals', href: '/professionals', count: '940' },
            ].map(({ icon: Icon, label, href, count }) => (
              <Link
                key={label}
                href={href}
                className="card card-interactive p-5 group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold-500/10 mb-4 group-hover:bg-gold-500 transition-colors">
                  <Icon className="w-5 h-5 text-gold-700 group-hover:text-navy-900 transition-colors" strokeWidth={2} />
                </div>
                <div className="font-display font-semibold text-navy-900 mb-1">
                  {label}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-navy-500">{count} available</span>
                  <ArrowRight className="w-3.5 h-3.5 text-navy-400 group-hover:text-gold-700 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          {/* Build My Project CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 text-white p-8 lg:p-10">
            <div className="absolute inset-0 bg-hero-pattern opacity-[0.05]" aria-hidden />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/20 blur-3xl" aria-hidden />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 text-gold-300 text-xs font-display font-semibold uppercase tracking-wider mb-4">
                  <Wallet className="w-3 h-3" />
                  Free to plan
                </div>
                <h2 className="font-display font-bold text-2xl lg:text-3xl mb-3">
                  Plan your build in 5 minutes.
                </h2>
                <p className="text-white/70 mb-6 max-w-lg leading-relaxed">
                  Answer a few questions about your land, budget, and timeline.
                  Get a personalized cost estimate, recommended professionals,
                  and a project plan.
                </p>
                <Link href="/build" className="btn btn-primary btn-lg">
                  Start the wizard
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              </div>
              <div className="hidden lg:grid grid-cols-3 gap-3 text-center text-sm">
                {[
                  { num: '01', label: 'Land' },
                  { num: '02', label: 'Design' },
                  { num: '03', label: 'Budget' },
                  { num: '04', label: 'Finish' },
                  { num: '05', label: 'Timeline' },
                ].map((s) => (
                  <div
                    key={s.num}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm"
                  >
                    <div className="font-display font-bold text-gold-300 mb-1">
                      {s.num}
                    </div>
                    <div className="text-white/70 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
