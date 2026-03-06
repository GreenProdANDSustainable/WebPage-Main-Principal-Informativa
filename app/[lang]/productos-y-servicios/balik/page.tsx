import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductAccordion from '@/components/ProductAccordion';

const productosDesc = [
    {
        id: 'c1',
        name: 'Atún Premium en Aceite de Oliva',
        shortDesc: 'Lomos de atún seleccionados, pesca sostenible.',
        fullDesc: 'Nuestros lomos de atún son seleccionados a mano y conservados en aceite de oliva virgen extra de primera presión en frío. Provenientes de pesca responsable y certificada.',
        imageSeed: 'tuna',
        features: ['Alto en Omega 3', 'Sin conservantes artificiales', 'Pesca certificada MSC', 'Envase reciclable'],
    },
    {
        id: 'c2',
        name: 'Sardinas en Salsa de Tomate Orgánico',
        shortDesc: 'Sardinas frescas con salsa de tomates cultivados sin pesticidas.',
        fullDesc: 'Deliciosas sardinas enteras bañadas en una salsa rica y espesa elaborada con tomates 100% orgánicos y especias naturales. Un clásico nutritivo y saludable.',
        imageSeed: 'sardines',
        features: ['Fuente de calcio', 'Tomates orgánicos certificados', 'Sabor tradicional', 'Ideal para ensaladas y pastas'],
    },
];

export default async function BalikPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link href={`/${lang}/productos-y-servicios`} className="inline-flex items-center text-sm font-semibold text-gp-blue hover:text-gp-green mb-12 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Productos y Servicios
                </Link>
                <div className="mb-16 border-b border-slate-200 pb-8">
                    <div className="inline-block bg-gp-blue/10 text-gp-blue px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6">Línea Premium</div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">Balik</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">Conservas de pescado, empacados al vacío y pescado fresco de la más alta calidad.</p>
                </div>
                <div className="space-y-4">
                    {productosDesc.map((product) => (
                        <ProductAccordion key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
