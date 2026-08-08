'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ElementType } from 'react';
import { ease, viewport } from '@/lib/motion';

interface KineticHeadingProps {
  /** Texto plano; se parte en palabras para animarlas por separado. */
  text: string;
  /** Palabras finales que van resaltadas en verde. */
  highlight?: string;
  as?: ElementType;
  className?: string;
  highlightClassName?: string;
  /** Retraso antes de que arranque la primera palabra. */
  delay?: number;
}

/**
 * Titular que se escribe solo, palabra por palabra.
 *
 * Cada palabra sube desde detrás de su propia línea base, como si el
 * texto brotara. Es el gesto que convierte un encabezado en un momento
 * y no en un simple rótulo. El texto real siempre está en el DOM, así
 * que buscadores y lectores de pantalla lo leen completo.
 */
export default function KineticHeading({
  text,
  highlight,
  as: Tag = 'h2',
  className = '',
  highlightClassName = 'text-gp-green',
  delay = 0,
}: KineticHeadingProps) {
  const reduced = useReducedMotion();

  const words = text.split(' ').filter(Boolean);
  const highlightWords = highlight ? highlight.split(' ').filter(Boolean) : [];

  if (reduced) {
    return (
      <Tag className={className}>
        {text}
        {highlight && <span className={highlightClassName}> {highlight}</span>}
      </Tag>
    );
  }

  const all = [
    ...words.map((w) => ({ word: w, accent: false })),
    ...highlightWords.map((w) => ({ word: w, accent: true })),
  ];

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
        }}
      >
        {all.map(({ word, accent }, i) => (
          // El contenedor recorta la palabra mientras sube: parece brotar.
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.08em] align-bottom"
          >
            <motion.span
              className={`inline-block ${accent ? highlightClassName : ''}`}
              variants={{
                hidden: { y: '110%' },
                visible: { y: '0%', transition: { duration: 0.72, ease: ease.growth } },
              }}
            >
              {word}
              {i < all.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
