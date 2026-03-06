import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductAccordion from '@/components/ProductAccordion';

const proyectosDesc = [
    {
        id: 'p1',
        name: 'Remediación de Suelos Agrícolas',
        shortDesc: 'Recuperación de suelos degradados por uso intensivo de agroquímicos.',
        fullDesc: 'Programa integral de remediación que utiliza microorganismos específicos y enmiendas orgánicas para restaurar la fertilidad natural y la biodiversidad del suelo en zonas agrícolas afectadas.',
        imageSeed: 'soil',
        features: ['Análisis de suelo inicial y final', 'Aplicación de consorcios microbianos', 'Monitoreo continuo', 'Aumento de materia orgánica'],
    },
    {
        id: 'p2',
        name: 'Gestión de Residuos Orgánicos Industriales',
        shortDesc: 'Transformación de mermas en compost de alta calidad.',
        fullDesc: 'Diseño e implementación de sistemas de compostaje industrial para empresas agroindustriales, convirtiendo sus residuos orgánicos en abono rico en nutrientes para reincorporar al ciclo productivo.',
        imageSeed: 'compost',
        features: ['Economía circular', 'Reducción de huella de carbono', 'Capacitación al personal', 'Cumplimiento normativo ambiental'],
    },
    {
        id: 'p3',
        name: 'Formación y Capacitación',
        shortDesc: 'Educación ambiental y desarrollo de capacidades.',
        fullDesc: 'Servicios de capacitación y formación orientados al uso de recursos sostenibles y el desarrollo de nuevos emprendimientos eco-amigables dentro del tejido empresarial B2B.',
        imageSeed: 'training',
        features: ['Talleres especializados', 'Consultoría in-situ', 'Evaluación de impacto', 'Asesoría a emprendimientos'],
    }
];

export default async function ProyectosSosteniblesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link href={`/${lang}/productos-y-servicios`} className="inline-flex items-center text-sm font-semibold text-gp-blue hover:text-gp-green mb-12 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Productos y Servicios
                </Link>
                <div className="mb-16 border-b border-slate-200 pb-8">
                    <div className="inline-block bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6">Consultoría y Capacitación</div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">Proyectos Sostenibles</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">Consultoría, ejecución de iniciativas y formación continua para el cuidado del entorno.</p>
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
