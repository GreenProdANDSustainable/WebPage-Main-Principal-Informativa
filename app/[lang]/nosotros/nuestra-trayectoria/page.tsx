import Link from 'next/link';
import { Flag, TrendingUp, Users, Globe } from 'lucide-react';

export default async function NuestraTrayectoria({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

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
                        Nuestra Trayectoria
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        El camino recorrido hacia una agricultura y pesca más sostenibles, paso a paso.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <span className="inline-flex items-center gap-2 text-gp-green text-sm font-bold uppercase tracking-widest mb-10">
                        <span className="h-px w-8 bg-gp-green"></span> Historia y evolución
                    </span>
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>

                        <div className="space-y-12">
                            {milestones.map((m, i) => {
                                const Icon = m.icon;
                                return (
                                    <div key={i} className="relative flex gap-8 items-start">
                                        {/* Dot */}
                                        <div className={`relative z-10 h-12 w-12 shrink-0 rounded-full ${m.color} flex items-center justify-center shadow-lg`}>
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 pb-4">
                                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{m.year}</span>
                                            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{m.title}</h3>
                                            <p className="text-slate-600 leading-relaxed">{m.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA footer */}
            <section className="py-16 bg-gp-neutral">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        Únete a nuestro camino verde
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                        Conócenos más, explora nuestros productos y servicios, o contáctanos para iniciar un proyecto juntos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${lang}/nosotros/quienes-somos`}
                            className="inline-flex items-center justify-center rounded-full bg-gp-blue px-8 py-4 text-base font-semibold text-white transition-all hover:bg-gp-green hover:scale-105"
                        >
                            ¿Quiénes Somos?
                        </Link>
                        <Link
                            href={`/${lang}/contacto`}
                            className="inline-flex items-center justify-center rounded-full border-2 border-gp-blue px-8 py-4 text-base font-semibold text-gp-blue transition-all hover:bg-gp-blue hover:text-white hover:scale-105"
                        >
                            Contáctanos
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
