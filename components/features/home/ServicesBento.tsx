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
        {/* Velo solo en la franja de arriba, donde va el titular: le da
            contraste al texto blanco sin apagar los productos ni el campo. */}
        <div
          className="from-ink/85 via-ink/30 pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 px-4 pt-6 sm:pt-10 md:pt-14">
          {/* Siempre en un solo renglón: el tamaño se ata al ancho de la
              pantalla y topa en 3rem, que es el mismo tamaño que ya tenía en
              escritorio. Con saltos por breakpoint se partía en tres líneas
              en celular. */}
          <motion.h2
            data-fit
            className="font-display text-paper text-center text-[clamp(0.75rem,4.5vw,3rem)] leading-[1.15] font-semibold tracking-tight whitespace-nowrap max-sm:-mx-4 max-sm:tracking-[-0.045em]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: ease.growth }}
          >
            {s.headingLead} <span className="text-gp-green">{s.headingAccent}</span> {s.headingTail}
          </motion.h2>

          {/* Anclado al borde inferior: así queda siempre sobre el pasto y
              no invade los productos, sin importar el alto de la sección. */}
          <motion.div
            className="bg-paper absolute bottom-[2.5%] left-1/2 w-fit max-w-[94%] -translate-x-1/2 rounded-xl px-3 py-1.5 shadow-xl sm:rounded-2xl sm:px-6 sm:py-2.5 md:rounded-3xl md:px-8 md:py-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, delay: 0.1, ease: ease.growth }}
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-7">
              {/* Misma familia y peso que el titular del hero: sin el
                  espaciado ancho de la versión anterior, que se veía mal. */}
              <p className="font-display text-ink/70 text-[9px] font-semibold tracking-tight sm:text-sm md:text-base">
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
                    className="h-5 w-auto mix-blend-multiply sm:h-10 md:h-12"
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
                    className="h-5 w-auto mix-blend-multiply sm:h-10 md:h-12"
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
