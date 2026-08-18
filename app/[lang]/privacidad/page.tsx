import { AlertTriangle } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';

interface Seccion {
  heading: string;
  body: string;
}

export default async function Privacidad({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const p = dictionary.Privacy;

  return (
    <div className="bg-paper min-h-screen py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal group gap={0.1}>
          <Reveal preset="child">
            <h1 className="font-display text-ink mb-6 text-4xl font-semibold tracking-tight md:text-5xl">
              {p.title}
            </h1>
          </Reveal>

          {/* El texto describe lo que el sitio hace de verdad, pero un
              abogado tiene que revisarlo y faltan dos datos de la empresa. */}
          <Reveal preset="child">
            <p className="border-gp-blue/30 bg-gp-blue/5 text-ink/70 mb-8 flex gap-3 rounded-xl border p-4 text-sm">
              <AlertTriangle className="text-gp-blue h-5 w-5 shrink-0" />
              <span>{p.reviewNotice}</span>
            </p>
          </Reveal>

          <Reveal preset="child">
            <p className="text-ink/70 mb-10 text-base leading-relaxed">{p.intro}</p>
          </Reveal>
        </Reveal>

        <div className="space-y-8">
          {(p.sections as Seccion[]).map((seccion) => (
            <Reveal key={seccion.heading} preset="growUp">
              <section>
                <h2 className="font-display text-ink mb-2 text-xl font-semibold">
                  {seccion.heading}
                </h2>
                <p className="text-ink/70 text-base leading-relaxed">{seccion.body}</p>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal preset="growUp">
          <section className="border-line-warm/40 mt-12 border-t pt-8">
            <h2 className="font-display text-ink mb-2 text-xl font-semibold">{p.contactTitle}</h2>
            <p className="text-ink/70 text-base leading-relaxed">{p.contactBody}</p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
