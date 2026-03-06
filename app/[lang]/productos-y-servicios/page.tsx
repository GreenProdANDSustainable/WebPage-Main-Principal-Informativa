import Link from 'next/link';

export default async function ProductosYServicios({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    const categories = [
        {
            title: 'Balik',
            desc: 'Conservas de pescado Premium, empacados al vacío y pescado fresco.',
            href: `/${lang}/productos-y-servicios/balik`,
            color: 'bg-gp-blue',
        },
        {
            title: 'Coprobio',
            desc: 'Producción de bioinsumos y fertilizantes ecológicos para la industria agro.',
            href: `/${lang}/productos-y-servicios/coprobio`,
            color: 'bg-gp-green',
        },
        {
            title: 'Planta Tratamiento',
            desc: 'Hidrolizado de pescado, jabón potásico y aceite agrícola.',
            href: `/${lang}/productos-y-servicios/planta-tratamiento`,
            color: 'bg-gp-green',
        },
        {
            title: 'Carniprod',
            desc: 'Producción de productos cárnicos de alta calidad.',
            href: `/${lang}/productos-y-servicios/carniprod`,
            color: 'bg-gp-blue',
        },
        {
            title: 'Proveeduría Sostenible',
            desc: 'Soluciones integrales y sostenibles para el funcionamiento productivo.',
            href: `/${lang}/productos-y-servicios/proveeduria`,
            color: 'bg-slate-700',
        },
        {
            title: 'Proyectos Sostenibles',
            desc: 'Formación, capacitación y desarrollo de emprendimientos.',
            href: `/${lang}/productos-y-servicios/proyectos`,
            color: 'bg-slate-700',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Productos y Servicios
                    </h1>
                    <p className="text-lg text-slate-600">
                        Descubre nuestra amplia gama de soluciones sostenibles diseñadas para impulsar la industria agropecuaria, pesquera y ambiental con los más altos estándares.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={cat.href}
                            className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
                        >
                            <div className={`${cat.color} h-3 w-full transition-transform origin-left group-hover:scale-y-150`}></div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-gp-green transition-colors">{cat.title}</h3>
                                <p className="text-slate-600 mb-6">{cat.desc}</p>
                                <div className="flex items-center text-sm font-bold text-gp-blue group-hover:text-gp-green transition-colors">
                                    Ver detalles <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
