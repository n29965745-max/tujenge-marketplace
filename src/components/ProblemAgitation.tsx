import Image from 'next/image';
import {
  UserX,
  AlertOctagon,
  Receipt,
  Clock,
  FileWarning,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { images } from '@/lib/images';

const pains = [
  {
    icon: UserX,
    image: images.contractor2,
    title: 'Fake Agents',
    description:
      'Lists properties that don\'t exist, photos from other homes, vanishes after the deposit.',
  },
  {
    icon: AlertOctagon,
    image: images.worker1,
    title: 'Unreliable Contractors',
    description:
      'Disappear mid-project. Substitute your "premium" cement for off-brand. Add weeks to every deadline.',
  },
  {
    icon: Receipt,
    image: images.siteAerial,
    title: 'Endless Supplier Searches',
    description:
      'Drive across town comparing cement prices. Hours wasted on calls that go nowhere.',
  },
  {
    icon: FileWarning,
    image: images.blueprint,
    title: 'Hidden Costs',
    description:
      'The KES 5M plot turns into KES 5.75M after stamp duty, legal fees, and "extras" nobody mentioned.',
  },
  {
    icon: Clock,
    image: images.contractor1,
    title: 'Project Delays',
    description:
      'Average African build runs 40% over schedule. Delays drain 12-18% of project value every year.',
  },
];

export default function ProblemAgitation() {
  return (
    <section className="section bg-navy-50 relative overflow-hidden">
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
              className="card card-interactive overflow-hidden group"
            >
              {/* Image header */}
              <div className="relative aspect-[16/9] overflow-hidden bg-navy-100">
                <Image
                  src={pain.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center justify-center w-10 h-10 rounded-lg bg-white/95 backdrop-blur-sm ring-1 ring-danger/20">
                  <pain.icon className="w-5 h-5 text-danger" strokeWidth={2} />
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <h3 className="font-display font-semibold text-lg text-navy-900 mb-2">
                  {pain.title}
                </h3>
                <p className="text-navy-600 leading-relaxed text-[0.95rem]">
                  {pain.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
