import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PageLayout, { PageCTABanner } from '@/components/PageShell';

export const metadata = { title: 'My Account' };

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirectTo=/account');
  }

  return (
    <PageLayout>
      <section className="section pt-32 bg-white">
        <div className="container-x">
          <h1 className="font-display font-bold text-4xl text-navy-900 mb-3">My Account</h1>
          <p className="text-navy-600 mb-10">Signed in as {user.email}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a href="/dashboard" className="card card-interactive p-6">
              <h3 className="font-display font-semibold text-navy-900 mb-1">Dashboard</h3>
              <p className="text-sm text-navy-600">Your projects, listings, and quick actions.</p>
            </a>
            <a href="/account/profile" className="card card-interactive p-6">
              <h3 className="font-display font-semibold text-navy-900 mb-1">Profile</h3>
              <p className="text-sm text-navy-600">Update your personal information and avatar.</p>
            </a>
            <a href="/account/security" className="card card-interactive p-6">
              <h3 className="font-display font-semibold text-navy-900 mb-1">Security</h3>
              <p className="text-sm text-navy-600">Password, 2FA, and active sessions.</p>
            </a>
          </div>
        </div>
      </section>
      <PageCTABanner
        title="Need help managing your account?"
        primary={{ label: 'Visit Help Center', href: '/help' }}
        secondary={{ label: 'Contact Support', href: '/contact' }}
      />
    </PageLayout>
  );
}
