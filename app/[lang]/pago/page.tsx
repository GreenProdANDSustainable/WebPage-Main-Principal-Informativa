import type { Metadata } from 'next';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import Reveal from '@/components/shared/Reveal';
import CheckoutForm from '@/components/features/checkout/CheckoutForm';

/**
 * La página de pago no se indexa: solo tiene sentido con un carrito armado
 * detrás, así que en un buscador aparecería siempre vacía.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function Pago({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const c = dictionary.Checkout;

  return (
    <div className="bg-paper min-h-screen py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Reveal group gap={0.12}>
            <Reveal preset="child">
              <h1 className="font-display text-ink mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
                {c.title}
              </h1>
            </Reveal>
            <Reveal preset="child">
              <p className="text-ink/60 mx-auto max-w-2xl text-base">{c.subtitle}</p>
            </Reveal>
          </Reveal>
        </div>

        <CheckoutForm dict={dictionary} lang={lang} />
      </div>
    </div>
  );
}
