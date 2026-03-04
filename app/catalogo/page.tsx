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

const conservas = [
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

const proyectos = [
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
];

export default function Catalogo() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Catálogo de Productos y Servicios
          </h1>
          <p className="text-lg text-slate-600">
            Explora nuestras soluciones sostenibles diseñadas para la industria y el medio ambiente.
          </p>
        </div>

        <div className="space-y-24">
          {/* Bioinsumos */}
          <section id="bioinsumos">
            <div className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="font-serif text-3xl font-bold text-green-700">Bioinsumos</h2>
              <p className="text-slate-500 mt-2">Soluciones biológicas para una agricultura productiva y ecológica.</p>
            </div>
            <div className="space-y-4">
              {bioinsumos.map((product) => (
                <ProductAccordion key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Conservas */}
          <section id="conservas">
            <div className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="font-serif text-3xl font-bold text-blue-700">Conservas Premium</h2>
              <p className="text-slate-500 mt-2">Productos del mar procesados con los más altos estándares de calidad y sostenibilidad.</p>
            </div>
            <div className="space-y-4">
              {conservas.map((product) => (
                <ProductAccordion key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Proyectos Ambientales */}
          <section id="proyectos">
            <div className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="font-serif text-3xl font-bold text-emerald-700">Proyectos Ambientales</h2>
              <p className="text-slate-500 mt-2">Consultoría y ejecución de iniciativas para la recuperación y cuidado del entorno.</p>
            </div>
            <div className="space-y-4">
              {proyectos.map((product) => (
                <ProductAccordion key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
