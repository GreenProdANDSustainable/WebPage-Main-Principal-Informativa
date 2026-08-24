import Link from 'next/link';
import { Flag, TrendingUp, Users, Globe } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function NuestraTrayectoria({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.about;
  const nav = dictionary.Navbar;

  const milestones = [
    {
      year: '2018',
      title: 'Fundación',
      desc: 'Greenprod Sustainable nace con la misión de impulsar la productividad agrícola y marina a través de prácticas sostenibles e innovadoras.',
      icon: Flag,
      color: 'bg-gp-green',
    },
    {
      year: '2019',
      title: 'Primeros productos',
      desc: 'Lanzamiento de los primeros bioinsumos agrícolas: el hidrolizado de pescado gp-biol y el biocontrolador gp-trich, con resultados positivos en cultivos locales.',
      icon: TrendingUp,
      color: 'bg-gp-blue',
    },
    {
      year: '2021',
      title: 'Expansión a la pesca',
      desc: 'Incorporamos la línea de Pesca Responsable, impulsando la trazabilidad del pescado fresco y el lanzamiento de la línea "mi pez" con valor agregado.',
      icon: Users,
      color: 'bg-gp-green',
    },
    {
      year: '2023',
      title: 'Consultoría Integral',
      desc: 'Ampliamos nuestro portafolio con servicios de consultoría: planes de negocio, postulación a fondos concursables y fortalecimiento de capacidades productivas.',
      icon: Globe,
      color: 'bg-gp-blue',
    },
    {
      year: 'Hoy',
      title: 'Líderes en sostenibilidad',
      desc: 'Greenprod Sustainable consolida su presencia en el sector agrícola y marino, con un equipo comprometido y proyectos que transforman comunidades locales.',
      icon: Flag,
      color: 'bg-gp-green',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <section className="bg-gp-blue relative overflow-hidden py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="bg-gp-green absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
          <Link
            href={`/${lang}/nosotros`}
            className="hover:text-gp-green mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors"
          >
            ← {nav.about}
          </Link>
          <span className="text-gp-green mb-4 block text-sm font-bold tracking-widest uppercase">
            {d.label}
          </span>
          <h1 className="mb-6 font-serif text-4xl font-bold md:text-6xl">{d.our_history}</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            El camino recorrido hacia una agricultura y pesca más sostenibles, paso a paso.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-gp-green mb-10 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
            <span className="bg-gp-green h-px w-8"></span> Historia y evolución
          </span>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-slate-200"></div>

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="relative flex items-start gap-8">
                    {/* Dot */}
                    <div
                      className={`relative z-10 h-12 w-12 shrink-0 rounded-full ${m.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <span className="mb-1 inline-block text-xs font-bold tracking-widest text-slate-400 uppercase">
                        {m.year}
                      </span>
                      <h3 className="mb-2 font-serif text-xl font-bold text-slate-900">
                        {m.title}
                      </h3>
                      <p className="leading-relaxed text-slate-600">{m.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="bg-gp-neutral py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold text-slate-900 md:text-3xl">
            Únete a nuestro camino verde
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-slate-600">
            Conócenos más, explora nuestros productos y servicios, o contáctanos para iniciar un
            proyecto juntos.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${lang}/nosotros`}
              className="bg-gp-blue hover:bg-gp-green inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105"
            >
              {d.title}
            </Link>
            <Link
              href={`/${lang}/contacto`}
              className="border-gp-blue text-gp-blue hover:bg-gp-blue inline-flex items-center justify-center rounded-full border-2 px-8 py-4 text-base font-semibold transition-all hover:scale-105 hover:text-white"
            >
              {nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
