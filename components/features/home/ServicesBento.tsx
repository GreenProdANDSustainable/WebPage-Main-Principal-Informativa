'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ease, viewport } from '@/lib/motion';

interface ServicesBentoProps {
  dict: any;
  lang: string;
}

/**
 * Lo que la empresa asegura, en una sola imagen: la línea completa de
 * bioinsumos sobre el campo, titular con el mismo tamaño de fuente que el
 * del hero y las certificaciones sobre una franja blanca que cae en curva
 * al pie de la imagen.
 */
export default function ServicesBento({ dict }: ServicesBentoProps) {
  const s = dict.Home.solutions;

  return (
    <section id="soluciones" className="bg-paper relative overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2/1]">
        <Image
          src="/images/home/productos-campo-full.webp"
          alt={s.productsAlt}
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-bottom"
          priority
        />
        <div className="relative z-10 flex h-full flex-col items-center px-4 pt-6 sm:pt-10 md:pt-14">
          <motion.h2
            className="font-display text-paper text-center leading-tight font-semibold tracking-tight whitespace-nowrap"
            style={{
              fontSize: 'clamp(0.6rem, calc((100vw - 32px) / 36), 3.5rem)',
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: ease.growth }}
          >
            {s.headingLead}{' '}
            <span className="text-gp-green text-[1.3em] font-extrabold">{s.headingAccent}</span>{' '}
            {s.headingTail}
          </motion.h2>
        </div>
      </div>

      {/* El blanco cae en una curva suave justo desde el borde de la foto
          hacia abajo — nunca hacia arriba, para no tapar los productos. */}
      <motion.div
        className="relative z-10 -mt-10 sm:-mt-16 md:-mt-24"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7, delay: 0.1, ease: ease.growth }}
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="block h-10 w-full drop-shadow-[0_-6px_10px_rgba(20,23,15,0.14)] sm:h-16 md:h-24"
          aria-hidden="true"
        >
          <path
            className="fill-paper"
            d="M0,55 C200,20 320,15 480,42 C640,68 760,85 900,70 C1040,55 1160,25 1320,38 C1380,44 1410,50 1440,45 L1440,100 L0,100 Z"
          />
        </svg>
        <div className="bg-paper px-4 pb-6 sm:pb-9 md:pb-12">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:gap-7">
            <p
              className="text-ink/70 text-[10px] font-bold tracking-[0.2em] uppercase sm:text-xs sm:tracking-[0.25em]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {s.certifiedBy}
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-7">
              <a
                href="https://www.gob.pe/senasa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/images/logos/senasa.webp"
                  alt="SENASA Perú"
                  width={420}
                  height={297}
                  className="h-10 w-auto mix-blend-multiply sm:h-14 md:h-16"
                />
              </a>
              <a
                href="https://www.kiwa.com/pe/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/images/logos/kiwa-bcs.webp"
                  alt="Kiwa BCS Öko-Garantie"
                  width={200}
                  height={200}
                  className="h-10 w-auto mix-blend-multiply sm:h-14 md:h-16"
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
