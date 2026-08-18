import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';
import BoxedLabel from '@/components/shared/BoxedLabel';
import AddToCartButton from '@/components/shared/AddToCartButton';
import { formatearSoles, idDeProducto, precioDe } from '@/lib/tienda';

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
          {c.categories.map((category: { slug: string; name: string; products: string[] }) => (
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
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {category.products.map((product) => {
                  const id = idDeProducto(product);
                  const precio = precioDe(id);
                  return (
                    <Reveal key={product} preset="child">
                      <div className="border-line-warm/40 flex items-center justify-between gap-3 rounded-xl border bg-white/60 px-4 py-3">
                        <div className="min-w-0">
                          <p className="text-ink text-base font-semibold">{product}</p>
                          <p className="text-ink/50 text-xs font-semibold">
                            {precio === null
                              ? dictionary.Checkout.pendingPrice
                              : formatearSoles(precio)}
                          </p>
                        </div>
                        <AddToCartButton
                          size="sm"
                          id={id}
                          name={product}
                          href={`/catalogo/${category.slug}`}
                          addLabel={dictionary.Navbar.cart_add}
                          addedLabel={dictionary.Navbar.cart_added}
                          className="shrink-0"
                        />
                      </div>
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
