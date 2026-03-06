import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function Nosotros() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gp-green rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Conoce la historia, misión y visión detrás de Green Prod & Sustainable, líderes en soluciones ambientales.
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
                alt="Equipo trabajando"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Nuestra Historia</h2>
                <p className="text-slate-600 leading-relaxed">
                  Fundada con la convicción de que la industria y la naturaleza pueden coexistir en armonía, Green Prod & Sustainable nació para ofrecer alternativas ecológicas reales. Desde nuestros primeros bioinsumos hasta nuestra actual línea de conservas premium y proyectos ambientales, hemos mantenido nuestro compromiso con la excelencia y la sostenibilidad.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Misión y Visión</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-gp-green shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Misión</h3>
                      <p className="text-slate-600">Proveer soluciones sostenibles de alta calidad que mejoren la productividad de nuestros clientes mientras protegemos el medio ambiente.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-gp-green shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Visión</h3>
                      <p className="text-slate-600">Ser reconocidos globalmente como el referente principal en innovación ecológica, bioinsumos y gestión ambiental corporativa.</p>
                    </div>
                  </div>
                </div>
              </div>
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
              { title: 'Sostenibilidad', desc: 'Compromiso inquebrantable con el medio ambiente.' },
              { title: 'Innovación', desc: 'Búsqueda constante de mejores soluciones tecnológicas.' },
              { title: 'Calidad', desc: 'Excelencia en cada producto y servicio que entregamos.' },
              { title: 'Integridad', desc: 'Transparencia y ética en todas nuestras relaciones comerciales.' },
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
