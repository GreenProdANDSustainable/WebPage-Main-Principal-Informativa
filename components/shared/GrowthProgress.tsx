'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

const TRACK = 168;

/**
 * El avance de lectura, contado como crece una planta.
 *
 * En vez de la barra de progreso de siempre, un tallo que se alarga a medida
 * que se recorre la página, con una hoja que asciende en la punta. Es un
 * guiño al oficio de la empresa y da una señal de avance sin robar atención.
 *
 * Solo aparece en pantallas grandes (en el celular el espacio lateral hace
 * falta para el contenido) y desaparece si se pidió menos movimiento.
 */
export default function GrowthProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // El muelle evita el efecto "escalonado" del scroll y le da inercia viva.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  const leafY = useTransform(progress, [0, 1], [0, TRACK]);
  const leafTilt = useTransform(progress, [0, 1], [-12, 14]);
  const appear = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.35]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: appear }}
      className="pointer-events-none fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative" style={{ height: TRACK, width: 2 }}>
        {/* Surco: el recorrido completo, apenas insinuado. */}
        <div className="bg-ink/10 absolute inset-0 rounded-full" />

        {/* Tallo: crece desde arriba conforme se avanza. */}
        <motion.div
          className="from-gp-green to-gp-blue absolute inset-0 rounded-full bg-gradient-to-b"
          style={{ scaleY: progress, originY: 0 }}
        />

        {/* Hoja en la punta del tallo. */}
        <motion.div className="absolute -left-[7px]" style={{ y: leafY }}>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gp-green drop-shadow-sm"
            style={{ rotate: leafTilt }}
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </motion.svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
