import PageLayout, { PageHero } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="The rules of the road for using Tujenge. Plain English, no hidden clauses."
        image={images.heroConstruction}
      />
      <section className="section bg-white">
        <div className="container-x max-w-3xl prose prose-lg">
          <p className="text-navy-600 mb-6"><em>Last updated: June 2026</em></p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">1. Acceptance of terms</h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            By accessing or using Tujenge, you agree to be bound by these Terms of Service and all
            applicable laws and regulations. If you do not agree, you may not use Tujenge.
          </p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">2. Eligibility</h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            You must be at least 18 years old and legally able to enter into contracts in your
            jurisdiction. Business accounts must be registered in a country where Tujenge operates.
          </p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">3. Account responsibilities</h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            You are responsible for maintaining the security of your account, for all activity that
            occurs under your credentials, and for ensuring the accuracy of information you provide.
            Notify us immediately of any unauthorized access.
          </p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">4. Listings and transactions</h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            Sellers are responsible for the accuracy of their listings. Tujenge verifies listings where
            possible but does not guarantee the accuracy of third-party content. All transactions
            facilitated through Tujenge escrow are subject to our escrow terms.
          </p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">5. Fees</h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            Free features are free. Premium features, escrow fees, and lead-generation fees are
            disclosed before any charge. Subscription fees are billed in advance and are non-refundable
            except as required by law or our refund policy.
          </p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">6. Prohibited conduct</h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            You may not post false listings, misrepresent title ownership, harass other users, attempt
            to circumvent escrow, scrape data without permission, or use Tujenge for any illegal
            activity. Violations result in immediate account suspension.
          </p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">7. Disclaimers</h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            Tujenge is provided "as is" without warranties of any kind. We do our best to verify users
            and listings but cannot guarantee the conduct of third parties. Use Tujenge at your own risk.
          </p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">8. Changes</h2>
          <p className="text-navy-600 leading-relaxed mb-6">
            We may update these terms occasionally. Continued use of Tujenge after changes constitutes
            acceptance of the new terms. Material changes will be communicated via email.
          </p>

          <h2 className="font-display font-bold text-2xl text-navy-900 mt-8 mb-4">9. Contact</h2>
          <p className="text-navy-600 leading-relaxed">
            Questions about these terms? Email <a href="mailto:legal@tujenge.africa" className="text-gold-700 font-semibold">legal@tujenge.africa</a>.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
