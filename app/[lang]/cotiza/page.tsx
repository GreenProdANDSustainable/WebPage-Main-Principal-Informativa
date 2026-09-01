import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, Sprout, Truck } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';
import CotizaForm from '@/components/features/cotiza/CotizaForm';
import { SITE_URL, LOCALES } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.cotiza;
  const url = `${SITE_URL}/${lang}/cotiza`;

  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/cotiza`])),
    },
    openGraph: {
      type: 'website',
      url,
      title: d.meta.title,
      description: d.meta.description,
    },
  };
}

const ICONOS = [Sprout, Leaf, ShieldCheck, Truck];

/**
 * Página de aterrizaje para campañas (Google Ads, enlace de la bio de redes).
 * Va directo al grano: nombra el problema del cultivo, lo conecta con la
 * línea de producto y termina en un pedido de cotización por WhatsApp.
 */
export default async function Cotiza({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.cotiza;

  return (
    <div className="bg-paper min-h-screen">
      {/* Hero */}
      <section className="bg-gp-blue relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="bg-gp-green absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white sm:px-6 lg:px-8">
          <Reveal group gap={0.1}>
            <Reveal preset="child">
              <span className="text-gp-green mb-4 inline-block text-sm font-bold tracking-widest uppercase">
                {d.hero.label}
              </span>
            </Reveal>
            <Reveal preset="child">
              <h1 className="mb-5 font-serif text-4xl font-bold text-balance md:text-5xl">
                {d.hero.title}
              </h1>
            </Reveal>
            <Reveal preset="child">
              <p className="mx-auto max-w-2xl text-lg text-white/85">{d.hero.subtitle}</p>
            </Reveal>
            <Reveal preset="child">
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <span className="flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2">
                  <Image
                    src="/images/logos/senasa.png"
                    alt="SENASA Perú"
                    width={90}
                    height={32}
                    className="h-6 w-auto"
                  />
                  <Image
                    src="/images/logos/kiwa-bcs.webp"
                    alt="Kiwa BCS"
                    width={90}
                    height={32}
                    className="h-6 w-auto"
                  />
                </span>
                <span className="text-sm font-semibold text-white/90">{d.hero.trust}</span>
              </div>
            </Reveal>
            <Reveal preset="child">
              <a
                href="#formulario"
                className="bg-gp-green hover:bg-husk hover:text-ink mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-colors"
              >
                {d.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </Reveal>
        </div>
      </section>

      {/* Problema -> línea de producto */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Reveal preset="growUp">
            <h2 className="font-display text-ink mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {d.problemas.title}
            </h2>
            <p className="text-ink/60 mx-auto max-w-2xl">{d.problemas.subtitle}</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {(
            d.problemas.items as { dolor: string; texto: string; linea: string; slug: string }[]
          ).map((item, idx) => {
            const Icono = ICONOS[idx % ICONOS.length];
            return (
              <Reveal key={item.slug} preset="child" delay={idx * 0.05}>
                <Link
                  href={`/${lang}/catalogo/${item.slug}`}
                  className="border-line-warm/40 hover:border-gp-green group flex h-full flex-col gap-3 rounded-2xl border bg-white p-6 transition-colors"
                >
                  <span className="bg-gp-green/10 text-gp-green flex h-11 w-11 items-center justify-center rounded-full">
                    <Icono className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-ink text-lg font-semibold">{item.dolor}</h3>
                  <p className="text-ink/60 text-sm">{item.texto}</p>
                  <span className="text-gp-green mt-auto inline-flex items-center gap-1 text-sm font-semibold">
                    {item.linea}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Formulario */}
      <section id="formulario" className="bg-husk/25 scroll-mt-24 py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <Reveal preset="growUp">
              <h2 className="font-display text-ink mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
                {d.form.title}
              </h2>
              <p className="text-ink/60 mx-auto max-w-xl">{d.form.subtitle}</p>
            </Reveal>
          </div>
          <Reveal preset="growUp" soft>
            <CotizaForm d={d} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
