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
 * bioinsumos sobre el campo, titular en una sola línea arriba y las
 * certificaciones incrustadas como una placa al pie de la misma imagen.
 */
export default function ServicesBento({ dict }: ServicesBentoProps) {
  const s = dict.Home.solutions;

  return (
    <section id="soluciones" className="bg-paper relative overflow-hidden py-20 md:py-28">
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
        <div className="bg-ink/50 absolute inset-0" />

        <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 py-6 sm:py-10 md:py-14">
          <motion.h2
            className="font-display text-paper text-center leading-tight font-semibold tracking-tight whitespace-nowrap"
            style={{ fontSize: 'clamp(0.65rem, calc((100vw - 32px) / 31), 3.5rem)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: ease.growth }}
          >
            {s.headingLead} <span className="text-gp-green font-extrabold">{s.headingAccent}</span>{' '}
            {s.headingTail}
          </motion.h2>

          <motion.div
            className="bg-gp-green w-full max-w-3xl rounded-2xl px-4 py-3 shadow-xl sm:px-8 sm:py-5 md:rounded-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.1, ease: ease.growth }}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8">
              <p
                className="text-ink/70 text-[10px] font-bold tracking-[0.2em] uppercase sm:text-xs sm:tracking-[0.25em]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {s.certifiedBy}
              </p>
              <div className="flex items-center justify-center gap-3 sm:gap-6">
                <a
                  href="https://www.gob.pe/senasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-paper flex items-center justify-center rounded-xl px-3 py-2 shadow-md transition-transform duration-300 hover:scale-105 sm:rounded-2xl sm:px-5 sm:py-3"
                >
                  <Image
                    src="/images/logos/senasa.webp"
                    alt="SENASA Perú"
                    width={420}
                    height={297}
                    className="h-8 w-auto sm:h-12 md:h-16"
                  />
                </a>
                <a
                  href="https://www.kiwa.com/pe/es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-paper flex items-center justify-center rounded-xl px-3 py-2 shadow-md transition-transform duration-300 hover:scale-105 sm:rounded-2xl sm:px-5 sm:py-3"
                >
                  <Image
                    src="/images/logos/kiwa-bcs.webp"
                    alt="Kiwa BCS Öko-Garantie"
                    width={200}
                    height={200}
                    className="h-8 w-auto sm:h-12 md:h-16"
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
