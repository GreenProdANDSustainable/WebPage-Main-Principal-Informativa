import { ImageOff } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

interface ProductsSectionProps {
  dict: any;
}

const PRODUCT_COUNT = 13;

/**
 * Retícula de 3 columnas para las 13 líneas de producto. Hoy son tarjetas
 * marcador de posición (sin foto ni nombre real todavía): el espacio queda
 * reservado para cuando lleguen las imágenes.
 */
export default function ProductsSection({ dict }: ProductsSectionProps) {
  const p = dict.Home.products;

  return (
    <section id="productos" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Reveal group gap={0.12}>
            <Reveal preset="child">
              <h2 className="font-display text-ink mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
                {p.title}
              </h2>
            </Reveal>
            <Reveal preset="child">
              <p className="text-ink/60 mx-auto max-w-2xl text-base">{p.subtitle}</p>
            </Reveal>
          </Reveal>
        </div>

        <Reveal
          group
          gap={0.06}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3"
        >
          {Array.from({ length: PRODUCT_COUNT }, (_, i) => (
            <Reveal key={i} preset="child">
              <div className="border-line-warm/50 hover:border-gp-green/50 group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors duration-500">
                <ImageOff className="text-ink/25 group-hover:text-gp-green/60 h-8 w-8 transition-colors duration-500" />
                <div className="text-center">
                  <p className="text-ink/50 text-sm font-semibold">
                    {p.itemLabel} {String(i + 1).padStart(2, '0')}
                  </p>
                  <p
                    className="text-ink/35 mt-1 text-xs tracking-wide uppercase"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {p.comingSoon}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
