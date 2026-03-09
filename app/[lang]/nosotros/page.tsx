import Image from 'next/image';
import { CheckCircle2, Leaf, Fish, Briefcase } from 'lucide-react';

export default function Nosotros() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="relative py-24 bg-gp-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gp-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block text-gp-green text-sm font-bold uppercase tracking-widest mb-4">Greenprod Sustainable</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            ¿Quiénes Somos?
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto italic">
            &ldquo;Tu camino verde hacia la productividad&rdquo;
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
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Nuestra Historia</h2>
                <p className="text-slate-600 leading-relaxed">
                  Greenprod Sustainable nació con la convicción de que la productividad y el cuidado del medio ambiente pueden ir de la mano. Somos una empresa enfocada en impulsar la productividad agrícola y marina a través de prácticas innovadoras, produciendo fertilizantes orgánicos y generando valor en los productos del mar para mejorar la calidad de vida de las comunidades locales.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Misión y Visión</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-gp-green shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Misión</h3>
                      <p className="text-slate-600">Impulsar la productividad agrícola y marina mediante prácticas innovadoras y respetuosas con el medio ambiente, produciendo fertilizantes orgánicos y productos del mar que mejoren la calidad de vida de las comunidades locales.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-gp-blue shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Visión</h3>
                      <p className="text-slate-600">Ser una empresa líder en la producción de bioinsumos agrícolas y productos marinos sostenibles, reconocida por su innovación, compromiso ambiental y contribución al desarrollo de una agricultura y pesca responsables que mejoren la calidad de vida de las comunidades locales y promuevan ecosistemas saludables.</p>
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
              <span className="h-px w-8 bg-gp-green"></span> Lo que hacemos <span className="h-px w-8 bg-gp-green"></span>
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">Nuestros Ejes de Intervención</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Tres líneas de acción que generan impacto real en la agricultura, la pesca y el desarrollo empresarial sostenible.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Eje 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-gp-green/10 flex items-center justify-center mb-6">
                <Leaf className="h-7 w-7 text-gp-green" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Agricultura Sostenible</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start gap-2"><span className="text-gp-green font-bold mt-0.5">→</span> Abonos orgánicos y biocontroladores (gp-biol, gp-trich)</li>
                <li className="flex items-start gap-2"><span className="text-gp-green font-bold mt-0.5">→</span> Estudio de suelos y cultivos agrícolas</li>
                <li className="flex items-start gap-2"><span className="text-gp-green font-bold mt-0.5">→</span> Asesoramiento técnico en bioestimulantes</li>
              </ul>
            </div>
            {/* Eje 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-gp-blue/10 flex items-center justify-center mb-6">
                <Fish className="h-7 w-7 text-gp-blue" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Pesca Responsable</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start gap-2"><span className="text-gp-blue font-bold mt-0.5">→</span> Pescado fresco refrigerado con trazabilidad</li>
                <li className="flex items-start gap-2"><span className="text-gp-blue font-bold mt-0.5">→</span> Línea &ldquo;mi pez&rdquo;: productos listos para consumir</li>
                <li className="flex items-start gap-2"><span className="text-gp-blue font-bold mt-0.5">→</span> Formación a gremios de pescadores</li>
              </ul>
            </div>
            {/* Eje 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-slate-900/10 flex items-center justify-center mb-6">
                <Briefcase className="h-7 w-7 text-slate-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Consultoría Integral</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start gap-2"><span className="text-slate-700 font-bold mt-0.5">→</span> Fortalecimiento de capacidades productivas</li>
                <li className="flex items-start gap-2"><span className="text-slate-700 font-bold mt-0.5">→</span> Elaboración de planes de negocio</li>
                <li className="flex items-start gap-2"><span className="text-slate-700 font-bold mt-0.5">→</span> Postulación a fondos concursables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Los principios que guían cada una de nuestras decisiones y proyectos.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Sostenibilidad', desc: 'Compromiso inquebrantable con el medio ambiente y las comunidades locales.' },
              { title: 'Innovación', desc: 'Búsqueda constante de bioinsumos y métodos productivos que superen los estándares convencionales.' },
              { title: 'Calidad', desc: 'Inocuidad, eficacia y accesibilidad en cada producto y servicio que entregamos.' },
              { title: 'Responsabilidad', desc: 'Transparencia, ética y pago justo en todas nuestras relaciones comerciales y con pescadores.' },
            ].map((valor, i) => (
              <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-gp-green mb-3">{valor.title}</h3>
                <p className="text-slate-300">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}