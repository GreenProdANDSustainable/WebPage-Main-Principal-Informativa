import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/get-dictionary';

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
  const dictionary = await getDictionary(lang as 'es' | 'en');

  return {
    title: dictionary.Metadata.title,
    description: dictionary.Metadata.description,
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
  const dictionary = await getDictionary(lang as 'es' | 'en');

  return (
    <html lang={lang} className={`${selawik.variable} scroll-smooth`}>
      <body className="selection:bg-gp-green flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:text-white">
        <Navbar dictionary={dictionary} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer dictionary={dictionary} lang={lang} />
      </body>
    </html>
  );
}
