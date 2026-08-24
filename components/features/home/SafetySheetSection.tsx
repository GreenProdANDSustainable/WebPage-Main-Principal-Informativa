'use client';

import Reveal from '@/components/shared/Reveal';
import { Download } from 'lucide-react';

interface SafetySheetSectionProps {
  dict: any;
}

const SAFETY_SHEETS = [
  { slug: 'gp-bio', name: 'GP-Bio', filename: 'HOJA DE SEGURIDAD - GP - BIO.pdf' },
  { slug: 'gp-clean', name: 'GP-Clean', filename: 'HOJA DE SEGURIDAD - GP - CLEAN.pdf' },
  { slug: 'gp-oil', name: 'GP-Oil', filename: 'HOJA DE SEGURIDAD - GP - OIL.pdf' },
  { slug: 'gp-bauver', name: 'GP-Bauver', filename: 'HOJA DE SEGURIDAD-bauveria.pdf' },
  { slug: 'gp-lilax', name: 'GP-Lilax', filename: 'HOJA DE SEGURIDAD-LILAX.pdf' },
  { slug: 'gp-megafort', name: 'GP-Megafort', filename: 'HOJA DE SEGURIDAD-MEGAFORT.pdf' },
  { slug: 'gp-meta', name: 'GP-Meta', filename: 'HOJA DE SEGURIDAD-META.pdf' },
  { slug: 'gp-subtix', name: 'GP-Subtix', filename: 'HOJA DE SEGURIDAD-SUBTIX.pdf' },
  { slug: 'gp-thuring', name: 'GP-Thuring', filename: 'HOJA DE SEGURIDAD-THURING (2).pdf' },
  { slug: 'gp-tricho', name: 'GP-Tricho', filename: 'HOJA DE SEGURIDAD-TRICHO.pdf' },
  { slug: 'gp-trichobac', name: 'GP-Trichobac', filename: 'HOJA DE SEGURIDAD-TRICHOBAC.pdf' },
  { slug: 'gp-warduo', name: 'GP-Warduo', filename: 'HOJA DE SEGURIDAD-WARDUO.pdf' },
];

export default function SafetySheetSection({ dict }: SafetySheetSectionProps) {
  return (
    <section id="hojas-seguridad" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal preset="growUp">
          <h2 className="font-display text-ink mb-4 text-center text-4xl font-semibold tracking-tight md:text-5xl">
            {dict.SafetySheets.title}
          </h2>
        </Reveal>
        <Reveal preset="growUp" delay={0.1}>
          <p className="text-ink/60 mb-12 text-center text-lg">{dict.SafetySheets.subtitle}</p>
        </Reveal>

        <Reveal preset="growUp" delay={0.15}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY_SHEETS.map((sheet) => (
              <a
                key={sheet.slug}
                href={`/seguridad/${encodeURIComponent(sheet.filename)}`}
                download
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-green-400 hover:bg-green-50 hover:shadow-md"
              >
                <span className="text-ink font-medium group-hover:text-green-700">
                  {sheet.name}
                </span>
                <Download className="h-5 w-5 text-slate-400 transition-colors group-hover:text-green-600" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
