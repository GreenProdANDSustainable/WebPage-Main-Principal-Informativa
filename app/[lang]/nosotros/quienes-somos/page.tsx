import { Leaf, Fish, Briefcase, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function QuienesSomos({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

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
            ← Acerca de Nosotros
          </Link>
          <span className="text-gp-green mb-4 block text-sm font-bold tracking-widest uppercase">
            Greenprod Sustainable
          </span>
          <h1 className="mb-6 font-serif text-4xl font-bold md:text-6xl">¿Quiénes Somos?</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 italic">
            &ldquo;Tu camino verde hacia la productividad&rdquo;
          </p>
        </div>
      </section>

      {/* Quiénes somos + Misión/Visión */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl space-y-16 px-4 sm:px-6 lg:px-8">
          <div>
            <span className="text-gp-green mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <span className="bg-gp-green h-px w-8"></span> Sobre nosotros
            </span>
            <h2 className="mb-6 font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Nuestra empresa
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Greenprod Sustainable nació con la convicción de que la productividad y el cuidado del
              medio ambiente pueden ir de la mano. Somos una empresa enfocada en impulsar la
              productividad agrícola y marina a través de prácticas innovadoras, produciendo
              fertilizantes orgánicos y generando valor en los productos del mar para mejorar la
              calidad de vida de las comunidades locales.
            </p>
          </div>

          {/* Misión y Visión */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gp-neutral flex flex-col gap-4 rounded-3xl p-10">
              <div className="bg-gp-green/20 flex h-12 w-12 items-center justify-center rounded-2xl">
                <CheckCircle2 className="text-gp-green h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">Misión</h3>
              <p className="leading-relaxed text-slate-600">
                Impulsar la productividad agrícola y marina mediante prácticas innovadoras y
                respetuosas con el medio ambiente, produciendo fertilizantes orgánicos y productos
                del mar que mejoren la calidad de vida de las comunidades locales.
              </p>
            </div>
            <div className="bg-gp-blue/5 border-gp-blue/10 flex flex-col gap-4 rounded-3xl border p-10">
              <div className="bg-gp-blue/20 flex h-12 w-12 items-center justify-center rounded-2xl">
                <CheckCircle2 className="text-gp-blue h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">Visión</h3>
              <p className="leading-relaxed text-slate-600">
                Ser una empresa líder en la producción de bioinsumos agrícolas y productos marinos
                sostenibles, reconocida por su innovación, compromiso ambiental y contribución al
                desarrollo de una agricultura y pesca responsables que promuevan ecosistemas
                saludables.
              </p>
            </div>
          </div>

          {/* Ejes de Intervención */}
          <div>
            <span className="text-gp-green mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <span className="bg-gp-green h-px w-8"></span> Lo que hacemos
            </span>
            <h2 className="mb-8 font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Nuestros Ejes de Intervención
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="bg-gp-green/10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Leaf className="text-gp-green h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900">Agricultura Sostenible</h3>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>→ Abonos orgánicos (gp-biol, gp-trich)</li>
                  <li>→ Estudio de suelos y cultivos</li>
                  <li>→ Asesoramiento técnico</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="bg-gp-blue/10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Fish className="text-gp-blue h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900">Pesca Responsable</h3>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>→ Pescado fresco con trazabilidad</li>
                  <li>→ Línea &ldquo;mi pez&rdquo;</li>
                  <li>→ Formación a pescadores</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                  <Briefcase className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900">Consultoría Integral</h3>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>→ Planes de negocio</li>
                  <li>→ Fondos concursables</li>
                  <li>→ Fortalecimiento de capacidades</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Valores */}
          <div>
            <span className="text-gp-green mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <span className="bg-gp-green h-px w-8"></span> Principios
            </span>
            <h2 className="mb-8 font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { title: 'Sostenibilidad', color: 'bg-gp-green/10 text-gp-green' },
                { title: 'Innovación', color: 'bg-gp-blue/10 text-gp-blue' },
                { title: 'Calidad', color: 'bg-gp-green/10 text-gp-green' },
                { title: 'Responsabilidad', color: 'bg-gp-blue/10 text-gp-blue' },
              ].map((v, i) => (
                <div key={i} className={`rounded-2xl p-6 text-center text-sm font-bold ${v.color}`}>
                  {v.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
