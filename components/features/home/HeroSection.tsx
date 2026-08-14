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
    <section
      id="inicio"
      ref={sectionRef}
      className="bg-ink relative flex min-h-[75vh] items-end overflow-hidden lg:min-h-[85vh]"
    >
      {/* Video de fondo: hojas de palta en movimiento, tratado como marca de agua sutil */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 -top-[8%] h-[118%]"
          style={reduced ? undefined : { y: bgY }}
        >
          <VideoBackdrop sources={['/videos/hero-avocado.mp4']} veil={false} />
        </motion.div>
        {/* Velo: asienta el video para que el texto resalte. */}
        <div className="bg-ink/45 absolute inset-0" />
        {/* Polen en suspensión sobre el campo. */}
        <AmbientSpores />
      </div>

      {/* Borde rasgado: el navbar "se rompe" hacia el video, como una hoja rota. */}
      <div className="absolute inset-x-0 top-0 z-[5] h-10 md:h-16" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-full w-full">
          <path
            className="fill-paper"
            d="M0,0 L1440,0 L1440,15 L1368,52 L1296,28 L1224,58 L1152,22 L1080,55 L1008,30 L936,60 L864,18 L792,50 L720,26 L648,62 L576,32 L504,55 L432,20 L360,54 L288,28 L216,60 L144,24 L72,50 L0,18 Z"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <motion.div
          className="max-w-xl"
          variants={intro}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <motion.p
            variants={staggerChild}
            className="text-paper mb-3 text-xs font-semibold tracking-wide md:text-sm"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ECONOMÍA CIRCULAR AGROINDUSTRIAL
          </motion.p>
          <KineticHeading
            as="h1"
            text={hero.title}
            highlight={hero.titleHighlight}
            highlightClassName="text-gp-green"
            delay={0.15}
            className="font-display text-paper mb-4 text-3xl leading-[1.15] font-semibold tracking-tight md:text-4xl lg:text-5xl"
          />
          <motion.p
            variants={staggerChild}
            className="text-husk/90 text-base leading-relaxed md:text-lg"
          >
            {hero.subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
