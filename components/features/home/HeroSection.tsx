'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import AmbientSpores from '@/components/shared/AmbientSpores';
import KineticHeading from '@/components/shared/KineticHeading';
import VideoBackdrop from '@/components/shared/VideoBackdrop';
import { ease, stagger, staggerChild } from '@/lib/motion';

interface HeroSectionProps {
  dict: any;
  lang: string;
}

export default function HeroSection({ dict, lang }: HeroSectionProps) {
  const hero = dict.Home.hero;
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // El campo del fondo se desplaza más lento que el contenido: da profundidad
  // sin que el texto pierda un ápice de legibilidad.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  const intro = stagger(0.1, 0.04);

  return (
    <section id="inicio" ref={sectionRef} className="bg-ink relative overflow-hidden">
      {/* Video de fondo: hojas de palta en movimiento, tratado como marca de agua sutil */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 -top-[8%] h-[118%]"
          style={reduced ? undefined : { y: bgY }}
        >
          <VideoBackdrop
            sources={['/videos/hero-avocado.mp4']}
            poster="/images/home/banners/fondo-hero.webp"
            posterAlt=""
            veil={false}
          />
        </motion.div>
        {/* Polen en suspensión sobre el campo. */}
        <AmbientSpores />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-16">
          <motion.div
            className="max-w-2xl text-left [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]"
            variants={intro}
            initial={reduced ? false : 'hidden'}
            animate="visible"
          >
            <motion.p
              variants={staggerChild}
              className="text-gp-green mb-5 text-[13px] tracking-wide"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ECONOMÍA CIRCULAR AGROINDUSTRIAL
            </motion.p>
            <KineticHeading
              as="h1"
              text={hero.title}
              highlight={hero.titleHighlight}
              delay={0.15}
              className="font-display text-paper mb-6 text-4xl leading-[1.08] font-semibold tracking-tight md:text-5xl lg:text-6xl"
            />
            <motion.p variants={staggerChild} className="text-husk/75 mb-10 max-w-xl text-lg">
              {hero.subtitle}
            </motion.p>
            <motion.div
              variants={staggerChild}
              className="flex flex-col items-center justify-start gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.3, ease: ease.growth }}
              >
                <Link
                  href={`/${lang}/catalogo`}
                  className="group bg-gp-green text-ink hover:bg-husk inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold shadow-[0_0_0_0_rgba(109,190,81,0)] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_10px_34px_-10px_rgba(109,190,81,0.75)]"
                >
                  {hero.primaryCta}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={reduced ? undefined : { y: -3 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.3, ease: ease.growth }}
              >
                <Link
                  href={`/${lang}/contacto`}
                  className="border-line-warm/40 text-paper hover:border-gp-green/60 hover:bg-gp-green/5 inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-base font-semibold transition-colors duration-300"
                >
                  {hero.secondaryCta}
                </Link>
              </motion.div>
            </motion.div>
            <motion.p
              variants={staggerChild}
              className="text-line-warm mt-8 text-xs tracking-wide"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              CERTIFICADO ISO 14001 · NUEVO CHIMBOTE, PERÚ
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
