import Link from 'next/link';
import { ArrowRight, ImageOff } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

interface ProductsSectionProps {
  dict: any;
  lang: string;
}

const PRODUCT_COUNT = 5;

/**
 * Adelanto de 5 tarjetas marcador de posición (sin foto ni nombre real
 * todavía) que invita al catálogo completo, donde los productos van
 * divididos por categoría.
 */
export default function ProductsSection({ dict, lang }: ProductsSectionProps) {
  const p = dict.Home.products;

  return (
    <section id="productos" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Reveal preset="growUp">
            <h2 className="font-display text-ink text-3xl font-semibold tracking-tight md:text-4xl">
              {p.title}
            </h2>
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

        <Reveal preset="growUp" className="mt-12 text-center">
          <Link
            href={`/${lang}/catalogo`}
            className="bg-gp-green text-ink hover:bg-husk group inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all hover:scale-105"
          >
            {p.viewCatalog}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
