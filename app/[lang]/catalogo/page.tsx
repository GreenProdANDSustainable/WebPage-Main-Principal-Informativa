import Link from 'next/link';
import { ArrowLeft, Wrench } from 'lucide-react';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function Catalogo({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.construction;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 py-24">
      <div className="mx-auto w-full max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-12 shadow-xl md:p-16">
          <div className="bg-gp-green/10 mb-8 flex h-24 w-24 items-center justify-center rounded-full">
            <Wrench className="text-gp-green h-12 w-12" />
          </div>

          <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">
            {d.title}
          </h1>

          <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-slate-600">
            {d.description}
          </p>

          <Link
            href={`/${lang}`}
            className="bg-gp-green hover:bg-gp-blue inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            {d.backButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
