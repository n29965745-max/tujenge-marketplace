import {
  AlertOctagon,
  UserX,
  FileWarning,
  Receipt,
  Clock,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const pains = [
  {
    icon: UserX,
    title: 'Fake Agents',
    description:
      'Lists properties that don\'t exist, photos from other homes, vanishes after the deposit.',
  },
  {
    icon: AlertOctagon,
    title: 'Unreliable Contractors',
    description:
      'Disappear mid-project. Substitute your "premium" cement for off-brand. Add weeks to every deadline.',
  },
  {
    icon: Receipt,
    title: 'Endless Supplier Searches',
    description:
      'Drive across town comparing cement prices. Hours wasted on calls that go nowhere.',
  },
  {
    icon: FileWarning,
    title: 'Hidden Costs',
    description:
      'The KES 5M plot turns into KES 5.75M after stamp duty, legal fees, and "extras" nobody mentioned.',
  },
  {
    icon: Clock,
    title: 'Project Delays',
    description:
      'Average African build runs 40% over schedule. Delays drain 12-18% of project value every year.',
  },
];

export default function ProblemAgitation() {
  return (
    <section className="section bg-navy-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-hero-pattern" aria-hidden />

      <div className="container-x relative">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <div className="eyebrow text-danger mb-4" style={{ color: '#B91C1C' }}>
            <span style={{ background: '#B91C1C' }} />
            The problem
          </div>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-navy-900 mb-5">
            Building or Buying Property{' '}
            <span className="text-gradient-gold">Shouldn't Be Stressful.</span>
          </h2>
          <p className="text-lg text-navy-600 leading-relaxed">
            Every year, billions are lost to fraud, delays, and broken trust across
            African construction. Here's what's going wrong — and why you shouldn't have
            to deal with it.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {pains.map((pain, i) => (
            <ScrollReveal
              key={pain.title}
              delay={i * 80}
              className="card card-interactive p-6 lg:p-7 group"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-danger/10 ring-1 ring-danger/20 group-hover:bg-danger/15 transition-colors">
                <pain.icon
                  className="w-6 h-6 text-danger"
                  strokeWidth={2}
                />
              </div>
              <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">
                {pain.title}
              </h3>
              <p className="text-navy-600 leading-relaxed text-[0.95rem]">
                {pain.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
