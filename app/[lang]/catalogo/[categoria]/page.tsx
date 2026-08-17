import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ImageOff } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';

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
              <h1 className="font-display text-ink mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
                {cat.name}
              </h1>
            </Reveal>
            <Reveal preset="child">
              <p className="text-ink/60 mx-auto max-w-2xl text-base">{c.productsIn}</p>
            </Reveal>
          </Reveal>
        </div>

        <Reveal
          group
          gap={0.08}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4"
        >
          {cat.products.map((product) => (
            <Reveal key={product} preset="child">
              <div className="border-line-warm/50 hover:border-gp-green/50 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-500">
                <ImageOff className="text-ink/25 h-7 w-7" />
                <p className="text-ink text-base font-semibold">{product}</p>
                <p
                  className="text-ink/35 text-xs tracking-wide uppercase"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {c.comingSoon}
                </p>
              </div>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
