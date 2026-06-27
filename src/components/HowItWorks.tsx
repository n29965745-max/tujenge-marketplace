import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Users,
  GitCompareArrows,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { images } from '@/lib/images';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Tell Us What You Need',
    description:
      'Search for a property, request quotes from contractors, or browse materials. Use the Build My Project wizard to plan in 5 minutes.',
    image: images.blueprint,
  },
  {
    icon: Users,
    number: '02',
    title: 'Get Verified Options',
    description:
      'Our matching engine surfaces 3–5 verified professionals based on your location, budget, and requirements.',
    image: images.handShakeBusiness,
  },
  {
    icon: GitCompareArrows,
    number: '03',
    title: 'Compare Quotes',
    description:
      'See side-by-side comparisons of quotes, profiles, ratings, and timelines. Message directly or invite Tujenge to negotiate.',
    image: images.contractor3,
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Start Your Project',
    description:
      'Funds sit in escrow. Milestones release on verified completion. Daily photo updates. Insurance built in.',
    image: images.siteAerial,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section bg-navy-50 relative overflow-hidden"
    >
      <div className="container-x relative">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <div className="eyebrow mb-4">How it works</div>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-navy-900 mb-5">
            From <span className="text-gradient-gold">"I want to build"</span>{' '}
            to "Done." In four steps.
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            No middlemen. No surprises. Just a verified path from idea to handover.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
            aria-hidden
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <ScrollReveal
                key={step.number}
                delay={i * 120}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Image */}
                  <div className="relative w-[120px] h-[120px] mb-6 rounded-2xl overflow-hidden shadow-gold-sm ring-2 ring-gold-500/20">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-900/40 via-transparent to-transparent" />
                    {/* Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <step.icon
                          className="w-6 h-6 text-gold-700"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-gold-500 text-navy-900 font-display font-extrabold text-xs flex items-center justify-center shadow-gold-md z-20 ring-2 ring-white">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-navy-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-navy-600 text-[0.95rem] leading-relaxed max-w-xs mb-4">
                    {step.description}
                  </p>

                  {i === 0 && (
                    <Link
                      href="/build"
                      className="inline-flex items-center gap-1 text-gold-700 font-display font-semibold text-sm hover:text-gold-900"
                    >
                      Start now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
