import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

interface ReachMapSectionProps {
  dict: any;
}

interface CityPin {
  /** Posición real del pin, proyectada desde sus coordenadas geográficas. */
  x: number;
  y: number;
  /** Posición de la etiqueta en el riel lateral (separada del pin para que no se amontonen). */
  labelY: number;
  label: string;
  detail?: string;
  side: 'left' | 'right';
}

const VIEW_W = 555;
const VIEW_H = 471;
const RAIL_LEFT = 10;
const RAIL_RIGHT = VIEW_W - 10;

/**
 * Contorno real del Perú, proyectado (equirectangular) desde el polígono de
 * frontera de Natural Earth / world.geo.json (dominio público). Cada ciudad
 * usa sus coordenadas reales con la misma proyección, así que el pin cae en
 * el lugar correcto del mapa. Las etiquetas viven en dos rieles laterales
 * (como en la referencia del usuario) para que no se encimen entre sí; una
 * línea conecta cada etiqueta con su pin real.
 */
const PERU_PATH =
  'M423.2,432.4 L416.9,444.5 L404.8,450.5 L381.2,437 L379.2,427.3 L332.5,403.7 L290.3,378 L272.1,363.5 L262.4,344 L266.3,337.2 L246.3,306.3 L223.1,262.9 L200.9,216 L191.3,205.3 L183.8,188 L165.6,172.6 L148.8,163.1 L156.4,152.6 L145,130.1 L152.3,113.7 L171.1,98.8 L173.9,108.6 L167.2,114.2 L167.8,122.8 L177.5,120.9 L187,123.5 L196.9,135.4 L210.2,125.7 L214.7,109.8 L229.1,89.3 L257.4,80.1 L283.1,55.4 L290.4,40.1 L287.1,22.2 L293.4,20 L309,31.1 L316.6,42.3 L327.4,48.3 L341.3,73 L358.8,75.9 L371.8,69.7 L380.3,73.8 L394.4,71.8 L412.5,82.8 L397.3,106.7 L404.3,107.3 L416.1,119.8 L394.9,118.7 L391.7,122.3 L372.4,126.8 L345.5,142.8 L343.8,153.8 L337.8,162 L340.1,174.7 L325.9,181.5 L325.9,191.4 L319.7,195.7 L329.5,216.9 L342.6,231.3 L337.6,241.4 L353.3,242.7 L362.2,255.3 L382.9,255.9 L402.2,242 L400.7,277.8 L411.4,280.5 L424.6,276.4 L445,314.3 L439.9,322.3 L438.8,338.8 L438.3,358.8 L429.1,370.6 L433.3,379.3 L427.9,387.2 L438.1,407 L423.2,432.4 Z';

const cities: CityPin[] = [
  { x: 163.3, y: 140.9, labelY: 141, label: 'Paimas - Morropón', detail: 'Piura', side: 'left' },
  { x: 215.1, y: 154.2, labelY: 154, label: 'Bagua Grande', side: 'right' },
  { x: 180.4, y: 176.4, labelY: 176, label: 'Lambayeque', side: 'left' },
  { x: 213.5, y: 187.3, labelY: 208, label: 'Cajamarca', side: 'left' },
  {
    x: 201.1,
    y: 209.6,
    labelY: 240,
    label: 'Trujillo - Chepén - Virú',
    detail: 'La Libertad',
    side: 'left',
  },
  { x: 211.7, y: 232.5, labelY: 272, label: 'Áncash', side: 'left' },
  { x: 266.7, y: 252.4, labelY: 304, label: 'Huánuco', side: 'left' },
  { x: 243.9, y: 289.2, labelY: 336, label: 'Huaral - Lima', detail: 'Lima', side: 'left' },
  {
    x: 288.3,
    y: 278.9,
    labelY: 279,
    label: 'Chanchamayo, Satipo, La Merced',
    detail: 'Junín',
    side: 'right',
  },
  { x: 367.3, y: 337.2, labelY: 337, label: 'Cusco', side: 'right' },
  { x: 377.4, y: 404.9, labelY: 405, label: 'Arequipa', side: 'left' },
  { x: 391.6, y: 423.4, labelY: 437, label: 'Moquegua', side: 'left' },
];

const socials = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/greenprodsustainable' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/greenprodsustainable' },
];

/** "GreenProd llegó hasta": mapa del Perú con las ciudades cubiertas. */
export default function ReachMapSection({ dict }: ReachMapSectionProps) {
  const r = dict.Home.reach;

  return (
    <section id="cobertura" className="bg-gp-blue py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal preset="growUp">
          <h2 className="font-display text-paper mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="text-gp-green">{r.titleLead}</span> {r.titleTail}
          </h2>
        </Reveal>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          <Reveal preset="rootScale" soft className="w-full lg:flex-1">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="mx-auto h-auto w-full"
              aria-hidden="true"
            >
              <path d={PERU_PATH} className="fill-paper/90" />
              {cities.map((city, i) => {
                const railX = city.side === 'left' ? RAIL_LEFT : RAIL_RIGHT;
                const lineEndX = city.side === 'left' ? railX - 4 : railX + 4;
                const textX = railX;
                const anchor = city.side === 'left' ? 'start' : 'end';
                return (
                  <g key={i} className="group cursor-default outline-none" tabIndex={0}>
                    <line
                      x1={city.x}
                      y1={city.y}
                      x2={lineEndX}
                      y2={city.labelY}
                      className="stroke-ink/25 group-hover:stroke-gp-green transition-colors duration-300"
                      strokeWidth={1}
                    />
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={4.5}
                      className="fill-ink group-hover:fill-gp-green group-focus:fill-gp-green transition-all duration-300 ease-out group-hover:[transform:scale(1.8)] group-focus:[transform:scale(1.8)]"
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                    <text
                      x={textX}
                      y={city.labelY + 3}
                      textAnchor={anchor}
                      className="fill-ink group-hover:fill-gp-green text-[10px] font-semibold transition-colors duration-300"
                      stroke="white"
                      strokeWidth={3}
                      paintOrder="stroke"
                    >
                      {city.label}
                      {city.detail && (
                        <tspan x={textX} dy="11" className="fill-ink/60 text-[8px] font-normal">
                          {city.detail}
                        </tspan>
                      )}
                    </text>
                  </g>
                );
              })}
            </svg>
          </Reveal>

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
                <div className="h-36 w-36 overflow-hidden rounded-2xl bg-white p-2">
                  <Image
                    src="/images/home/qr-greenprod.jpg"
                    alt={r.qrLabel}
                    width={288}
                    height={288}
                    className="h-full w-full object-contain"
                  />
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
      </div>
    </section>
  );
}
