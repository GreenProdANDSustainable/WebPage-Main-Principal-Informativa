'use client';

import { motion, useReducedMotion, type TargetAndTransition, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import {
  fadeIn,
  growUp,
  rootScale,
  slideInLeft,
  slideInRight,
  stagger,
  staggerChild,
  viewport,
  viewportSoft,
} from '@/lib/motion';

const presets: Record<string, Variants> = {
  growUp,
  fadeIn,
  rootScale,
  slideInLeft,
  slideInRight,
  child: staggerChild,
};

type Preset = keyof typeof presets;

interface RevealProps {
  children: ReactNode;
  /** Gesto de entrada. Por defecto emerge desde abajo. */
  preset?: Preset;
  /** Retraso extra en segundos, para escalonar a mano. */
  delay?: number;
  /** Encadena la entrada de los hijos directos (que deben usar preset="child"). */
  group?: boolean;
  /** Separación entre hijos cuando `group` está activo. */
  gap?: number;
  /** Dispara la animación antes, útil en bloques altos. */
  soft?: boolean;
  className?: string;
}

/**
 * Revela contenido al entrar en pantalla siguiendo el sistema de movimiento
 * del sitio. Si la persona pidió menos movimiento en su sistema operativo,
 * el contenido se muestra de inmediato y sin animación.
 */
export default function Reveal({
  children,
  preset = 'growUp',
  delay = 0,
  group = false,
  gap = 0.09,
  soft = false,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  // Un hijo de grupo no dispara su propia animación: hereda el estado del
  // contenedor, que es lo que produce el encadenado.
  if (preset === 'child' && !group) {
    return (
      <motion.div className={className} variants={staggerChild}>
        {children}
      </motion.div>
    );
  }

  let variants: Variants;
  if (group) {
    variants = stagger(gap, delay);
  } else if (delay) {
    // El delay se inyecta dentro de la variante: si se pasara como prop
    // `transition`, la transición propia de la variante lo sobrescribiría.
    const base = presets[preset];
    const visible = base.visible as TargetAndTransition;
    variants = {
      hidden: base.hidden,
      visible: { ...visible, transition: { ...visible.transition, delay } },
    };
  } else {
    variants = presets[preset];
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={soft ? viewportSoft : viewport}
    >
      {children}
    </motion.div>
  );
}
