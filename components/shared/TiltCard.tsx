'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { ReactNode } from 'react';
import { ease } from '@/lib/motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Grados máximos de inclinación. Poco es más: debe insinuarse, no marear. */
  intensity?: number;
}

/**
 * Tarjeta que se inclina siguiendo al cursor.
 *
 * Da la sensación de un objeto físico sobre la mesa —algo que se puede mirar
 * desde otro ángulo— en vez de un rectángulo plano. En pantallas táctiles
 * simplemente no se activa, y se desactiva si se pidió menos movimiento.
 */
export default function TiltCard({ children, className, intensity = 5 }: TiltCardProps) {
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 180, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), spring);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: ease.growth }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
