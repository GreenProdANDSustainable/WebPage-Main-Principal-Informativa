import type { Metadata } from 'next';
import Image from 'next/image';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import LinkTree from '@/components/features/enlaces/LinkTree';

/**
 * Página "árbol de enlaces" para el enlace de la biografía de Instagram y
 * Facebook. No se indexa: existe para dirigir el tráfico de redes, no para
 * competir en buscadores con las páginas reales del sitio.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function Enlaces({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const d = dictionary.Pages.enlaces;

  return (
    <div className="bg-gp-blue flex min-h-screen flex-col items-center px-4 py-16">
      <Image
        src="/greenprod blanco png.png"
        alt="Green Prod & Sustainable"
        width={220}
        height={68}
        className="mb-6 h-14 w-auto"
        priority
      />
      <p className="mb-10 max-w-sm text-center text-sm text-white/80">{d.tagline}</p>

      <LinkTree d={d.links} lang={lang} />

      <p className="mt-12 text-center text-xs text-white/50">{d.footer}</p>
    </div>
  );
}
