'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import AmbientSpores from '@/components/shared/AmbientSpores';
import KineticHeading from '@/components/shared/KineticHeading';
import VideoBackdrop from '@/components/shared/VideoBackdrop';
import { stagger, staggerChild } from '@/lib/motion';

interface HeroSectionProps {
  dict: any;
  lang: string;
}

export default function HeroSection({ dict }: HeroSectionProps) {
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

      <div className="relative z-10 px-4 py-16 sm:px-6 lg:py-20">
        <motion.div
          className="max-w-md"
          variants={intro}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <motion.p
            variants={staggerChild}
            className="text-gp-green mb-3 text-[11px] tracking-wide"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ECONOMÍA CIRCULAR AGROINDUSTRIAL
          </motion.p>
          <KineticHeading
            as="h1"
            text={hero.title}
            highlight={hero.titleHighlight}
            delay={0.15}
            className="font-display text-paper mb-4 text-2xl leading-[1.15] font-semibold tracking-tight md:text-3xl lg:text-4xl"
          />
          <motion.p
            variants={staggerChild}
            className="text-husk/85 text-sm leading-relaxed md:text-base"
          >
            {hero.subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
