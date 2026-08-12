import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductAccordion from '@/components/features/products/ProductAccordion';
import AddToCartButton from '@/components/shared/AddToCartButton';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

const productosDesc = [
  {
    id: 'pt1',
    name: 'Lorem ipsum dolor sit amet',
    shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    fullDesc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageSeed: 'liquid',
    features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
  },
  {
    id: 'pt2',
    name: 'Lorem ipsum dolor sit amet',
    shortDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    fullDesc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imageSeed: 'bubbles',
    features: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur adipiscing', 'Sed do eiusmod'],
  },
];

export default async function PlantaTratamientoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Navbar;

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${lang}/productos-y-servicios`}
          className="text-gp-blue hover:text-gp-green group mb-12 inline-flex items-center text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />{' '}
          {d.products_services_title}
        </Link>
        <div className="mb-16 border-b border-slate-200 pb-8">
          <div className="bg-gp-green/10 text-gp-green mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-bold tracking-wide uppercase">
            Agroindustria
          </div>
          <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
            {d.planta}
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-slate-600">{d.planta_desc}</p>
          <AddToCartButton
            id="planta"
            name={d.planta}
            href="/productos-y-servicios/planta-tratamiento"
            addLabel={d.cart_add}
            addedLabel={d.cart_added}
          />
        </div>
        <div className="space-y-4">
          {productosDesc.map((product) => (
            <ProductAccordion key={product.id} product={product} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}
