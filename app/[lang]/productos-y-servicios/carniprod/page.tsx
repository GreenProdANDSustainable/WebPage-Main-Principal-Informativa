import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export default async function CarniprodPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link href={`/${lang}/productos-y-servicios`} className="inline-flex items-center text-sm font-semibold text-gp-blue hover:text-gp-green mb-12 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Productos y Servicios
                </Link>
                <div className="mb-16 border-b border-slate-200 pb-8">
                    <div className="inline-block bg-gp-blue/10 text-gp-blue px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6">Próximamente</div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">Carniprod</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">Línea de producción de productos cárnicos de alta calidad (pollo, res, cerdo, cuy). En etapa de desarrollo y lanzamiento.</p>
                </div>
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                    <Clock className="h-16 w-16 text-slate-400 mb-6" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Catálogo en Construcción</h2>
                    <p className="text-slate-500 max-w-lg mx-auto">
                        Estamos trabajando arduamente en esta nueva línea de negocio. Pronto habilitaremos nuestro catálogo detallado de productos cárnicos con nuestros estándares de siempre.
                    </p>
                </div>
            </div>
        </div>
    );
}
