import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

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
    <section className="bg-gp-neutral py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image Column */}
          <div className="relative order-last h-80 overflow-hidden rounded-3xl shadow-2xl lg:order-first lg:h-[500px]">
            <Image
              src="/images/home/sostenibilidad-banner.jpg"
              alt={d.imageAlt}
              fill
              className="object-cover"
            />
            {/* Decorative badge */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white/90 px-5 py-3 shadow-lg backdrop-blur-sm">
              <div className="bg-gp-green flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                  {d.our_commitment}
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {d.sustainable_agriculture_fishing}
                </p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="flex flex-col gap-6">
            <span className="text-gp-green inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <span className="bg-gp-green h-px w-8"></span>
              {d.sustainability}
            </span>
            <h2 className="font-serif text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
              {d.title} <span className="text-gp-green">{d.titleHighlight}</span>
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">{d.description}</p>
            <ul className="space-y-3 text-slate-700">
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
                className="bg-gp-blue hover:bg-gp-green shadow-gp-blue/20 inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105"
              >
                {d.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
