import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProblemAgitation from '@/components/ProblemAgitation';
import SolutionEcosystem from '@/components/SolutionEcosystem';
import HowItWorks from '@/components/HowItWorks';
import MarketplaceShowcase from '@/components/MarketplaceShowcase';
import Testimonials from '@/components/Testimonials';
import TrustBadges from '@/components/TrustBadges';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ProblemAgitation />
        <SolutionEcosystem />
        <HowItWorks />
        <MarketplaceShowcase />
        <Testimonials />
        <TrustBadges />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
