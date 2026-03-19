import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function Sostenibilidad({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.sustainability;

  return (
    <div className="flex flex-col min-h-screen bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          {d.title}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
          {d.description}
        </p>
      </div>
    </div>
  );
}
