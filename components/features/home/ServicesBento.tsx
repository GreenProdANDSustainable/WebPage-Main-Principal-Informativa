'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Droplets, Fish, GraduationCap, Sprout, Truck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import KineticHeading from '@/components/shared/KineticHeading';
import { ease, viewport } from '@/lib/motion';

interface ServicesBentoProps {
  dict: any;
  lang: string;
}

/**
 * Las líneas de negocio en retícula asimétrica (bento), cada una con una
 * imagen que muestra de qué va.
 *
 * El peso de cada bloque responde a su papel en la empresa, así la vista
 * recorre en vez de barrer cinco tarjetas iguales. Al pasar el cursor la
 * foto se acerca y el velo se abre: la tarjeta se siente como una ventana.
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
    image: string;
  }[] = [
    {
      slug: 'balik',
      title: d.balik,
      desc: d.balik_desc,
      Icon: Fish,
      span: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
      image: '/images/servicios/balik.webp',
    },
    {
      slug: 'ceprobio',
      title: d.Ceprobio,
      desc: d.Ceprobio_desc,
      Icon: Sprout,
      span: 'md:col-span-2 lg:col-span-2',
      image: '/images/servicios/ceprobio.webp',
    },
    {
      slug: 'planta-tratamiento',
      title: d.planta,
      desc: d.planta_desc,
      Icon: Droplets,
      span: 'md:col-span-2 lg:col-span-2',
      image: '/images/servicios/planta-tratamiento.webp',
    },
    {
      slug: 'proveeduria',
      title: d.proveeduria,
      desc: d.proveeduria_desc,
      Icon: Truck,
      span: 'md:col-span-1 lg:col-span-2',
      image: '/images/servicios/proveeduria.webp',
    },
    {
      slug: 'proyectos',
      title: d.proyectos,
      desc: d.proyectos_desc,
      Icon: GraduationCap,
      span: 'md:col-span-1 lg:col-span-2',
      image: '/images/servicios/proyectos.webp',
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

        <div className="grid auto-rows-[minmax(210px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ slug, title, desc, Icon, span, image }, i) => (
            <motion.div
              key={slug}
              className={span}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: i * 0.09, ease: ease.growth }}
            >
              <motion.div
                className="h-full"
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ duration: 0.35, ease: ease.growth }}
              >
                <Link
                  href={`/${lang}/productos-y-servicios/${slug}`}
                  className="group border-line-warm/15 focus-visible:ring-gp-green relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border p-7 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />

                  {/* Velo: la foto acompaña, el texto se lee siempre. */}
                  <span className="from-ink/95 via-ink/70 absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                  <div className="pointer-events-none absolute inset-x-7 top-7 z-10 flex items-start justify-between">
                    <span className="border-paper/25 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="text-paper h-6 w-6" />
                    </span>
                    <ArrowUpRight className="text-paper h-5 w-5 shrink-0 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                  </div>

                  <div className="relative z-10 mt-24">
                    <h3 className="font-display text-paper mb-2 text-xl font-semibold md:text-2xl">
                      {title}
                    </h3>
                    <p className="text-husk/80 text-sm leading-relaxed">{desc}</p>
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
