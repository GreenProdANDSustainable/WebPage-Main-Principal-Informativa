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
 * del hero y las certificaciones como una placa pequeña al pie de la imagen.
 */
export default function ServicesBento({ dict }: ServicesBentoProps) {
  const s = dict.Home.solutions;

  return (
    <section id="soluciones" className="bg-paper relative overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2/1]">
        <Image
          src="/images/home/productos-campo.webp"
          alt={s.productsAlt}
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 pt-6 pb-3 sm:pt-10 sm:pb-5 md:pt-14 md:pb-6">
          <motion.h2
            className="font-display text-paper text-center text-[clamp(0.7rem,calc(100vw/28),1.875rem)] leading-[1.15] font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: ease.growth }}
          >
            {s.headingLead}{' '}
            <span className="text-gp-green text-[1.3em] font-extrabold">{s.headingAccent}</span>{' '}
            {s.headingTail}
          </motion.h2>

          <motion.div
            className="bg-paper w-fit max-w-[94%] rounded-xl px-3 py-1.5 shadow-xl sm:rounded-2xl sm:px-8 sm:py-5 md:rounded-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.1, ease: ease.growth }}
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-7">
              <p
                className="text-ink/70 text-[7px] font-bold tracking-[0.15em] uppercase sm:text-xs sm:tracking-[0.25em]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {s.certifiedBy}
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-7">
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
                    className="h-5 w-auto mix-blend-multiply sm:h-14 md:h-16"
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
                    className="h-5 w-auto mix-blend-multiply sm:h-14 md:h-16"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
