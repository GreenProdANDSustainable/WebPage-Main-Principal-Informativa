'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

interface ParallaxMediaProps {
  children: ReactNode;
  /** Recorrido del desplazamiento, en porcentaje de la altura. */
  amount?: number;
  className?: string;
}

/**
 * Da profundidad a una imagen: mientras la página sube, la foto se desplaza
 * un poco más lento, como si estuviera detrás del cristal.
 *
 * El hijo debe ser una imagen con `fill`; la capa interna es más alta que el
 * marco para que el recorrido nunca deje bordes vacíos a la vista.
 */
export default function ParallaxMedia({ children, amount = 12, className }: ParallaxMediaProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, restDelta: 0.001 });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="absolute inset-x-0 -top-[14%] h-[128%] will-change-transform"
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
