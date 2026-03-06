import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, Sprout } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen -mt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/BannerPrincipal.jpg"
            alt="Green Prod Banner Principal"
            fill
            className="object-cover brightness-[0.6]"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Innovación para un <br />
            <span className="text-gp-green">Futuro Sostenible</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-slate-200 mb-10"
          >
            Green Prod & Sustainable lidera la producción de bioinsumos, conservas premium y proyectos ambientales que transforman la industria.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-full bg-gp-green px-8 py-4 text-base font-semibold text-white transition-all hover:bg-gp-blue hover:scale-105"
            >
              Ver Catálogo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/nosotros"
              className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/20 hover:scale-105"
            >
              Conoce Más
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features / Pillars */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestros Pilares</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Desarrollamos soluciones integrales enfocadas en la calidad, la responsabilidad ambiental y la innovación tecnológica.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-2xl bg-gp-neutral flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sprout className="h-10 w-10 text-gp-green" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bioinsumos</h3>
              <p className="text-slate-600">
                Productos biológicos de alta eficacia para la agricultura moderna, respetando el equilibrio natural del suelo.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-10 w-10 text-gp-blue" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Conservas Premium</h3>
              <p className="text-slate-600">
                Procesos certificados que garantizan la máxima calidad y sabor, con trazabilidad desde el origen.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-2xl bg-gp-neutral flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-10 w-10 text-gp-green" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Proyectos Ambientales</h3>
              <p className="text-slate-600">
                Consultoría y ejecución de proyectos de remediación y gestión ambiental para empresas responsables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gp-green via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar tu impacto ambiental?
          </h2>
          <p className="text-lg text-slate-300 mb-10">
            Únete a las empresas que ya confían en Green Prod & Sustainable para sus procesos productivos y gestión ambiental.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-full bg-gp-green px-8 py-4 text-base font-semibold text-white transition-all hover:bg-gp-blue hover:scale-105 shadow-lg shadow-gp-green/30"
          >
            Contáctanos Hoy
          </Link>
        </div>
      </section>
    </div>
  );
}
