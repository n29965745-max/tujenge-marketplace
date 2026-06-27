import PageLayout, { PageHero } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Cookie Policy' };

export default function CookiesPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        subtitle="What cookies we use, why, and how to control them."
        image={images.heroConstruction}
      />
      <section className="section bg-white">
        <div className="container-x max-w-3xl">
          <p className="text-navy-600 mb-8"><em>Last updated: June 2026</em></p>

          <div className="space-y-6 text-navy-600 leading-relaxed">
            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Essential cookies</h2>
              <p>
                Used for authentication and session management. These cannot be disabled because they
                are required for Tujenge to function.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Analytics cookies</h2>
              <p>
                We use PostHog (self-hosted or EU-hosted) to understand how Tujenge is used. This data is
                anonymized and aggregated. You can opt out from your account settings.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Marketing cookies</h2>
              <p>
                We do not use third-party advertising cookies. Marketing campaigns (where applicable) are
                measured via server-side tracking without persistent user identifiers.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Controlling cookies</h2>
              <p>
                Most browsers let you block or delete cookies. Doing so may affect Tujenge's functionality.
                For questions, email{' '}
                <a href="mailto:privacy@tujenge.africa" className="text-gold-700 font-semibold">privacy@tujenge.africa</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
