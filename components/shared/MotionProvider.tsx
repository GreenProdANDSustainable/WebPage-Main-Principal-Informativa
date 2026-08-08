'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Ajuste global del movimiento.
 *
 * Con `reducedMotion="user"`, cualquier animación del sitio consulta la
 * preferencia del sistema operativo: si la persona pidió menos movimiento,
 * se anulan los desplazamientos y escalados y solo quedan los cambios de
 * opacidad. Así no hace falta repetir la comprobación componente por
 * componente y ninguno se queda fuera por descuido.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
