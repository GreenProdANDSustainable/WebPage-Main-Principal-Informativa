'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { ease } from '@/lib/motion';

/**
 * Transición entre páginas.
 *
 * Al cambiar de sección el contenido entra con un leve ascenso en vez de
 * aparecer de golpe, así la navegación se siente continua y no como una
 * sucesión de pantallas sueltas. El gesto es corto a propósito: acompaña
 * al clic, no lo hace esperar.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.38, ease: ease.growth }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
