import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import GrowthProgress from '@/components/shared/GrowthProgress';
import MotionProvider from '@/components/shared/MotionProvider';
import PageTransition from '@/components/shared/PageTransition';
import CartDrawer from '@/components/shared/CartDrawer';
import { CartProvider } from '@/lib/cart-context';
import { getDictionary } from '@/get-dictionary';
import { SITE_URL, LOCALES } from '@/lib/site';

const selawik = localFont({
  src: [
    { path: '../fonts/selawik/selawkl.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/selawik/selawksl.woff2', weight: '350', style: 'normal' },
    { path: '../fonts/selawik/selawk.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/selawik/selawksb.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/selawik/selawkb.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-selawik',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const url = `${SITE_URL}/${lang}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: dictionary.Metadata.title,
    description: dictionary.Metadata.description,
    // Sin esto, buscar la marca no asocia el sitio con "GreenProd".
    keywords: [
      'GreenProd',
      'Green Prod',
      'GreenProd Sustainable',
      'Green Prod & Sustainable',
      'bioinsumos',
      'biofertilizantes',
      'Nuevo Chimbote',
      'Áncash',
      'Perú',
    ],
    applicationName: 'GreenProd Sustainable',
    // URL canónica y equivalencias de idioma: le indican a Google cuál es la
    // dirección buena de cada página y evitan que compitan entre sí.
    alternates: {
      canonical: url,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
    },
    openGraph: {
      type: 'website',
      url,
      siteName: 'GreenProd Sustainable',
      title: dictionary.Metadata.title,
      description: dictionary.Metadata.description,
      locale: lang === 'es' ? 'es_PE' : 'en_US',
      images: [
        { url: '/greenprod png.png', width: 2463, height: 760, alt: 'GreenProd Sustainable' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.Metadata.title,
      description: dictionary.Metadata.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  // Datos estructurados de la organización: es la forma en que Google
  // entiende que "GreenProd" es el nombre de esta empresa y que este sitio
  // es su web oficial. Sin esto, la marca y el sitio no quedan asociados.
  const organizacion = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GreenProd Sustainable',
    legalName: 'Green Prod & Sustainable S.A.C.',
    alternateName: ['GreenProd', 'Green Prod', 'Greenprod Sustainable'],
    url: SITE_URL,
    logo: `${SITE_URL}/greenprod%20png.png`,
    description: dictionary.Metadata.description,
    email: 'contacto@greenprod.pe',
    telephone: '+51 919 514 085',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Uno Mz. 1 Lote 1, Bloque "E", AA.HH. Tres Estrellas, módulos 6, 12 y 13',
      addressLocality: 'Nuevo Chimbote',
      addressRegion: 'Áncash',
      addressCountry: 'PE',
    },
    sameAs: [
      'https://www.facebook.com/greenprodsustainable',
      'https://www.instagram.com/greenprodsustainable',
    ],
  };

  return (
    <html lang={lang} className={`${selawik.variable} scroll-smooth`}>
      <body className="selection:bg-gp-green flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacion) }}
        />
        <MotionProvider>
          <CartProvider>
            <Navbar dictionary={dictionary} />
            <main className="flex-1 pt-20">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer dictionary={dictionary} lang={lang} />
            <GrowthProgress />
            <WhatsAppButton />
            <CartDrawer dict={dictionary.Navbar} lang={lang} />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
