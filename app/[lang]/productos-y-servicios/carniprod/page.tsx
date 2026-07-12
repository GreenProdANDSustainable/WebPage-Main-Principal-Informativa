import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function CarniprodPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Navbar;

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
            Próximamente
          </div>
          <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
            {d.carniprod}
          </h1>
          <p className="text-xl leading-relaxed text-slate-600">{d.carniprod_desc}</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Clock className="mb-6 h-16 w-16 text-slate-400" />
          <h2 className="mb-4 text-2xl font-bold text-slate-800">Catálogo en Construcción</h2>
          <p className="mx-auto max-w-lg text-slate-500">
            Estamos trabajando arduamente en esta nueva línea de negocio. Pronto habilitaremos
            nuestro catálogo detallado de productos cárnicos con nuestros estándares de siempre.
          </p>
        </div>
      </div>
    </div>
  );
}
