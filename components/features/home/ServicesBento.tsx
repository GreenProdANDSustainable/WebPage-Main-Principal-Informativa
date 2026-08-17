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
 * bioinsumos sobre el campo, con el aviso de certificación como una placa
 * blanca al pie de la imagen.
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
        {/* El bloque baja hasta apoyarse justo en el borde inferior de la
            foto: queda al ras de donde arranca la sección siguiente, sin
            invadirla. */}
        <div className="absolute inset-0 z-10 flex items-end justify-center">
          {/* Solo el aviso va dentro del recuadro verde; los logos quedan
              fuera y sin fondo. La sombra los mantiene legibles sobre la
              foto sin necesidad de una placa blanca detrás. */}
          <motion.div
            className="flex items-center gap-3 sm:gap-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: ease.growth }}
          >
            <span className="bg-gp-green text-ink font-display rounded-xl px-3 py-2 text-xs font-semibold tracking-wide whitespace-nowrap shadow-lg sm:px-5 sm:py-2.5 sm:text-sm">
              {s.certifiedByTitle}
            </span>
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
                className="h-6 w-auto drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] sm:h-9 md:h-11"
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
                className="h-7 w-auto drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] sm:h-10 md:h-12"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
