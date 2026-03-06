import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductAccordion from '@/components/ProductAccordion';

const productosDesc = [
    {
        id: 'pt1',
        name: 'Hidrolizado de Pescado',
        shortDesc: 'Abono líquido rico en nitrógeno orgánico y aminoácidos.',
        fullDesc: 'Formulado a base de proteína de pescado mediante hidrólisis natural. Acelera el metabolismo vegetal, mejora el cuaje de frutos y activa la microflora del suelo.',
        imageSeed: 'liquid',
        features: ['Rápida asimilación', 'Estimulante natural', 'Alto en aminoácidos libres', 'Aplicación foliar o fertirriego'],
    },
    {
        id: 'pt2',
        name: 'Jabón Potásico',
        shortDesc: 'Insecticida agrícola de contacto biodegradable.',
        fullDesc: 'Producto orgánico ideal para el control de plagas blandas (pulgones, mosca blanca, ácaros) y como mojante para otros tratamientos fitosanitarios. No deja residuos en la cosecha.',
        imageSeed: 'bubbles',
        features: ['100% Biodegradable', 'Sin plazo de seguridad', 'Efecto limpiador', 'Respetuoso con fauna auxiliar'],
    },
];

export default async function PlantaTratamientoPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link href={`/${lang}/productos-y-servicios`} className="inline-flex items-center text-sm font-semibold text-gp-blue hover:text-gp-green mb-12 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Productos y Servicios
                </Link>
                <div className="mb-16 border-b border-slate-200 pb-8">
                    <div className="inline-block bg-gp-green/10 text-gp-green px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6">Agroindustria</div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">Planta de Tratamiento</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">Producción sostenible de hidrolizado de pescado, jabón potásico y aceites de uso agrícola.</p>
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
