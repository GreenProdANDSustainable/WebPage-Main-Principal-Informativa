import Image from 'next/image';
import Reveal from '@/components/shared/Reveal';
import LogoMarquee from '@/components/shared/LogoMarquee';
import type { MarqueeLogo } from '@/components/shared/LogoMarquee';

interface PartnersSectionProps {
  dict: any;
}

const partners: MarqueeLogo[] = [
  {
    src: '/images/logos/aliados/senasa.webp',
    alt: 'SENASA Perú',
    href: 'https://www.gob.pe/senasa',
  },
  { src: '/images/logos/aliados/sanipes.webp', alt: 'SANIPES', href: 'https://www.gob.pe/sanipes' },
  { src: '/images/logos/aliados/snp.webp', alt: 'Sociedad Nacional de Pesquería' },
  { src: '/images/logos/aliados/anepap.webp', alt: 'ANEPAP' },
  {
    src: '/images/logos/aliados/kiwa-bcs.webp',
    alt: 'Kiwa BCS Öko-Garantie',
    href: 'https://www.kiwa.com/pe/es/',
  },
];

/**
 * Aliados sobre el campo.
 *
 * El fondo es un fotograma del mismo video que corre en "¿Quiénes Somos?",
 * para que las dos secciones se lean como el mismo lugar. Los sellos son
 * casi todos de tinta oscura, así que cada uno va sobre su placa clara:
 * sueltos sobre la foto no se leerían.
 */
export default function PartnersSection({ dict }: PartnersSectionProps) {
  return (
    <section id="aliados" className="bg-ink relative isolate overflow-hidden py-24">
      <Image
        src="/images/home/fondos/campo-germinacion.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="bg-ink/70 absolute inset-0 -z-10" />

      <div className="relative mb-12 px-4 text-center sm:px-6 lg:px-8">
        <Reveal group gap={0.12}>
          <Reveal preset="child">
            <h2 className="font-display text-paper mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {dict.Partners.title}
            </h2>
          </Reveal>
          <Reveal preset="child">
            <p className="text-paper/70 mx-auto max-w-2xl text-base">{dict.Partners.subtitle}</p>
          </Reveal>
        </Reveal>
      </div>

      <div className="relative">
        <LogoMarquee logos={partners} variant="onDark" />
      </div>
    </section>
  );
}
