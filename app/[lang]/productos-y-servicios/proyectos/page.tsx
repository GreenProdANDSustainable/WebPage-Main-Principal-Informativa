import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductAccordion from '@/components/features/products/ProductAccordion';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

const proyectosDesc = [
    {
        id: 'p1',
        name: 'Lorem ipsum dolor sit amet',
        shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        fullDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageSeed: 'soil',
        features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    },
    {
        id: 'p2',
        name: 'Lorem ipsum dolor sit amet',
        shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        fullDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageSeed: 'compost',
        features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    },
    {
        id: 'p3',
        name: 'Lorem ipsum dolor sit amet',
        shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        fullDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        imageSeed: 'training',
        features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    }
];

export default async function ProyectosSosteniblesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dictionary = lang === 'es' ? esMessages : enMessages;
    const d = dictionary.Navbar;

    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link href={`/${lang}/productos-y-servicios`} className="inline-flex items-center text-sm font-semibold text-gp-blue hover:text-gp-green mb-12 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {d.products_services_title}
                </Link>
                <div className="mb-16 border-b border-slate-200 pb-8">
                    <div className="inline-block bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6">Consultoría y Capacitación</div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">{d.proyectos}</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">{d.proyectos_desc}</p>
                </div>
                <div className="space-y-4">
                    {proyectosDesc.map((product) => (
                        <ProductAccordion key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
