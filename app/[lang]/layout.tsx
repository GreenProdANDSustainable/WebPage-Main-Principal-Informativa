import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Green Prod & Sustainable S.A.C | Innovación y Sostenibilidad",
  description: "Soluciones sostenibles para la industria agropecuaria, pesquera y ambiental.",
};

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

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${jakarta.variable} antialiased bg-slate-50 text-slate-900 selection:bg-gp-green selection:text-white min-h-screen flex flex-col font-[family-name:var(--font-jakarta)]`}
      >
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
