import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import { PERU_VIEWBOX, PERU_DEPT_PATHS, PERU_CITIES } from '@/lib/peru-map-data';

// El relleno se arma con las mismas 26 piezas departamentales que se
// dibujan como líneas divisorias, así el contorno nunca puede quedar por
// fuera de las líneas: son literalmente los mismos trazos.
const PERU_FILL_PATH = PERU_DEPT_PATHS.join(' ');

interface ReachMapSectionProps {
  dict: any;
}

/** Glifo de pin (mismo trazo que lucide "map-pin"), con la punta en (12, 21.8). */
const PIN_PATH =
  'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0';
const PIN_SCALE = 0.85;

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
            <svg viewBox={PERU_VIEWBOX} className="mx-auto h-auto w-full" aria-hidden="true">
              <path d={PERU_FILL_PATH} className="fill-paper/90" />
              {/* Límites departamentales, como en la referencia del usuario. */}
              {PERU_DEPT_PATHS.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  className="stroke-gp-blue/45"
                  strokeWidth={1.25}
                  strokeLinejoin="round"
                />
              ))}

              {PERU_CITIES.map((city, i) => {
                const lineEndX = city.side === 'left' ? city.railX + 4 : city.railX - 4;
                const anchor = city.side === 'left' ? 'start' : 'end';
                return (
                  <g key={i} className="group cursor-default outline-none" tabIndex={0}>
                    <line
                      x1={city.x}
                      y1={city.y}
                      x2={lineEndX}
                      y2={city.labelY}
                      className="stroke-ink/30 group-hover:stroke-gp-green transition-colors duration-300"
                      strokeWidth={1}
                    />

                    {/* Pin: la punta queda exactamente sobre (city.x, city.y). */}
                    <g transform={`translate(${city.x}, ${city.y}) scale(${PIN_SCALE})`}>
                      <g
                        className="transition-transform duration-300 ease-out group-hover:[transform:scale(1.35)] group-focus:[transform:scale(1.35)]"
                        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                      >
                        <path
                          d={PIN_PATH}
                          transform="translate(-12,-21.8)"
                          className="fill-ink group-hover:fill-gp-green transition-colors duration-300"
                        />
                        <circle
                          cx={0}
                          cy={-11.8}
                          r={2.6}
                          className="fill-gp-green transition-colors duration-300 group-hover:fill-white"
                        />
                      </g>
                    </g>

                    <text
                      x={city.railX}
                      y={city.labelY + 3}
                      textAnchor={anchor}
                      className="fill-ink group-hover:fill-gp-green text-[11px] font-semibold transition-colors duration-300"
                      stroke="white"
                      strokeWidth={3}
                      paintOrder="stroke"
                    >
                      {city.label}
                      {city.detail && (
                        <tspan
                          x={city.railX}
                          dy="12"
                          className="fill-ink/60 text-[9px] font-normal"
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
