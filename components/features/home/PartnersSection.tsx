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

export default function PartnersSection({ dict }: PartnersSectionProps) {
  return (
    <section id="aliados" className="border-line-warm/20 bg-paper border-y py-24">
      <div className="mb-12 px-4 text-center sm:px-6 lg:px-8">
        <Reveal group gap={0.12}>
          <Reveal preset="child">
            <h2 className="font-display text-ink mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {dict.Partners.title}
            </h2>
          </Reveal>
          <Reveal preset="child">
            <p className="text-ink/60 mx-auto max-w-2xl text-base">{dict.Partners.subtitle}</p>
          </Reveal>
        </Reveal>
      </div>

      <LogoMarquee logos={partners} />
    </section>
  );
}
