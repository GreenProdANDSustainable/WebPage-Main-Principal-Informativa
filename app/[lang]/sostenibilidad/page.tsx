import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

export default async function Sostenibilidad({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.sustainability;

  return (
    <div className="flex min-h-screen flex-col bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 md:text-5xl">{d.title}</h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600">{d.description}</p>
      </div>
    </div>
  );
}
