import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Hammer, Briefcase, Award, Users } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'Join as a Contractor' };

export default function ContractorRegisterPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.contractor3} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            <Hammer className="w-3.5 h-3.5" />
            For Contractors
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Win more projects. Get paid faster.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join 1,200+ verified contractors on Tujenge. Receive qualified leads, manage projects in one place, and get paid within 48 hours of milestone approval.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { Icon: Users, title: 'Qualified leads', body: 'No more cold calls. Receive requests from buyers who already match your specialty, location, and budget.' },
              { Icon: Briefcase, title: 'Project management', body: 'Manage procurement, milestones, daily logs, and team coordination in one workspace.' },
              { Icon: Award, title: 'Get paid in 48 hours', body: 'Escrow-protected milestone payments released within 48 hours of approval — never wait 90 days again.' },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="card p-6 text-center">
                <Icon className="w-8 h-8 text-gold-700 mx-auto mb-3" strokeWidth={2} />
                <h3 className="font-display font-bold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-navy-600">{body}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card p-7 lg:p-9">
              <h2 className="font-display font-bold text-2xl text-navy-900 mb-1">Apply for verification</h2>
              <p className="text-sm text-navy-600 mb-6">Free to apply. Verification in 24-72 hours.</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Company name</label>
                    <input type="text" className="input" placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Registration number</label>
                    <input type="text" className="input" placeholder="BN-XXXXX" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Specialty</label>
                    <select className="input">
                      <option>General contractor</option>
                      <option>Masonry</option>
                      <option>Electrical</option>
                      <option>Plumbing</option>
                      <option>Roofing</option>
                      <option>Painting</option>
                      <option>Carpentry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Years of experience</label>
                    <input type="number" min="0" className="input" placeholder="e.g. 10" />
                  </div>
                </div>
                <div>
                  <label className="block font-display font-semibold text-sm text-navy-900 mb-1.5">Phone</label>
                  <input type="tel" className="input" placeholder="+254 7XX XXX XXX" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-full">
                  Submit application <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Already verified?"
        primary={{ label: 'Sign in to your account', href: '/login' }}
        secondary={{ label: 'Learn about Tujenge', href: '/about' }}
      />
    </PageLayout>
  );
}
