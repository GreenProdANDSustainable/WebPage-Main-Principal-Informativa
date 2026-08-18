import Image from 'next/image';
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
 * El fondo es un fotograma del mismo video que corre en "¿Quiénes Somos?",
 * así las dos secciones se leen como el mismo campo y no como dos imágenes
 * de bancos distintos. Va oscurecido para que los recuadros verdes y el
 * titular blanco se despeguen sin esfuerzo.
 */
export default function ProductsSection({ dict, lang }: ProductsSectionProps) {
  const p = dict.Home.products;
  const categorias: Categoria[] = dict.Catalog.categories;

  return (
    <section id="productos" className="bg-ink relative isolate overflow-hidden py-24">
      <Image
        src="/images/home/fondos/campo-riego.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[50%_32%]"
      />
      <div className="from-ink/80 via-ink/60 to-ink/70 absolute inset-0 -z-10 bg-gradient-to-b" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <Reveal preset="growUp">
            <h2 className="font-display text-paper text-3xl font-semibold tracking-tight md:text-4xl">
              {p.title}
            </h2>
          </Reveal>
        </div>

        <Reveal
          group
          gap={0.06}
          className="flex flex-wrap items-center justify-center gap-5 md:gap-7"
        >
          {categorias.map((cat) => (
            <Reveal key={cat.slug} preset="child">
              <Link href={`/${lang}/catalogo/${cat.slug}`} className="group block">
                <BoxedLabel
                  as="h3"
                  className="transition-transform duration-300 group-hover:-translate-y-1"
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
