'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ease, viewport } from '@/lib/motion';

interface FieldGallerySectionProps {
  dict: any;
}

// Fotos temporales de relleno (Unsplash) hasta que se reemplacen por
// material propio de Green Prod: campo, invernadero y pesca — los tres
// frentes del negocio.
const PHOTOS = [
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620200423727-8127f75d7f53?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1592856908193-b9934576cf3d?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508175688576-0c076b47b5b5?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1692369584496-3216a88f94c1?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1623136299195-570a06bdae6b?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566218246241-934ad8b38ea6?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1780686222200-15040dade760?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1661290597395-b664e233f441?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1777197255275-0c5d564c844f?w=900&q=80&auto=format&fit=crop',
];

/**
 * Segunda "página" del video de Nosotros: NO trae su propio video — vive
 * dentro del mismo fondo que MissionVisionSection ya puso encima, para que
 * sea un único video continuo y no dos instancias separadas. Las fotos
 * corren en un carrusel horizontal (no un grid cerrado de 3): la última
 * tarjeta visible siempre queda cortada a la mitad y hay flechas, para que
 * quede claro que sigue habiendo más para deslizar.
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
    <div id="campo" className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
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
            <PhotoCard key={src} src={src} alt={d.slotAlt} delay={Math.min(i, 6) * 0.06} />
          ))}
        </div>

        {/* Degradado en el borde derecho: refuerza que el carrusel sigue,
            aunque ya se note por la tarjeta cortada a la mitad. */}
        <div className="from-ink pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l to-transparent sm:w-20 md:w-28" />
      </div>
    </div>
  );
}

function PhotoCard({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-card
      className="border-paper/15 relative aspect-[3/4] w-[68vw] shrink-0 snap-start overflow-hidden rounded-[28px] border shadow-2xl sm:w-[280px]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: ease.growth }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        whileHover={reduced ? undefined : { scale: 1.06 }}
        whileTap={reduced ? undefined : { scale: 1.06 }}
        transition={{ duration: 0.4, ease: ease.growth }}
      />
    </motion.div>
  );
}
