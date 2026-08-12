import { Gauge, Award } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';
import ComingSoon from '@/components/shared/ComingSoon';

export default async function Sostenibilidad({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.sustainability;
  const comingSoon = dictionary.Home.comingSoon;

  return (
    <div className="flex min-h-screen flex-col bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal group gap={0.12}>
          <Reveal preset="child">
            <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
              {d.title}
            </h1>
          </Reveal>
          <Reveal preset="child">
            <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600">{d.description}</p>
          </Reveal>
        </Reveal>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-6 lg:px-8">
        <ComingSoon id="impacto" icon={Gauge} label={comingSoon.impact} />
        <ComingSoon id="certificaciones" icon={Award} label={comingSoon.certifications} />
      </div>
    </div>
  );
}
