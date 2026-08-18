import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import BoxedLabel from '@/components/shared/BoxedLabel';

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
 * Las seis líneas de producto. Cada una lleva su nombre dentro del recuadro
 * verde, debajo los productos que la componen, y lleva a su propia página.
 * Ya no hay marcador de foto: mientras no existan las fotos reales, el
 * recuadro vacío solo ensuciaba la sección.
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
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-3"
        >
          {categorias.map((cat) => (
            <Reveal key={cat.slug} preset="child">
              <Link
                href={`/${lang}/catalogo/${cat.slug}`}
                className="group flex flex-col items-center gap-4 text-center"
              >
                <BoxedLabel
                  as="h3"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  {cat.name}
                </BoxedLabel>
                <ul className="text-ink/70 space-y-1.5">
                  {cat.products.map((producto) => (
                    <li
                      key={producto}
                      className="group-hover:text-gp-green text-base font-semibold transition-colors duration-300"
                    >
                      {producto}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
