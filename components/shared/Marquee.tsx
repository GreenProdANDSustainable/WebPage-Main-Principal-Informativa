'use client';

import { motion, useReducedMotion } from 'motion/react';

interface MarqueeProps {
  items: string[];
  /** Segundos que tarda en recorrer un ciclo. Más alto, más lento. */
  duration?: number;
  /** Sentido del recorrido. */
  reverse?: boolean;
  className?: string;
}

/**
 * Banda de texto en movimiento continuo.
 *
 * Actúa como una cinta transportadora: recuerda que el proceso de la
 * empresa nunca se detiene y le da al sitio un pulso constante sin
 * pedir atención. El contenido se duplica para que el bucle no tenga
 * costura visible.
 */
export default function Marquee({
  items,
  duration = 34,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const track = [...items, ...items];

  const content = track.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center gap-6 px-6">
      <span className="whitespace-nowrap">{item}</span>
      <span className="bg-gp-green/70 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
    </span>
  ));

  if (reduced) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex">{content.slice(0, items.length)}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {content}
      </motion.div>
    </div>
  );
}
