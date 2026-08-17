import Link from 'next/link';
import { ImageOff } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

interface Categoria {
  slug: string;
  name: string;
  products: string[];
}

interface ProductsSectionProps {
  dict: any;
  lang: string;
}

/**
 * Las siete líneas de producto. Cada una lleva su nombre encima del espacio
 * reservado para la foto y lleva a su propia página, donde se listan solo los
 * productos de esa línea.
 */
export default function ProductsSection({ dict, lang }: ProductsSectionProps) {
  const p = dict.Home.products;
  const categorias: Categoria[] = dict.Catalog.categories;

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
          {categorias.map((cat) => (
            <Reveal key={cat.slug} preset="child">
              <Link href={`/${lang}/catalogo/${cat.slug}`} className="group block">
                <h3 className="font-display text-ink group-hover:text-gp-green mb-3 text-center text-lg font-semibold transition-colors duration-300">
                  {cat.name}
                </h3>
                <div className="border-line-warm/50 group-hover:border-gp-green/60 flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors duration-500">
                  <ImageOff className="text-ink/25 group-hover:text-gp-green/60 h-8 w-8 transition-colors duration-500" />
                  <p
                    className="text-ink/35 text-xs tracking-wide uppercase"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {p.comingSoon}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
