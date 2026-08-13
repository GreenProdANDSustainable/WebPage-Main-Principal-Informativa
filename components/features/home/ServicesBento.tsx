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
      {/* Imagen a todo el ancho de la pantalla, con el titular incrustado encima */}
      <div className="relative mb-14 h-[60vh] min-h-[420px] w-full overflow-hidden md:mb-20 md:h-[75vh]">
        <Image
          src="/images/home/productos-campo.webp"
          alt={s.productsAlt}
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          priority
        />
        <div className="bg-ink/45 absolute inset-0" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <motion.h2
            className="font-display text-paper max-w-4xl text-center leading-tight font-semibold tracking-tight"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3.5rem)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: ease.growth }}
          >
            {s.headingLead}{' '}
            <span className="text-gp-green text-[1.1em] font-extrabold">{s.headingAccent}</span>{' '}
            {s.headingTail}
          </motion.h2>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gp-green rounded-3xl px-8 py-10 shadow-xl md:px-14 md:py-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.1, ease: ease.growth }}
        >
          <div className="flex flex-col items-center gap-7">
            <p
              className="text-ink/70 text-xs font-bold tracking-[0.25em] uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {s.certifiedBy}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <a
                href="https://www.gob.pe/senasa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paper flex items-center justify-center rounded-2xl px-6 py-4 shadow-md transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/images/logos/senasa.webp"
                  alt="SENASA Perú"
                  width={420}
                  height={297}
                  className="h-16 w-auto md:h-20"
                />
              </a>
              <a
                href="https://www.kiwa.com/pe/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paper flex items-center justify-center rounded-2xl px-6 py-4 shadow-md transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/images/logos/kiwa-bcs.webp"
                  alt="Kiwa BCS Öko-Garantie"
                  width={200}
                  height={200}
                  className="h-16 w-auto md:h-20"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
