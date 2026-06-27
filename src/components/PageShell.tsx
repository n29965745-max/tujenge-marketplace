import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import { images } from '@/lib/images';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  align?: 'center' | 'left';
}

/**
 * Reusable hero section for non-landing pages.
 */
export function PageHero({ eyebrow, title, subtitle, image, align = 'center' }: PageHeroProps) {
  return (
    <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/80 to-navy-900/70" />
        <div className="absolute inset-0 opacity-[0.04] bg-hero-pattern" />
      </div>
      <div
        className={`container-x relative py-20 lg:py-28 ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        <div className={`max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            {eyebrow}
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1] tracking-[-0.02em] mb-5">
            {title}
          </h1>
          <p className="text-lg lg:text-xl text-white/80 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

interface PageCTABannerProps {
  title: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/**
 * Reusable CTA banner that sits above the footer on most pages.
 */
export function PageCTABanner({ title, body, primary, secondary }: PageCTABannerProps) {
  return (
    <section className="section-tight bg-white">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 text-white p-10 lg:p-14 text-center">
          <div className="absolute inset-0 opacity-[0.05] bg-hero-pattern" aria-hidden />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/15 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl mb-4">
              {title}
            </h2>
            {body && (
              <p className="text-white/70 text-lg mb-8">{body}</p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {primary && (
                <Link href={primary.href} className="btn btn-primary btn-lg">
                  {primary.label}
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              )}
              {secondary && (
                <Link
                  href={secondary.href}
                  className="btn btn-lg"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PageLayoutProps {
  children: React.ReactNode;
  hideFooterCta?: boolean;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export { images };
