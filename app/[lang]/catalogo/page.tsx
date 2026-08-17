import Link from 'next/link';
import { ArrowLeft, ArrowRight, ImageOff } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';

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

        <div className="space-y-16">
          {c.categories.map((category: { slug: string; name: string; products: string[] }) => (
            <section key={category.slug}>
              <Reveal preset="growUp">
                {/* El título lleva a la página propia de la línea. */}
                <Link
                  href={`/${lang}/catalogo/${category.slug}`}
                  className="group border-line-warm/40 mb-6 flex items-center gap-2 border-b pb-3"
                >
                  <h2 className="font-display text-ink group-hover:text-gp-green text-2xl font-semibold tracking-tight transition-colors">
                    {category.name}
                  </h2>
                  <ArrowRight className="text-ink/30 group-hover:text-gp-green h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>

              <Reveal
                group
                gap={0.06}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4"
              >
                {category.products.map((product) => (
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
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
