import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import * as motion from 'motion/react-client';

interface SustainabilityHighlightSectionProps {
  dict: any;
  lang: string;
}

export default function SustainabilityHighlightSection({
  dict,
  lang,
}: SustainabilityHighlightSectionProps) {
  const d = dict.Home.sustainability.highlight;

  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-last h-80 overflow-hidden rounded-3xl shadow-2xl lg:order-first lg:h-[500px]"
          >
            <Image
              src="/images/home/sostenibilidad-banner.jpg"
              alt={d.imageAlt}
              fill
              className="object-cover"
            />
            <div className="bg-paper/90 absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm">
              <div className="bg-gp-green flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-ink/50 text-xs font-medium tracking-wider uppercase">
                  {d.our_commitment}
                </p>
                <p className="text-ink text-sm font-bold">{d.sustainable_agriculture_fishing}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <span
              className="text-gp-green inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-plex-mono)' }}
            >
              <span className="bg-gp-green h-px w-8"></span>
              {d.sustainability}
            </span>
            <h2 className="font-display text-ink text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
              {d.title} <span className="text-gp-green">{d.titleHighlight}</span>
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed">{d.description}</p>
            <ul className="text-ink/80 space-y-3">
              {d.items.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="bg-gp-green/20 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <span className="bg-gp-green block h-2 w-2 rounded-full"></span>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                href={`/${lang}/sostenibilidad`}
                className="bg-gp-green text-ink hover:bg-husk inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all hover:scale-105"
              >
                {d.cta}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
