import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';
import BoxedLabel from '@/components/shared/BoxedLabel';
import ProductPhoto from '@/components/shared/ProductPhoto';
import { formatearSoles, precioDe } from '@/lib/tienda';

interface Producto {
  slug: string;
  name: string;
}

interface Categoria {
  slug: string;
  name: string;
  products: Producto[];
}

export default async function Catalogo({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const c = dictionary.Catalog;

  return (
    <div className="bg-paper min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal preset="fadeIn">
          <Link
            href={`/${lang}`}
            className="text-ink/50 hover:text-gp-green mb-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {c.backButton}
          </Link>
        </Reveal>

        <div className="mb-16 text-center">
          <Reveal group gap={0.12}>
            <Reveal preset="child">
              <h1 className="font-display text-ink mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
                {c.title}
              </h1>
            </Reveal>
            <Reveal preset="child">
              <p className="text-ink/60 mx-auto max-w-2xl text-base">{c.subtitle}</p>
            </Reveal>
          </Reveal>
        </div>

        <div className="space-y-14">
          {(c.categories as Categoria[]).map((category) => (
            <section key={category.slug}>
              <Reveal preset="growUp">
                {/* El título lleva a la página propia de la línea. */}
                <Link
                  href={`/${lang}/catalogo/${category.slug}`}
                  className="group mb-6 inline-flex items-center gap-3"
                >
                  <BoxedLabel
                    as="h2"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  >
                    {category.name}
                  </BoxedLabel>
                  <ArrowRight className="text-ink/30 group-hover:text-gp-green h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>

              <Reveal
                group
                gap={0.06}
                className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
              >
                {category.products.map((prod) => {
                  const precio = precioDe(prod.slug);
                  return (
                    <Reveal key={prod.slug} preset="child">
                      {/* Solo se mira: la tarjeta entera lleva a la ficha,
                          que es donde se compra. */}
                      <Link
                        href={`/${lang}/catalogo/${category.slug}/${prod.slug}`}
                        className="group border-line-warm/40 hover:border-gp-green/50 flex h-full flex-col rounded-2xl border bg-white/60 p-4 transition-colors"
                      >
                        <ProductPhoto
                          id={prod.slug}
                          name={prod.name}
                          sizes="(max-width: 640px) 45vw, 220px"
                        />
                        <p className="text-ink group-hover:text-gp-green mt-3 flex items-center justify-between gap-1 text-base font-bold transition-colors">
                          {prod.name}
                          <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                        </p>
                        <p className="text-ink/50 text-xs font-semibold">
                          {precio === null
                            ? dictionary.Checkout.pendingPrice
                            : formatearSoles(precio)}
                        </p>
                      </Link>
                    </Reveal>
                  );
                })}
              </Reveal>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
