import Link from 'next/link';
import { notFound } from 'next/navigation';
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

/** Una página por línea de producto, con solo los productos de esa línea. */
export function generateStaticParams() {
  return (esMessages.Catalog.categories as Categoria[]).flatMap((cat) =>
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
          className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3"
        >
          {cat.products.map((prod) => {
            const precio = precioDe(prod.slug);
            return (
              <Reveal key={prod.slug} preset="child">
                {/* La tarjeta entera es el enlace a la ficha: acá solo se
                    mira. Comprar se hace dentro de la ficha del producto,
                    después de ver la información y la hoja de seguridad. */}
                <Link
                  href={`/${lang}/catalogo/${cat.slug}/${prod.slug}`}
                  className="group border-line-warm/40 hover:border-gp-green/50 flex h-full flex-col rounded-2xl border bg-white/60 p-4 transition-colors"
                >
                  <ProductPhoto
                    id={prod.slug}
                    name={prod.name}
                    sizes="(max-width: 640px) 50vw, 340px"
                  />
                  <p className="text-ink group-hover:text-gp-green mt-3 flex items-center justify-between gap-1 text-base font-bold transition-colors">
                    {prod.name}
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                  <p className="text-ink/50 text-xs font-semibold">
                    {precio === null ? dictionary.Checkout.pendingPrice : formatearSoles(precio)}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    </div>
  );
}
