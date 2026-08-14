import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import * as motion from 'motion/react-client';
import Reveal from '@/components/shared/Reveal';
import ParallaxMedia from '@/components/shared/ParallaxMedia';
import { ease, viewport } from '@/lib/motion';

interface SustainabilityHighlightSectionProps {
  dict: any;
  lang: string;
}

export default function SustainabilityHighlightSection({
  dict,
  lang,
}: SustainabilityHighlightSectionProps) {
  const d = dict.Home.sustainability.highlight;

  return (
    <section id="compromiso" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal preset="rootScale" className="order-last lg:order-first">
            {/* La foto es 3:2 y las tres personas ocupan todo el ancho: el
                contenedor respeta esa proporción para no recortar a nadie. */}
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-2xl">
              <ParallaxMedia className="absolute inset-0">
                <Image
                  src="/images/home/compromiso.jpg"
                  alt={d.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </ParallaxMedia>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: 0.35, ease: ease.growth }}
                className="bg-paper/90 absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm"
              >
                <motion.div
                  className="bg-gp-green flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Leaf className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <p className="text-ink/50 text-xs font-medium tracking-wider uppercase">
                    {d.our_commitment}
                  </p>
                  <p className="text-ink text-sm font-bold">{d.sustainable_agriculture_fishing}</p>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal group gap={0.11} className="flex flex-col gap-6">
            <Reveal preset="child">
              <h2 className="font-display text-gp-blue text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
                {d.title} <span className="text-gp-green">{d.titleHighlight}</span>
              </h2>
            </Reveal>

            <Reveal preset="child">
              <p className="text-ink/70 text-lg leading-relaxed">{d.description}</p>
            </Reveal>

            <Reveal preset="child">
              <ul className="text-ink/80 space-y-3">
                {d.items.map((item: string, idx: number) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.12, ease: ease.growth }}
                  >
                    <motion.span
                      className="bg-gp-green/20 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={viewport}
                      transition={{ duration: 0.45, delay: 0.2 + idx * 0.12, ease: ease.sprout }}
                    >
                      <span className="bg-gp-green block h-2 w-2 rounded-full"></span>
                    </motion.span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <Reveal preset="child">
              <div className="pt-2">
                <motion.span
                  className="inline-block"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: ease.growth }}
                >
                  <Link
                    href={`/${lang}/sostenibilidad`}
                    className="bg-ink text-paper hover:bg-husk hover:text-ink inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold shadow-[0_0_0_0_rgba(20,23,15,0)] transition-[background-color,color,box-shadow] duration-300 hover:shadow-[0_12px_34px_-12px_rgba(20,23,15,0.4)]"
                  >
                    {d.cta}
                  </Link>
                </motion.span>
              </div>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
