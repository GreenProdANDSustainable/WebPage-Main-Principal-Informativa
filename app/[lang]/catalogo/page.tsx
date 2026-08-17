import Link from 'next/link';
import { ArrowLeft, ImageOff } from 'lucide-react';
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

        <div className="mb-14 text-center">
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

        <Reveal
          group
          gap={0.08}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3"
        >
          {c.categories.map((category: string) => (
            <Reveal key={category} preset="child">
              <div className="border-line-warm/50 hover:border-gp-green/50 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors duration-500">
                <ImageOff className="text-ink/25 h-8 w-8" />
                <h2 className="font-display text-ink text-lg font-semibold">{category}</h2>
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
