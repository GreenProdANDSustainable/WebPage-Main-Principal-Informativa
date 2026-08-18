import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

import HeroSection from '@/components/features/home/HeroSection';
import ServicesBento from '@/components/features/home/ServicesBento';
import MissionVisionSection from '@/components/features/home/MissionVisionSection';
import TeamSection from '@/components/features/home/TeamSection';
import SustainabilityHighlightSection from '@/components/features/home/SustainabilityHighlightSection';
import PartnersSection from '@/components/features/home/PartnersSection';
import ProductsSection from '@/components/features/home/ProductsSection';
import FieldGallerySection from '@/components/features/home/FieldGallerySection';
import NewsSection from '@/components/features/home/NewsSection';
import VideoSection from '@/components/features/home/VideoSection';
import ReachMapSection from '@/components/features/home/ReachMapSection';

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
    <div className="-mt-20 flex min-h-screen flex-col">
      <HeroSection dict={dict} lang={lang} />

      <ServicesBento dict={dict} lang={lang} />
      <MissionVisionSection dict={dict} />
      <PartnersSection dict={dict} />
      <ProductsSection dict={dict} lang={lang} />
      <FieldGallerySection dict={dict} />
      <TeamSection dict={dict} />
      <SustainabilityHighlightSection dict={dict} />
      <NewsSection dict={dict} />
      <VideoSection dict={dict} />
      <ReachMapSection dict={dict} />

      {/* Testimonials Section - Conditional based on environment variable */}
      {testimonialsEnabled && (
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-slate-600">Testimonials section coming soon...</p>
          </div>
        </section>
      )}
    </div>
  );
}
