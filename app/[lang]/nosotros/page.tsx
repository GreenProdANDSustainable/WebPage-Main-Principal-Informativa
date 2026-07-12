import Image from 'next/image';
import { CheckCircle2, Leaf, Fish, Briefcase } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function Nosotros({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.about;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <section className="bg-gp-blue relative overflow-hidden py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="bg-gp-green absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
          <span className="text-gp-green mb-4 inline-block text-sm font-bold tracking-widest uppercase">
            {d.label}
          </span>
          <h1 className="mb-6 font-serif text-4xl font-bold md:text-6xl">{d.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 italic">
            &ldquo;{d.tagline}&rdquo;
          </p>
        </div>
      </section>

      {/* Historia y Misión */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl">
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
                <h2 className="mb-4 font-serif text-3xl font-bold text-slate-900">
                  {d.history.title}
                </h2>
                <p className="leading-relaxed text-slate-600">{d.history.text}</p>
              </div>

              <div>
                <h2 className="mb-4 font-serif text-3xl font-bold text-slate-900">
                  {d.missionVision.title}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-gp-green mt-1 h-6 w-6 shrink-0" />
                    <div>
                      <h3 className="font-bold text-slate-900">{d.missionVision.mission}</h3>
                      <p className="text-slate-600">{d.missionVision.missionText}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-gp-blue mt-1 h-6 w-6 shrink-0" />
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
      <section className="bg-gp-neutral py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-gp-green mb-3 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <span className="bg-gp-green h-px w-8"></span> {d.interventionAxes.label}{' '}
              <span className="bg-gp-green h-px w-8"></span>
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              {d.interventionAxes.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">{d.interventionAxes.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Eje 1 */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gp-green/10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Leaf className="text-gp-green h-7 w-7" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-bold text-slate-900">{d.agriculture}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {d.agricultureItems.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gp-green mt-0.5 font-bold">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Eje 2 */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gp-blue/10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Fish className="text-gp-blue h-7 w-7" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-bold text-slate-900">{d.fishing}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {d.fishingItems.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gp-blue mt-0.5 font-bold">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Eje 3 */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900/10">
                <Briefcase className="h-7 w-7 text-slate-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-bold text-slate-900">{d.consulting}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {d.consultingItems.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-slate-700">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">{d.values.title}</h2>
            <p className="mx-auto max-w-2xl text-slate-400">{d.values.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8">
              <h3 className="text-gp-green mb-3 text-xl font-bold">{d.values.sustainability}</h3>
              <p className="text-slate-300">{d.values.sustainabilityDesc}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8">
              <h3 className="text-gp-blue mb-3 text-xl font-bold">{d.values.innovation}</h3>
              <p className="text-slate-300">{d.values.innovationDesc}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8">
              <h3 className="text-gp-green mb-3 text-xl font-bold">{d.values.quality}</h3>
              <p className="text-slate-300">{d.values.qualityDesc}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8">
              <h3 className="text-gp-blue mb-3 text-xl font-bold">{d.values.responsibility}</h3>
              <p className="text-slate-300">{d.values.responsibilityDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
