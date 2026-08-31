'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ease, viewport } from '@/lib/motion';
import BoxedLabel from '@/components/shared/BoxedLabel';

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
              fuera, sin fondo y sin realce: cualquier halo blanco se nota
              como un resto de recorte sobre la foto. */}
          <motion.div
            className="flex items-center gap-3 sm:gap-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: ease.growth }}
          >
            <BoxedLabel size="sm" className="whitespace-nowrap">
              {s.certifiedByTitle}
            </BoxedLabel>
            <a
              href="https://www.gob.pe/senasa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              {/* El archivo venía con un margen transparente enorme: el logo
                  ocupaba solo el 21% del alto, por eso se veía diminuto al
                  lado del sello de Kiwa. Ya recortado, se escala buscando
                  igual peso visual: es un logotipo apaisado (3.45:1) frente a
                  un sello cuadrado, así que se igualan por área, no por alto.
                  Va sin realce: el PNG ya es 100% transparente alrededor del
                  logotipo y se apoya sobre la paja clara del pie de la foto,
                  donde el azul contrasta solo. */}
              <Image
                src="/images/logos/senasa.png"
                alt="SENASA Perú"
                width={1809}
                height={543}
                className="h-6 w-auto sm:h-9 md:h-10"
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
                className="h-11 w-auto sm:h-16 md:h-[4.5rem]"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
