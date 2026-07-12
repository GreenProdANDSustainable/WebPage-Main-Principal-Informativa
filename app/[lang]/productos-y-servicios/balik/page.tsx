import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductAccordion from '@/components/features/products/ProductAccordion';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function BalikPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Navbar;
  const p = dictionary.ProductsServices;

  const productosDesc = [
    {
      id: 'c1',
      name: 'Lorem ipsum dolor sit amet',
      shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      fullDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      imageSeed: 'tuna',
      features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    },
    {
      id: 'c2',
      name: 'Lorem ipsum dolor sit amet',
      shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      fullDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      imageSeed: 'sardines',
      features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}/productos-y-servicios`}
          className="text-gp-blue hover:text-gp-green mb-12 inline-flex items-center text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {d.products_services_title}
        </Link>
        <div className="mb-16 border-b border-slate-200 pb-8">
          <div className="bg-gp-blue/10 text-gp-blue mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-bold tracking-wide uppercase">
            Línea Premium
          </div>
          <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
            {d.balik}
          </h1>
          <p className="text-xl leading-relaxed text-slate-600">{d.balik_desc}</p>
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
