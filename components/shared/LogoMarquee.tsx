'use client';

import Image from 'next/image';
import { useReducedMotion } from 'motion/react';

export interface MarqueeLogo {
  src: string;
  alt: string;
  href?: string;
  /** Dimensiones reales del archivo (ya recortado a su contenido, sin
   *  márgenes transparentes). Con esto cada logo escala por su propia
   *  proporción en vez de encajar en una caja compartida, así todos quedan
   *  del mismo tamaño visual a la misma altura. */
  width?: number;
  height?: number;
}

interface LogoMarqueeProps {
  logos: MarqueeLogo[];
  /** Segundos que tarda la cinta en dar una vuelta completa. */
  duration?: number;
}

/**
 * Cinta de logos en movimiento continuo.
 *
 * La lista se duplica y el conjunto se desplaza exactamente la mitad de su
 * ancho: al terminar el ciclo la segunda copia queda donde arrancó la
 * primera, así el bucle no tiene salto visible. Si se pidió menos
 * movimiento, los logos se muestran quietos y centrados.
 */
export default function LogoMarquee({ logos, duration = 32 }: LogoMarqueeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-10 px-4 md:gap-16">
        {logos.map((logo) => (
          <LogoItem key={logo.src} logo={logo} />
        ))}
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden">
      {/* Los bordes se desvanecen: los logos entran y salen en vez de
          aparecer cortados de golpe. */}
      <div className="from-paper pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent md:w-28" />
      <div className="from-paper pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent md:w-28" />

      {/* Cuatro copias: en pantallas anchas la cinta siempre sobra por los
          dos lados, así nunca queda un hueco a la derecha con los logos
          amontonados a la izquierda. */}
      <div
        className="marquee-track flex w-max items-center group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy !== 0}>
            {logos.map((logo) => (
              <div key={`${copy}-${logo.src}`} className="px-10 md:px-20">
                <LogoItem logo={logo} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoItem({ logo }: { logo: MarqueeLogo }) {
  const img = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width ?? 400}
      height={logo.height ?? 400}
      // Los archivos ya llevan el fondo recortado (transparente), así que
      // se apoyan directo sobre el color de la sección.
      className="h-20 w-auto object-contain opacity-75 transition-opacity duration-300 hover:opacity-100 md:h-32"
    />
  );

  if (!logo.href) return img;

  return (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center"
    >
      {img}
    </a>
  );
}
