import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductAccordion from '@/components/features/products/ProductAccordion';

const bioinsumos = [
    {
        id: 'b1',
        name: 'Lorem ipsum dolor sit amet',
        shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        fullDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageSeed: 'fertilizer',
        features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    },
    {
        id: 'b2',
        name: 'Lorem ipsum dolor sit amet',
        shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        fullDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageSeed: 'leaf',
        features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    },
    {
        id: 'b3',
        name: 'Lorem ipsum dolor sit amet',
        shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        fullDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageSeed: 'roots',
        features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    },
];

export default async function CeprobioPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link href={`/${lang}/productos-y-servicios`} className="inline-flex items-center text-sm font-semibold text-gp-blue hover:text-gp-green mb-12 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Productos y Servicios
                </Link>
                <div className="mb-16 border-b border-slate-200 pb-8">
                    <div className="inline-block bg-gp-green/10 text-gp-green px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6">Línea de Bioinsumos</div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ceprobio</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">Producción de bioinsumos y soluciones biológicas para una agricultura productiva y ecológica.</p>
                </div>
                <div className="space-y-4">
                    {bioinsumos.map((product) => (
                        <ProductAccordion key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
