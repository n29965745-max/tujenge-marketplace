import Image from 'next/image';
import Link from 'next/link';
import { Plus, Calendar, Wallet, Users, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import PageLayout, { PageCTABanner } from '@/components/PageShell';
import { images } from '@/lib/images';

export const metadata = { title: 'My Projects' };

const PROJECTS = [
  {
    id: 1,
    title: 'Karen 4-Bedroom Villa',
    status: 'in_progress',
    progress: 65,
    cover: images.propertyLuxury1,
    budget: 'KES 9.4M',
    spent: 'KES 6.1M',
    startDate: 'Jan 2026',
    completion: 'Aug 2026',
    team: 8,
    milestones: { done: 5, total: 8 },
  },
  {
    id: 2,
    title: 'Mombasa Beach Resort',
    status: 'in_progress',
    progress: 32,
    cover: images.propertyModern1,
    budget: 'KES 280M',
    spent: 'KES 89M',
    startDate: 'Nov 2025',
    completion: 'Dec 2027',
    team: 24,
    milestones: { done: 3, total: 12 },
  },
];

export default function ProjectsPage() {
  return (
    <PageLayout>
      <section className="relative pt-[72px] overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0">
          <Image src={images.siteAerial} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70" />
        </div>
        <div className="container-x relative py-20 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wide uppercase">
            Project Management
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-tight mb-5">
            Track every build, from foundation to finish.
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Schedules, budgets, milestones, daily photo logs — all in one place. Built for African construction.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-navy-900">Active projects</h2>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4" /> New project
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div key={p.id} className="card card-interactive overflow-hidden">
                <div className="relative aspect-[16/9] bg-navy-100">
                  <Image src={p.cover} alt={p.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-xs font-display font-semibold">Active</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display font-bold text-xl text-white">{p.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="font-display font-semibold text-navy-900">{p.progress}% complete</span>
                    <span className="text-navy-500">{p.milestones.done}/{p.milestones.total} milestones</span>
                  </div>
                  <div className="h-2 bg-navy-100 rounded-full overflow-hidden mb-5">
                    <div className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                    <div className="bg-navy-50 rounded-lg p-3">
                      <Wallet className="w-4 h-4 mx-auto mb-1 text-gold-700" />
                      <div className="text-xs text-navy-500">Budget</div>
                      <div className="font-display font-bold text-sm text-navy-900">{p.budget}</div>
                    </div>
                    <div className="bg-navy-50 rounded-lg p-3">
                      <Calendar className="w-4 h-4 mx-auto mb-1 text-gold-700" />
                      <div className="text-xs text-navy-500">Timeline</div>
                      <div className="font-display font-bold text-xs text-navy-900">{p.startDate} - {p.completion}</div>
                    </div>
                    <div className="bg-navy-50 rounded-lg p-3">
                      <Users className="w-4 h-4 mx-auto mb-1 text-gold-700" />
                      <div className="text-xs text-navy-500">Team</div>
                      <div className="font-display font-bold text-sm text-navy-900">{p.team} people</div>
                    </div>
                  </div>
                  <button className="btn btn-dark w-full">
                    Open project <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTABanner
        title="Start a new project"
        body="Plan in 5 minutes with the Build My Project wizard."
        primary={{ label: 'Start the wizard', href: '/build' }}
      />
    </PageLayout>
  );
}
