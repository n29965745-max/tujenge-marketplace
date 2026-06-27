import PageLayout, { PageHero } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your data. We never sell your information."
        image={images.heroConstruction}
      />
      <section className="section bg-white">
        <div className="container-x max-w-3xl">
          <p className="text-navy-600 mb-8"><em>Last updated: June 2026</em></p>

          <div className="space-y-6 text-navy-600 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Information we collect</h2>
              <p>
                Account information (name, email, phone), verification documents (national ID, business
                registration, professional licenses), listing content (photos, descriptions, prices),
                transaction data, and usage analytics. We collect only what we need to operate Tujenge.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">How we use it</h2>
              <p>
                To verify identity and listings, to facilitate transactions, to process escrow payments,
                to prevent fraud, to send you important notifications about your account and listings,
                and to improve Tujenge. We do not sell your data to third parties, ever.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Data storage and security</h2>
              <p>
                Data is stored in encrypted PostgreSQL databases hosted on Supabase (AWS infrastructure).
                Sensitive fields (national IDs, tax PINs) are encrypted at the application layer before
                storage. All data in transit is protected by TLS 1.3.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Your rights</h2>
              <p>
                You can access, correct, or delete your data at any time from your account settings. You
                can request a full export of your data. To exercise these rights, email{' '}
                <a href="mailto:privacy@tujenge.africa" className="text-gold-700 font-semibold">privacy@tujenge.africa</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Cookies</h2>
              <p>
                We use essential cookies for authentication and analytics cookies (PostHog) to understand
                how Tujenge is used. You can opt out of analytics tracking in your account settings.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Contact</h2>
              <p>
                Data Protection Officer:{' '}
                <a href="mailto:privacy@tujenge.africa" className="text-gold-700 font-semibold">privacy@tujenge.africa</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
