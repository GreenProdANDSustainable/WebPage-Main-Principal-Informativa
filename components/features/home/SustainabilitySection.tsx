import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as motion from 'motion/react-client';

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
    <section className="bg-ink relative py-16 md:py-24">
      <Image
        src="/images/sustainability-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-30"
        priority={false}
      />
      <div className="bg-ink/85 absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-left lg:mb-0"
          >
            <h2 className="font-display text-paper mb-6 text-4xl font-semibold tracking-tight md:text-5xl">
              {dict.Home.sustainability.title}
            </h2>
            <p className="text-husk/80 mb-8 max-w-xl text-lg">
              {dict.Home.sustainability.subtitle}
            </p>
            <Link
              href={`/${lang}/sostenibilidad`}
              className="bg-gp-green text-ink hover:bg-husk inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all hover:scale-105"
            >
              {dict.Home.sustainability.learnMore}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {initiatives.map((ini, idx) => {
              const Icon = ini.icon;
              return (
                <motion.div
                  key={ini.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border-line-warm/15 bg-ink-soft/60 flex flex-col items-start rounded-2xl border p-6 backdrop-blur-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                    <Icon className="text-gp-green h-6 w-6" />
                  </div>
                  <h3 className="font-display text-paper mb-2 text-xl font-semibold">
                    {ini.title}
                  </h3>
                  <p className="text-husk/70 text-sm leading-relaxed">{ini.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
