import Image from 'next/image';
import { CheckCircle2, Leaf, Fish, Briefcase } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function Nosotros({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.about;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="relative py-24 bg-gp-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gp-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block text-gp-green text-sm font-bold uppercase tracking-widest mb-4">{d.label}</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            {d.title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto italic">
            &ldquo;{d.tagline}&rdquo;
          </p>
        </div>
      </section>

      {/* Historia y Misión */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://picsum.photos/seed/teamwork/800/1000"
                alt="Equipo Greenprod Sustainable"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">{d.history.title}</h2>
                <p className="text-slate-600 leading-relaxed">
                  {d.history.text}
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">{d.missionVision.title}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-gp-green shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">{d.missionVision.mission}</h3>
                      <p className="text-slate-600">{d.missionVision.missionText}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-gp-blue shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">{d.missionVision.vision}</h3>
                      <p className="text-slate-600">{d.missionVision.visionText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ejes de Intervención */}
      <section className="py-24 bg-gp-neutral">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-gp-green text-sm font-bold uppercase tracking-widest mb-3">
              <span className="h-px w-8 bg-gp-green"></span> {d.interventionAxes.label} <span className="h-px w-8 bg-gp-green"></span>
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">{d.interventionAxes.title}</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">{d.interventionAxes.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Eje 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-gp-green/10 flex items-center justify-center mb-6">
                <Leaf className="h-7 w-7 text-gp-green" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{d.agriculture}</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                {d.agricultureItems.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2"><span className="text-gp-green font-bold mt-0.5">→</span> {item}</li>
                ))}
              </ul>
            </div>
            {/* Eje 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-gp-blue/10 flex items-center justify-center mb-6">
                <Fish className="h-7 w-7 text-gp-blue" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{d.fishing}</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                {d.fishingItems.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2"><span className="text-gp-blue font-bold mt-0.5">→</span> {item}</li>
                ))}
              </ul>
            </div>
            {/* Eje 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-slate-900/10 flex items-center justify-center mb-6">
                <Briefcase className="h-7 w-7 text-slate-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{d.consulting}</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                {d.consultingItems.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2"><span className="text-slate-700 font-bold mt-0.5">→</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{d.values.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {d.values.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold text-gp-green mb-3">{d.values.sustainability}</h3>
              <p className="text-slate-300">{d.values.sustainabilityDesc}</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold text-gp-blue mb-3">{d.values.innovation}</h3>
              <p className="text-slate-300">{d.values.innovationDesc}</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold text-gp-green mb-3">{d.values.quality}</h3>
              <p className="text-slate-300">{d.values.qualityDesc}</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold text-gp-blue mb-3">{d.values.responsibility}</h3>
              <p className="text-slate-300">{d.values.responsibilityDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
