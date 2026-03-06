import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductAccordion from '@/components/ProductAccordion';

const bioinsumos = [
    {
        id: 'b1',
        name: 'BioFertil Plus',
        shortDesc: 'Fertilizante orgánico líquido para cultivos intensivos.',
        fullDesc: 'BioFertil Plus es un fertilizante orgánico líquido de alta concentración, diseñado para mejorar la estructura del suelo y estimular el crecimiento radicular. Formulado con extractos vegetales y microorganismos benéficos.',
        imageSeed: 'fertilizer',
        features: ['Aumenta el rendimiento de los cultivos', 'Mejora la retención de agua', 'Certificación orgánica', 'Fácil aplicación vía riego'],
    },
    {
        id: 'b2',
        name: 'EcoPest Control',
        shortDesc: 'Biopesticida de amplio espectro.',
        fullDesc: 'Controlador biológico de plagas basado en cepas seleccionadas de Bacillus thuringiensis. Efectivo contra una amplia variedad de insectos dañinos sin afectar a los polinizadores ni al medio ambiente.',
        imageSeed: 'leaf',
        features: ['Cero residuos tóxicos', 'Seguro para abejas', 'Acción rápida', 'Compatible con agricultura ecológica'],
    },
    {
        id: 'b3',
        name: 'NemaStop Bio',
        shortDesc: 'Nematicida biológico para protección de raíces.',
        fullDesc: 'Solución biológica para el control de nematodos fitopatógenos en el suelo. Protege el sistema radicular de las plantas promoviendo un desarrollo sano y vigoroso.',
        imageSeed: 'roots',
        features: ['Control prolongado', 'Mejora la sanidad radicular', 'No genera resistencia', 'Aplicación en drench o riego'],
    },
];

export default async function CoprobioPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link href={`/${lang}/productos-y-servicios`} className="inline-flex items-center text-sm font-semibold text-gp-blue hover:text-gp-green mb-12 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Productos y Servicios
                </Link>
                <div className="mb-16 border-b border-slate-200 pb-8">
                    <div className="inline-block bg-gp-green/10 text-gp-green px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6">Línea de Bioinsumos</div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">Coprobio</h1>
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
