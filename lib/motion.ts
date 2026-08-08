/**
 * Sistema de movimiento de Green Prod & Sustainable.
 *
 * El lenguaje de animación del sitio nace de lo que hace la empresa:
 * economía circular agroindustrial. Por eso todo se mueve como crece la
 * materia viva —arranca con inercia, acelera y se asienta sin rebotes
 * mecánicos— y nunca de forma lineal o robótica.
 *
 * Reglas del sistema:
 *  - Solo se anima `transform` y `opacity` (barato para la GPU: importante
 *    porque buena parte del público entra desde el celular).
 *  - Todo revela una sola vez (`once: true`): la página acompaña, no distrae.
 *  - Cada componente que use esto debe respetar `prefers-reduced-motion`.
 */

import type { Variants } from 'motion/react';

type Bezier = [number, number, number, number];

/** Curvas propias del sistema. */
export const ease: Record<'growth' | 'sprout' | 'flow', Bezier> = {
  /** Crecimiento: sale con calma y se asienta. El gesto por defecto. */
  growth: [0.16, 0.84, 0.44, 1],
  /** Brote: ligero sobrepaso, como una hoja que se despliega. */
  sprout: [0.34, 1.36, 0.64, 1],
  /** Flujo: entrada y salida suaves, para movimientos continuos. */
  flow: [0.45, 0, 0.55, 1],
};

/** Cuándo se dispara un reveal al hacer scroll. */
export const viewport = { once: true, amount: 0.25 } as const;
export const viewportSoft = { once: true, amount: 0.15 } as const;

/** Emerge desde abajo, como algo que brota del suelo. */
export const growUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: ease.growth },
  },
};

/** Aparición sobria, sin desplazamiento. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: ease.growth } },
};

/** Entra desde un lado (para bloques en dos columnas). */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -34 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: ease.growth } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 34 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: ease.growth } },
};

/** Crece desde su propia base, como una planta enraizada. */
export const rootScale: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.85, ease: ease.growth },
  },
};

/**
 * Contenedor que encadena la entrada de sus hijos. El retraso escalonado es
 * lo que da la sensación de que la sección "germina" en vez de aparecer.
 */
export const stagger = (staggerChildren = 0.09, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Hijo estándar de un contenedor escalonado. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.growth } },
};

/** Realce al pasar el cursor: sutil, sin exageraciones. */
export const lift = {
  whileHover: { y: -4, transition: { duration: 0.3, ease: ease.growth } },
  whileTap: { scale: 0.985 },
} as const;
