import { Leaf, Fish, Briefcase, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function QuienesSomos({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <section className="relative py-28 bg-gp-blue overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gp-green rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
                    <Link href={`/${lang}/nosotros`} className="inline-flex items-center gap-2 text-white/60 text-sm mb-6 hover:text-gp-green transition-colors">
                        ← Acerca de Nosotros
                    </Link>
                    <span className="block text-gp-green text-sm font-bold uppercase tracking-widest mb-4">Greenprod Sustainable</span>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
                        ¿Quiénes Somos?
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto italic">
                        &ldquo;Tu camino verde hacia la productividad&rdquo;
                    </p>
                </div>
            </section>

            {/* Quiénes somos + Misión/Visión */}
            <section className="py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
                    <div>
                        <span className="inline-flex items-center gap-2 text-gp-green text-sm font-bold uppercase tracking-widest mb-4">
                            <span className="h-px w-8 bg-gp-green"></span> Sobre nosotros
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-6">Nuestra empresa</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Greenprod Sustainable nació con la convicción de que la productividad y el cuidado del medio ambiente pueden ir de la mano. Somos una empresa enfocada en impulsar la productividad agrícola y marina a través de prácticas innovadoras, produciendo fertilizantes orgánicos y generando valor en los productos del mar para mejorar la calidad de vida de las comunidades locales.
                        </p>
                    </div>

                    {/* Misión y Visión */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gp-neutral rounded-3xl p-10 flex flex-col gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-gp-green/20 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-gp-green" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-slate-900">Misión</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Impulsar la productividad agrícola y marina mediante prácticas innovadoras y respetuosas con el medio ambiente, produciendo fertilizantes orgánicos y productos del mar que mejoren la calidad de vida de las comunidades locales.
                            </p>
                        </div>
                        <div className="bg-gp-blue/5 rounded-3xl p-10 flex flex-col gap-4 border border-gp-blue/10">
                            <div className="h-12 w-12 rounded-2xl bg-gp-blue/20 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-gp-blue" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-slate-900">Visión</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Ser una empresa líder en la producción de bioinsumos agrícolas y productos marinos sostenibles, reconocida por su innovación, compromiso ambiental y contribución al desarrollo de una agricultura y pesca responsables que promuevan ecosistemas saludables.
                            </p>
                        </div>
                    </div>

                    {/* Ejes de Intervención */}
                    <div>
                        <span className="inline-flex items-center gap-2 text-gp-green text-sm font-bold uppercase tracking-widest mb-4">
                            <span className="h-px w-8 bg-gp-green"></span> Lo que hacemos
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8">Nuestros Ejes de Intervención</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 rounded-xl bg-gp-green/10 flex items-center justify-center mb-5">
                                    <Leaf className="h-6 w-6 text-gp-green" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg mb-3">Agricultura Sostenible</h3>
                                <ul className="space-y-2 text-slate-500 text-sm">
                                    <li>→ Abonos orgánicos (gp-biol, gp-trich)</li>
                                    <li>→ Estudio de suelos y cultivos</li>
                                    <li>→ Asesoramiento técnico</li>
                                </ul>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 rounded-xl bg-gp-blue/10 flex items-center justify-center mb-5">
                                    <Fish className="h-6 w-6 text-gp-blue" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg mb-3">Pesca Responsable</h3>
                                <ul className="space-y-2 text-slate-500 text-sm">
                                    <li>→ Pescado fresco con trazabilidad</li>
                                    <li>→ Línea &ldquo;mi pez&rdquo;</li>
                                    <li>→ Formación a pescadores</li>
                                </ul>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5">
                                    <Briefcase className="h-6 w-6 text-slate-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg mb-3">Consultoría Integral</h3>
                                <ul className="space-y-2 text-slate-500 text-sm">
                                    <li>→ Planes de negocio</li>
                                    <li>→ Fondos concursables</li>
                                    <li>→ Fortalecimiento de capacidades</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Valores */}
                    <div>
                        <span className="inline-flex items-center gap-2 text-gp-green text-sm font-bold uppercase tracking-widest mb-4">
                            <span className="h-px w-8 bg-gp-green"></span> Principios
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8">Nuestros Valores</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { title: 'Sostenibilidad', color: 'bg-gp-green/10 text-gp-green' },
                                { title: 'Innovación', color: 'bg-gp-blue/10 text-gp-blue' },
                                { title: 'Calidad', color: 'bg-gp-green/10 text-gp-green' },
                                { title: 'Responsabilidad', color: 'bg-gp-blue/10 text-gp-blue' },
                            ].map((v, i) => (
                                <div key={i} className={`rounded-2xl p-6 text-center font-bold text-sm ${v.color}`}>
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
