'use client';

import Image from 'next/image';
import { useReducedMotion } from 'motion/react';

export interface MarqueeLogo {
  src: string;
  alt: string;
  href?: string;
}

interface LogoMarqueeProps {
  logos: MarqueeLogo[];
  /** Segundos que tarda la cinta en dar una vuelta completa. */
  duration?: number;
  /**
   * `onDark`: la cinta va sobre una foto oscura. Los logos son casi todos
   * de tinta oscura, asi que ahi cada uno se apoya en una placa clara para
   * seguir siendo legible, y los bordes se funden con el fondo oscuro.
   */
  variant?: 'plain' | 'onDark';
}

/**
 * Cinta de logos en movimiento continuo.
 *
 * La lista se duplica y el conjunto se desplaza exactamente la mitad de su
 * ancho: al terminar el ciclo la segunda copia queda donde arrancó la
 * primera, así el bucle no tiene salto visible. Si se pidió menos
 * movimiento, los logos se muestran quietos y centrados.
 */
export default function LogoMarquee({ logos, duration = 32, variant = 'plain' }: LogoMarqueeProps) {
  const reduced = useReducedMotion();
  const oscuro = variant === 'onDark';

  if (reduced) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-10 px-4 md:gap-16">
        {logos.map((logo) => (
          <LogoItem key={logo.src} logo={logo} oscuro={oscuro} />
        ))}
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden">
      {/* Los bordes se desvanecen: los logos entran y salen en vez de
          aparecer cortados de golpe. */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent md:w-28 ${oscuro ? 'from-ink' : 'from-paper'}`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent md:w-28 ${oscuro ? 'from-ink' : 'from-paper'}`}
      />

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
                <LogoItem logo={logo} oscuro={oscuro} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoItem({ logo, oscuro }: { logo: MarqueeLogo; oscuro: boolean }) {
  const img = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={565}
      height={400}
      // Los archivos ya llevan el fondo recortado (transparente), así que
      // se apoyan directo sobre el color de la sección; sobre foto oscura,
      // sobre la placa clara.
      className={`w-auto object-contain transition-opacity duration-300 hover:opacity-100 ${
        oscuro ? 'h-16 opacity-95 md:h-24' : 'h-20 opacity-75 md:h-32'
      }`}
    />
  );

  if (oscuro) {
    const placa = (
      <span className="bg-paper/95 flex items-center justify-center rounded-2xl px-6 py-4 shadow-lg transition-transform duration-300 hover:scale-105 md:px-8 md:py-5">
        {img}
      </span>
    );
    if (!logo.href) return placa;
    return (
      <a href={logo.href} target="_blank" rel="noopener noreferrer" className="flex">
        {placa}
      </a>
    );
  }

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
