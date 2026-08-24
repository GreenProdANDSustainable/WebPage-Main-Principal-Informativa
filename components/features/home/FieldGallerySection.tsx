'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ease, viewport } from '@/lib/motion';

interface FieldGallerySectionProps {
  dict: any;
}

// Fotos propias de Green Prod: primero las 4 mas nuevas (cosecha, mezcla y
// aplicacion de bioinsumo, y el dron sobre el arrozal), despues el resto del
// campo y por ultimo la linea de producto. Ya recortadas a 3:4 —la
// proporción de la tarjeta— y a 640px de ancho, que es lo que pide la
// tarjeta en pantalla retina sin cargar de más a quien entra desde el
// celular.
//
// La entrega de cosecha (posición 2) queda apaisada a propósito: recortarla
// a 3:4 dejaba fuera a una de las dos personas de la foto, así que esa
// tarjeta rompe el ancho fijo del resto.
const PHOTOS = [
  '/images/home/campo/mezcla-bioinsumo.webp',
  '/images/home/campo/entrega-cosecha.webp',
  '/images/home/campo/dron-arrozal.webp',
  '/images/home/campo/campo-cosecha.webp',
  '/images/home/campo/aplicacion-arrozal.webp',
  '/images/home/campo/arroz-producto.webp',
  '/images/home/campo/warduo-campo.webp',
  '/images/home/campo/pescador-artesanal.webp',
  '/images/home/campo/paltar-cerca.webp',
  '/images/home/campo/paltas-produccion.webp',
  '/images/home/campo/huerto-palta.webp',
  '/images/home/campo/linea-productos.webp',
];

const LANDSCAPE_PHOTOS = new Set(['/images/home/campo/entrega-cosecha.webp']);

/**
 * Galería de fotos del campo, en su propia sección (antes vivía dentro de
 * MissionVisionSection, compartiendo su video; ahora es independiente, con
 * fondo oscuro propio para no perder el tono de la marca). Las fotos corren
 * en un carrusel horizontal (no un grid cerrado de 3): la última tarjeta
 * visible siempre queda cortada a la mitad y hay flechas, para que quede
 * claro que sigue habiendo más para deslizar.
 */
export default function FieldGallerySection({ dict }: FieldGallerySectionProps) {
  const d = dict.Home.fieldGallery;
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="campo" className="bg-ink relative overflow-hidden py-16 md:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-4 hidden justify-end gap-3 sm:flex"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: ease.growth }}
        >
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={d.prev}
            className="border-paper/25 text-paper hover:bg-paper hover:text-ink flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={d.next}
            className="border-paper/25 text-paper hover:bg-paper hover:text-ink flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PHOTOS.map((src, i) => (
              <PhotoCard
                key={src}
                src={src}
                alt={d.photoAlts[i]}
                delay={Math.min(i, 6) * 0.06}
                eager={i < 3}
              />
            ))}
          </div>

          {/* Degradado en el borde derecho: refuerza que el carrusel sigue,
              aunque ya se note por la tarjeta cortada a la mitad. */}
          <div className="from-ink pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l to-transparent sm:w-20 md:w-28" />
        </div>
      </div>
    </section>
  );
}

function PhotoCard({
  src,
  alt,
  delay,
  eager,
}: {
  src: string;
  alt: string;
  delay: number;
  eager: boolean;
}) {
  const reduced = useReducedMotion();
  const landscape = LANDSCAPE_PHOTOS.has(src);

  return (
    <motion.div
      data-card
      className={
        landscape
          ? 'border-paper/15 relative aspect-[3/2] w-[90vw] shrink-0 snap-start overflow-hidden rounded-[28px] border shadow-2xl sm:w-[540px] lg:w-[640px]'
          : 'border-paper/15 relative aspect-[3/4] w-[84vw] shrink-0 snap-start overflow-hidden rounded-[28px] border shadow-2xl sm:w-[360px] lg:w-[400px]'
      }
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: ease.growth }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={1280}
        height={1707}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        whileHover={reduced ? undefined : { scale: 1.06 }}
        whileTap={reduced ? undefined : { scale: 1.06 }}
        transition={{ duration: 0.4, ease: ease.growth }}
      />
    </motion.div>
  );
}
