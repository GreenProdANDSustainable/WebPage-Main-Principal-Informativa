import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';
import BoxedLabel from '@/components/shared/BoxedLabel';
import AddToCartButton from '@/components/shared/AddToCartButton';
import { formatearSoles, idDeProducto, precioDe } from '@/lib/tienda';

interface Categoria {
  slug: string;
  name: string;
  products: string[];
}

/** Una página por línea de producto, con solo los productos de esa línea. */
export function generateStaticParams() {
  return esMessages.Catalog.categories.flatMap((cat: Categoria) =>
    ['es', 'en'].map((lang) => ({ lang, categoria: cat.slug }))
  );
}

export default async function CategoriaCatalogo({
  params,
}: {
  params: Promise<{ lang: string; categoria: string }>;
}) {
  const { lang, categoria } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const c = dictionary.Catalog;
  const cat = (c.categories as Categoria[]).find((x) => x.slug === categoria);

  if (!cat) notFound();

  return (
    <div className="bg-paper min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal preset="fadeIn">
          <Link
            href={`/${lang}/catalogo`}
            className="text-ink/50 hover:text-gp-green mb-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {c.allCategories}
          </Link>
        </Reveal>

        <div className="mb-14 text-center">
          <Reveal group gap={0.12}>
            <Reveal preset="child">
              <BoxedLabel as="h1" size="lg" className="mb-4">
                {cat.name}
              </BoxedLabel>
            </Reveal>
            <Reveal preset="child">
              <p className="text-ink/60 mx-auto max-w-2xl text-base">{c.productsIn}</p>
            </Reveal>
          </Reveal>
        </div>

        <Reveal
          group
          gap={0.08}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {cat.products.map((product) => {
            const id = idDeProducto(product);
            const precio = precioDe(id);
            return (
              <Reveal key={product} preset="child">
                <div className="border-line-warm/40 flex items-center justify-between gap-4 rounded-2xl border bg-white/60 px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-ink text-lg font-semibold">{product}</p>
                    <p className="text-ink/50 text-xs font-semibold">
                      {precio === null ? dictionary.Checkout.pendingPrice : formatearSoles(precio)}
                    </p>
                  </div>
                  <AddToCartButton
                    size="sm"
                    id={id}
                    name={product}
                    href={`/catalogo/${cat.slug}`}
                    addLabel={dictionary.Navbar.cart_add}
                    addedLabel={dictionary.Navbar.cart_added}
                    className="shrink-0"
                  />
                </div>
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    </div>
  );
}
