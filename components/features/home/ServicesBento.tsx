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
  const s = dict.Home.solutions;
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
    <section id="soluciones" className="bg-paper relative overflow-hidden py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="font-display text-ink mx-auto mb-10 max-w-5xl text-center text-3xl leading-[1.15] font-semibold tracking-tight md:mb-14 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: ease.growth }}
        >
          {s.headingLead}{' '}
          <span className="text-gp-green text-[1.35em] font-extrabold">{s.headingAccent}</span>{' '}
          {s.headingTail}
        </motion.h2>

        <motion.div
          className="mx-auto mb-12 max-w-5xl md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.1, ease: ease.growth }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/home/productos-campo.webp"
              alt={s.productsAlt}
              width={1800}
              height={1013}
              sizes="(max-width: 1024px) 100vw, 64rem"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
            <p
              className="text-ink/50 text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {s.certifiedBy}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <a
                href="https://www.gob.pe/senasa"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src="/images/logos/senasa.webp"
                  alt="SENASA Perú"
                  width={420}
                  height={297}
                  className="h-14 w-auto md:h-16"
                />
              </a>
              <a
                href="https://www.kiwa.com/pe/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src="/images/logos/kiwa-bcs.webp"
                  alt="Kiwa BCS Öko-Garantie"
                  width={200}
                  height={200}
                  className="h-14 w-auto md:h-16"
                />
              </a>
            </div>
          </div>
        </motion.div>

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
