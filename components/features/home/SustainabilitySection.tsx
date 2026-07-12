import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SustainabilitySectionProps {
  dict: any;
  initiatives: any[];
  lang: string;
}

export default function SustainabilitySection({
  dict,
  initiatives,
  lang,
}: SustainabilitySectionProps) {
  return (
    <section className="relative bg-slate-900 py-16 md:py-24">
      <Image
        src="/images/sustainability-bg.jpg"
        alt="Sustainability"
        fill
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-[#112a1f]/80" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="mb-12 text-left lg:mb-0">
            <h2 className="mb-6 font-serif text-4xl font-bold text-[#beede0] md:text-5xl">
              {dict.Home.sustainability.title}
            </h2>
            <p className="mb-8 max-w-xl text-lg text-[#e8e4db]/90">
              {dict.Home.sustainability.subtitle}
            </p>
            <Link
              href={`/${lang}/sostenibilidad`}
              className="bg-gp-green hover:bg-gp-blue inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105"
            >
              {dict.Home.sustainability.learnMore}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 text-white sm:grid-cols-2">
            {initiatives.map((ini) => {
              const Icon = ini.icon;
              return (
                <div
                  key={ini.id}
                  className="flex flex-col items-start rounded-2xl border border-white/10 bg-[#1a4430]/60 p-6 backdrop-blur-md"
                >
                  <div className="mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                      <Icon className="h-6 w-6 text-[#beede0]" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-bold text-[#beede0]">{ini.title}</h3>
                  <p className="text-sm leading-relaxed text-[#e8e4db]/80">{ini.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
