import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

import HeroSection from '@/components/features/home/HeroSection';
import MissionVisionSection from '@/components/features/home/MissionVisionSection';
import SustainabilityHighlightSection from '@/components/features/home/SustainabilityHighlightSection';
import PartnersSection from '@/components/features/home/PartnersSection';
import NewsSection from '@/components/features/home/NewsSection';
import VideoSection from '@/components/features/home/VideoSection';

interface HomeProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  // Await params in Next.js 15
  const { lang } = await params;

  // Get dictionary based on language
  const dictionary = lang === 'es' ? esMessages : enMessages;
  const dict = dictionary;

  const testimonialsEnabled = process.env.NEXT_PUBLIC_TESTIMONIALS_ENABLED === 'true';

  return (
    <div className="flex flex-col min-h-screen -mt-20">
      <HeroSection dict={dict} lang={lang} />
      <PartnersSection dict={dict} />
      <MissionVisionSection dict={dict} />
      <SustainabilityHighlightSection dict={dict} lang={lang} />
      <NewsSection dict={dict} />
      <VideoSection dict={dict} />

      {/* Testimonials Section - Conditional based on environment variable */}
      {testimonialsEnabled && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-600">Testimonials section coming soon...</p>
          </div>
        </section>
      )}
    </div>
  );
}
