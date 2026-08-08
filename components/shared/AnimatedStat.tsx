'use client';

import { useEffect, useRef } from 'react';
// Se importa desde "motion" (el paquete declarado en package.json). No se
// debe importar "framer-motion" directamente: llega solo como dependencia
// de motion, y declararlo aparte rompe el arbol de dependencias del deploy.
import { useInView, useMotionValue, useTransform, animate, motion } from 'motion/react';

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
}

export default function AnimatedStat({ value, suffix, label }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, { duration: 2, ease: 'easeOut' });
      return () => animation.stop();
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="font-display text-gp-green mb-2 text-5xl font-bold md:text-6xl">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <div className="text-husk/70 text-lg">{label}</div>
    </div>
  );
}
