'use client';

import Link from 'next/link';
import { ArrowUpRight, Beef, Droplets, Fish, GraduationCap, Sprout, Truck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import KineticHeading from '@/components/shared/KineticHeading';
import { ease, viewport } from '@/lib/motion';

interface ServicesBentoProps {
  dict: any;
  lang: string;
}

/**
 * Las seis líneas de negocio en retícula asimétrica (bento).
 *
 * Cada bloque tiene un peso distinto según su papel en la empresa, así que
 * la vista no cae en el patrón plano de "seis tarjetas iguales": recorre.
 * Al pasar el cursor, la tarjeta se eleva y una veladura de color barre el
 * fondo, que es lo que da la sensación de material y no de plantilla.
 */
export default function ServicesBento({ dict, lang }: ServicesBentoProps) {
  const d = dict.Navbar;
  const reduced = useReducedMotion();

  const items: {
    slug: string;
    title: string;
    desc: string;
    Icon: LucideIcon;
    span: string;
    tone: string;
    accent: string;
  }[] = [
    {
      slug: 'balik',
      title: d.balik,
      desc: d.balik_desc,
      Icon: Fish,
      span: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
      tone: 'from-gp-blue/95 to-gp-blue',
      accent: 'text-white',
    },
    {
      slug: 'ceprobio',
      title: d.Ceprobio,
      desc: d.Ceprobio_desc,
      Icon: Sprout,
      span: 'lg:col-span-2',
      tone: 'from-gp-green/95 to-gp-green',
      accent: 'text-white',
    },
    {
      slug: 'planta-tratamiento',
      title: d.planta,
      desc: d.planta_desc,
      Icon: Droplets,
      span: 'lg:col-span-1',
      tone: 'from-ink-soft to-ink',
      accent: 'text-husk',
    },
    {
      slug: 'carniprod',
      title: d.carniprod,
      desc: d.carniprod_desc,
      Icon: Beef,
      span: 'lg:col-span-1',
      tone: 'from-ink-soft to-ink',
      accent: 'text-husk',
    },
    {
      slug: 'proveeduria',
      title: d.proveeduria,
      desc: d.proveeduria_desc,
      Icon: Truck,
      span: 'lg:col-span-2',
      tone: 'from-ink to-ink-soft',
      accent: 'text-husk',
    },
    {
      slug: 'proyectos',
      title: d.proyectos,
      desc: d.proyectos_desc,
      Icon: GraduationCap,
      span: 'md:col-span-2 lg:col-span-2',
      tone: 'from-gp-green/90 to-gp-blue/90',
      accent: 'text-white',
    },
  ];

  return (
    <section className="bg-ink relative overflow-hidden py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <motion.p
            className="text-gp-green mb-3 text-sm font-semibold tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: ease.growth }}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {d.products_services_title}
          </motion.p>
          <KineticHeading
            text={d.industry_solutions}
            as="h2"
            className="font-display text-paper text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl"
          />
        </div>

        <div className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ slug, title, desc, Icon, span, tone, accent }, i) => (
            <motion.div
              key={slug}
              className={span}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: i * 0.08, ease: ease.growth }}
            >
              <motion.div
                className="h-full"
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ duration: 0.35, ease: ease.growth }}
              >
                <Link
                  href={`/${lang}/productos-y-servicios/${slug}`}
                  className={`group border-line-warm/15 focus-visible:ring-gp-green relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-br p-7 ${tone} focus-visible:ring-2 focus-visible:outline-none`}
                >
                  {/* Veladura que barre la tarjeta al pasar el cursor. */}
                  <span className="pointer-events-none absolute inset-0 translate-y-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-y-0" />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className={`h-6 w-6 ${accent}`} />
                    </span>
                    <ArrowUpRight
                      className={`h-5 w-5 shrink-0 opacity-45 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 ${accent}`}
                    />
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className={`font-display mb-2 text-xl font-semibold md:text-2xl ${accent}`}>
                      {title}
                    </h3>
                    <p className={`text-sm leading-relaxed opacity-75 ${accent}`}>{desc}</p>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
