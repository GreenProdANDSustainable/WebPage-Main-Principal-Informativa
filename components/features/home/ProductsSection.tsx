import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import BoxedLabel from '@/components/shared/BoxedLabel';

interface Producto {
  slug: string;
  name: string;
}

interface Categoria {
  slug: string;
  name: string;
  products: Producto[];
}

interface ProductsSectionProps {
  dict: any;
  lang: string;
}

/**
 * Las seis líneas de producto, cada una en su recuadro verde y nada más.
 *
 * Van en dos filas de tres: en una sola fila los seis recuadros quedaban
 * apretados de lado a lado y ninguno se leía como pieza aparte. El recuadro
 * ocupa toda su celda para que las tres columnas queden parejas aunque los
 * nombres midan distinto.
 */
export default function ProductsSection({ dict, lang }: ProductsSectionProps) {
  const p = dict.Home.products;
  const categorias: Categoria[] = dict.Catalog.categories;

  return (
    <section id="productos" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <Reveal preset="growUp">
            <h2 className="font-display text-ink text-3xl font-semibold tracking-tight md:text-4xl">
              {p.title}
            </h2>
          </Reveal>
        </div>

        <Reveal
          group
          gap={0.06}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-3 md:gap-8"
        >
          {categorias.map((cat) => (
            <Reveal key={cat.slug} preset="child">
              <Link href={`/${lang}/catalogo/${cat.slug}`} className="group block">
                <BoxedLabel
                  as="h3"
                  animated
                  className="w-full text-center transition-transform duration-300 group-hover:-translate-y-1"
                >
                  {cat.name}
                </BoxedLabel>
              </Link>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
