'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import ValorizationFlow from './ValorizationFlow';

interface HeroSectionProps {
  dict: any;
  lang: string;
}

export default function HeroSection({ dict, lang }: HeroSectionProps) {
  const hero = dict.Home.hero;

  return (
    <section className="bg-ink relative overflow-hidden">
      {/* Textura de fondo: campo real, tratado a muy baja opacidad */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/banners/PancaCampo.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.14] mix-blend-luminosity"
          priority
        />
        <div className="bg-ink absolute inset-0 opacity-90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gp-green mb-5 text-[13px] tracking-wide"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ECONOMÍA CIRCULAR AGROINDUSTRIAL
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-paper mb-6 text-4xl leading-[1.08] font-semibold tracking-tight md:text-5xl lg:text-6xl"
            >
              {hero.title} <br />
              <span className="text-gp-green">{hero.titleHighlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-husk/75 mb-10 max-w-xl text-lg"
            >
              {hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={`/${lang}/catalogo`}
                className="bg-gp-green text-ink hover:bg-husk inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-colors"
              >
                {hero.primaryCta}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={`/${lang}/contacto`}
                className="border-line-warm/40 text-paper hover:border-gp-green/60 inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-base font-semibold transition-colors"
              >
                {hero.secondaryCta}
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-line-warm mt-8 text-xs tracking-wide"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              CERTIFICADO ISO 14001 · LIMA, PERÚ
            </motion.p>
          </div>

          <ValorizationFlow dict={hero.flow} />
        </div>
      </div>
    </section>
  );
}
