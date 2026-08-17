import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

interface ReachMapSectionProps {
  dict: any;
}

interface CityPin {
  x: number;
  y: number;
  label: string;
  detail?: string;
  anchor: 'start' | 'end';
}

/**
 * Coordenadas sobre un contorno del Perú simplificado a mano (no es un mapa
 * geográfico exacto), aproximadas a la ubicación real de cada ciudad/región.
 * Borrador: ajustar posiciones si alguna queda torcida.
 */
const cities: CityPin[] = [
  { x: 48, y: 48, label: 'Paimas - Morropón', detail: 'Piura', anchor: 'start' },
  { x: 190, y: 65, label: 'Bagua Grande', anchor: 'end' },
  { x: 46, y: 115, label: 'Lambayeque', anchor: 'start' },
  { x: 125, y: 145, label: 'Cajamarca', anchor: 'start' },
  { x: 52, y: 185, label: 'Trujillo - Chepén - Virú', detail: 'La Libertad', anchor: 'start' },
  { x: 62, y: 245, label: 'Áncash', anchor: 'start' },
  { x: 150, y: 265, label: 'Huánuco', anchor: 'start' },
  { x: 78, y: 320, label: 'Huaral - Lima', detail: 'Lima', anchor: 'start' },
  { x: 190, y: 330, label: 'Chanchamayo, Satipo, La Merced', detail: 'Junín', anchor: 'end' },
  { x: 230, y: 445, label: 'Cusco', anchor: 'end' },
  { x: 118, y: 480, label: 'Arequipa', anchor: 'start' },
  { x: 140, y: 545, label: 'Moquegua', anchor: 'start' },
];

const PERU_PATH =
  'M68,20 L110,15 L170,35 L230,55 L270,90 L300,150 L285,230 L310,290 L330,360 L300,430 L320,470 L270,520 L230,560 L190,600 L150,610 L130,560 L110,500 L90,430 L75,360 L60,290 L45,220 L35,150 L30,90 L45,40 Z';

const socials = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/greenprodsustainable' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/greenprodsustainable' },
];

/** "GreenProd llegó hasta": mapa del Perú con las ciudades cubiertas. */
export default function ReachMapSection({ dict }: ReachMapSectionProps) {
  const r = dict.Home.reach;

  return (
    <section id="cobertura" className="bg-gp-blue py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <Reveal preset="slideInLeft">
            <h2 className="font-display text-paper mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl lg:text-left">
              <span className="text-gp-green">{r.titleLead}</span> {r.titleTail}
            </h2>
          </Reveal>

          <Reveal preset="rootScale" soft>
            <svg
              viewBox="0 0 340 620"
              className="mx-auto h-auto w-full max-w-sm"
              aria-hidden="true"
            >
              <path d={PERU_PATH} className="fill-paper/90" />
              {cities.map((city, i) => {
                const dx = city.anchor === 'start' ? 9 : -9;
                return (
                  <g key={i} className="group cursor-default outline-none" tabIndex={0}>
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={5}
                      className="fill-ink group-hover:fill-gp-green group-focus:fill-gp-green transition-all duration-300 ease-out group-hover:[transform:scale(1.8)] group-focus:[transform:scale(1.8)]"
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                    <text
                      x={city.x + dx}
                      y={city.y + 3}
                      textAnchor={city.anchor}
                      className="fill-ink group-hover:fill-gp-green text-[9px] font-semibold transition-colors duration-300"
                      stroke="white"
                      strokeWidth={3}
                      paintOrder="stroke"
                    >
                      {city.label}
                      {city.detail && (
                        <tspan
                          x={city.x + dx}
                          dy="10"
                          className="fill-ink/60 text-[7px] font-normal"
                        >
                          {city.detail}
                        </tspan>
                      )}
                    </text>
                  </g>
                );
              })}
            </svg>
          </Reveal>
        </div>

        <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <Reveal preset="slideInRight">
            <div className="relative h-14 w-40 md:h-16 md:w-44">
              <Image
                src="/greenprod blanco png.png"
                alt="Green Prod & Sustainable S.A.C"
                fill
                className="object-contain"
              />
            </div>
          </Reveal>

          <Reveal preset="slideInRight" delay={0.1}>
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <span className="text-paper/70 font-display text-sm font-semibold tracking-wide uppercase">
                {r.qrLabel}
              </span>
              {/* Reemplazar por <Image src="/images/home/qr-greenprod.png" .../> cuando
                  el archivo del QR esté en esa ruta dentro de public/. */}
              <div className="border-paper/30 text-paper/50 flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-dashed bg-white/5 p-3 text-center text-[11px]">
                {r.qrComingSoon}
              </div>
            </div>
          </Reveal>

          <Reveal preset="slideInRight" delay={0.2}>
            <div className="flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-paper/20 text-paper/70 hover:border-gp-green hover:bg-gp-green hover:text-ink flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
