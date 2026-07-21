import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/get-dictionary';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
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
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${jakarta.variable} ${bricolage.variable} ${plexMono.variable} selection:bg-gp-green flex min-h-screen flex-col bg-slate-50 font-[family-name:var(--font-jakarta)] text-slate-900 antialiased selection:text-white`}
      >
        <Navbar dictionary={dictionary} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer dictionary={dictionary} lang={lang} />
      </body>
    </html>
  );
}
