import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/get-dictionary';

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
      <body className="selection:bg-gp-green flex min-h-screen flex-col bg-slate-50 font-[family-name:var(--font-jakarta)] text-slate-900 antialiased selection:text-white">
        <Navbar dictionary={dictionary} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer dictionary={dictionary} lang={lang} />
      </body>
    </html>
  );
}
