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
 * bioinsumos sobre el campo, y debajo quién respalda esa producción.
 */
export default function ServicesBento({ dict }: ServicesBentoProps) {
  const s = dict.Home.solutions;

  return (
    <section id="soluciones" className="bg-paper relative overflow-hidden py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="font-display text-ink mb-10 text-center leading-tight font-semibold tracking-tight whitespace-nowrap md:mb-14"
          // El titular va siempre en un solo renglón: el tamaño se ata al
          // ancho de la pantalla para que quepa sin recortarse ni desbordar.
          style={{ fontSize: 'clamp(0.8rem, 3.55vw, 3rem)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: ease.growth }}
        >
          {s.headingLead}{' '}
          <span className="text-gp-green text-[1.25em] font-extrabold">{s.headingAccent}</span>{' '}
          {s.headingTail}
        </motion.h2>

        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.1, ease: ease.growth }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/home/productos-campo.webp"
              alt={s.productsAlt}
              width={3840}
              height={2160}
              sizes="(max-width: 1024px) 100vw, 64rem"
              quality={90}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <p
              className="text-ink/50 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {s.certifiedBy}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <a
                href="https://www.gob.pe/senasa"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src="/images/logos/senasa.webp"
                  alt="SENASA Perú"
                  width={420}
                  height={297}
                  className="h-14 w-auto md:h-16"
                />
              </a>
              <a
                href="https://www.kiwa.com/pe/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src="/images/logos/kiwa-bcs.webp"
                  alt="Kiwa BCS Öko-Garantie"
                  width={200}
                  height={200}
                  className="h-14 w-auto md:h-16"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
